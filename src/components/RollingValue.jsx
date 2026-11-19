import { useReveal } from "@/hooks/useReveal";

// Rolls each digit of a result figure (₹30 Cr, ~83%, 1st, 6,345 …) up to
// its real value once, the first time it scrolls into view. Non-digit
// characters sit alongside as plain text. The real string stays in the DOM
// for screen readers; the rolling columns are aria-hidden.
export function RollingValue({ value }) {
  const [ref, inView] = useReveal({ rootMargin: "0px 0px -15% 0px" });
  let digitIndex = 0;

  return (
    <span ref={ref} className={`roll ${inView ? "roll-in" : ""}`}>
      <span className="sr-only">{value}</span>
      <span className="roll__digits" aria-hidden="true">
        {[...value].map((ch, i) => {
          if (!/\d/.test(ch)) {
            // A span whose only content is a space is a flex item (each
            // character is its own flex child here), and flex items are
            // block-level boxes — block-level boxes collapse away leading/
            // trailing whitespace-only content entirely. `pre` stops that.
            return (
              <span key={i} style={{ whiteSpace: "pre" }}>
                {ch}
              </span>
            );
          }
          const idx = digitIndex++;
          return (
            <span key={i} className="roll__col">
              <span className="roll__strip" style={{ "--d": ch, "--i": idx }}>
                {Array.from({ length: 10 }, (_, n) => (
                  <span key={n}>{n}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
