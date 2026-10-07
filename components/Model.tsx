"use client";
import * as THREE from "three";

export const G = {
  base: new THREE.CylinderGeometry(0.5, 0.5, 1.6, 48),
  ring: new THREE.CylinderGeometry(0.51, 0.51, 0.14, 48),
  sleeve: new THREE.CylinderGeometry(0.46, 0.46, 0.3, 48),
  cap: new THREE.CylinderGeometry(0.55, 0.55, 2.2, 48).translate(0, 1.1, 0),
  capRing: new THREE.CylinderGeometry(0.56, 0.56, 0.14, 48),
  bullet: (() => {
    const g = new THREE.CylinderGeometry(0.4, 0.4, 1.2, 48, 8).translate(0, 0.6, 0);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) if (pos.getY(i) > 1.19) pos.setY(i, pos.getY(i) + pos.getX(i) * 0.5);
    g.computeVertexNormals();
    return g;
  })(),
};

export const gold = new THREE.MeshStandardMaterial({ color: "#c9a26b", metalness: 1, roughness: 0.22 });
export const glossy = (c: string) => new THREE.MeshPhysicalMaterial({ color: c, metalness: 0.5, roughness: 0.15, clearcoat: 1 });
export const metal = (c: string, r: number) => new THREE.MeshStandardMaterial({ color: c, metalness: 1, roughness: r });

export const CAPS = [
  glossy("#1a0a0c"), glossy("#3a0a12"), metal("#b88a52", 0.3), glossy("#2b1511"), glossy("#12090a"),
  glossy("#4a1018"), metal("#d8b27a", 0.25), glossy("#1f0d10"), glossy("#5a2a1c"),
];

export const SPARE_BULLET = new THREE.MeshPhysicalMaterial({ color: "#7a0f19", roughness: 0.3, clearcoat: 1 });
