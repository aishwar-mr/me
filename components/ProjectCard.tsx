import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { PlaceholderTile } from "./PlaceholderTile";
import { Reveal } from "./Reveal";

export function ProjectCard({
  project,
  seed,
  heightClass,
  delayMs = 0,
}: {
  project: Project | null;
  seed: number;
  heightClass: string;
  delayMs?: number;
}) {
  const tileClass = `${heightClass} w-full transition-transform duration-300 ease-out ${
    project ? "group-hover:scale-[1.02]" : ""
  }`;

  const body = (
    <div className="group relative">
      {project?.cover ? (
        <div className={`relative overflow-hidden ${tileClass}`}>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <PlaceholderTile
          seed={seed}
          label={project ? `${project.title} — case study pending` : "More work coming soon"}
          className={tileClass}
        />
      )}
      <div className="mt-3 flex items-baseline justify-between">
        <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-1">
          {project ? project.title : "More work"}
          {project && (
            <span
              aria-hidden
              className="translate-x-[-4px] opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
            >
              →
            </span>
          )}
        </span>
        <span className="text-[11px] uppercase tracking-widest text-text-muted">
          {project ? project.category : "Soon"}
        </span>
      </div>
    </div>
  );

  return (
    <Reveal delayMs={delayMs}>
      {project ? (
        <Link
          href={`/work/${project.slug}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text/40"
        >
          {body}
        </Link>
      ) : (
        body
      )}
    </Reveal>
  );
}
