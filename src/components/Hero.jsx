import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroPortrait from "@/assets/hero-portrait.png";

// Every 90ms, redraw 3-11 horizontal clip-path "bands" of the same portrait,
// each offset/opacity/blend-mode randomised — a CRT-glitch effect over an
// otherwise still photo. ~45% of ticks are a "burst": more bands, wider
// horizontal offset. `converge` (1 -> 0 over the signature intro, see
// below) scales both up further at the start, so the portrait opens in
// fully dispersed and visibly settles into focus — the one loud move on
// the page — before dropping back to its normal idle glitch.
function makeBands(converge = 0) {
  const burst = converge > 0.15 ? true : Math.random() < 0.45;
  const scale = 1 + converge * 2.2;
  const amp = (burst ? 20 : 5) * scale;
  const nBase = burst ? 6 + Math.floor(Math.random() * 5) : 3 + Math.floor(Math.random() * 3);
  const n = Math.round(nBase * (1 + converge * 1.4));
  const arr = [];
  for (let i = 0; i < n; i++) {
    const top = Math.random() * 94;
    const h = 1.2 + Math.random() * 5;
    const bottom = Math.max(0, 100 - top - h);
    const tx = (Math.random() * 2 - 1) * amp;
    const op = 0.4 + Math.random() * 0.5;
    arr.push({
      clip: `inset(${top.toFixed(1)}% 0 ${bottom.toFixed(1)}% 0)`,
      tx: tx.toFixed(1),
      op: op.toFixed(2),
      blend: Math.random() < 0.3 ? "difference" : "normal",
    });
  }
  return arr;
}

const CONVERGE_MS = 1300;

function GlitchPortrait() {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // A single calm frame instead of a continuous loop: the glitch is the
      // page's loudest moving element, so it's the one thing reduced-motion
      // visitors should see settled rather than just slower.
      setBands(makeBands(0));
      return;
    }
    const start = performance.now();
    const id = setInterval(() => {
      const converge = Math.max(0, 1 - (performance.now() - start) / CONVERGE_MS);
      setBands(makeBands(converge));
    }, 90);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute left-[290px] top-[220px] z-0 h-[796px] w-[860px] overflow-hidden">
      <img
        src={heroPortrait}
        alt="Black and white glitched portrait of Aishwar"
        className="absolute inset-0 block h-full w-full object-contain object-bottom"
      />
      {bands.map((b, i) => (
        <img
          key={i}
          src={heroPortrait}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 block h-full w-full object-contain object-bottom"
          style={{
            clipPath: b.clip,
            transform: `translateX(${b.tx}px)`,
            opacity: b.op,
            mixBlendMode: b.blend,
            willChange: "transform, clip-path",
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <div className="relative h-[1000px] w-full overflow-hidden bg-paper text-ink">
      <GlitchPortrait />

      <header className="relative z-20 grid h-[72px] grid-cols-12 items-center gap-6 border-b border-line px-20 text-[13px]">
        <nav aria-label="Primary left" className="col-start-1 col-end-5 flex gap-10">
          <a href="#home" className="nav-link">
            home
          </a>
          <Link to="/about" className="nav-link">
            about
          </Link>
          <Link to="/projects" className="nav-link">
            all work
          </Link>
        </nav>
        <a
          href="#home"
          aria-label="Home"
          className="col-start-6 col-end-8 justify-self-center text-[22px] font-semibold leading-none tracking-[0.02em]"
        >
          AM
        </a>
        <nav aria-label="Primary right" className="col-start-9 col-end-13 flex justify-end gap-10 underline">
          <Link to="/story">story</Link>
        </nav>
      </header>

      <section id="home" aria-label="Hero" className="relative z-10 pt-6">
        <div className="grid h-[150px] grid-cols-12 items-center gap-6 border-b border-line px-20">
          <p className="col-start-1 col-end-3 m-0 text-[11px] leading-[1.35] text-[#57544d]">
            a seasoned <br />
            operator&nbsp;
            <br />
          </p>
          <h1 className="col-start-3 col-end-11 m-0 grid grid-cols-8 gap-6 whitespace-nowrap text-[112px] font-medium leading-none tracking-[-0.045em]">
            <span className="col-start-1 col-end-3">i’m</span>
            <span className="col-start-3 col-end-9">aishwar</span>
          </h1>
          <p className="col-start-11 col-end-13 m-0 text-right text-[11px] leading-[1.35] text-[#57544d]">
            with over
            <br />
            1+ years
          </p>
        </div>

        <div className="grid h-[150px] grid-cols-12 items-center gap-6 border-b border-line px-20">
          <p className="col-start-1 col-end-4 m-0 text-[112px] font-medium leading-none tracking-[-0.045em]">and</p>
          <p className="col-start-4 col-end-5 m-0 text-[112px] font-medium leading-none tracking-[-0.045em]">i</p>
          <p className="col-start-8 col-end-11 m-0 text-right text-[112px] font-medium leading-none tracking-[-0.045em]">
            make
          </p>
          <p className="col-start-11 col-end-13 m-0 text-right text-[11px] leading-[1.35] text-[#57544d]">
            collaborates
            <br />
            with the world
          </p>
        </div>

        <div className="grid h-[150px] grid-cols-12 items-center gap-6 border-b border-line px-20">
          <p className="col-start-1 col-end-3 m-0 text-[11px] leading-[1.35] text-[#57544d]">
            have had the
            <br />
            privilege
          </p>
          <p className="col-start-3 col-end-6 m-0 text-[112px] font-medium leading-none tracking-[-0.045em]">ideas</p>
          <p className="col-start-8 col-end-11 m-0 text-right text-[112px] font-medium leading-none tracking-[-0.045em]">
            work
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 px-20 pt-5">
          <p className="col-start-1 col-end-4 m-0 text-[12px] leading-[1.45] text-[#57544d]">
            My focus is on creating something that not only look great but also drive change and create real
            business impact
          </p>
          <a
            href="#contact"
            className="press col-start-11 col-end-13 box-border min-h-[44px] justify-self-end py-3 text-[12px] font-semibold tracking-[0.04em]"
          >
            ( CONTACT ME )
          </a>
        </div>
      </section>
    </div>
  );
}
