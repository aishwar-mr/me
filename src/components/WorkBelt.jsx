import { useEffect, useRef, useState } from "react";
import protoK1C from "@/assets/life/prototyping-k1c.jpg";
import weekendRun from "@/assets/life/weekend-run.jpg";
import cityGlow from "@/assets/life/city-glow.jpg";
import duskSkyline from "@/assets/life/dusk-skyline.jpg";
import shoreMorning from "@/assets/life/shore-morning.jpg";
import wanderingRunning from "@/assets/life/wandering-running.jpg";
import captionIt from "@/assets/life/caption-it.jpg";
import cityVsNature from "@/assets/life/city-vs-nature.jpg";
import jammuKashmirTrek from "@/assets/life/jammu-kashmir-trek.jpg";
import trekkingAltitude from "@/assets/life/trekking-altitude.jpg";

const ITEMS = [
  { src: protoK1C, cap: "Prototyping parts on the K1C.", w: 300, h: 225 },
  { src: weekendRun, cap: "Weekend laps to clear the head.", w: 300, h: 250 },
  { src: cityGlow, cap: "City glow from the window.", w: 210, h: 280 },
  { src: duskSkyline, cap: "Dusk settling over the skyline.", w: 360, h: 190 },
  { src: shoreMorning, cap: "Slow mornings by the shore.", w: 300, h: 225 },
  { src: wanderingRunning, cap: "Out wandering & running", w: 210, h: 280 },
  { src: captionIt, cap: "Caption it", w: 225, h: 300 },
  { src: cityVsNature, cap: "when the city lives nature broods", w: 330, h: 220 },
  { src: jammuKashmirTrek, cap: "Pine air and a long view.", w: 340, h: 200 },
  { src: trekkingAltitude, cap: "Trekking up through the clouds\n~2,500 ft", w: 230, h: 300 },
];

// One full copy of the belt scrolls past in this many seconds.
const SPEED_SECONDS = 55;

// Pictures are authored for a 1440px-wide screen; scale them with the screen
// (phones get a fixed, slightly smaller size).
function beltScale() {
  const w = window.innerWidth;
  return w < 768 ? 0.78 : Math.min(1.6, Math.max(0.7, w / 1440));
}

function Belt() {
  const [k, setK] = useState(beltScale);
  const copyWidth = ITEMS.reduce((a, b) => a + b.w * k + 20, 0);
  const copyRef = useRef(copyWidth);
  copyRef.current = copyWidth;
  const [off, setOff] = useState(0);
  const pausedRef = useRef(false);
  const offRef = useRef(0);
  const rafRef = useRef(null);
  const lastRef = useRef(0);

  useEffect(() => {
    lastRef.current = performance.now();
    const step = (now) => {
      const dt = Math.min(0.05, (now - lastRef.current) / 1000);
      lastRef.current = now;
      if (!pausedRef.current) {
        let next = offRef.current + (copyRef.current / SPEED_SECONDS) * dt;
        if (next >= copyRef.current) next -= copyRef.current;
        offRef.current = next;
        setOff(next);
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    const onResize = () => setK(beltScale());
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="belt-band"
      style={{ height: 420 * k }}
      aria-label="Work belt"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="belt-track" style={{ transform: `translateX(-${off}px)` }}>
        {[...ITEMS, ...ITEMS].map((it, i) => (
          <figure
            key={i}
            className="belt-item m-0"
            style={{ width: it.w * k, height: it.h * k }}
            aria-hidden={i >= ITEMS.length ? "true" : undefined}
          >
            <figcaption className="belt-cap">{it.cap}</figcaption>
            <img src={it.src} alt={i >= ITEMS.length ? "" : it.cap} />
          </figure>
        ))}
      </div>
    </div>
  );
}

const LABEL = "text-[length:max(12px,calc(var(--u)*12))] font-medium uppercase tracking-[0.06em]";

export function WorkBelt() {
  return (
    <section id="work" aria-label="Work" className="border-b border-line py-14">
      <nav aria-label="Work — top" className={`mb-7 grid grid-cols-12 gap-6 px-20 max-md:flex max-md:justify-between ${LABEL}`}>
        <a href="#hardware" className="nav-link col-start-1 col-end-5">
          Hardware
        </a>
        <a href="#media" className="nav-link col-start-10 col-end-13 text-right">
          Media
        </a>
      </nav>
      <Belt />
      <nav aria-label="Work — bottom" className={`mt-7 grid grid-cols-12 gap-6 px-20 max-md:flex max-md:justify-between ${LABEL}`}>
        <a href="#photography" className="nav-link col-start-1 col-end-5">
          Photography
        </a>
        <a href="#physical-grit" className="nav-link col-start-10 col-end-13 text-right">
          analytics
        </a>
      </nav>
    </section>
  );
}
