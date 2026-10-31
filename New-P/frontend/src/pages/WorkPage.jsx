import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { WORK } from "@/data/portfolio";
import { EASE } from "@/motion";

export default function WorkPage() {
  return (
    <main className="relative px-6 pb-28 pt-32 sm:px-10 lg:px-16" data-testid="work-page">
      <header>
        <p className="label">Work</p>
        <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
          Projects &amp; breakdowns<span className="text-vermilion">.</span>
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">
          Hackathon builds, product teardowns and the odd piece of writing —
          open one for the full story.
        </p>
      </header>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {WORK.map((w, i) => (
          <motion.div
            key={w.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.08 }}
          >
            <Link
              to={`/work/${w.slug}`}
              data-testid={`work-link-${w.slug}`}
              className="group block border border-ink/15 transition-colors duration-300 hover:border-ink/40"
            >
              {w.image ? (
                <img
                  src={w.image}
                  alt={w.imageAlt || w.title}
                  className="h-56 w-full border-b border-ink/10 object-cover"
                />
              ) : (
                <div className="flex h-56 items-center justify-center border-b border-ink/10 bg-ink/[0.04] p-8 text-center text-sm italic text-ink/50">
                  {w.imageNote}
                </div>
              )}
              <div className="p-6">
                <p className="label">{w.category}</p>
                <p className="mt-3 flex items-center justify-between gap-4 font-display text-2xl font-extrabold tracking-tight text-ink">
                  {w.title}
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-ink/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-vermilion"
                  />
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{w.blurb}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
