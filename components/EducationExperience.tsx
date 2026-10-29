import Image from "next/image";
import {
  additionalInfo,
  certifications,
  community,
  education,
  experience,
  honors,
} from "@/lib/content";
import type { TimelineEntry } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

function OrgMark({ entry }: { entry: TimelineEntry }) {
  const initials = entry.organisation
    .replace(/\(.*\)/, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-white">
      {entry.logo ? (
        <Image
          src={entry.logo}
          alt={`${entry.organisation} logo`}
          sizes="48px"
          className="size-full object-contain p-1.5"
        />
      ) : (
        <span aria-hidden className="text-sm font-semibold tracking-tight text-text-muted">
          {initials}
        </span>
      )}
    </div>
  );
}

function Group({ heading, entries }: { heading: string; entries: TimelineEntry[] }) {
  return (
    <div className="mt-14 first:mt-0">
      <Reveal>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest">{heading}</h3>
      </Reveal>
      <ol className="divide-y divide-border border-y border-border">
        {entries.map((entry, index) => (
          <li key={`${entry.organisation}-${entry.period}`}>
            <Reveal
              delayMs={index * 60}
              className="grid gap-3 py-8 md:grid-cols-[200px_1fr] md:gap-12"
            >
              <p className="text-xs uppercase tracking-widest text-text-muted">
                {entry.period}
                {entry.note && <span className="block">{entry.note}</span>}
              </p>
              <div>
                <div className="flex items-start gap-4">
                  <OrgMark entry={entry} />
                  <div>
                    <h4 className="text-lg font-semibold uppercase tracking-tight md:text-xl">
                      {entry.title}
                    </h4>
                    <p className="mt-1 text-base text-text-muted">
                      {entry.href ? (
                        <a
                          href={entry.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-border underline-offset-4 transition-colors hover:text-text"
                        >
                          {entry.organisation}
                        </a>
                      ) : (
                        entry.organisation
                      )}
                      {entry.team && ` — ${entry.team}`}
                      {entry.location && ` · ${entry.location}`}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 max-w-2xl list-disc space-y-2 pl-5 text-base leading-relaxed text-text-muted">
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function EducationExperience() {
  return (
    <section id="education-experience" className="scroll-mt-8 border-t border-border px-[4vw] py-24 md:py-32">
      <Reveal>
        <SectionLabel as="h2" className="mb-10">Education & experience</SectionLabel>
      </Reveal>

      <div className="mx-auto max-w-5xl">
        <Group heading="Corporate" entries={experience} />
        <Group heading="Community-led / Collegiate" entries={community} />
        <Group heading="Education" entries={education} />

        <Reveal className="mt-14">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest">
            Competitions &amp; honors
          </h3>
          <ul className="divide-y divide-border border-y border-border">
            {honors.map((honor) => (
              <li key={honor.title} className="grid gap-1 py-5 md:grid-cols-[200px_1fr] md:gap-12">
                <span aria-hidden className="hidden md:block" />
                <div>
                  <p className="text-base font-semibold">
                    {honor.href ? (
                      <a
                        href={honor.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-border underline-offset-4 hover:decoration-text"
                      >
                        {honor.title}
                      </a>
                    ) : (
                      honor.title
                    )}
                  </p>
                  <p className="mt-1 text-base leading-relaxed text-text-muted">{honor.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest">Certifications</h3>
          <ul className="divide-y divide-border border-y border-border">
            {certifications.map((cert) => (
              <li key={cert.title} className="grid gap-1 py-5 md:grid-cols-[200px_1fr] md:gap-12">
                <span className="text-xs uppercase tracking-widest text-text-muted">{cert.date}</span>
                <div>
                  <p className="text-base font-semibold">{cert.title}</p>
                  <p className="mt-1 text-base text-text-muted">
                    {cert.issuer} ·{" "}
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-border underline-offset-4 hover:text-text hover:decoration-text"
                    >
                      View<span className="sr-only"> {cert.title} certificate</span> ↗
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest">Additional</h3>
          <dl className="divide-y divide-border border-y border-border">
            {additionalInfo.map((row) => (
              <div key={row.label} className="grid gap-1 py-5 md:grid-cols-[200px_1fr] md:gap-12">
                <dt className="text-xs uppercase tracking-widest text-text-muted">{row.label}</dt>
                <dd className="text-base leading-relaxed text-text-muted">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
