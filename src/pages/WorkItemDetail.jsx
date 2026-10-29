import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { PageNav } from "@/components/PageNav";
import { CaseStudySection } from "@/components/CaseStudySection";
import { getProjectItem } from "@/data/work";

export function WorkItemDetail() {
  const { slug, item: itemSlug } = useParams();
  const found = getProjectItem(slug, itemSlug);

  useEffect(() => {
    if (found) document.title = found.item.title;
  }, [found]);

  if (!found || !found.item.sections) return <Navigate to={`/work/${slug}`} replace />;

  const { project, item, previous, next } = found;
  const linkFor = (i) => (i?.slug && i?.sections ? `/work/${project.slug}/${i.slug}` : null);

  return (
    <>
      <PageHero
        backTo={`/work/${project.slug}`}
        backLabel={project.title}
        label={project.title}
        title={item.title}
        lede={item.summary}
        meta={[
          ["Year", item.year ?? "TBD"],
          ["Role", item.role ?? "TBD"],
        ]}
      />

      {item.sections.map((section, i) => (
        <CaseStudySection key={section.id} section={section} index={i} />
      ))}

      <PageNav
        backTo={`/work/${project.slug}`}
        backLabel={project.title}
        previous={previous && linkFor(previous) && { title: previous.title, href: linkFor(previous) }}
        next={next && linkFor(next) && { title: next.title, href: linkFor(next) }}
      />
    </>
  );
}
