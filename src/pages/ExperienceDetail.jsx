import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { PageNav } from "@/components/PageNav";
import { Reveal } from "@/components/Reveal";
import { OrgLogo } from "@/components/OrgLogo";
import { getAdjacentExperience, getExperience } from "@/data/background";

export function ExperienceDetail() {
  const { slug } = useParams();
  const entry = getExperience(slug);

  useEffect(() => {
    if (entry) document.title = `${entry.title} — ${entry.organisation}`;
  }, [entry]);

  if (!entry) return <Navigate to="/experience" replace />;

  const { previous, next } = getAdjacentExperience(slug);

  return (
    <>
      <PageHero
        backTo="/experience"
        backLabel="Experience"
        label={entry.group}
        title={entry.title}
        meta={[
          ["Org", entry.organisation],
          ["Period", entry.period + (entry.note ? ` · ${entry.note}` : "")],
          ...(entry.location ? [["Location", entry.location]] : []),
        ]}
      />

      <section className="border-t border-ink/15 px-6 py-14 sm:px-10 lg:px-16">
        <Reveal className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-[80px_1fr]">
          <OrgLogo organisation={entry.organisation} logo={entry.logo} size={80} />
          <div>
            {entry.href && (
              <a
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-vermilion"
              >
                Visit {entry.organisation} ↗
              </a>
            )}
            <ul className="mt-5 max-w-2xl list-disc space-y-3 pl-5 text-base leading-relaxed text-ink/80">
              {entry.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <PageNav
        backTo="/experience"
        backLabel="All experience"
        previous={previous && { title: previous.title, href: `/experience/${previous.slug}` }}
        next={next && { title: next.title, href: `/experience/${next.slug}` }}
      />
    </>
  );
}
