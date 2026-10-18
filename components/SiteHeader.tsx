"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-[4vw] md:px-[5vw] py-6">
      <Link href="/" className="text-sm font-medium tracking-wide">
        Aishwar
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-xs uppercase tracking-widest text-text transition-colors hover:text-text-muted"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden text-xs uppercase tracking-widest"
      >
        {open ? "Close" : "Menu"}
      </button>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-dark-bg transition-opacity duration-300 ease-out md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {navLinks.map((link, index) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-3xl font-semibold uppercase tracking-wide text-white transition-all duration-300 ease-out"
            style={{
              transitionDelay: open ? `${index * 60}ms` : "0ms",
              transform: open ? "translateY(0)" : "translateY(12px)",
              opacity: open ? 1 : 0,
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
