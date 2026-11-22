import { Link } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import { Reveal } from "@/components/Reveal";

// The two finished projects as plain rows: name, one line, a hard number's
// worth of context. Everything else lives one click away on /projects.
const ROWS = PROJECTS.filter((p) => p.listLine);

export function SelectedWork() {
  return (
    <section id="selected-work" data-line aria-label="Some things I made" className="g12 border-b border-line pb-12 pt-14 max-md:pb-8 max-md:pt-10">
      <Reveal as="h2" className="col-start-1 col-end-7 m-0 mb-8 text-u44 font-medium leading-[1.1] tracking-[-0.03em] max-md:mb-4 max-md:text-[32px]">
        Some things I <span className="text-faint">made</span>
      </Reveal>

      <div className="col-start-1 col-end-13">
        {ROWS.map((p, i) => (
          <Reveal
            as={Link}
            to={p.link}
            key={p.id}
            delay={i * 80}
            className="work-row grid grid-cols-12 items-baseline gap-6 border-t border-line py-7 max-md:gap-2 max-md:py-6"
          >
            <span className="work-num col-start-1 col-end-2 text-u32 leading-none text-faint max-md:text-[24px]">
              {p.detail.index}
            </span>
            <span className="work-name col-start-2 col-end-7 text-u44 font-medium leading-[1.05] tracking-[-0.03em] max-md:text-[30px]">
              {p.cardTitle.replace("\n", " ")}
            </span>
            <span className="col-start-7 col-end-11 text-[length:max(13px,calc(var(--u)*13))] leading-[1.5] text-muted">
              {p.listLine}
            </span>
            <span className="font-mono col-start-11 col-end-13 flex items-baseline justify-end gap-2 text-right text-[length:max(11px,calc(var(--u)*11))] uppercase text-muted max-md:justify-start">
              {p.listMeta}
              <span className="work-arrow inline-block text-[1.4em] leading-none text-ink" aria-hidden="true">
                ↗
              </span>
            </span>
          </Reveal>
        ))}
        <Reveal as="div" className="flex items-baseline justify-between gap-6 border-t border-line pt-6 max-md:flex-col max-md:gap-2">
          <p className="m-0 text-[length:max(13px,calc(var(--u)*13))] text-muted">More projects are on the way.</p>
          <Link to="/projects" className="press font-mono text-[12px] font-semibold uppercase tracking-[0.04em]">
            ( All work → )
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
