"use client";

import { site } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SiteFooter() {
  const reducedMotion = useReducedMotion();

  return (
    <footer className="flex flex-col items-center gap-4 border-t border-border px-[4vw] py-10 text-[11px] uppercase tracking-widest text-text-muted md:flex-row md:justify-between">
      <span>
        {site.lastName ? `${site.firstName} ${site.lastName}` : site.firstName} © {new Date().getFullYear()}
      </span>
      <div className="flex gap-6">
        <a href={site.socials.linkedin} className="hover:text-text">
          LinkedIn
        </a>
        <a href={`mailto:${site.email}`} className="hover:text-text">
          Email
        </a>
      </div>
      <button
        type="button"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })
        }
        className="hover:text-text"
      >
        Back to top
      </button>
    </footer>
  );
}
