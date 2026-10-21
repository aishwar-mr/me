import Link from "next/link";

type NavTarget = { title: string; href: string };

export function ProjectNavigation({
  previous,
  next,
  backHref = "/work",
  backLabel = "All work",
}: {
  previous?: NavTarget;
  next?: NavTarget;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section className="border-t border-border px-[4vw] py-16">
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="order-2 md:order-1">
          {previous ? (
            <Link
              href={previous.href}
              className="group flex items-center gap-2 text-sm uppercase tracking-widest text-text-muted transition-colors hover:text-text"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              {previous.title}
            </Link>
          ) : (
            <span />
          )}
        </div>

        <Link
          href={backHref}
          className="order-1 text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-text md:order-2"
        >
          {backLabel}
        </Link>

        <div className="order-3">
          {next ? (
            <Link
              href={next.href}
              className="group flex items-center gap-2 text-sm uppercase tracking-widest text-text-muted transition-colors hover:text-text"
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
