import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/motion";
import { HERO } from "@/content";

function RevealLine({ children, index }) {
  return (
    <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 + index * 0.13 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const metaY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      id="top"
      data-testid="hero"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-14 pt-32 sm:px-10 lg:px-16"
    >
      <motion.div style={{ y: titleY }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-ink/70 sm:text-sm"
        >
          <span
            data-testid="hero-status-dot"
            className="inline-block h-2 w-2 rounded-full bg-vermilion"
          />
          {HERO.eyebrowName} — {HERO.eyebrowRole}
        </motion.p>
        <h1
          data-testid="hero-title"
          className="font-display text-[clamp(3.2rem,11vw,10.5rem)] font-extrabold leading-[0.94] tracking-[-0.03em] text-ink"
        >
          <RevealLine index={0}>{HERO.lines[0]}</RevealLine>
          <RevealLine index={1}>
            {HERO.lines[1].replace(".", "")}
            <span className="text-vermilion">.</span>
          </RevealLine>
        </h1>
      </motion.div>

      <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
          className="max-w-xl"
        >
          <p
            data-testid="hero-sub"
            className="text-base leading-relaxed text-ink/70 sm:text-lg"
          >
            {HERO.sub}
          </p>
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-ink/70">
            Scroll for the proof &darr;
          </p>
        </motion.div>
        <motion.dl
          style={{ y: metaY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          data-testid="hero-meta"
          className="grid grid-cols-3 gap-6 border-t border-ink/15 pt-5 sm:gap-10 md:text-right"
        >
          {HERO.meta.map((m) => (
            <div key={m.k}>
              <dt className="text-[10px] uppercase tracking-[0.25em] text-ink/70">
                {m.k}
              </dt>
              <dd className="mt-1 text-sm font-medium text-ink">{m.v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
