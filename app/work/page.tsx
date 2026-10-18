import type { Metadata } from "next";
import { projects } from "@/lib/content";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const title = "Work";
const description = "Selected case studies from Aishwar Mishra.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: `${title} — Aishwar Mishra`, description },
  twitter: { title: `${title} — Aishwar Mishra`, description },
};

const HEIGHTS = ["h-[70vw] md:h-[32vw]", "h-[70vw] md:h-[32vw]", "h-[70vw] md:h-[26vw]"];

export default function WorkIndex() {
  const items = [...projects, null];

  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="px-[4vw] pt-32 pb-16 md:pt-40">
          <Reveal>
            <h1 className="mb-6 text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-none tracking-tight">
              Selected work
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
              Case studies are being written up — each page below is live and
              will fill in as real project material is confirmed.
            </p>
          </Reveal>
        </section>

        <section className="px-[4vw] pb-24 md:pb-32">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {items.map((project, index) => (
              <div key={project?.slug ?? "coming-soon"} className="md:col-span-6">
                <ProjectCard
                  project={project}
                  seed={index + 2}
                  heightClass={HEIGHTS[index % HEIGHTS.length]}
                  delayMs={index * 100}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
