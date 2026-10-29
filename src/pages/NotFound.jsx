import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="label">404</p>
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
        Page not found<span className="text-vermilion">.</span>
      </h1>
      <Link
        to="/"
        className="text-sm uppercase tracking-[0.2em] text-ink/70 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-vermilion"
      >
        Back home
      </Link>
    </section>
  );
}
