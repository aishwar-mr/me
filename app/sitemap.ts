import type { MetadataRoute } from "next";
import { projects, siteUrl } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/info", "/work", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    lastModified: new Date(),
  }));

  const itemRoutes = projects.flatMap((project) =>
    (project.items ?? [])
      .filter((item) => item.slug && item.sections)
      .map((item) => ({
        url: `${siteUrl}/work/${project.slug}/${item.slug}`,
        lastModified: new Date(),
      }))
  );

  return [...staticRoutes, ...projectRoutes, ...itemRoutes];
}
