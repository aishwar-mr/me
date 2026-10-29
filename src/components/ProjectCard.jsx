import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { InProgressTile } from "@/components/InProgressTile";
import { PlaceholderTile } from "@/components/PlaceholderTile";
import { Reveal } from "@/components/Reveal";

export function ProjectCard({ project, seed = 0, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Link
        to={`/work/${project.slug}`}
        data-testid={`project-card-${project.slug}`}
        className="group block"
      >
        <div className="relative aspect-[4/3] overflow-hidden border border-ink/15 bg-paper">
          {project.cover ? (
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              loading="lazy"
              className={`h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
                project.cover.fit === "contain" ? "object-contain p-6" : "object-cover"
              }`}
            />
          ) : project.inProgress ? (
            <InProgressTile className="h-full w-full" />
          ) : (
            <PlaceholderTile seed={seed} label={`${project.title} — pending`} className="h-full w-full" />
          )}
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-vermilion-text">{project.category}</p>
            <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
              {project.title}
            </h2>
          </div>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-ink/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
          />
        </div>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/70">{project.summary}</p>
      </Link>
    </Reveal>
  );
}
