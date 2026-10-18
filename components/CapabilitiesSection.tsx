import { capabilities } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function CapabilitiesSection() {
  return (
    <section className="border-t border-border px-[4vw] py-24 md:py-32">
      <Reveal>
        <SectionLabel className="mb-10">Capabilities</SectionLabel>
      </Reveal>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item, index) => (
          <Reveal key={item.label} delayMs={index * 80}>
            <h3 className="mb-3 text-xl font-semibold uppercase tracking-tight md:text-2xl">
              {item.label}
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-text-muted md:text-base">
              {item.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
