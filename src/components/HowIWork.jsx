import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DAY } from "@/content";
import { EASE } from "@/motion";

// Design rule for this strip: the accent colour appears on the function tags
// and nowhere else, so the day reads as calm and organised.
function DayCard({ item, i }) {
  const id = item.time.replace(":", "");
  const external = item.href.startsWith("http");

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
      data-testid={`how-i-work-card-${id}`}
      className="relative flex flex-col border border-ink/15 p-5 lg:border-0 lg:p-0 lg:pt-8"
    >
      {/* Timeline node, sitting on the horizontal rule on desktop */}
      <span
        aria-hidden="true"
        className="hidden h-2 w-2 rounded-full bg-ink lg:absolute lg:top-0 lg:block lg:-translate-y-1/2"
      />
      <time className="text-xs tabular-nums tracking-[0.15em] text-ink/70">{item.time}</time>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-vermilion-text">
        {item.tag}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink/80">{item.text}</p>
      <a
        href={item.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={`Case study: ${item.caseStudy}`}
        title={item.caseStudy}
        data-testid={`how-i-work-link-${id}`}
        className="group mt-5 inline-flex h-9 w-9 items-center justify-center self-start rounded-full border border-ink/20 text-ink/70 transition-colors duration-300 hover:border-ink hover:text-ink lg:mt-auto"
      >
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </motion.li>
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
          {DAY.heading}.
        </h2>
      </header>
      <div className="relative">
        {/* Horizontal timeline rule (desktop only) */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 hidden h-px bg-ink/15 lg:block"
        />
        <ol className="flex flex-col gap-4 lg:grid lg:grid-cols-6 lg:gap-6">
          {DAY.items.map((item, i) => (
            <DayCard key={item.time} item={item} i={i} />
          ))}
        </ol>
      </div>
      <p
        data-testid="how-i-work-footer"
        className="mt-14 max-w-xl text-lg font-medium leading-relaxed text-ink sm:text-xl"
      >
        {DAY.footer}
      </p>
    </section>
  );
}
