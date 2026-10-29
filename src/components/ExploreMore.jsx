import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const LINKS = [
  {
    to: "/experience",
    label: "Experience",
    text: "Every role, every org — Newton School, Lawxy AI, Ninjacart and more, with the full scope of each one.",
    testId: "home-explore-experience",
  },
  {
    to: "/work",
    label: "Work",
    text: "Hackathon builds, product teardowns and the odd piece of writing, each with the full case study.",
    testId: "home-explore-work",
  },
];

// Bridges the one-page brief to the deeper, layered pages: a card per page,
// so there's a way in from the scroll itself, not only the header nav.
export function ExploreMore() {
  return (
    <section
      id="explore"
      data-testid="explore-section"
      className="border-t border-ink/15 px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <Reveal>
        <p className="label">Go deeper</p>
      </Reveal>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        {LINKS.map((link, i) => (
          <Reveal key={link.to} delay={i * 0.08}>
            <Link
              to={link.to}
              data-testid={link.testId}
              className="group block border border-ink/15 p-7 transition-colors duration-300 hover:border-ink/40 sm:p-9"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  {link.label}
                </h3>
                <ArrowUpRight
                  size={22}
                  className="shrink-0 text-ink/40 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
                />
              </div>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70">{link.text}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
