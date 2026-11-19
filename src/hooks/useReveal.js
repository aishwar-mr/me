import { useEffect, useRef, useState } from "react";

// Fires `true` once, the first time the element is ~12% into the viewport.
// Reduced-motion visitors get `true` immediately (the CSS reveal class is a
// no-op there anyway — see .reveal in index.css — this just skips the
// observer entirely).
export function useReveal({ rootMargin = "0px 0px -12% 0px", threshold = 0.1 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold]);

  return [ref, inView];
}
