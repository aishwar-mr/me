import Image from "next/image";
import { portraitImage, story, storyHeading, storyKicker } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function MyStory() {
  return (
    <section id="my-story" className="scroll-mt-8 border-t border-border px-[4vw] py-24 md:py-32">
      <Reveal>
        <SectionLabel as="h2" className="mb-10">My story</SectionLabel>
      </Reveal>

      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
        <Reveal>
          <Image
            src={portraitImage.src}
            alt={portraitImage.alt}
            sizes="(min-width: 768px) 320px, 100vw"
            className="h-auto w-full max-w-sm object-cover md:aspect-[4/5]"
          />
        </Reveal>

        <Reveal delayMs={80}>
          {story.length > 0 ? (
            <div className="max-w-2xl">
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-text-muted">
                ~ {storyKicker}
              </p>
              <h3 className="mb-6 text-2xl font-semibold uppercase tracking-tight md:text-3xl">
                {storyHeading}
              </h3>
              <div className="space-y-5 text-base leading-relaxed text-text-muted md:text-lg">
                {story.map((paragraph, index) => (
                  <p key={paragraph} className={index === 0 ? "font-medium text-text" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <p className="max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
              Pending — this section is reserved for your story in your own
              words. It will appear here once the text is supplied.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
