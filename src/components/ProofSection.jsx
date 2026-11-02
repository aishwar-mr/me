import { PROOF } from "@/content";
import { Reveal } from "@/components/Reveal";
import prototypeOnTrack from "@/assets/work/track-monitoring/prototype-on-track.jpg";
import fastenerDetection from "@/assets/work/track-monitoring/fastener-detection.jpg";

// Run-in column: each story leads with its own headline as a bold run-in
// phrase, then the full paragraph, then one piece of real evidence where one
// exists. No accordion — the house rules want full content shown, not
// hidden behind a click.
// Only the hackathon story has photographs of the thing itself; the others
// carry no evidence slot rather than a logo in a tinted panel, which proves
// nothing and repeats the logo row above.
// Keys mirror content.js's own PROOF[].num (a stable id, not a displayed
// index — nothing numbered renders on the page). taste-skill-ignore
const EVIDENCE = {
  [PROOF[1].num]: {
    items: [
      { src: prototypeOnTrack, alt: "The track-monitoring prototype mounted for a live test run" },
      { src: fastenerDetection, alt: "Fastener detection running on live track footage" },
    ],
  },
};

export function ProofSection() {
  return (
    <section
      id="proof"
      data-testid="proof-section"
      className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <Reveal>
        <h2 className="max-w-[20ch] font-display text-[clamp(1.75rem,1.1rem+2.2vw,2.75rem)] font-normal leading-tight text-ink">
          The 30-second proof<span className="text-vermilion">.</span>
        </h2>
      </Reveal>

      <div className="mx-auto mt-16 flex max-w-[600px] flex-col gap-16 lg:ml-[30%] lg:mr-0">
        {PROOF.map((item) => {
          const evidence = EVIDENCE[item.num];
          return (
            <Reveal key={item.num} as="article" id={`proof-${item.num}`} className="scroll-mt-24">
              <p className="font-text text-[17px] leading-[1.6] text-ink/85">
                <span className="font-semibold text-ink">{item.title}. </span>
                {item.deep}
              </p>
              {evidence && (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {evidence.items.map((img) => (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="aspect-square w-full rounded-xl object-cover"
                    />
                  ))}
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
