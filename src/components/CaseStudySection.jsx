import { Reveal } from "@/components/Reveal";

// Mirrors the main portfolio's CaseStudySection: a label column, body split
// on blank lines into paragraphs, an optional bullet list, and an optional
// figure.
export function CaseStudySection({ section, index }) {
  return (
    <section className="border-t border-ink/15 px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
      <Reveal
        delay={index * 0.06}
        className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[200px_1fr] lg:gap-12"
      >
        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/70">
          {section.heading}
        </h2>
        <div>
          <div className="max-w-2xl space-y-4 text-base leading-relaxed text-ink/80">
            {section.body.split("\n\n").map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          {section.points && (
            <ul className="mt-5 max-w-2xl list-disc space-y-2 pl-5 text-base leading-relaxed text-ink/80">
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
          {section.image && (
            <figure className="mt-8 max-w-xl">
              <img
                src={section.image.src}
                alt={section.image.alt}
                className="h-auto w-full border border-ink/10"
                loading="lazy"
              />
              {section.image.caption && (
                <figcaption className="mt-3 text-[11px] uppercase tracking-[0.2em] text-ink/70">
                  {section.image.caption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </Reveal>
    </section>
  );
}
