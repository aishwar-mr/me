import Link from "next/link";
import { projects } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-12"];
const HEIGHTS = ["h-[60vw] md:h-[32vw]", "h-[60vw] md:h-[32vw]", "h-[70vw] md:h-[26vw]"];

export function SelectedWork() {
  const items = [...projects, null];

  return (
    <section id="work" className="border-t border-border px-[4vw] py-24 md:py-32">
      <Reveal>
        <h2 className="mb-14 text-center text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-none tracking-tight md:mb-20">
          Selected work
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {items.map((project, index) => (
          <div key={project?.slug ?? "coming-soon"} className={SPANS[index % SPANS.length]}>
            <ProjectCard
              project={project}
              seed={index + 2}
              heightClass={HEIGHTS[index % HEIGHTS.length]}
              delayMs={index * 100}
            />
          </div>
        ))}
      </div>

      <Reveal delayMs={300} className="mt-12 text-center">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-text"
        >
          View all work →
        </Link>
      </Reveal>
    </section>
  );
}
