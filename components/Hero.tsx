"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { site } from "@/lib/content";
import { HeroCollage } from "./HeroCollage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative h-[220vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-[4vw]">
        <HeroCollage scrollYProgress={scrollYProgress} />

        <div className="relative z-10 overflow-hidden">
          <h1
            className="text-center text-[clamp(3.5rem,11vw,9rem)] font-bold uppercase leading-[0.9] tracking-tight transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: visible ? "translateY(0%)" : "translateY(110%)" }}
          >
            {site.firstName}
          </h1>
        </div>

        <div
          className={`relative z-10 mt-6 flex flex-col items-center gap-1 text-center transition-all delay-300 duration-700 ease-out md:flex-row md:items-end md:justify-between md:text-left ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-text-muted">
            {site.tagline}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-text-muted">
            © {new Date().getFullYear()}
          </span>
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-10 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-border"
          style={reducedMotion ? { opacity: 1 } : { opacity: scrollCueOpacity }}
        >
          <span className="block h-2 w-2 translate-y-[-2px] animate-bounce rounded-full bg-text" />
        </motion.div>
      </div>
    </section>
  );
}
