import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { PORTRAIT, STORY } from "@/data/background";

export function Story() {
  return (
    <>
      <PageHero backTo="/" backLabel="Home" label="My story" title="A bit more context" />

      <section className="border-t border-ink/15 px-6 pb-20 pt-4 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-[minmax(0,280px)_1fr] sm:gap-14">
          <Reveal>
            <img
              src={PORTRAIT.src}
              alt={PORTRAIT.alt}
              className="aspect-[4/5] w-full max-w-sm object-cover"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-xs uppercase tracking-[0.25em] text-ink/70">~ {STORY.kicker}</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {STORY.heading}
            </h2>
            <div className="mt-6 max-w-xl space-y-5 text-base leading-relaxed text-ink/75 sm:text-lg">
              {STORY.paragraphs.map((p, i) => (
                <p key={p} className={i === 0 ? "font-medium text-ink" : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
