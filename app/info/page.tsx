import type { Metadata } from "next";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { IntroStatement } from "@/components/IntroStatement";
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

        <section className="border-t border-border px-[4vw] py-24 md:py-32">
          <Reveal>
            <SectionLabel className="mb-10">Education & experience</SectionLabel>
            <p className="max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
              Pending — education history, employers, and dates haven&apos;t
              been supplied yet. A résumé link will go here once a résumé
              file is added to the project.
            </p>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
