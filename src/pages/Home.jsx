import { Hero } from "@/components/Hero";
import { EditorialMarquee } from "@/components/EditorialMarquee";
import { ProofSection } from "@/components/ProofSection";
import { HowIWork } from "@/components/HowIWork";
import { ExploreMore } from "@/components/ExploreMore";

export function Home() {
  return (
    <>
      <Hero />
      <EditorialMarquee />
      <ProofSection />
      <HowIWork />
      <ExploreMore />
    </>
  );
}
