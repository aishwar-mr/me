import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  ADDITIONAL,
  CERTIFICATIONS,
  EXPERIENCE,
  EXPERIENCE_ORDER,
  HONORS,
} from "@/data/portfolio";
import { EASE } from "@/motion";

const GROUPS = ["Corporate", "Community-led / Collegiate", "Education"];

function OrgMark({ org, logo }) {
  if (logo)
    return (
      <img
        src={logo}
        alt={`${org} logo`}
        className="h-10 w-10 shrink-0 border border-ink/10 bg-white object-contain p-1"
      />
    );
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink/15 bg-white/60 text-xs font-bold text-ink/70">
      {org.slice(0, 1)}
    </span>
  );
}

function Fade({ children, i = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
    >
      {children}
    </motion.div>
  );
}

export default function ExperiencePage() {
  return (
    <main className="relative px-6 pb-28 pt-32 sm:px-10 lg:px-16">
      <header>
        <p className="label">Experience</p>
        <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
          Background, in full<span className="text-vermilion">.</span>
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">
          Every role, every org, click through for the detail — dates, scope,
          and what shipped.
        </p>
      </header>

      {GROUPS.map((group) => (
        <section key={group} className="mt-16" data-testid={`exp-group-${group.split(" ")[0].toLowerCase()}`}>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {group}
          </h2>
          <ul className="mt-6">
            {EXPERIENCE.filter((e) => e.group === group).map((e) => (
              <Fade key={e.slug}>
                <li className="border-t border-ink/15 last:border-b">
                  <Link
                    to={`/experience/${e.slug}`}
                    data-testid={`exp-link-${e.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 sm:gap-6 md:grid-cols-[3rem_10rem_1fr_auto] md:gap-8"
                  >
                    <span className="hidden text-xs tabular-nums text-ink/40 md:block">
                      {String(EXPERIENCE_ORDER.indexOf(e.slug) + 1).padStart(2, "0")}
                    </span>
                    <OrgMark org={e.org} logo={e.logo} />
                    <span>
                      <span className="block font-display text-xl font-bold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1.5 sm:text-2xl">
                        {e.role}
                      </span>
                      <span className="mt-1 block text-sm text-ink/55">
                        {e.org}
                        {e.location ? ` · ${e.location}` : ""}
                      </span>
                    </span>
                    <span className="flex items-center gap-4 justify-self-end">
                      <span className="hidden text-xs uppercase tracking-[0.15em] text-ink/50 sm:block">
                        {e.period}
                      </span>
                      <ArrowRight
                        size={18}
                        className="text-ink/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-vermilion"
                      />
                    </span>
                  </Link>
                </li>
              </Fade>
            ))}
          </ul>
        </section>
      ))}

      <section className="mt-16" data-testid="exp-honors">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Competitions &amp; honors
        </h2>
        <ul className="mt-6">
          {HONORS.map((h) => (
            <Fade key={h.title}>
              <li className="border-t border-ink/15 last:border-b">
                {h.url ? (
                  <a
                    href={h.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 py-6"
                  >
                    <span>
                      <span className="block font-semibold text-ink">
                        {h.title}
                      </span>
                      <span className="mt-1 block text-sm text-ink/55">{h.sub}</span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="ml-auto shrink-0 text-ink/35 transition-colors duration-300 group-hover:text-vermilion"
                    />
                  </a>
                ) : (
                  <div className="py-6">
                    <span className="block font-semibold text-ink">{h.title}</span>
                    <span className="mt-1 block text-sm text-ink/55">{h.sub}</span>
                  </div>
                )}
              </li>
            </Fade>
          ))}
        </ul>
      </section>

      <section className="mt-16" data-testid="exp-certifications">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Certifications
        </h2>
        <ul className="mt-6">
          {CERTIFICATIONS.map((c) => (
            <Fade key={c.name}>
              <li className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-ink/15 last:border-b">
                <span className="py-6">
                  <span className="block font-semibold text-ink">{c.name}</span>
                  <span className="mt-1 block text-sm text-ink/55">
                    {c.issuer} · {c.date}
                  </span>
                </span>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`cert-view-${c.issuer.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-vermilion hover:underline"
                >
                  View <ArrowUpRight size={13} />
                </a>
              </li>
            </Fade>
          ))}
        </ul>
      </section>

      <section className="mt-16" data-testid="exp-additional">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Additional
        </h2>
        <dl className="mt-6">
          {ADDITIONAL.map((a) => (
            <Fade key={a.k}>
              <div className="grid gap-1 border-t border-ink/15 py-6 last:border-b md:grid-cols-[10rem_1fr] md:gap-8">
                <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
                  {a.k}
                </dt>
                <dd className="leading-relaxed text-ink/75">{a.v}</dd>
              </div>
            </Fade>
          ))}
        </dl>
      </section>
    </main>
  );
}
