import { motion } from "framer-motion";
import { EASE } from "@/motion";
import { HERO } from "@/content";
import portrait from "@/assets/info/portrait.jpg";

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

// The split stage: Aishwar's own portrait stays fixed in view (the "one
// person") while the reading column plays out every room he works in. The
// striped band is the hero blueprint's one ornament, standing in for a
// printed letterhead rule rather than any literal awning or label.
export function Hero() {
  return (
    <section
      id="top"
      data-testid="hero"
      className="grid min-h-svh grid-cols-1 lg:grid-cols-2"
    >
      <div className="relative h-[48svh] overflow-hidden lg:sticky lg:top-0 lg:h-svh lg:order-2">
        <img
          src={portrait}
          alt="Aishwar Mishra"
          className="h-full w-full rounded-b-2xl object-cover lg:rounded-b-none lg:rounded-l-2xl"
        />
      </div>

      <div className="-mt-6 flex flex-col justify-center rounded-t-2xl bg-paper px-6 py-14 sm:px-10 lg:order-1 lg:mt-0 lg:rounded-none lg:px-16 lg:py-24">
        <div
          aria-hidden="true"
          className="mb-8 flex h-7 w-full max-w-[280px] overflow-hidden rounded-sm"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className={`h-full flex-1 ${i % 2 === 0 ? "bg-ink" : "bg-vermilion"}`}
            />
          ))}
        </div>

        <h1
          data-testid="hero-title"
          className="font-display text-[clamp(2.5rem,3.6vw+1.8rem,3.5rem)] font-normal leading-[0.98] tracking-[-0.02em] text-ink"
        >
          <RevealLine index={0}>{HERO.lines[0]}</RevealLine>
          <RevealLine index={1}>
            {HERO.lines[1].replace(".", "")}
            <span className="text-vermilion">.</span>
          </RevealLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          data-testid="hero-sub"
          className="mt-6 max-w-[36ch] font-text text-[17px] leading-relaxed text-ink/80"
        >
          {HERO.sub}
        </motion.p>

        <motion.a
          href="#proof"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
          data-testid="hero-cta"
          className="mt-8 inline-flex w-fit items-center rounded-2xl bg-ink px-6 py-3 font-text text-sm font-semibold text-paper transition-colors duration-300 hover:bg-vermilion"
        >
          See the proof
        </motion.a>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          data-testid="hero-meta"
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-text text-sm text-ink/70"
        >
          {HERO.meta.map((m) => (
            <div key={m.k} className="flex items-baseline gap-1.5">
              <dt>{m.k}:</dt>
              <dd className="font-semibold text-ink">{m.v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
