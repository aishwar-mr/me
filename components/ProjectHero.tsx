import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { InProgressTile } from "./InProgressTile";
import { PlaceholderTile } from "./PlaceholderTile";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function ProjectHero({
  project,
  seed,
  backHref = "/work",
  backLabel = "All work",
  showCover = true,
}: {
  project: Project;
  seed: number;
  backHref?: string;
  backLabel?: string;
  showCover?: boolean;
}) {
  return (
    <section className="px-[4vw] pt-32 pb-16 md:pt-40">
      <Reveal>
        <Link
          href={backHref}
          className="mb-8 inline-block text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-text"
        >
          ← {backLabel}
        </Link>

        <SectionLabel className="mb-4">{project.category}</SectionLabel>

        <h1 className="mb-6 text-[clamp(2rem,4vw,3.75rem)] font-semibold uppercase leading-[1.05] tracking-tight">
          {project.title}
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
          {project.summary}
        </p>

        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-2 text-[11px] uppercase tracking-widest text-text-muted">
          <span>Year — {project.year ?? "TBD"}</span>
          <span>Role — {project.role ?? "TBD"}</span>
          {project.inProgress ? (
            <span className="text-text">Status — Work in progress</span>
          ) : (
            project.placeholder && <span className="text-text">Status — Content pending</span>
          )}
        </div>
      </Reveal>

      {showCover && (
      <Reveal delayMs={150}>
        {project.cover ? (
          <div
            className={`relative mt-12 h-[60vw] w-full overflow-hidden md:h-[40vw] ${
              project.cover.fit === "contain" ? "bg-border/50" : ""
            }`}
          >
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              preload
              sizes="100vw"
              className={project.cover.fit === "contain" ? "object-contain" : "object-cover object-[50%_72%]"}
            />
          </div>
        ) : project.inProgress ? (
          <InProgressTile className="mt-12 h-[60vw] w-full md:h-[40vw]" />
        ) : (
          <PlaceholderTile
            seed={seed}
            label={`${project.title} — cover pending`}
            className="mt-12 h-[60vw] w-full md:h-[40vw]"
          />
        )}
      </Reveal>
      )}
    </section>
  );
}
