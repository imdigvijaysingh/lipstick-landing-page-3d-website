"use client";
import { createRef, useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/* ---------- helpers ---------- */
const SHADES = ["#9b111e", "#c2185b", "#6d0f1a", "#d9534f"].map((c) => new THREE.Color(c));
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => t * t * (3 - 2 * t);
const lerp = THREE.MathUtils.lerp;
const TAU = Math.PI * 2;

import { G, gold, CAPS, SPARE_BULLET } from "./Model";


// Deterministic per-product variety: lean, size, length, radial stagger
// Deterministic per-product variety: lean, size, length, radial stagger
const J = {
  t: Array(12).fill(0), // No lean/tilt
  s: Array(12).fill(1), // Uniform scale
  len: Array(12).fill(1), // Uniform length
  r: Array(12).fill(1), // Perfectly aligned on the circle's radius
};

// Quarter-circle fan pivoting near the bottom-right corner. Angles are measured anticlockwise from "east".
// Offsets are in fan steps from the featured lipstick: positive = already in view (they leave through the
// bottom first), negative = waiting off the top/right edge (they sweep in behind the featured one).
const OFFS: Record<number, number[]> = {
  8: [0, 1, 2, 3, 4, -1, -2, -3],
  10: [0, 1, 2, 3, 4, 5, -1, -2, -3, -4],
  12: [0, 1, 2, 3, 4, 5, 6, -1, -2, -3, -4, -5],
};
const STEP = 0.2; // ~11.5deg between neighbours
const FEATURED_START = 1.75; // ~100deg: top-right of the fan
const ROT_TOTAL = 1.48; // ~85deg sweep: carries the featured lipstick to the bottom-middle (~185deg)

type Refs = {
  root: RefObject<THREE.Group | null>;
  hinge: RefObject<THREE.Group | null>;
  bullet: RefObject<THREE.Mesh | null>;
};

function Lipstick({ r, capMat, bulletMat }: { r: Refs; capMat: THREE.Material; bulletMat: THREE.Material }) {
  return (
    <group ref={r.root}>
      <group position={[0, -0.3, 0]}>
        <mesh geometry={G.base} material={capMat} position={[0, -0.6, 0]} />
        <mesh geometry={G.ring} material={gold} position={[0, -1.2, 0]} />
        <mesh geometry={G.sleeve} material={gold} position={[0, 0.35, 0]} />
        {/* bullet starts retracted inside the case */}
        <mesh ref={r.bullet} geometry={G.bullet} material={bulletMat} position={[0, -0.65, 0]} />
        {/* the cap is hinged: pivot sits on the case rim, so only the lid swings */}
        <group ref={r.hinge} position={[0.5, 0.25, 0]}>
          <mesh geometry={G.cap} material={capMat} position={[-0.5, 0, 0]} />
          <mesh geometry={G.capRing} material={gold} position={[-0.5, 0.07, 0]} />
        </group>
      </group>
    </group>
  );
}

function Collection() {
  const { viewport, size } = useThree();
  const count = size.width >= 1100 ? 12 : size.width >= 700 ? 10 : 8; // desktop / tablet / mobile
  const refs = useMemo<Refs[]>(
    () => Array.from({ length: 12 }, () => ({ root: createRef<THREE.Group>(), hinge: createRef<THREE.Group>(), bullet: createRef<THREE.Mesh>() })),
    []
  );
  const featuredMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#9b111e", roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.2 }),
    []
  );
  const orbit = useRef<THREE.Group>(null!);
  const raw = useRef({ h: 0, q: 0 });
  const sm = useRef({ h: 0, q: 0 });
  const pin = useRef<HTMLElement | null>(null);
  const picked = useRef<THREE.Color | null>(null);

  useEffect(() => {
    pin.current = document.getElementById("hero-pin");
    // H = progress through the hero reveal, Q = progress through the rest of the page
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const range = hero ? hero.offsetHeight - window.innerHeight : 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      raw.current.h = range > 0 ? clamp(y / (range * 0.9)) : 1; // last 10% of the hero is a hold
      raw.current.q = max > range ? clamp((y - range) / (max - range)) : 0;
    };
    const onShade = (e: Event) => { picked.current = new THREE.Color((e as CustomEvent<string>).detail); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("shade", onShade);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("shade", onShade);
    };
  }, []);

  useFrame((state, dt) => {
    const s = sm.current;
    s.h = THREE.MathUtils.damp(s.h, raw.current.h, 5, dt);
    s.q = THREE.MathUtils.damp(s.q, raw.current.q, 5, dt);
    const H = s.h, Q = s.q;
    pin.current?.style.setProperty("--h", H.toFixed(4)); // drives the headline fade in CSS

    // Responsive composition: k = 0 (phone) .. 1 (desktop)
    const vw = viewport.width, vh = viewport.height;
    const k = clamp((vw - 2.3) / (9 - 2.3));
    const sc = lerp(0.30, 0.44, k);
    const fs = Math.min(0.60, vw / 4.0);
    const amp = vw * 0.17;
    const zr = lerp(0.8, 1.3, k);
    // fan pivot sits at the bottom-right corner; Rc is the radius lipsticks are centred on
    const px = vw * lerp(0.5, 0.39, k);
    const py = -vh * lerp(0.46, 0.5, k);
    const Rc = lerp(vw * 1.1, vh * 0.78, k);
    const { pointer } = state;

    orbit.current.rotation.set(-pointer.y * 0.03, pointer.x * 0.05, 0);

    // The whole fan swings anticlockwise about the pivot (top-right -> bottom-middle),
    // then drifts a little further while the featured lipstick is chosen
    const R = ROT_TOTAL * ease(seg(H, 0, 0.5)) + Math.max(0, H - 0.5) * 0.5;
    const offs = OFFS[count];

    for (let i = 0; i < count; i++) {
      const g = refs[i].root.current;
      if (!g) continue;
      const isF = i === 0;
      const rec = isF ? 0 : ease(seg(H, 0.62, 0.78)); // the rest of the fan sweeps away
      const fade = isF ? 1 : 1 - ease(seg(Q, 0, 0.12)); // and is hidden once the hero is over
      g.visible = fade > 0.002;
      if (!g.visible) continue;

      const off = offs[i];
      const a = FEATURED_START + off * STEP + R + rec * 0.9;
      const ca = Math.cos(a), sa = Math.sin(a);
      const Rr = Rc * J.r[i] * (1 + rec * 0.25);
      let x = px + ca * Rr;
      let y = py + sa * Rr;
      // neighbours alternate in depth so they overlap like a real fan; bottom-left is nearest the viewer
      let z = -ca * zr + (off & 1) * 0.75 - rec * 2.5;
      let sca = sc * J.s[i] * (1 - ca * 0.08) * (1 - rec * 0.25) * fade;
      let rz = a - Math.PI / 2 + J.t[i] * 0.5; // long axis points radially out from the pivot
      let rxr = J.t[i] * 0.3;
      let ryr = 0;

      if (isF) {
        const sel = ease(seg(H, 0.45, 0.64)); // chosen from the orbit, moves to centre/front
        const open = ease(seg(H, 0.75, 0.86)); // lid swings on its hinge
        const rise = ease(seg(H, 0.86, 1)); // bullet rises
        const close = ease(seg(Q, 0.78, 0.88)); // closing sequence on the final section
        const shut = ease(seg(Q, 0.88, 0.98));
        x = lerp(x, 0, sel) + Math.sin(Q * TAU) * amp;
        y = lerp(y, -0.05, sel) + Math.sin(state.clock.elapsedTime * 1.2) * 0.05 * sel;
        z = lerp(z, 1.4, sel);
        sca = lerp(sca, fs * (1 + 0.05 * rise), sel);
        rz = lerp(rz, 0, sel) + Math.sin(Q * TAU) * -0.22;
        rxr = lerp(rxr, 0, sel) - pointer.y * 0.12 * sel;
        ryr = Q * 3 * TAU + pointer.x * 0.3 * sel;

        const capOpen = open * (1 - shut);
        refs[0].hinge.current?.rotation.set(-capOpen * lerp(1.05, 0.55, k), 0, -capOpen * lerp(0.9, 1.45, k));
        const b = refs[0].bullet.current;
        if (b) b.position.y = lerp(-0.65, 0.5, rise * (1 - close));

        if (picked.current) featuredMat.color.lerp(picked.current, 1 - Math.exp(-8 * dt));
        else {
          const t = seg(Q, 0.5, 0.85) * (SHADES.length - 1);
          const n = Math.min(Math.floor(t), SHADES.length - 2);
          featuredMat.color.lerpColors(SHADES[n], SHADES[n + 1], ease(t - n));
        }
      }

      g.position.set(x, y, z);
      g.rotation.set(rxr, ryr, rz);
      g.scale.set(sca, sca * J.len[i], sca);
    }
  });

  return (
    <group ref={orbit}>
      {refs.slice(0, count - 4).map((r, i) => (
        <Lipstick key={i} r={r} capMat={CAPS[i % CAPS.length]} bulletMat={i === 0 ? featuredMat : SPARE_BULLET} />
      ))}
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 8], fov: 35 }} gl={{ alpha: true, antialias: true }}>
      {/* distance fog = depth: far products fall into the dark red, near ones stay sharp */}
      <fog attach="fog" args={["#3a060b", 9, 17]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={2} color="#ffe2b8" />
      <directionalLight position={[-4, 2, -3]} intensity={1.4} color="#ff7a5a" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={4} position={[-4, 2, 3]} scale={[3, 6, 1]} color="#fff1dc" />
        <Lightformer form="rect" intensity={3} position={[4, 0, -3]} scale={[2, 6, 1]} color="#ff5a4a" />
        <Lightformer form="ring" intensity={2} position={[0, 5, 0]} scale={4} color="#ffffff" />
      </Environment>
      <Collection />
    </Canvas>
  );
}
