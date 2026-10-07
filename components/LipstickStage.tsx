"use client";
import dynamic from "next/dynamic";

// WebGL is client-only; the page's text stays server-rendered for SEO.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function LipstickStage() {
  return (
    <div className="stage" aria-hidden="true">
      <Scene />
    </div>
  );
}
