"use client";
import { useState } from "react";

type Shade = { name: string; c: string };

export default function ShadePicker({ shades }: { shades: Shade[] }) {
  const [active, setActive] = useState<number | null>(null);

  const pick = (i: number) => {
    setActive(i);
    window.dispatchEvent(new CustomEvent("shade", { detail: shades[i].c }));
  };

  return (
    <ul className="shades">
      {shades.map((s, i) => (
        <li key={s.name}>
          <button type="button" aria-pressed={active === i} aria-label={`${s.name} shade`} onClick={() => pick(i)}>
            <i style={{ background: s.c }} />
            {s.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
