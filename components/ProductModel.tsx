"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { G, gold } from "./Model";

function LipstickCard({ hex }: { hex: string }) {
  const root = useRef<THREE.Group>(null);
  const bulletMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: hex, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.2 }),
    [hex]
  );
  const capMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#1a0a0c", metalness: 0.5, roughness: 0.15, clearcoat: 1 }),
    []
  );

  useFrame((state) => {
    if (root.current) {
      root.current.rotation.y = state.clock.elapsedTime * 0.2;
      root.current.position.y = -0.4 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <group ref={root} position={[0, -0.4, 0]} scale={1.2}>
      <mesh geometry={G.base} material={capMat} position={[0, -0.6, 0]} />
      <mesh geometry={G.ring} material={gold} position={[0, -1.2, 0]} />
      <mesh geometry={G.sleeve} material={gold} position={[0, 0.35, 0]} />
      <mesh geometry={G.bullet} material={bulletMat} position={[0, 0.4, 0]} />
    </group>
  );
}

export default function ProductModel({ hex }: { hex: string }) {
  return (
    <div className="lip" aria-hidden="true" style={{ height: "300px", width: "100%", margin: "0 auto" }}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 40 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={2} color="#ffe2b8" />
        <directionalLight position={[-4, 2, -3]} intensity={1.4} color="#ff7a5a" />
        <Environment resolution={64}>
          <Lightformer form="rect" intensity={4} position={[-4, 2, 3]} scale={[3, 6, 1]} color="#fff1dc" />
          <Lightformer form="rect" intensity={3} position={[4, 0, -3]} scale={[2, 6, 1]} color="#ff5a4a" />
          <Lightformer form="ring" intensity={2} position={[0, 5, 0]} scale={4} color="#ffffff" />
        </Environment>
        <LipstickCard hex={hex} />
      </Canvas>
    </div>
  );
}
