import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import { Logo } from "@/components/Logo";
import { useViewTransitionNavigate } from "@/hooks/useViewTransitionNavigate";

// Matches the names given to one image on each project's detail page (see
// VT_NAME in ProjectDetail.jsx) so the card photo visibly carries into the
// hero slot instead of the page just swapping.
const VT_NAME = { 1: "project-photo-1", 2: "project-photo-2", 3: "project-photo-3", 4: "project-photo-4" };

// Each card drifts on its own looping sine path; all four pause together
// when any card is clicked, and resume when the background is clicked.
const CARD_MOTION = [
  { rot: -13, fx: 0.31, fy: 0.43, gx: 0.71, gy: 0.57, fr: 0.52, px: 0.3, py: 1.9 },
  { rot: -27, fx: 0.27, fy: 0.37, gx: 0.63, gy: 0.81, fr: 0.47, px: 2.4, py: 0.6 },
  { rot: -5, fx: 0.35, fy: 0.29, gx: 0.77, gy: 0.66, fr: 0.58, px: 4.1, py: 3.3 },
  { rot: 7, fx: 0.23, fy: 0.41, gx: 0.59, gy: 0.73, fr: 0.44, px: 5.6, py: 4.8 },
];

function computeTransform(c, e) {
  const x = 569 + 470 * Math.sin(e * c.fx + c.px) + 90 * Math.sin(e * c.gx + c.py);
  const y = 290 + 220 * Math.sin(e * c.fy + c.py) + 70 * Math.sin(e * c.gy + c.px);
  const r = c.rot + 10 * Math.sin(e * c.fr + c.px);
  return `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${r.toFixed(2)}deg)`;
}

// Below this width the cards stack in a normal column instead of floating.
const STACK_QUERY = "(max-width: 1023px)";

function useFloatingCards(speed = 1) {
  const [paused, setPaused] = useState(false);
  const [transforms, setTransforms] = useState(() => CARD_MOTION.map((c) => computeTransform(c, 0)));
  const pausedRef = useRef(false);
  const elapsedRef = useRef(0);
  const lastRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    lastRef.current = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - lastRef.current) / 1000);
      lastRef.current = now;
      if (!pausedRef.current && !window.matchMedia(STACK_QUERY).matches) {
        elapsedRef.current += dt * speed;
        setTransforms(CARD_MOTION.map((c) => computeTransform(c, elapsedRef.current)));
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed]);

  return { transforms, paused, pause: () => setPaused(true), resume: () => setPaused(false) };
}

function OpenProjectLink({ project }) {
  const vtNavigate = useViewTransitionNavigate();
  const isRoute = project.link.startsWith("/");
  const className =
    "flex h-6 w-6 flex-none items-center justify-center rounded bg-[#2a2a2a] text-[#f5f4f0] transition-colors duration-200 hover:bg-[#f5f4f0] hover:text-[#0e0e0e]";

  if (!isRoute) {
    return (
      <a href={project.link} aria-label="Open project" className={className}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3 9L9 3M4 3h5v5" />
        </svg>
      </a>
    );
  }

  return (
    <a
      href={project.link}
      aria-label="Open project"
      className={className}
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        vtNavigate(project.link);
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 9L9 3M4 3h5v5" />
      </svg>
    </a>
  );
}

function ProjectCard({ project, transform, zIndex, onPause }) {
  return (
    <article
      onClick={onPause}
      className="absolute left-0 top-0 flex w-[302px] cursor-pointer max-lg:!static max-lg:!h-auto max-lg:w-full max-lg:max-w-[460px] max-lg:self-center max-lg:!transform-none flex-col overflow-hidden rounded-[14px] bg-[#0e0e0e] text-[#f5f4f0] dark:ring-1 dark:ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-[filter] duration-200 will-change-transform hover:[filter:brightness(1.08)]"
      style={{ height: 420, transform, zIndex }}
    >
      {project.cardImage ? (
        <img
          src={project.cardImage}
          alt={project.cardImageAlt}
          style={{
            height: project.cardImgHeight,
            background: project.cardImageBg,
            viewTransitionName: VT_NAME[project.id],
          }}
          className="w-full object-cover"
        />
      ) : (
        <div
          className="wf-ph-dark flex items-center justify-center"
          style={{ height: project.cardImgHeight }}
          role="img"
          aria-label="Project image placeholder"
        >
          <span className="bg-[#3a3a3a] px-1.5 py-[3px] font-mono text-[10px] text-[#cfcfcf]">PROJECT MOCKUP</span>
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between px-[22px] pb-5 pt-[18px] max-lg:gap-6">
        <h2 className="m-0 whitespace-pre-line text-[30px] font-medium uppercase leading-none tracking-[-0.02em]">
          {project.cardTitle}
        </h2>
        <div className="flex items-start justify-between gap-4 border-t border-[#333333] pt-3">
          <p className="m-0 font-mono text-[10px] uppercase leading-[1.45] text-[#9a9a9a]">{project.cardDesc}</p>
          <OpenProjectLink project={project} />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const { transforms, paused, pause, resume } = useFloatingCards(1);
  const outerRef = useRef(null);
  // The composition is drawn on a 1440 x 1000 stage; scale the whole stage to
  // the width of the screen so its proportions hold on any desktop or tablet.
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / 1440);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={outerRef}
      onClick={resume}
      style={{ height: 1000 * scale }}
      className="relative w-full overflow-hidden bg-paper font-sans text-ink max-lg:!h-auto"
    >
      <div
        style={{ transform: `scale(${scale})` }}
        className="relative h-[1000px] w-[1440px] origin-top-left max-lg:flex max-lg:!h-auto max-lg:w-full max-lg:flex-col max-lg:gap-5 max-lg:px-5 max-lg:pb-10 max-lg:!transform-none"
      >
        <header className="absolute left-0 top-0 z-[3] grid w-full grid-cols-12 items-start gap-[24px] px-[80px] pt-5 max-lg:static max-lg:flex max-lg:justify-between max-lg:px-0">
          <Logo className="pt-[7px]" />
          <nav
            aria-label="Primary"
            className="col-start-8 col-end-13 flex justify-end gap-16 pt-[10px] font-mono text-[13px] font-semibold max-lg:gap-6"
          >
            <a href="#work" />
            <a href="/#contact" className="nav-link">
              CONTACT
            </a>
            <Link to="/about" className="nav-link">
              ABOUT
            </Link>
          </nav>
        </header>

        <h1
          aria-label="Projects"
          className="absolute left-0 top-[590px] z-0 w-full text-center text-[220px] font-normal leading-none tracking-[-0.02em] max-lg:static max-lg:mt-4 max-lg:text-left max-lg:text-[min(15vw,150px)]"
        >
          PR<span className="font-display text-[250px] italic max-lg:text-[1.14em]">O</span>JECTS
        </h1>

        <p className="absolute left-[514.67px] top-[84px] z-0 w-[410.67px] text-center font-mono text-[11px] uppercase leading-[1.5] max-lg:static max-lg:w-auto max-lg:text-left">
          [Short intro line one]
          <br />
          [What you do — line two]
          <br />
          /[here’s some of my works]
        </p>

        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            transform={transforms[i]}
            zIndex={4 - i}
            onPause={(e) => {
              e.stopPropagation();
              pause();
            }}
          />
        ))}

        <p
          aria-live="polite"
          className="font-mono absolute bottom-7 right-20 z-[30] m-0 text-[10px] uppercase tracking-[0.06em] text-muted max-lg:hidden"
        >
          {paused ? "Paused · click anywhere to resume" : "Click a card to pause"}
        </p>

        <p className="absolute left-[406px] top-[920px] z-[3] w-[628px] text-center font-mono text-[12px] font-semibold uppercase leading-[1.5] max-lg:static max-lg:mt-4 max-lg:w-auto max-lg:text-left">
          I’m based in MUMBAI, INDIA
          <br />
          focused on BRIDGING GAP BETWEEN CUSTOMER &amp; BUSINESS
        </p>
      </div>
    </div>
  );
}
