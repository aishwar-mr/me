import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { WORK, WORK_ORDER } from "@/data/portfolio";
import { EASE } from "@/motion";

export default function WorkDetailPage() {
  const { slug } = useParams();
  const entry = WORK.find((w) => w.slug === slug);
  if (!entry) return <Navigate to="/work" replace />;

  const idx = WORK_ORDER.indexOf(slug);
  const prev = idx > 0 ? WORK.find((w) => w.slug === WORK_ORDER[idx - 1]) : null;
  const next = idx < WORK_ORDER.length - 1 ? WORK.find((w) => w.slug === WORK_ORDER[idx + 1]) : null;

  return (
    <main className="relative px-6 pb-28 pt-32 sm:px-10 lg:px-16" data-testid="work-detail">
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="max-w-3xl"
      >
        <Link
          to="/work"
          data-testid="detail-back"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink/50 transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} /> Work
        </Link>
        <p className="label mt-8">{entry.category}</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {entry.title}
          <span className="text-vermilion">.</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/75">{entry.blurb}</p>

        <dl className="mt-8 border-t border-ink/15">
          {[
            ["Year", entry.year],
            ["Role", entry.role],
            entry.status ? ["Status", entry.status] : null,
          ]
            .filter(Boolean)
            .map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[6rem_1fr] gap-4 border-b border-ink/10 py-3 text-sm"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
                  {k}
                </dt>
                <dd className="text-ink/80">{v}</dd>
              </div>
            ))}
        </dl>

        {entry.image ? (
          <img
            src={entry.image}
            alt={entry.imageAlt || entry.title}
            className="mt-10 w-full border border-ink/10"
          />
        ) : (
          <div className="mt-10 flex items-center justify-center border border-ink/15 bg-ink/[0.04] p-10 text-center text-sm italic text-ink/50">
            {entry.imageNote}
          </div>
        )}

        {entry.sections.map((s) => (
          <section key={s.heading} className="mt-12">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              {s.heading}
            </h2>
            {s.text && (
              <p className="mt-4 leading-relaxed text-ink/75">{s.text}</p>
            )}
            {s.bullets && (
              <ul className="mt-4 space-y-3">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex gap-4 leading-relaxed text-ink/75">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vermilion" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {s.image && (
              <figure className="mt-6">
                <img
                  src={s.image}
                  alt={s.imageCaption || ""}
                  className="w-full border border-ink/10"
                />
                {s.imageCaption && (
                  <figcaption className="mt-2 text-xs italic text-ink/50">
                    {s.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}
            {s.links && (
              <ul className="mt-5 space-y-3">
                {s.links.map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start gap-4 border border-ink/15 p-5 transition-colors duration-300 hover:border-ink/40"
                    >
                      <span>
                        <span className="block font-semibold text-ink">
                          {l.title}
                        </span>
                        <span className="mt-1 block text-sm text-ink/60">
                          {l.desc}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="ml-auto shrink-0 text-ink/40 transition-colors duration-300 group-hover:text-vermilion"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <nav className="mt-20 grid gap-3 border-t border-ink/15 pt-6 text-sm sm:grid-cols-3">
          <div>
            {prev && (
              <Link
                to={`/work/${prev.slug}`}
                data-testid="detail-prev"
                className="inline-flex items-center gap-2 text-ink/60 transition-colors hover:text-ink"
              >
                <ArrowLeft size={14} /> {prev.title}
              </Link>
            )}
          </div>
          <Link
            to="/work"
            className="text-center text-xs uppercase tracking-[0.25em] text-ink/50 hover:text-ink"
          >
            All work
          </Link>
          <div className="sm:text-right">
            {next && (
              <Link
                to={`/work/${next.slug}`}
                data-testid="detail-next"
                className="inline-flex items-center gap-2 text-ink/60 transition-colors hover:text-ink"
              >
                {next.title} <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </nav>
      </motion.article>
    </main>
  );
}
