"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks, site } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const socials = [
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "GitHub", href: site.socials.github },
    { label: "X", href: site.socials.x },
  ];

  return (
    <>
      <header
        className={`absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-[4vw] md:px-[5vw] py-6 ${
          open ? "text-white" : ""
        }`}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-sm font-medium tracking-wide"
        >
          Aishwar
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        inert={!open}
        onPointerMove={(event) =>
          setCursor((prev) => ({ ...prev, x: event.clientX, y: event.clientY }))
        }
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-dark-bg px-[4vw] transition-opacity duration-300 ease-out md:gap-10 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {!reducedMotion && (
          <div
            aria-hidden
            className={`pointer-events-none fixed top-0 left-0 h-16 w-16 rounded-full border border-white/50 transition-[transform,opacity,scale] duration-300 ease-out ${
              cursor.active ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
            style={{
              transform: `translate(${cursor.x - 32}px, ${cursor.y - 32}px)`,
              transitionDuration: "250ms, 300ms, 300ms",
            }}
          />
        )}

        {navLinks.map((link, index) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setOpen(false)}
            onPointerEnter={() => setCursor((prev) => ({ ...prev, active: true }))}
            onPointerLeave={() => setCursor((prev) => ({ ...prev, active: false }))}
            className="block text-[clamp(2.5rem,8vw,6rem)] font-semibold uppercase leading-none tracking-tight text-white transition-all duration-300 ease-out hover:opacity-60 focus-visible:opacity-60"
            style={{
              transitionDelay: open ? `${index * 70}ms` : "0ms",
              transform: open ? "translateY(0)" : "translateY(14px)",
              opacity: open ? 1 : 0,
            }}
          >
            {link.label}
          </Link>
        ))}

        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 px-[4vw] text-[11px] uppercase tracking-widest text-white/60 md:flex-row md:justify-between">
          <a href={`mailto:${site.email}`} className="hover:text-white">
            {site.email}
          </a>
          <div className="flex gap-4">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="hover:text-white">
                {s.label}
              </a>
            ))}
          </div>
          <span>{site.phone}</span>
        </div>
      </div>
    </>
  );
}
