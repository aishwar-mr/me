import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroPortrait from "@/assets/hero-portrait.png";
import heroPortraitDark from "@/assets/hero-portrait-dark.webp";
import { EYE_GEOMETRY } from "@/data/eyeGeometry";
import lightLBall from "@/assets/eyes/light-l-ball.png";
import lightLIris from "@/assets/eyes/light-l-iris.png";
import lightRBall from "@/assets/eyes/light-r-ball.png";
import lightRIris from "@/assets/eyes/light-r-iris.png";
import darkLBall from "@/assets/eyes/dark-l-ball.png";
import darkLIris from "@/assets/eyes/dark-l-iris.png";
import darkRBall from "@/assets/eyes/dark-r-ball.png";
import darkRIris from "@/assets/eyes/dark-r-iris.png";

// Each eye is two small pieces laid over the photo: the eyeball (the opening
// with the original iris painted out) and the iris itself, clipped to the
// opening so it can slide toward the cursor without leaving the eye.
const EYE_ART = {
  light: { geo: EYE_GEOMETRY.light, l: { ball: lightLBall, iris: lightLIris }, r: { ball: lightRBall, iris: lightRIris } },
  dark: { geo: EYE_GEOMETRY.dark, l: { ball: darkLBall, iris: darkLIris }, r: { ball: darkRBall, iris: darkRIris } },
};
const GAZE_X = 5.5; // how far the iris slides sideways, in photo pixels
const GAZE_Y = 2; // ...and up/down (the lids leave little room)

function Eyes({ variant }) {
  const art = EYE_ART[variant];
  const { w, h } = art.geo;
  return (
    <div className={`eyes eyes-${variant}`} aria-hidden="true">
      {["l", "r"].map((k) => {
        const e = art.geo.eyes[k];
        const [bx, by, bw, bh] = e.box;
        const clip = `polygon(${e.poly.map(([px, py]) => `${((px / bw) * 100).toFixed(2)}% ${((py / bh) * 100).toFixed(2)}%`).join(",")})`;
        return (
          <div
            key={k}
            className="eye"
            data-mx={((GAZE_X / bw) * 100).toFixed(2)}
            data-my={((GAZE_Y / bh) * 100).toFixed(2)}
            data-cx={(e.c[0] / bw).toFixed(4)}
            data-cy={(e.c[1] / bh).toFixed(4)}
            style={{ left: `${(bx / w) * 100}%`, top: `${(by / h) * 100}%`, width: `${(bw / w) * 100}%`, height: `${(bh / h) * 100}%` }}
          >
            <img src={art[k].ball} alt="" draggable="false" className="absolute inset-0 block h-full w-full" />
            <div className="absolute inset-0" style={{ clipPath: clip }}>
              <img src={art[k].iris} alt="" draggable="false" className="eye-iris absolute inset-0 block h-full w-full" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// The light-page PNG stores the photo's darkness in its transparency, so on a
// dark page the highlights go see-through and the face is eaten away. Dark
// mode gets its own portrait instead: true photo tones on a transparent
// backdrop (black is see-through, so it melts into the page).
function PortraitPicture({ alt, className, style, ariaHidden }) {
  return (
    <picture className="contents">
      <source media="(prefers-color-scheme: dark)" srcSet={heroPortraitDark} type="image/webp" />
      <img src={heroPortrait} alt={alt} aria-hidden={ariaHidden} className={className} style={style} />
    </picture>
  );
}

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
  const boxRef = useRef(null);

  // The eyes follow the cursor. Mouse and pen only (on touch the page scrolls
  // instead), and not at all for reduced-motion visitors.
  useEffect(() => {
    const box = boxRef.current;
    if (!box || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const eyes = [...box.querySelectorAll(".eye")].map((el) => ({ el, iris: el.querySelector(".eye-iris"), x: 0, y: 0 }));
    let tx = null; // pointer target, or null when it has left
    let ty = null;
    let raf = 0;
    const step = () => {
      raf = 0;
      let moving = false;
      for (const e of eyes) {
        const r = e.el.getBoundingClientRect();
        let gx = 0;
        let gy = 0;
        if (r.width > 0 && tx != null) {
          const cx = r.left + parseFloat(e.el.dataset.cx) * r.width;
          const cy = r.top + parseFloat(e.el.dataset.cy) * r.height;
          const reach = Math.max(260, window.innerWidth * 0.3);
          let dx = (tx - cx) / reach;
          let dy = (ty - cy) / reach;
          const len = Math.hypot(dx, dy);
          if (len > 1) {
            dx /= len;
            dy /= len;
          }
          gx = dx * parseFloat(e.el.dataset.mx);
          gy = dy * parseFloat(e.el.dataset.my);
        }
        e.x += (gx - e.x) * 0.2;
        e.y += (gy - e.y) * 0.2;
        if (Math.abs(gx - e.x) > 0.02 || Math.abs(gy - e.y) > 0.02) moving = true;
        e.iris.style.transform = `translate(${e.x.toFixed(2)}%, ${e.y.toFixed(2)}%)`;
      }
      if (moving) raf = requestAnimationFrame(step);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };
    const onMove = (ev) => {
      if (ev.pointerType === "touch") return;
      tx = ev.clientX;
      ty = ev.clientY;
      kick();
    };
    const onLeave = () => {
      tx = null;
      kick();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("scroll", kick, { passive: true }); // the eyes move on the page, so re-aim while scrolling
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("scroll", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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
    <div className="absolute left-[calc(var(--u)*290)] top-[calc(var(--u)*220)] z-0 h-[calc(var(--u)*796)] w-[calc(var(--u)*860)] overflow-hidden max-md:relative max-md:left-0 max-md:top-0 max-md:order-last max-md:mt-auto max-md:h-auto max-md:w-full">
      {/* One box with the photo's own proportions, so the eye pieces (placed in
          photo percentages) line up on every screen. */}
      <div ref={boxRef} className="absolute inset-0 max-md:relative max-md:inset-auto max-md:aspect-[675/625] max-md:w-full">
        <PortraitPicture
          alt="Black and white glitched portrait of Aishwar"
          className="absolute inset-0 block h-full w-full"
        />
        {bands.map((b, i) => (
          <PortraitPicture
            key={i}
            alt=""
            ariaHidden="true"
            className={`absolute inset-0 block h-full w-full ${b.blend === "difference" ? "glitch-diff" : ""}`}
            style={{
              clipPath: b.clip,
              transform: `translateX(${b.tx}px)`,
              opacity: b.op,
              willChange: "transform, clip-path",
            }}
          />
        ))}
        <Eyes variant="light" />
        <Eyes variant="dark" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <div className="relative h-[calc(var(--u)*1000)] w-full overflow-hidden bg-paper text-ink max-md:flex max-md:h-auto max-md:min-h-[100svh] max-md:flex-col">
      <GlitchPortrait />

      <header data-line-start className="relative z-20 grid h-[max(56px,calc(var(--u)*72))] grid-cols-12 items-center gap-6 border-b border-line px-20 text-[length:max(13px,calc(var(--u)*13))] max-md:flex max-md:justify-between max-md:gap-3">
        <nav aria-label="Primary left" className="col-start-1 col-end-5 flex gap-10 max-md:gap-4">
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
          className="col-start-6 col-end-8 justify-self-center text-[length:max(22px,calc(var(--u)*22))] font-semibold leading-none tracking-[0.02em] max-md:text-[20px]"
        >
          AM
        </a>
        <nav aria-label="Primary right" className="col-start-9 col-end-13 flex justify-end gap-10 underline">
          <a href="#contact">contact</a>
        </nav>
      </header>

      <section id="home" aria-label="Hero" className="relative z-10 pt-[calc(var(--u)*24)]">
        <div className="grid h-[calc(var(--u)*150)] grid-cols-12 items-center gap-6 border-b border-line px-20 max-md:flex max-md:h-auto max-md:flex-wrap max-md:items-end max-md:justify-between max-md:gap-x-3 max-md:gap-y-2 max-md:py-4">
          <p className="col-start-1 col-end-3 m-0 text-[length:max(11px,calc(var(--u)*11))] leading-[1.35] text-muted max-md:order-1">
            a seasoned <br />
            operator&nbsp;
            <br />
          </p>
          <h1 className="col-start-3 col-end-11 m-0 grid grid-cols-8 gap-6 whitespace-nowrap text-u112 font-medium leading-none tracking-[-0.045em] max-md:order-3 max-md:flex max-md:w-full max-md:gap-[0.22em] max-md:text-[14.5vw]">
            <span className="col-start-1 col-end-3">i’m</span>
            <span className="col-start-3 col-end-9">aishwar</span>
          </h1>
          <p className="col-start-11 col-end-13 m-0 text-right text-[length:max(11px,calc(var(--u)*11))] leading-[1.35] text-muted max-md:order-2">
            with over
            <br />
            1+ years
          </p>
        </div>

        <div className="grid h-[calc(var(--u)*150)] grid-cols-12 items-center gap-6 border-b border-line px-20 max-md:flex max-md:h-auto max-md:flex-wrap max-md:items-baseline max-md:gap-x-[0.25em] max-md:gap-y-2 max-md:py-4 max-md:text-[14.5vw]">
          <p className="col-start-1 col-end-4 m-0 text-u112 font-medium leading-none tracking-[-0.045em] max-md:text-[1em]">and</p>
          <p className="col-start-4 col-end-5 m-0 text-u112 font-medium leading-none tracking-[-0.045em] max-md:text-[1em]">i</p>
          <p className="col-start-8 col-end-11 m-0 text-right text-u112 font-medium leading-none tracking-[-0.045em] max-md:ml-auto max-md:text-[1em]">
            make
          </p>
          <p className="col-start-11 col-end-13 m-0 text-right text-[length:max(11px,calc(var(--u)*11))] leading-[1.35] text-muted max-md:w-full max-md:text-left">
            collaborates
            <br />
            with the world
          </p>
        </div>

        <div className="grid h-[calc(var(--u)*150)] grid-cols-12 items-center gap-6 border-b border-line px-20 max-md:flex max-md:h-auto max-md:flex-wrap max-md:items-baseline max-md:gap-y-2 max-md:py-4 max-md:text-[14.5vw]">
          <p className="col-start-1 col-end-3 m-0 text-[length:max(11px,calc(var(--u)*11))] leading-[1.35] text-muted max-md:w-full max-md:text-[11px]">
            haven’t had the
            <br />
            privilege
          </p>
          <p className="col-start-3 col-end-6 m-0 text-u112 font-medium leading-none tracking-[-0.045em] max-md:text-[1em]">ideas</p>
          <p className="col-start-8 col-end-11 m-0 text-right text-u112 font-medium leading-none tracking-[-0.045em] max-md:ml-auto max-md:text-[1em]">
            work
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 px-20 pt-5 max-md:gap-3 max-md:pb-2">
          <p className="col-start-1 col-end-4 m-0 text-[length:max(13px,calc(var(--u)*13))] leading-[1.5] text-muted md:text-[12px] md:leading-[1.45]">
            My focus is on creating something that not only look great but also drive change and create real
            business impact
          </p>
          <a
            href="#contact"
            className="press col-start-11 col-end-13 box-border min-h-[44px] justify-self-end py-3 text-[length:max(12px,calc(var(--u)*12))] font-semibold tracking-[0.04em] max-md:justify-self-start"
          >
            ( CONTACT ME )
          </a>
        </div>
      </section>
    </div>
  );
}
