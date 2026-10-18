"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { navLinks, site } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "./Reveal";

export function FullScreenNav() {
  const sectionRef = useRef<HTMLElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  const reducedMotion = useReducedMotion();

  const handlePointerMove = (event: React.PointerEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor((prev) => ({
      ...prev,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }));
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-dark-bg px-[4vw] py-24 text-white md:gap-10"
    >
      {!reducedMotion && (
        <div
          aria-hidden
          className={`pointer-events-none absolute top-0 left-0 h-16 w-16 rounded-full border border-white/50 transition-[transform,opacity,scale] duration-300 ease-out ${
            cursor.active ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
          style={{
            transform: `translate(${cursor.x - 32}px, ${cursor.y - 32}px)`,
            transitionDuration: "250ms, 300ms, 300ms",
          }}
        />
      )}

      {navLinks.map((link, index) => (
        <Reveal key={link.label} delayMs={index * 100}>
          <Link
            href={link.href}
            onPointerEnter={() => setCursor((prev) => ({ ...prev, active: true }))}
            onPointerLeave={() => setCursor((prev) => ({ ...prev, active: false }))}
            className="block text-[clamp(2.5rem,8vw,6rem)] font-semibold uppercase leading-none tracking-tight text-white transition-opacity hover:opacity-60 focus-visible:opacity-60"
          >
            {link.label}
          </Link>
        </Reveal>
      ))}

      <div className="absolute bottom-10 flex w-full flex-col items-center gap-1 px-[4vw] text-[11px] uppercase tracking-widest text-white/60 md:flex-row md:justify-between">
        <a href={`mailto:${site.email}`} className="hover:text-white">
          {site.email}
        </a>
        <span>{site.phone}</span>
      </div>
    </section>
  );
}
