import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { OrgLogo } from "@/components/OrgLogo";
import {
  ADDITIONAL,
  CERTIFICATIONS,
  EXPERIENCE,
  EXPERIENCE_GROUPS,
  HONORS,
} from "@/data/background";

function ExperienceRow({ entry, index }) {
  return (
    <Reveal delay={index * 0.05} as="li">
      <Link
        to={`/experience/${entry.slug}`}
        data-testid={`experience-row-${entry.slug}`}
        className="group block border-t border-ink/15 py-6 first:border-t-0"
      >
        <div className="flex items-start gap-4 sm:gap-6">
          <OrgLogo organisation={entry.organisation} logo={entry.logo} />
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-lg font-bold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-xl">
                {entry.title}
              </h3>
              <span className="text-xs uppercase tracking-[0.15em] text-ink/70">
                {entry.period}
                {entry.note ? ` · ${entry.note}` : ""}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink/70">
              {entry.organisation}
              {entry.team ? ` — ${entry.team}` : ""}
              {entry.location ? ` · ${entry.location}` : ""}
            </p>
          </div>
          <ArrowUpRight
            size={16}
            className="mt-1 hidden shrink-0 text-ink/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink sm:block"
          />
        </div>
      </Link>
    </Reveal>
  );
}

export function Experience() {
  return (
    <>
      <PageHero
        backTo="/"
        backLabel="Home"
        label="Experience"
        title="Background, in full"
        lede="Every role, every org, click through for the detail — dates, scope, and what shipped."
      />

      <section className="px-6 pb-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          {EXPERIENCE_GROUPS.map((group) => {
            const entries = EXPERIENCE.filter((e) => e.group === group);
            if (entries.length === 0) return null;
            return (
              <div key={group} className="mt-14 first:mt-0">
                <Reveal>
                  <h2 className="label">{group}</h2>
                </Reveal>
                <ul className="mt-4">
                  {entries.map((entry, i) => (
                    <ExperienceRow key={entry.slug} entry={entry} index={i} />
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="mt-16">
            <Reveal>
              <h2 className="label">Competitions &amp; honors</h2>
            </Reveal>
            <ul className="mt-4 divide-y divide-ink/15 border-t border-ink/15">
              {HONORS.map((honor, i) => (
                <Reveal as="li" key={honor.title} delay={i * 0.05} className="py-5">
                  <p className="text-base font-semibold text-ink">
                    {honor.href ? (
                      <a
                        href={honor.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-vermilion"
                      >
                        {honor.title}
                      </a>
                    ) : (
                      honor.title
                    )}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{honor.detail}</p>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <Reveal>
              <h2 className="label">Certifications</h2>
            </Reveal>
            <ul className="mt-4 divide-y divide-ink/15 border-t border-ink/15">
              {CERTIFICATIONS.map((cert, i) => (
                <Reveal
                  as="li"
                  key={cert.title}
                  delay={i * 0.05}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-5"
                >
                  <div>
                    <p className="text-base font-semibold text-ink">{cert.title}</p>
                    <p className="mt-1 text-sm text-ink/70">
                      {cert.issuer} ·{" "}
                      <a
                        href={cert.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-vermilion"
                      >
                        View <ArrowUpRight size={12} className="inline" />
                      </a>
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.15em] text-ink/70">{cert.date}</span>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <Reveal>
              <h2 className="label">Additional</h2>
            </Reveal>
            <dl className="mt-4 divide-y divide-ink/15 border-t border-ink/15">
              {ADDITIONAL.map((row, i) => (
                <Reveal
                  as="div"
                  key={row.label}
                  delay={i * 0.05}
                  className="grid gap-1 py-5 sm:grid-cols-[180px_1fr] sm:gap-8"
                >
                  <dt className="text-xs uppercase tracking-[0.15em] text-ink/70">{row.label}</dt>
                  <dd className="text-sm leading-relaxed text-ink/70">{row.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
