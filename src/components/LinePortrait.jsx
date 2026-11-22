import { INK } from "@/data/portraitInk";
import { useReveal } from "@/hooks/useReveal";

// The hand-drawn self portrait, as ink on the page. It draws in the way you
// would sketch it: the portrait from the hair down, then the speech-bubble
// line sweeps out from the collar, then the greeting is written. Without
// motion it is simply the finished drawing — see `.lp` in src/index.css.
export function LinePortrait({ className = "", label = "A line drawing of Aishwar saying “Hi, I’m Aishwar.”" }) {
  const [ref, inView] = useReveal({ rootMargin: "0px 0px -10% 0px", threshold: 0.2 });
  const at = (start, dur) => ({ "--lp-start": `${start}ms`, "--lp-dur": `${dur}ms` });

  return (
    <svg
      ref={ref}
      viewBox={INK.viewBox}
      role="img"
      aria-label={label}
      className={`lp ${inView ? "lp-in" : ""} ${className}`}
    >
      <g className="lp-ink">
        <path className="lp-wipe lp-wipe-y" d={INK.face} style={at(0, 1800)} />
        <path className="lp-wipe lp-wipe-x" d={INK.line} style={at(1500, 1000)} />
        <path className="lp-wipe lp-wipe-x" d={INK.text} style={at(2200, 1200)} />
      </g>
    </svg>
  );
}
