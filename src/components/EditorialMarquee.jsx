import { useState } from "react";
import Marquee from "react-fast-marquee";
import { MARQUEE_ITEMS } from "@/content";

function Row() {
  return (
    <div className="flex items-center">
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-8 font-display text-lg uppercase tracking-[0.3em] text-ink sm:text-xl">
            {item}
          </span>
          <span className="h-2 w-2 rounded-full bg-vermilion" />
        </span>
      ))}
    </div>
  );
}

export function EditorialMarquee() {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  return (
    <div
      data-testid="marquee"
      aria-label="Rooms I work in"
      className="overflow-hidden border-y border-ink/10 py-5"
    >
      {reduced ? (
        <div className="flex flex-wrap items-center justify-center gap-y-3 px-6 text-center">
          <Row />
        </div>
      ) : (
        <Marquee speed={35} gradient={false}>
          <Row />
        </Marquee>
      )}
    </div>
  );
}
