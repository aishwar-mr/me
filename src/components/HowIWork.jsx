import { DAY } from "@/content";
import { Reveal } from "@/components/Reveal";

// A typical day, de-boxed: six moments in one flowing grid, told by scale
// and the accent colour on the function name, not by cards or a hairline
// timeline rule.
function DayItem({ item, i }) {
  const id = item.time.replace(":", "");
  const external = item.href.startsWith("http");

  return (
    <Reveal as="li" delay={i * 0.06} data-testid={`how-i-work-card-${id}`}>
      <time className="font-text text-sm text-ink/60">{item.time}</time>
      <p className="mt-2 font-text text-[15px] font-semibold text-vermilion-text">
        {item.tag}
      </p>
      <p className="mt-3 font-text text-[17px] leading-relaxed text-ink/85">
        {item.text}
      </p>
      <a
        href={item.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={`Case study: ${item.caseStudy}`}
        data-testid={`how-i-work-link-${id}`}
        className="mt-4 inline-block font-text text-sm font-semibold text-ink underline decoration-ink/25 decoration-2 underline-offset-4 transition-colors duration-300 hover:text-vermilion hover:decoration-vermilion"
      >
        Case study
      </a>
    </Reveal>
  );
}

export function HowIWork() {
  return (
    <section
      id="how-i-work"
      data-testid="how-i-work-section"
      className="bg-ink/[0.03] px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <Reveal>
        <h2 className="max-w-[20ch] font-display text-[clamp(1.75rem,1.1rem+2.2vw,2.75rem)] font-normal leading-tight text-ink">
          {DAY.heading}.
        </h2>
      </Reveal>
      <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {DAY.items.map((item, i) => (
          <DayItem key={item.time} item={item} i={i} />
        ))}
      </ol>
      <Reveal
        as="p"
        data-testid="how-i-work-footer"
        className="mt-16 max-w-[48ch] font-display text-xl font-normal leading-relaxed text-ink"
      >
        {DAY.footer}
      </Reveal>
    </section>
  );
}
