import { Link } from "react-router-dom";

// Previous/next + "back to index" row at the bottom of detail pages,
// matching the main portfolio's ProjectNavigation.
export function PageNav({ previous, next, backTo = "/", backLabel = "Back" }) {
  return (
    <section className="border-t border-ink/15 px-6 py-12 sm:px-10 lg:px-16">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="order-2 sm:order-1">
          {previous ? (
            <Link
              to={previous.href}
              className="group flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-ink/70 transition-colors duration-300 hover:text-ink"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              {previous.title}
            </Link>
          ) : (
            <span />
          )}
        </div>

        <Link
          to={backTo}
          className="order-1 text-xs uppercase tracking-[0.2em] text-ink/70 transition-colors duration-300 hover:text-ink sm:order-2"
        >
          {backLabel}
        </Link>

        <div className="order-3">
          {next ? (
            <Link
              to={next.href}
              className="group flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-ink/70 transition-colors duration-300 hover:text-ink"
            >
              {next.title}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </section>
  );
}
