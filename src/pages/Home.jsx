import { Hero } from "@/components/Hero";
import { EditorialMarquee } from "@/components/EditorialMarquee";
import { ProofSection } from "@/components/ProofSection";
import { HowIWork } from "@/components/HowIWork";
import { ExploreMore } from "@/components/ExploreMore";
import { SnoozingBear } from "@/components/SnoozingBear";

export function Home() {
  return (
    // Poonie is positioned absolutely and roams within this wrapper, measuring
    // it to decide how far down the page she can wander — so the wrapper has to
    // be the positioned ancestor, and has to span the sections she walks past.
    <div className="relative">
      <Hero />
      <EditorialMarquee />
      <ProofSection />
      <HowIWork />
      <ExploreMore />
      <SnoozingBear />
    </div>
  );
}
