import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { Hero } from "@/components/Hero";
import { EditorialMarquee } from "@/components/EditorialMarquee";
import { ProofSection } from "@/components/ProofSection";
import { HowIWork } from "@/components/HowIWork";
import { GoDeeper } from "@/components/GoDeeper";
import { ContactFooter } from "@/components/ContactFooter";
import { SnoozingBear } from "@/components/SnoozingBear";

export default function HomePage() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      const t = setTimeout(() => lenis?.scrollTo(target, { duration: 1.4 }), 200);
      return () => clearTimeout(t);
    }
  }, [location.state, lenis]);

  return (
    <main className="relative">
      <Hero />
      <EditorialMarquee />
      <ProofSection />
      <HowIWork />
      <GoDeeper />
      <ContactFooter />
      <SnoozingBear />
    </main>
  );
}
