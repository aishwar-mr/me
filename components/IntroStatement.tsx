import { introStatement } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function IntroStatement() {
  return (
    <section className="px-[4vw] py-28 md:py-36">
      <Reveal className="mx-auto max-w-5xl text-center">
        <SectionLabel className="mb-8 justify-center">Info</SectionLabel>
        <h1 className="text-[clamp(1.75rem,4.2vw,3.25rem)] font-semibold uppercase leading-[1.1] tracking-tight">
          {introStatement}
        </h1>
      </Reveal>
    </section>
  );
}
