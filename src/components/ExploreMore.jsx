import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import builderCanvas from "@/assets/work/frappe-builder/builder-canvas.png";

const LINKS = [
  {
    to: "/experience",
    label: "Experience",
    text: "Every role, every org — TCI, Lawxy AI, Ninjacart and more, with the full scope of each one.",
    testId: "home-explore-experience",
  },
  {
    to: "/work",
    label: "Work",
    text: "Hackathon builds, product teardowns and the odd piece of writing, each with the full case study.",
    testId: "home-explore-work",
    image: builderCanvas,
  },
];

// cta — first step, already open: a full-bleed field in the accent colour,
// the closing line anchored low-left, the two destinations as filled tiles
// (not outlined boxes) on the right.
export function ExploreMore() {
  return (
    <section
      id="explore"
      data-testid="explore-section"
      className="bg-vermilion px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
        <Reveal className="lg:col-span-5">
          <h2 className="font-display text-[clamp(2.5rem,1.4rem+4.5vw,4.5rem)] font-normal leading-[0.95] text-paper">
            Two more
            <br />
            rooms<span className="text-ink">.</span>
          </h2>
          <p className="mt-5 max-w-[32ch] font-text text-base text-paper/85">
            The full scope lives on two deeper pages.
          </p>
        </Reveal>
        <div className="flex flex-col gap-5 lg:col-span-7">
          {LINKS.map((link, i) => (
            <Reveal key={link.to} delay={i * 0.08}>
              <Link
                to={link.to}
                data-testid={link.testId}
                className="group block overflow-hidden rounded-2xl bg-paper transition-colors duration-300 hover:bg-ink"
              >
                {link.image && (
                  <img
                    src={link.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover object-top"
                  />
                )}
                <div className="p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-normal text-ink transition-colors duration-300 group-hover:text-paper sm:text-3xl">
                      {link.label}
                    </h3>
                    <ArrowUpRight
                      size={22}
                      className="shrink-0 text-ink/40 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-paper"
                    />
                  </div>
                  <p className="mt-3 max-w-sm font-text text-sm leading-relaxed text-ink/70 transition-colors duration-300 group-hover:text-paper/80">
                    {link.text}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
