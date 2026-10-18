import type { ProjectSection } from "@/lib/content";
import { Reveal } from "./Reveal";

export function CaseStudySection({ section, index }: { section: ProjectSection; index: number }) {
  return (
    <section className="border-t border-border px-[4vw] py-16 md:py-20">
      <Reveal delayMs={index * 60} className="mx-auto grid max-w-5xl gap-4 md:grid-cols-[200px_1fr] md:gap-12">
        <h2 className="text-sm font-semibold uppercase tracking-widest">{section.heading}</h2>
        <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
          {section.body}
        </p>
      </Reveal>
    </section>
  );
}
