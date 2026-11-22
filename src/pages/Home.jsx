import { PageLine } from "@/components/PageLine";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { SelectedWork } from "@/components/SelectedWork";
import { WorkBelt } from "@/components/WorkBelt";
import { SiteFooter } from "@/components/SiteFooter";

export function Home() {
  return (
    <div className="relative bg-paper font-sans text-ink">
      <PageLine />
      <Hero />
      <About />
      <Approach />
      <SelectedWork />
      <WorkBelt />
      <SiteFooter />
    </div>
  );
}
