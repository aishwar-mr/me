import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DAY } from "@/content";
import { EASE } from "@/motion";

function DayCard({ item, i }) {
  const id = item.time.replace(":", "");
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
      data-testid={`how-i-work-card-${id}`}
      className="relative flex h-full flex-col border border-ink/15 p-5 lg:border-0 lg:border-t lg:p-0 lg:pt-6"
    >
      <span className="h-2 w-2 rounded-full bg-ink lg:absolute lg:-top-px lg:-translate-y-1/2" />
      <div className="mt-3 flex items-baseline justify-between gap-3 lg:mt-0">
        <span className="text-xs tabular-nums tracking-[0.15em] text-ink/60">
          {item.time}
        </span>
      </div>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-vermilion">
        {item.tag}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink/80">{item.text}</p>
      <a
        href="#proof"
        data-testid={`how-i-work-link-${id}`}
        className="group mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-ink/50 transition-colors duration-300 hover:text-ink lg:mt-auto lg:pt-6"
      >
        See the proof
        <ArrowUpRight
          size={14}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </motion.article>
  );
}

export function HowIWork() {
  return (
    <section
      id="how-i-work"
      data-testid="how-i-work-section"
      className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <header className="mb-14">
        <p className="label">How I work</p>
        <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          A typical day across functions<span className="text-vermilion">.</span>
        </h2>
      </header>
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 hidden h-px bg-ink/15 lg:block"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {DAY.items.map((item, i) => (
            <DayCard key={item.time} item={item} i={i} />
          ))}
        </div>
      </div>
      <p
        data-testid="how-i-work-footer"
        className="mt-14 max-w-xl text-lg font-medium leading-relaxed text-ink sm:text-xl"
      >
        <span className="text-vermilion">&mdash;</span> {DAY.footer}
      </p>
    </section>
  );
}
