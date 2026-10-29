import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";

// Shared intro header for inner pages (Experience, Work, Story, detail
// pages): a back link, a label, a display heading and an optional lede.
export function PageHero({ backTo, backLabel, label, title, lede, meta }) {
  return (
    <section className="px-6 pb-12 pt-32 sm:px-10 lg:px-16 lg:pb-16">
      <Reveal>
        {backTo && (
          <Link
            to={backTo}
            className="mb-8 inline-block text-xs uppercase tracking-[0.25em] text-ink/70 transition-colors duration-300 hover:text-ink"
          >
            ← {backLabel}
          </Link>
        )}
        <p className="label">{label}</p>
        <h1 className="mt-4 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.02em] text-ink">
          {title}
          <span className="text-vermilion">.</span>
        </h1>
        {lede && <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">{lede}</p>}
        {meta && (
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-ink/70">
            {meta.map(([k, v]) => (
              <span key={k}>
                {k} — {v}
              </span>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
