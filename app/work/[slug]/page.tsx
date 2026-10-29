import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProject, projects } from "@/lib/content";
import { CaseStudySection } from "@/components/CaseStudySection";
import { ProjectHero } from "@/components/ProjectHero";
import { ProjectItemList } from "@/components/ProjectItemList";
import { ProjectNavigation } from "@/components/ProjectNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Aishwar Mishra`,
      description: project.summary,
      type: "article",
    },
    twitter: {
      title: `${project.title} — Aishwar Mishra`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(slug);
  const seed = projects.findIndex((p) => p.slug === slug) + 4;

  return (
    <>
      <SiteHeader />
      <main id="main">
        <ProjectHero project={project} seed={seed} />
        {project.sections.map((section, index) => (
          <CaseStudySection key={section.id} section={section} index={index} />
        ))}
        {project.items && <ProjectItemList heading={project.itemsHeading ?? "Teardowns"} items={project.items} projectSlug={project.slug} />}
        <ProjectNavigation
          previous={previous && { title: previous.title, href: `/work/${previous.slug}` }}
          next={next && { title: next.title, href: `/work/${next.slug}` }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
