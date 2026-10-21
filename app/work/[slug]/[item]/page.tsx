import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectItem, projects } from "@/lib/content";
import { CaseStudySection } from "@/components/CaseStudySection";
import { ProjectHero } from "@/components/ProjectHero";
import { ProjectNavigation } from "@/components/ProjectNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

type Params = Promise<{ slug: string; item: string }>;

export function generateStaticParams() {
  return projects.flatMap((project) =>
    (project.items ?? [])
      .filter((item) => item.slug && item.sections)
      .map((item) => ({ slug: project.slug, item: item.slug as string }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, item } = await params;
  const found = getProjectItem(slug, item);
  if (!found) return {};

  return {
    title: found.item.title,
    description: found.item.summary,
    openGraph: {
      title: `${found.item.title} — Aishwar Mishra`,
      description: found.item.summary,
      type: "article",
    },
    twitter: {
      title: `${found.item.title} — Aishwar Mishra`,
      description: found.item.summary,
    },
  };
}

export default async function ProjectItemPage({ params }: { params: Params }) {
  const { slug, item } = await params;
  const found = getProjectItem(slug, item);
  if (!found || !found.item.sections) notFound();

  const { project, item: entry, previous, next } = found;
  const href = (i: { slug?: string; sections?: unknown }) =>
    i.slug && i.sections ? `/work/${project.slug}/${i.slug}` : null;
  const previousHref = previous && href(previous);
  const nextHref = next && href(next);

  return (
    <>
      <SiteHeader />
      <main id="main">
        <ProjectHero
          project={{
            slug: entry.slug as string,
            title: entry.title,
            category: project.title,
            summary: entry.summary,
            year: entry.year,
            role: entry.role,
            placeholder: false,
            sections: entry.sections ?? [],
          }}
          seed={0}
          showCover={false}
          backHref={`/work/${project.slug}`}
          backLabel={project.title}
        />
        {(entry.sections ?? []).map((section, index) => (
          <CaseStudySection key={section.id} section={section} index={index} />
        ))}
        <ProjectNavigation
          previous={previous && previousHref ? { title: previous.title, href: previousHref } : undefined}
          next={next && nextHref ? { title: next.title, href: nextHref } : undefined}
          backHref={`/work/${project.slug}`}
          backLabel={project.title}
        />
      </main>
      <SiteFooter />
    </>
  );
}
