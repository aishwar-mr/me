import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

// On every route change: jump to a #hash target if the URL has one
// (e.g. navigating to /#proof from another page), otherwise reset to top.
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) {
      const id = window.requestAnimationFrame(() => {
        const el = document.querySelector(hash);
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { duration: 1.2 });
        else el.scrollIntoView();
      });
      return () => window.cancelAnimationFrame(id);
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash, lenis]);

  return null;
}
