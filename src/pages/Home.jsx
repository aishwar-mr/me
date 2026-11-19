import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { WorkBelt } from "@/components/WorkBelt";
import { SiteFooter } from "@/components/SiteFooter";

export function Home() {
  return (
    <div className="bg-paper font-sans text-ink">
      <Hero />
      <About />
      <Approach />
      <WorkBelt />
      <SiteFooter />
    </div>
  );
}
