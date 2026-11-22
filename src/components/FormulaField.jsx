import { useEffect, useRef } from "react";
import { FORMULAS } from "@/data/formulas";

// A field of spreadsheet formulas (=VLOOKUP(), =IRR() …) laid behind a section.
// It stays invisible until the pointer is over the section, then lights only
// the cells around the cursor — a soft pool of warm light, the nearest cells
// lifting slightly and glowing in the site's accent. It eases in and out, and
// the light follows the cursor with a damped glide.
//
// Put it as the first child of a `relative isolate` element; it listens on
// that parent. Drawn on a canvas at device resolution; the names are dealt
// from a large shuffled list so no name repeats near another, and the field is
// different on every visit. Touch devices and reduced-motion users get no
// glide (hover only; touch gets nothing).

const CELL_W = 109;
const CELL_H = 37;
const FONT_PX = 11;
const REACH = 52; // px beyond the cursor's own cell that still catches light

const rand = (n) => Math.floor(Math.random() * n);

function shuffled(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Deal names so a cell never matches its left or upper neighbour, and the bag
// is only refilled once every name has been used.
function dealGrid(cols, rows) {
  const cells = [];
  let bag = shuffled(FORMULAS);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const left = c > 0 ? cells[r * cols + c - 1].name : null;
      const up = r > 0 ? cells[(r - 1) * cols + c].name : null;
      if (!bag.length) bag = shuffled(FORMULAS);
      let k = bag.length - 1;
      while (k > 0 && (bag[k] === left || bag[k] === up)) k--;
      const [name] = bag.splice(k, 1);
      cells.push({ name: `=${name}()`, a: 0.86 + Math.random() * 0.14, i: 0 });
    }
  }
  return cells;
}

export function FormulaField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return undefined;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;

    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dark = window.matchMedia("(prefers-color-scheme: dark)");

    // The site's own mono face, read from CSS so the field matches the labels.
    const probe = document.createElement("span");
    probe.className = "font-mono";
    probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none";
    host.appendChild(probe);
    const fontFamily = getComputedStyle(probe).fontFamily;
    probe.remove();

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let cells = [];

    const size = () => {
      w = host.clientWidth;
      h = host.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 3);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const nc = Math.ceil(w / CELL_W);
      const nr = Math.ceil(h / CELL_H);
      if (nc !== cols || nr !== rows) {
        cols = nc;
        rows = nr;
        cells = dealGrid(cols, rows);
        active.clear();
      }
      draw(performance.now());
    };

    const pointer = { x: 0, y: 0 };
    let inside = false;
    let x = 0;
    let y = 0;
    let started = false;
    let last = 0;
    let raf = 0;
    const active = new Set(); // indices of cells that are lit or still fading

    // Lit tiles invert the page: white on the dark theme, black on the light.
    const paint = () =>
      dark.matches
        ? { tile: "255,255,255", ink: "22,20,20", line: "236,100,80", glow: "236,100,80" }
        : { tile: "12,12,14", ink: "246,240,230", line: "217,74,56", glow: "217,74,56" };

    function draw(t) {
      raf = 0;
      const dt = Math.min(0.05, Math.max(0.001, (t - last) / 1000));
      last = t;
      const rect = host.getBoundingClientRect();
      const tx = pointer.x - rect.left;
      const ty = pointer.y - rect.top;
      if (!started) {
        x = tx;
        y = ty;
        started = true;
      }
      // The light glides after the cursor (damped, never snaps)...
      x += (tx - x) * (reduce.matches ? 1 : 1 - Math.exp(-dt * 7));
      y += (ty - y) * (reduce.matches ? 1 : 1 - Math.exp(-dt * 7));

      // ...and every cell eases in and out on its own, so the pool of light
      // melts rather than flickers as the cursor crosses cell edges.
      const targets = new Map();
      if (inside) {
        const c0 = Math.max(0, Math.floor((x - REACH) / CELL_W));
        const c1 = Math.min(cols - 1, Math.floor((x + REACH) / CELL_W));
        const r0 = Math.max(0, Math.floor((y - REACH) / CELL_H));
        const r1 = Math.min(rows - 1, Math.floor((y + REACH) / CELL_H));
        for (let r = r0; r <= r1; r++) {
          for (let c = c0; c <= c1; c++) {
            // distance from the pointer to this cell's rectangle (0 when inside it)
            const dx = Math.max(0, Math.abs(x - (c + 0.5) * CELL_W) - CELL_W / 2);
            const dy = Math.max(0, Math.abs(y - (r + 0.5) * CELL_H) - CELL_H / 2);
            const d = Math.hypot(dx, dy) / REACH;
            if (d >= 1) continue;
            const f = 1 - d;
            targets.set(r * cols + c, f * f * (3 - 2 * f));
          }
        }
      }
      targets.forEach((_, idx) => active.add(idx));

      const lit = [];
      active.forEach((idx) => {
        const cell = cells[idx];
        if (!cell) {
          active.delete(idx);
          return;
        }
        const goal = targets.get(idx) || 0;
        const rate = reduce.matches ? 99 : goal > cell.i ? 9 : 4.4;
        cell.i += (goal - cell.i) * (1 - Math.exp(-dt * rate));
        if (goal === 0 && cell.i < 0.03) {
          cell.i = 0;
          active.delete(idx);
        } else {
          lit.push(idx);
        }
      });

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (!lit.length && !inside) {
        started = false;
        return;
      }

      const c = paint();
      // pass 1 — glowing tiles
      for (const idx of lit) {
        const cell = cells[idx];
        const cx = (idx % cols) * CELL_W;
        const cy = Math.floor(idx / cols) * CELL_H;
        ctx.shadowColor = `rgba(${c.glow},${0.75 * cell.i})`;
        ctx.shadowBlur = 22 * cell.i * dpr;
        ctx.fillStyle = `rgba(${c.tile},${0.97 * cell.i})`;
        ctx.fillRect(cx, cy, CELL_W, CELL_H);
      }
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
      // pass 2 — the grid between cells
      ctx.lineWidth = 1;
      for (const idx of lit) {
        const cell = cells[idx];
        const cx = (idx % cols) * CELL_W;
        const cy = Math.floor(idx / cols) * CELL_H;
        ctx.strokeStyle = `rgba(${c.line},${0.85 * cell.i})`;
        ctx.strokeRect(cx + 0.5, cy + 0.5, CELL_W - 1, CELL_H - 1);
      }
      // pass 3 — the formula
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `600 ${FONT_PX}px ${fontFamily}`;
      for (const idx of lit) {
        const cell = cells[idx];
        const cx = (idx % cols) * CELL_W + CELL_W / 2;
        const cy = Math.floor(idx / cols) * CELL_H + CELL_H / 2;
        ctx.save();
        ctx.translate(cx, cy);
        const sc = 1 + 0.06 * cell.i;
        ctx.scale(sc, sc);
        ctx.fillStyle = `rgba(${c.ink},${Math.min(1, cell.i * 1.4) * cell.a})`;
        ctx.fillText(cell.name, 0, 0);
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    }

    const wake = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    const onEnter = (e) => {
      if (e.pointerType === "touch") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      inside = true;
      wake();
    };
    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!inside) inside = true;
      wake();
    };
    const onLeave = () => {
      inside = false;
      wake();
    };
    const onTheme = () => wake();

    const ro = new ResizeObserver(size);
    ro.observe(host);
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", wake, { passive: true });
    dark.addEventListener("change", onTheme);
    size();
    return () => {
      ro.disconnect();
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", wake);
      dark.removeEventListener("change", onTheme);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[25] h-full w-full" />;
}
