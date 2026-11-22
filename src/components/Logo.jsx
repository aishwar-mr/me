import { Link } from "react-router-dom";

// The centered wordmark used in every page header, linking home. One
// consistent "AM" mark replaces the earlier per-page treatments.
export function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      aria-label="Home"
      className={`col-start-6 col-end-8 justify-self-center text-[length:max(22px,calc(var(--u)*22))] font-semibold leading-none tracking-[0.02em] ${className}`}
    >
      AM
    </Link>
  );
}
