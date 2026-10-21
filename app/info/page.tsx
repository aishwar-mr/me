import type { Metadata } from "next";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { EducationExperience } from "@/components/EducationExperience";
import { IntroStatement } from "@/components/IntroStatement";
import { MyStory } from "@/components/MyStory";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const title = "Info";
const description = "Background, capabilities, and how to reach Aishwar Mishra.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: `${title} — Aishwar Mishra`, description },
  twitter: { title: `${title} — Aishwar Mishra`, description },
};

export default function InfoPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="px-[4vw] pt-32 md:pt-40">
          <Reveal>
            <SectionLabel className="mb-4">Info</SectionLabel>
          </Reveal>
        </div>

        <IntroStatement />
        <CapabilitiesSection />

        <nav
          aria-label="Info sections"
          className="flex gap-6 border-t border-border px-[4vw] py-5 text-xs uppercase tracking-widest text-text-muted"
        >
          <a href="#education-experience" className="transition-colors hover:text-text">
            Education & experience
          </a>
          <a href="#my-story" className="transition-colors hover:text-text">
            My story
          </a>
        </nav>

        <EducationExperience />
        <MyStory />
      </main>
      <SiteFooter />
    </>
  );
}
