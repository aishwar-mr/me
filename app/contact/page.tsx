import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const title = "Contact";
const description = "Get in touch with Aishwar Mishra.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: `${title} — Aishwar Mishra`, description },
  twitter: { title: `${title} — Aishwar Mishra`, description },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
