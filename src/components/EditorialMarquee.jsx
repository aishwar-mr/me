import { Reveal } from "@/components/Reveal";
import tci from "@/assets/logos/tci.png";
import ninjacart from "@/assets/logos/ninjacart.png";
import lawxy from "@/assets/logos/lawxy.png";
import technovanza from "@/assets/logos/technovanza.png";
import worldquant from "@/assets/logos/worldquant-brain.png";
import lvlup from "@/assets/logos/lvlup-venture.png";
import vjti from "@/assets/logos/vjti.jpg";

// Proof — one quiet logo row: real organisations, normalised to one height,
// no claim beyond the names themselves.
const LOGOS = [
  { src: tci, alt: "TCI" },
  { src: ninjacart, alt: "Ninjacart" },
  { src: lawxy, alt: "Lawxy AI" },
  { src: technovanza, alt: "Technovanza VJTI" },
  { src: worldquant, alt: "WorldQuant BRAIN" },
  { src: lvlup, alt: "LvlUp Venture" },
  { src: vjti, alt: "VJTI Mumbai" },
];

export function EditorialMarquee() {
  return (
    <div data-testid="marquee" className="px-6 py-14 sm:px-10 lg:px-16">
      <Reveal className="flex flex-wrap items-center gap-x-10 gap-y-6 sm:gap-x-14">
        <p className="font-text text-lg text-ink/70">Every room so far</p>
        {LOGOS.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            // Raster logos in their own brand colours read as a jumble in a
            // row. Greyscale normalises them to the page ink; multiply drops
            // the white card the JPEG mark carries behind it.
            className="h-6 w-auto object-contain opacity-75 mix-blend-multiply grayscale contrast-[1.4] sm:h-7"
          />
        ))}
      </Reveal>
    </div>
  );
}
