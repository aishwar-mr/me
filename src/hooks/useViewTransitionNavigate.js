import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";

// Wraps react-router's navigate() in the View Transitions API so a picture
// with a matching view-transition-name on both pages (the Projects card,
// the project detail hero) visibly travels into place instead of the page
// just swapping. No-ops straight to navigate() when the browser doesn't
// support it or the visitor asked for reduced motion.
export function useViewTransitionNavigate() {
  const navigate = useNavigate();
  return (to) => {
    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof document === "undefined" || !document.startViewTransition) {
      navigate(to);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => navigate(to));
    });
  };
}
