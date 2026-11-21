import { Link } from "react-router-dom";
import { EMAIL, FooterBar } from "@/components/FooterBar";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";

const CHAPTERS = [
  {
    when: "[20XX]",
    num: "01",
    title: "[Where it started]",
    text: "[What you were doing, what pulled you in, and the first thing you made or learned that mattered.]",
  },
  {
    when: "[20XX]",
    num: "02",
    title: "[The turn]",
    text: "[A decision, a project, or a problem that changed your direction — and what you figured out because of it.]",
  },
  {
    when: "[20XX]",
    num: "03",
    title: "[Building for real]",
    text: "[The work you’re proudest of so far, who it was for, and the outcome it drove.]",
  },
  {
    when: "Now",
    num: "04",
    title: "[Where I’m headed]",
    text: "[What you’re focused on right now and the kind of problems you want to take on next.]",
  },
];

export function Story() {
  return (
    <div className="min-h-screen w-full bg-paper font-sans text-ink">
      <header className="g12 h-[max(56px,calc(var(--u)*72))] items-center border-b border-line text-[length:max(13px,calc(var(--u)*13))] max-md:flex max-md:h-14 max-md:justify-between max-md:gap-3">
        <nav aria-label="Primary left" className="col-start-1 col-end-5 flex gap-10 max-md:gap-4">
          <Link to="/" className="nav-link">
            home
          </Link>
          <Link to="/story" className="nav-link">
            story
          </Link>
          <Link to="/about" className="nav-link">
            about
          </Link>
        </nav>
        <Logo />
        <nav
          aria-label="Primary right"
          className="font-mono col-start-9 col-end-13 flex justify-end gap-10 text-[length:max(12px,calc(var(--u)*12))] font-semibold uppercase max-md:gap-4"
        >
          <a href="#contact" className="nav-link">
            (Contact)
          </a>
        </nav>
      </header>

      <section aria-label="Story title" className="g12 gap-y-6 border-b border-line pb-10 pt-16">
        <p className="font-mono col-start-1 col-end-3 m-0 text-[length:max(11px,calc(var(--u)*11))] uppercase leading-[1.5] text-[#57544d]">
          Story
          <br />
          2026
        </p>
        <p className="font-mono col-start-10 col-end-13 m-0 text-right text-[length:max(11px,calc(var(--u)*11))] max-md:text-left uppercase leading-[1.5] text-[#57544d]">
          How I got
          <br />
          here
        </p>
        <Reveal
          as="h1"
          className="col-start-1 col-end-13 m-0 mt-3 text-u170 font-medium leading-[0.92] tracking-[-0.045em] max-md:text-[27vw]"
        >
          St<span className="font-display font-normal italic">o</span>ry
        </Reveal>
        <Reveal as="p" delay={120} className="col-start-1 col-end-7 m-0 mt-6 text-[length:max(18px,calc(var(--u)*18))] leading-[1.45] text-[#45423c] max-md:mt-2 max-md:text-[16px]">
          The short arc of how I got from tinkering with ideas to building things that ship — the turns, the
          detours, and what each one taught me.
        </Reveal>
      </section>

      <section aria-label="Opening note" className="g12 pb-10 pt-14">
        <Reveal as="p" className="col-start-2 col-end-11 m-0 text-u40 font-medium leading-[1.2] tracking-[-0.02em] max-md:text-[24px]">
          “[A one-line belief or turning point that sums up your story — the thing you keep coming back to.]”
        </Reveal>
      </section>

      <section aria-label="Chapters" className="g12">
        {CHAPTERS.map((c, i) => (
          <Reveal
            as="div"
            key={c.num}
            className={`col-start-1 col-end-13 grid grid-cols-12 items-start gap-6 border-t border-line py-10 max-md:gap-4 max-md:py-8 ${
              i === CHAPTERS.length - 1 ? "border-b" : ""
            }`}
          >
            <span className="font-mono col-start-1 col-end-3 text-[length:max(13px,calc(var(--u)*13))] uppercase text-[#85827a]">
              {c.when}
              <br />
              Chapter {c.num}
            </span>
            <div className="col-start-3 col-end-8 flex flex-col gap-3.5">
              <h2 className="m-0 text-u30 font-medium leading-[1.1] tracking-[-0.02em]">{c.title}</h2>
              <p className="m-0 text-[length:max(14px,calc(var(--u)*14))] leading-[1.6] text-[#45423c]">{c.text}</p>
            </div>
            <div
              className="wf-ph col-start-9 col-end-13 h-[calc(var(--u)*260)] rounded-lg"
              role="img"
              aria-label="Chapter image placeholder"
            />
          </Reveal>
        ))}
      </section>

      <section aria-label="Closing" className="g12 py-14">
        <Reveal as="h2" className="col-start-1 col-end-7 m-0 text-u44 font-medium leading-[1.1] tracking-[-0.03em]">
          Want the
          <br />
          whole story?
        </Reveal>
        <Reveal as="div" delay={100} className="col-start-8 col-end-13 flex flex-col gap-5 self-end">
          <p className="m-0 text-[length:max(14px,calc(var(--u)*14))] leading-[1.6] text-[#45423c]">
            Happy to tell it over a call or coffee. The work itself lives on the home page, and the facts are on
            the about page.
          </p>
          <div className="flex gap-5">
            <Link to="/about" className="press font-mono py-3 text-[length:max(12px,calc(var(--u)*12))] font-semibold uppercase">
              ( ABOUT ↗ )
            </Link>
            <a href={`mailto:${EMAIL}`} className="press font-mono py-3 text-[length:max(12px,calc(var(--u)*12))] font-semibold uppercase">
              ( GET IN TOUCH ↗ )
            </a>
          </div>
        </Reveal>
      </section>

      <FooterBar />
    </div>
  );
}
