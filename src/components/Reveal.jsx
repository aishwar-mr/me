import { useReveal } from "@/hooks/useReveal";

// Wraps a section's heading/text/picture so each arrives with a quiet
// rise-and-fade the first time it scrolls into view. Pass `delay` (ms) to
// stagger a few of these a beat apart within the same section.
export function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...props }) {
  const [ref, inView] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
