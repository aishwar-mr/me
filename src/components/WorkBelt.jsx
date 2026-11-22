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

// `w`/`h` are the print size on a 1440px-wide screen; `r` is its tilt in
// degrees and `j` a small [x, y] nudge (-1..1) so the grid reads as tossed.
const ITEMS = [
  { src: protoK1C, cap: "Prototyping parts on the K1C.", w: 300, h: 225, r: -4, j: [-0.6, 0.5] },
  { src: weekendRun, cap: "Weekend laps to clear the head.", w: 300, h: 250, r: 3, j: [0.4, -0.7] },
  { src: cityGlow, cap: "City glow from the window.", w: 210, h: 280, r: -2, j: [-0.3, 0.6] },
  { src: duskSkyline, cap: "Dusk settling over the skyline.", w: 360, h: 190, r: 4, j: [0.6, 0.2] },
  { src: shoreMorning, cap: "Slow mornings by the shore.", w: 300, h: 225, r: -3, j: [-0.5, -0.5] },
  { src: wanderingRunning, cap: "Out wandering & running", w: 210, h: 280, r: 3, j: [0.5, 0.6] },
  { src: captionIt, cap: "Caption it", w: 225, h: 300, r: -4, j: [-0.4, -0.3] },
  { src: cityVsNature, cap: "when the city lives nature broods", w: 330, h: 220, r: 2, j: [0.3, 0.7] },
  { src: jammuKashmirTrek, cap: "Pine air and a long view.", w: 340, h: 200, r: -3, j: [-0.6, 0.3] },
  { src: trekkingAltitude, cap: "Trekking up through the clouds\n~2,500 ft", w: 230, h: 300, r: 4, j: [0.5, -0.4] },
];

const LABEL = "text-[12px] font-medium uppercase tracking-[0.06em]";

// Lays the prints out on a loose grid so every one keeps a clear, visible
// part: a print that would be hidden more than ~18% by its neighbours is
// shrunk to fit its cell. Returns each print's size and resting position.
function computeLayout(width) {
  const k = width < 768 ? 0.56 : Math.min(1.5, Math.max(0.62, width / 1440));
  const cols = width < 560 ? 3 : width < 1000 ? 4 : 5;
  const rows = Math.ceil(ITEMS.length / cols);
  const pad = width < 768 ? 12 : 24;
  const cellW = (width - pad * 2) / cols;
  const rowH = 300 * k * 0.92;
  const height = Math.round(rows * rowH + pad * 2);
  const prints = ITEMS.map((it, i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const inRow = r === rows - 1 ? ITEMS.length - r * cols : cols;
    const rowOffset = ((cols - inRow) * cellW) / 2;
    const s = Math.min(1, (cellW * 1.18) / (it.w * k), (rowH * 1.12) / (it.h * k));
    const w = Math.round(it.w * k * s);
    const h = Math.round(it.h * k * s);
    return {
      w,
      h,
      x: pad + rowOffset + c * cellW + (cellW - w) / 2 + it.j[0] * cellW * 0.07,
      y: pad + r * rowH + (rowH - h) / 2 + it.j[1] * rowH * 0.06,
    };
  });
  return { height, prints };
}

function Lightbox({ index, onClose, onStep }) {
  const closeRef = useRef(null);
  const swipeRef = useRef(null);
  const item = ITEMS[index];

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  const arrow = "lightbox-btn absolute top-1/2 -translate-y-1/2 max-md:top-auto max-md:bottom-5 max-md:translate-y-0";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="lightbox fixed inset-0 z-[100] flex items-center justify-center bg-paper/[0.985]"
      onClick={onClose}
    >
      <figure
        className="m-0 flex max-w-[92vw] flex-col items-center gap-4"
        style={{ touchAction: "pan-y" }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => (swipeRef.current = e.clientX)}
        onPointerUp={(e) => {
          if (swipeRef.current == null) return;
          const dx = e.clientX - swipeRef.current;
          swipeRef.current = null;
          if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
        }}
      >
        <img
          key={index}
          src={item.src}
          alt={item.cap.replace("\n", " ")}
          className="lightbox-img max-h-[74vh] max-w-[92vw] select-none rounded-[6px] object-contain shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
          draggable="false"
        />
        <figcaption className="text-center text-[14px] leading-[1.45] text-soft">
          <span className="block whitespace-pre-line">{item.cap}</span>
          <span className="font-mono mt-1 block text-[11px] uppercase text-muted">
            {String(index + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
          </span>
        </figcaption>
      </figure>

      <button ref={closeRef} type="button" aria-label="Close photo viewer" onClick={onClose} className="lightbox-btn absolute right-5 top-5">
        ✕
      </button>
      <button type="button" aria-label="Previous photo" onClick={(e) => (e.stopPropagation(), onStep(-1))} className={`${arrow} left-5 max-md:left-[calc(50%-64px)]`}>
        ←
      </button>
      <button type="button" aria-label="Next photo" onClick={(e) => (e.stopPropagation(), onStep(1))} className={`${arrow} right-5 max-md:right-[calc(50%-64px)]`}>
        →
      </button>
    </div>
  );
}

function Pile() {
  const wrapRef = useRef(null);
  const zRef = useRef(ITEMS.length);
  const dragRef = useRef(null);
  const movedRef = useRef(false);
  const lastOpenerRef = useRef(null);
  const [width, setWidth] = useState(() => (typeof window === "undefined" ? 1440 : window.innerWidth));
  // Prints the visitor has dragged: fractions of the free space, so they keep
  // their place when the pile is resized. Everything else follows the grid.
  const [moved, setMoved] = useState({});
  const [z, setZ] = useState(() => ITEMS.map((_, i) => i + 1));
  const [dragging, setDragging] = useState(-1);
  const [open, setOpen] = useState(-1);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    // Prints are tossed onto the pile the first time it scrolls into view.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setLanded(true);
      return () => ro.disconnect();
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLanded(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => (ro.disconnect(), io.disconnect());
  }, []);

  const layout = computeLayout(width);
  const { height } = layout;
  const placeOf = (i) => {
    const { w, h, x, y } = layout.prints[i];
    const m = moved[i];
    return m ? { w, h, x: m.x * Math.max(0, width - w), y: m.y * Math.max(0, height - h) } : { w, h, x, y };
  };

  const onPointerDown = (e, i) => {
    if (e.button !== undefined && e.button !== 0) return;
    const pl = placeOf(i);
    zRef.current += 1;
    dragRef.current = { i, sx: e.clientX, sy: e.clientY, px: pl.x, py: pl.y, w: pl.w, h: pl.h, touch: e.pointerType === "touch" };
    movedRef.current = false;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setZ((p) => p.map((v, j) => (j === i ? zRef.current : v)));
  };
  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.sx;
    const dy = d.touch ? 0 : e.clientY - d.sy; // vertical pan belongs to the page on touch
    if (!movedRef.current && Math.hypot(dx, dy) < 5) return;
    if (!movedRef.current) {
      movedRef.current = true;
      setDragging(d.i);
    }
    const fx = Math.min(1, Math.max(0, (d.px + dx) / Math.max(1, width - d.w)));
    const fy = Math.min(1, Math.max(0, (d.py + dy) / Math.max(1, height - d.h)));
    setMoved((m) => ({ ...m, [d.i]: { x: fx, y: fy } }));
  };
  const endDrag = () => {
    dragRef.current = null;
    setDragging(-1);
  };
  const onClick = (e, i) => {
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    lastOpenerRef.current = e.currentTarget;
    setOpen(i);
  };

  const close = () => {
    setOpen(-1);
    lastOpenerRef.current?.focus?.();
  };
  const step = (n) => setOpen((i) => (i < 0 ? i : (i + n + ITEMS.length) % ITEMS.length));

  return (
    <>
      <div
        ref={wrapRef}
        className={`pile relative w-full overflow-hidden ${landed ? "pile-landed" : ""}`}
        style={{ height }}
        aria-label="Photos"
      >
        {ITEMS.map((it, i) => {
          const { w, h, x, y } = placeOf(i);
          return (
            <button
              key={it.src}
              type="button"
              aria-label={`Open photo: ${it.cap.replace("\n", " ")}`}
              className={`print absolute left-0 top-0 m-0 border-0 bg-transparent p-0 ${dragging === i ? "print-drag" : ""}`}
              style={{
                width: w,
                height: h,
                zIndex: z[i],
                transform: `translate(${x}px, ${y}px) rotate(${it.r}deg)`,
                touchAction: "pan-y",
              }}
              onPointerDown={(e) => onPointerDown(e, i)}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onClick={(e) => onClick(e, i)}
            >
              <span className="print-in block h-full w-full" style={{ "--i": i }}>
                <span className="print-lift block h-full w-full">
                  <img src={it.src} alt="" draggable="false" className="block h-full w-full select-none object-cover" />
                </span>
              </span>
            </button>
          );
        })}
      </div>
      {open >= 0 ? <Lightbox index={open} onClose={close} onStep={step} /> : null}
    </>
  );
}

export function WorkBelt() {
  return (
    <section id="work" data-line aria-label="Work" className="border-b border-line py-14 max-md:py-10">
      <nav aria-label="Work, top" className={`mb-7 grid grid-cols-12 gap-6 px-20 max-md:mb-5 max-md:flex max-md:justify-between ${LABEL}`}>
        <a href="#hardware" className="nav-link col-start-1 col-end-5">
          Hardware
        </a>
        <a href="#media" className="nav-link col-start-10 col-end-13 text-right">
          Media
        </a>
      </nav>
      <Pile />
      <p className="photos-hint font-mono m-0 mt-4 px-20 text-center text-[length:max(11px,calc(var(--u)*11))] uppercase text-muted">
        <span className="hint-pointer">Drag them around, or click one for a closer look.</span>
        <span className="hint-touch">Tap one for a closer look, then swipe.</span>
      </p>
      <nav aria-label="Work, bottom" className={`mt-7 grid grid-cols-12 gap-6 px-20 max-md:mt-5 max-md:flex max-md:justify-between ${LABEL}`}>
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
