import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { PageNav } from "@/components/PageNav";
import { CaseStudySection } from "@/components/CaseStudySection";
import { InProgressTile } from "@/components/InProgressTile";
import { PlaceholderTile } from "@/components/PlaceholderTile";
import { Reveal } from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getAdjacentProjects, getProject, PROJECTS } from "@/data/work";

function Cover({ project }) {
  if (project.cover) {
    return (
      <div
        className={`relative h-[55vw] max-h-[26rem] w-full overflow-hidden border border-ink/10 ${
          project.cover.fit === "contain" ? "bg-ink/5" : ""
        }`}
      >
        <img
          src={project.cover.src}
          alt={project.cover.alt}
          className={`h-full w-full ${project.cover.fit === "contain" ? "object-contain p-8" : "object-cover"}`}
        />
      </div>
    );
  }
  if (project.inProgress) {
    return <InProgressTile className="h-[55vw] max-h-[26rem] w-full border border-ink/10" />;
  }
  return (
    <PlaceholderTile
      seed={0}
      label={`${project.title} — cover pending`}
      className="h-[55vw] max-h-[26rem] w-full"
    />
  );
}

function ItemsList({ project }) {
  if (!project.items) return null;
  return (
    <section className="border-t border-ink/15 px-6 py-14 sm:px-10 lg:px-16">
      <Reveal className="mx-auto max-w-4xl">
        <h2 className="label">{project.itemsHeading ?? "Teardowns"}</h2>
        <ul className="mt-5 divide-y divide-ink/15 border-t border-ink/15">
          {project.items.map((item) => {
            const linkable = item.sections && item.slug;
            const to = linkable ? `/work/${project.slug}/${item.slug}` : null;
            const row = (
              <div className="group flex items-start justify-between gap-6 py-6">
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1">
                    {item.title}
                  </h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink/70">{item.summary}</p>
                </div>
                {(to || item.href) && (
                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 text-ink/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                )}
              </div>
            );
            return (
              <li key={item.title}>
                {to ? (
                  <Link to={to}>{row}</Link>
                ) : item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {row}
                  </a>
                ) : (
                  row
                )}
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}

export function WorkDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (project) document.title = project.title;
  }, [project]);

  if (!project) return <Navigate to="/work" replace />;

  const { previous, next } = getAdjacentProjects(slug);
  const seed = PROJECTS.findIndex((p) => p.slug === slug);

  return (
    <>
      <PageHero
        backTo="/work"
        backLabel="Work"
        label={project.category}
        title={project.title}
        lede={project.summary}
        meta={[
          ["Year", project.year ?? "TBD"],
          ["Role", project.role ?? "TBD"],
          ...(project.inProgress ? [["Status", "Work in progress"]] : []),
        ]}
      />

      <section className="px-6 pb-4 sm:px-10 lg:px-16">
        <Reveal delay={0.1} className="mx-auto max-w-5xl">
          <Cover project={project} />
        </Reveal>
      </section>

      {project.sections.map((section, i) => (
        <CaseStudySection key={section.id} section={section} index={i} />
      ))}

      <ItemsList project={project} />

      <PageNav
        backTo="/work"
        backLabel="All work"
        previous={previous && { title: previous.title, href: `/work/${previous.slug}` }}
        next={next && { title: next.title, href: `/work/${next.slug}` }}
      />
    </>
  );
}
