import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/data/work";

export function Work() {
  return (
    <>
      <PageHero
        backTo="/"
        backLabel="Home"
        label="Work"
        title="Projects & breakdowns"
        lede="Hackathon builds, product teardowns and the odd piece of writing — open one for the full story."
      />

      <section className="px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} seed={i} delay={i * 0.06} />
          ))}
        </div>
      </section>
    </>
  );
}
