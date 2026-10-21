import Link from "next/link";
import type { ProjectItem } from "@/lib/content";
import { Reveal } from "./Reveal";

export function ProjectItemList({
  heading,
  items,
  projectSlug,
}: {
  heading: string;
  items: ProjectItem[];
  projectSlug: string;
}) {
  return (
    <section className="border-t border-border px-[4vw] py-16 md:py-20">
      <Reveal className="mx-auto grid max-w-5xl gap-4 md:grid-cols-[200px_1fr] md:gap-12">
        <h2 className="text-sm font-semibold uppercase tracking-widest">{heading}</h2>

        {items.length === 0 ? (
          <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
            Breakdowns will be listed here as they&apos;re added.
          </p>
        ) : (
          <ul className="max-w-2xl divide-y divide-border border-y border-border">
            {items.map((item) => {
              const href = item.sections && item.slug ? `/work/${projectSlug}/${item.slug}` : item.href;
              const row = (
                <div className="group flex items-start justify-between gap-6 py-5">
                  <div>
                    <h3 className="text-lg font-semibold uppercase tracking-tight">{item.title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-text-muted">{item.summary}</p>
                  </div>
                  {href && (
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  )}
                </div>
              );

              return (
                <li key={item.title}>
                  {href ? (
                    <Link
                      href={href}
                      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text/40"
                    >
                      {row}
                    </Link>
                  ) : (
                    row
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Reveal>
    </section>
  );
}
