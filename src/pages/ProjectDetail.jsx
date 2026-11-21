import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject } from "@/data/projects";
import { FooterBar } from "@/components/FooterBar";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { RollingValue } from "@/components/RollingValue";

// The photo a Projects card shows is given the same CSS view-transition-name
// as one image on that project's detail page, so navigating here visibly
// carries the picture into place (see useViewTransitionNavigate). Project 1's
// card photo is literally slides[0]; project 2's card photo is a crop of the
// same saturation-gauge screen as screenshot index 1, the closest match.
const VT_NAME = { 1: "project-photo-1", 2: "project-photo-2" };
const VT_INDEX = { 1: 0, 2: 1 };

function Carousel({ slides, vtName, vtIndex }) {
  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSlide((s) => (s + 1) % slides.length), 4000);
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  const go = (i) => {
    clearInterval(timerRef.current);
    setSlide(i);
    timerRef.current = setInterval(() => setSlide((s) => (s + 1) % slides.length), 4000);
  };

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Project photos"
      className="relative h-[calc(var(--u)*680)] overflow-hidden max-md:h-[min(120vw,520px)] rounded-[14px] bg-[#0e0e0e]"
    >
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-in-out"
          style={{ opacity: i === slide ? 1 : 0, viewTransitionName: i === vtIndex ? vtName : undefined }}
        />
      ))}
      <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
        <span className="rounded bg-[rgba(14,14,14,0.6)] px-2 py-1 font-mono text-[length:max(11px,calc(var(--u)*11))] text-[#f5f4f0]">
          {`0${slide + 1} / 0${slides.length}`}
        </span>
        <div className="flex gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              onClick={() => go(i)}
              className="flex h-11 w-11 items-center justify-center border-0 bg-transparent p-0"
            >
              <span
                className="block h-[3px] w-7 rounded-sm"
                style={{ background: i === slide ? "#f5f4f0" : "rgba(245,244,240,0.4)" }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenGrid({ items, href, vtName, vtIndex }) {
  return (
    <div className="col-start-1 col-end-13 grid grid-cols-12 gap-y-6">
      {items.map((it, i) => (
        <a
          key={it.src}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={`relative block h-[calc(var(--u)*298)] overflow-hidden max-md:h-[56vw] rounded-xl border border-line bg-white ${
            i % 2 === 0 ? "col-start-1 col-end-7" : "col-start-7 col-end-13"
          }`}
        >
          <img
            src={it.src}
            alt={it.alt}
            className="h-full w-full object-cover"
            style={{ viewTransitionName: i === vtIndex ? vtName : undefined }}
          />
          <span className="font-mono absolute bottom-3.5 left-3.5 rounded bg-[rgba(14,14,14,0.82)] px-2.5 py-1 text-[length:max(10px,calc(var(--u)*10))] uppercase text-[#f5f4f0]">
            {it.caption}
          </span>
        </a>
      ))}
    </div>
  );
}

const TITLES = {
  1: (
    <>
      Track
      <br />
      Monit<span className="font-display font-normal italic normal-case">o</span>r
    </>
  ),
  2: (
    <>
      Startup
      <br />
      Intellig<span className="font-display font-normal italic normal-case">e</span>nce
    </>
  ),
};

export function ProjectDetail() {
  const { id } = useParams();
  const project = getProject(id) ?? getProject("1");
  const d = project.detail ?? getProject("1").detail;
  const titleKey = project.id === "2" ? 2 : 1;
  const vtName = VT_NAME[titleKey];
  const vtIndex = VT_INDEX[titleKey];

  return (
    <div className="w-full bg-paper font-sans text-ink">
      <header className="g12 flex h-[max(56px,calc(var(--u)*72))] items-center justify-between border-b border-line">
        <Link to="/projects" className="nav-link font-mono col-start-1 col-end-4 text-[length:max(12px,calc(var(--u)*12))] font-semibold uppercase">
          ← All projects
        </Link>
        <Logo />
        <nav aria-label="Primary" className="font-mono col-start-9 col-end-13 flex justify-end gap-12 text-[length:max(12px,calc(var(--u)*12))] font-semibold uppercase max-md:gap-4">
          <Link to="/projects" className="nav-link max-md:hidden">
            Design – Folio
          </Link>
          <a href="/#contact" className="nav-link">
            (Contact)
          </a>
          <Link to="/about" className="nav-link">
            (About)
          </Link>
        </nav>
      </header>

      <section aria-label="Project title" className="g12 gap-y-6 pt-14">
        <p className="font-mono col-start-1 col-end-3 m-0 text-[length:max(11px,calc(var(--u)*11))] uppercase leading-[1.5] text-[#57544d]">
          Project
          <br />
          {`${d.index} / 04`}
        </p>
        <p className="font-mono col-start-5 col-end-9 m-0 whitespace-pre-line text-center text-[length:max(11px,calc(var(--u)*11))] max-md:text-left uppercase leading-[1.5]">
          {d.tagline}
        </p>
        <p className="font-mono col-start-11 col-end-13 m-0 whitespace-pre-line text-right text-[length:max(11px,calc(var(--u)*11))] max-md:text-left uppercase leading-[1.5] text-[#57544d]">
          {d.category}
          <br />
          {d.year}
        </p>
        <Reveal
          as="h1"
          className="col-start-1 col-end-13 m-0 mt-6 text-u128 font-medium uppercase leading-[0.95] tracking-[-0.045em] max-md:mt-2 max-md:text-[11vw]"
        >
          {TITLES[titleKey]}
        </Reveal>
      </section>

      <section aria-label="Project facts" className="g12 mt-14 border-y border-line max-md:mt-8 max-md:!grid-cols-2 max-md:gap-x-4 max-md:!gap-y-0">
        {d.facts.map((f, i) => (
          <div
            key={f.label}
            className={`border-r border-line py-5 max-md:!col-auto max-md:border-b max-md:border-r-0 max-md:py-4 ${
              i === 0 ? "col-start-1 col-end-4" : i === 1 ? "col-start-4 col-end-7" : i === 2 ? "col-start-7 col-end-9" : "col-start-9 col-end-11"
            }`}
          >
            <p className="font-mono m-0 mb-2 text-[length:max(10px,calc(var(--u)*10))] uppercase text-[#57544d]">{f.label}</p>
            <p className="m-0 text-[length:max(15px,calc(var(--u)*15))]">{f.value}</p>
          </div>
        ))}
        <div className="col-start-11 col-end-13 flex items-center justify-end py-5 max-md:!col-span-2 max-md:justify-start max-md:py-4">
          {d.factsAction.type === "link" ? (
            <a
              href={d.factsAction.href}
              target="_blank"
              rel="noreferrer"
              className="press font-mono text-[length:max(12px,calc(var(--u)*12))] font-semibold uppercase"
            >
              {d.factsAction.label}
            </a>
          ) : (
            <span className="font-mono whitespace-pre-line text-right text-[length:max(11px,calc(var(--u)*11))] font-semibold uppercase leading-[1.5]">
              {d.factsAction.value}
            </span>
          )}
        </div>
      </section>

      <section aria-label={d.media.type === "carousel" ? "Hero image" : "App screenshots"} className="g12 mt-10">
        {d.media.type === "carousel" ? (
          <div className="col-start-1 col-end-13">
            <Carousel slides={d.media.slides} vtName={vtName} vtIndex={vtIndex} />
          </div>
        ) : (
          <ScreenGrid items={d.media.items} href={d.media.href} vtName={vtName} vtIndex={vtIndex} />
        )}
      </section>

      <section id="overview" aria-label="Overview" className="g12 border-b border-line pb-10 pt-14">
        <Reveal as="h2" className="col-start-1 col-end-6 m-0 text-u44 font-medium leading-[1.1] tracking-[-0.03em] max-md:text-[30px]">
          {d.overviewHeading[0]}
          <br />
          <span className="text-[#85827a]">{d.overviewHeading[1]}</span> {d.overviewHeading[2]}
        </Reveal>
        <Reveal as="p" delay={100} className="col-start-7 col-end-11 m-0 text-[length:max(14px,calc(var(--u)*14))] leading-[1.6] text-[#45423c]">
          {d.overviewText}
        </Reveal>
      </section>

      <section aria-label="Process" className="g12">
        {d.process.map((step, i) => (
          <Reveal
            as="div"
            key={step.num}
            className={`col-start-1 col-end-13 grid grid-cols-12 items-end gap-6 pb-6 pt-10 max-md:items-start max-md:gap-2 max-md:pt-7 ${
              i < d.process.length - 1 ? "border-b border-line" : ""
            }`}
          >
            <span className="col-start-1 col-end-2 text-right text-u44 leading-none max-md:text-left max-md:text-[32px] text-[#85827a]">
              {step.num}
            </span>
            <h3 className="col-start-2 col-end-5 m-0 text-[length:max(22px,calc(var(--u)*22))] font-medium">{step.title}</h3>
            <p className="col-start-7 col-end-11 m-0 text-[length:max(13px,calc(var(--u)*13))] leading-[1.5] text-[#57544d]">{step.text}</p>
          </Reveal>
        ))}
      </section>

      <section id="results" aria-label="Results" className="g12 mt-14 border-y border-line max-md:mt-8 max-md:!gap-y-0">
        {d.results.map((r, i) => (
          <Reveal
            as="div"
            key={r.label}
            delay={i * 80}
            className={`py-10 max-md:border-r-0 max-md:py-7 ${i === 0 ? "col-start-1 col-end-5 border-r border-line max-md:border-b" : ""} ${
              i === 1 ? "col-start-5 col-end-9 border-r border-line max-md:border-b" : ""
            } ${i === 2 ? "col-start-9 col-end-13" : ""}`}
          >
            <p className={`m-0 ${d.resultsSize} font-medium leading-none tracking-[-0.04em]`}>
              <RollingValue value={r.value} />
            </p>
            <p className="font-mono m-0 mt-4 text-[length:max(11px,calc(var(--u)*11))] uppercase text-[#57544d]">{r.label}</p>
          </Reveal>
        ))}
      </section>

      <FooterBar id="project-footer" className="mt-14" />
    </div>
  );
}
