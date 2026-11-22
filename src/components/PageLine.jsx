import { useEffect, useRef } from "react";

// One thin line, drawn as you scroll. It starts at the very top of the page (the ball waits there), runs down
// one margin, and at the bottom edge of each `[data-line]` section turns along
// that section's hairline to the opposite margin, ending beside
// `[data-line-end]`. A basketball leads the line, rolling as it goes and
// resting at the end. Mount it inside a `position: relative` page wrapper;
// it reads its anchors from that wrapper.
const LEAD = 0.72; // the pen sits this far down the viewport
const TURN = 160; // px of scrolling spent on each sideways run
const R = 12; // corner radius
const BALL = 10; // basketball radius, px

export function PageLine() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const tipRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const tip = tipRef.current;
    const root = svg.parentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ruler = document.createElementNS("http://www.w3.org/2000/svg", "path");
    ruler.setAttribute("fill", "none");
    ruler.style.visibility = "hidden"; // only used to measure lengths; never painted
    svg.appendChild(ruler);

    let pts = [];
    let total = 0;
    let rootTop = 0;
    let raf = 0;

    const len = (d) => {
      ruler.setAttribute("d", d);
      return ruler.getTotalLength();
    };

    const build = () => {
      const rr = root.getBoundingClientRect();
      rootTop = rr.top + window.scrollY;
      const W = root.clientWidth;
      const Hh = root.offsetHeight;
      const endEl = root.querySelector("[data-line-end]");
      const y0 = BALL + 2; // the ball sits fully on-screen at the start of the line
      const yEnd = endEl
        ? endEl.getBoundingClientRect().top + endEl.getBoundingClientRect().height / 2 - rr.top
        : Hh - 40;
      const xL = W < 768 ? 10 : (W / 1440) * 40;
      const xR = W - xL;

      const anchors = [];
      [...root.querySelectorAll("[data-line]")]
        .map((el) => el.getBoundingClientRect().bottom - rr.top - 0.5)
        .sort((a, b) => a - b)
        .forEach((y) => {
          const prev = anchors.length ? anchors[anchors.length - 1] : y0;
          if (y > prev + TURN + 120 && y < yEnd - 160) anchors.push(y);
        });

      let d = `M${xL} ${y0}`;
      let cur = xL;
      let dir = 1;
      pts = [{ s: y0, L: 0 }];
      for (const y of anchors) {
        const other = cur === xL ? xR : xL;
        d += ` V${y - R}`;
        const Lv = len(d);
        d += ` Q${cur} ${y} ${cur + dir * R} ${y} H${other - dir * R} Q${other} ${y} ${other} ${y + R}`;
        const Lh = len(d);
        pts.push({ s: y - TURN, L: Lv }, { s: y, L: Lh });
        cur = other;
        dir = -dir;
      }
      d += ` V${yEnd}`;
      total = len(d);
      pts.push({ s: Math.max(pts[pts.length - 1].s + 1, yEnd), L: total });

      svg.setAttribute("width", W);
      svg.setAttribute("height", Hh);
      svg.setAttribute("viewBox", `0 0 ${W} ${Hh}`);
      path.setAttribute("d", d);
      update();
    };

    const drawnAt = (s) => {
      if (s <= pts[0].s) return 0;
      for (let i = 1; i < pts.length; i++) {
        if (s <= pts[i].s) {
          const a = pts[i - 1];
          const b = pts[i];
          return a.L + ((b.L - a.L) * (s - a.s)) / Math.max(1, b.s - a.s);
        }
      }
      return total;
    };

    function update() {
      raf = 0;
      if (!total) return;
      // Near the foot of the page the pen eases down to the bottom edge of the
      // screen, so the line always finishes at its end ring.
      const vh = window.innerHeight;
      const remaining = Math.max(0, root.offsetHeight + rootTop - vh - window.scrollY);
      const bottom = LEAD + (1 - LEAD) * Math.min(1, Math.max(0, 1 - remaining / (vh * 0.6)));
      // At scroll 0 the ball sits at the start of the line; over the first
      // half screen of scrolling it slides ahead to its usual place.
      const lead = bottom * Math.min(1, window.scrollY / (vh * 0.45));
      const s = window.scrollY - rootTop + vh * lead;
      const drawn = reduce ? total : Math.min(total, Math.max(0, drawnAt(s)));
      path.style.strokeDasharray = `${drawn} ${total + 2}`;
      path.style.opacity = drawn > 0 ? 1 : 0;
      const p = path.getPointAtLength(drawn);
      // Rolls without slipping: one radian of turn per radius travelled.
      const deg = ((reduce ? 0 : drawn) / BALL) * (180 / Math.PI);
      tip.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${deg})`);
      tip.style.opacity = 1;
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const ro = new ResizeObserver(build);
    ro.observe(root);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", build);
    document.fonts?.ready.then(build);
    build();
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", build);
      if (raf) cancelAnimationFrame(raf);
      ruler.remove();
    };
  }, []);

  return (
    <svg ref={svgRef} aria-hidden="true" focusable="false" className="page-line pointer-events-none absolute left-0 top-0 z-40">
      <path ref={pathRef} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <g ref={tipRef} className="page-line-ball">
        <circle r={BALL} fill="#e8772e" />
        <g fill="none" stroke="#2b1708" strokeWidth="1.1" strokeLinecap="round">
          <path d={`M${-BALL} 0H${BALL}M0 ${-BALL}V${BALL}`} />
          <path d={`M${-BALL * 0.72} ${-BALL * 0.72}Q${-BALL * 0.28} 0 ${-BALL * 0.72} ${BALL * 0.72}`} />
          <path d={`M${BALL * 0.72} ${-BALL * 0.72}Q${BALL * 0.28} 0 ${BALL * 0.72} ${BALL * 0.72}`} />
        </g>
        <circle r={BALL} fill="none" stroke="#2b1708" strokeWidth="1.1" />
      </g>
    </svg>
  );
}
