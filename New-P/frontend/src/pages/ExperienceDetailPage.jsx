import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { EXPERIENCE, EXPERIENCE_ORDER } from "@/data/portfolio";
import { EASE } from "@/motion";

export default function ExperienceDetailPage() {
  const { slug } = useParams();
  const entry = EXPERIENCE.find((e) => e.slug === slug);
  if (!entry) return <Navigate to="/experience" replace />;

  const idx = EXPERIENCE_ORDER.indexOf(slug);
  const prev = idx > 0 ? EXPERIENCE.find((e) => e.slug === EXPERIENCE_ORDER[idx - 1]) : null;
  const next =
    idx < EXPERIENCE_ORDER.length - 1
      ? EXPERIENCE.find((e) => e.slug === EXPERIENCE_ORDER[idx + 1])
      : null;

  return (
    <main className="relative px-6 pb-28 pt-32 sm:px-10 lg:px-16" data-testid="experience-detail">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="max-w-3xl"
      >
        <Link
          to="/experience"
          data-testid="detail-back"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink/50 transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} /> Experience
        </Link>
        <p className="label mt-8">{entry.group}</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {entry.role}
          <span className="text-vermilion">.</span>
        </h1>

        <dl className="mt-8 border-t border-ink/15">
          {[
            ["Org", entry.org],
            ["Period", entry.period + (entry.extra ? ` · ${entry.extra}` : "")],
            entry.location ? ["Location", entry.location] : null,
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

        <div className="mt-8 flex items-center gap-4">
          {entry.logo && (
            <img
              src={entry.logo}
              alt={`${entry.org} logo`}
              className="h-14 w-14 border border-ink/10 bg-white object-contain p-1.5"
            />
          )}
          {entry.orgUrl && (
            <a
              href={entry.orgUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="detail-org-link"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 text-sm text-ink transition-colors duration-300 hover:border-vermilion hover:text-vermilion"
            >
              Visit {entry.org.split(" — ")[0]} <ArrowUpRight size={15} />
            </a>
          )}
        </div>

        <div className="mt-10">
          {entry.pending ? (
            <p className="text-lg italic text-ink/50" data-testid="detail-pending">
              {entry.pending}
            </p>
          ) : (
            <ul className="space-y-5">
              {entry.bullets.map((b, i) => (
                <li key={i} className="flex gap-4 leading-relaxed text-ink/80">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vermilion" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav className="mt-20 grid gap-3 border-t border-ink/15 pt-6 text-sm sm:grid-cols-3">
          <div>
            {prev && (
              <Link
                to={`/experience/${prev.slug}`}
                data-testid="detail-prev"
                className="inline-flex items-center gap-2 text-ink/60 transition-colors hover:text-ink"
              >
                <ArrowLeft size={14} /> {prev.role}
              </Link>
            )}
          </div>
          <Link
            to="/experience"
            className="text-center text-xs uppercase tracking-[0.25em] text-ink/50 hover:text-ink"
          >
            All experience
          </Link>
          <div className="sm:text-right">
            {next && (
              <Link
                to={`/experience/${next.slug}`}
                data-testid="detail-next"
                className="inline-flex items-center gap-2 text-ink/60 transition-colors hover:text-ink"
              >
                {next.role} <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </nav>
      </motion.div>
    </main>
  );
}
