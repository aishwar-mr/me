import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { ContactSection } from "@/components/ContactSection";
import { FullScreenNav } from "@/components/FullScreenNav";
import { Hero } from "@/components/Hero";
import { IntroStatement } from "@/components/IntroStatement";
import { SelectedWork } from "@/components/SelectedWork";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site, siteUrl } from "@/lib/content";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: `${site.firstName} ${site.lastName}`,
  url: siteUrl,
  email: `mailto:${site.email}`,
  jobTitle: "Product & Strategy Expert",
  sameAs: [site.socials.linkedin, site.socials.github, site.socials.x],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <SiteHeader />
      <main id="main">
        <Hero />
        <FullScreenNav />
        <IntroStatement />
        <SelectedWork />
        <CapabilitiesSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
