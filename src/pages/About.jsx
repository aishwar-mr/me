import { Link } from "react-router-dom";
import { PageLine } from "@/components/PageLine";
import { EMAIL, FooterBar } from "@/components/FooterBar";
import { Logo } from "@/components/Logo";
import { LinePortrait } from "@/components/LinePortrait";
import { Reveal } from "@/components/Reveal";
import ninjacartLogo from "@/assets/logos/ninjacart.png";
import vjtiLogo from "@/assets/logos/vjti.png";
import lbsLogo from "@/assets/logos/london-business-school.jpg";
import stanfordLogo from "@/assets/logos/stanford.png";
import iitMadrasLogo from "@/assets/logos/iit-madras.png";

const FACTS = [
  { label: "Focus", value: "Business ops · Strategy · Data" },
  { label: "Experience", value: "1+ years" },
  { label: "Open to", value: "Roles adjacent to Customer & Tech" },
  {
    label: "Email",
    value: (
      <a href={`mailto:${EMAIL}`}>
        {EMAIL.split("@")[0]}@<wbr />
        {EMAIL.split("@")[1]}
      </a>
    ),
  },
];

const BIO = [
  "I’m studying Textile Engineering with a minor in Data Science at VJTI, Mumbai. Coursework in product design, research methodology, data visualisation and regression analysis shaped how I work: start from the numbers, then build.",
  "In Lawxy AI’s founder’s office I built investor materials and led diligence follow-ups for a $1M pre-seed round with Peak XV that reached term-sheet stage. At Ninjacart I built a 12-week price-intelligence model across 300 SKUs that cut purchase prices by about ₹4 a unit.",
  "Outside work I build: an indigenous track-monitoring system for Indian Railways at Smart India Hackathon ’25, and a tool that checks a startup idea against about 6,300 YC companies.",
];

// `logo` is optional per entry — left out where no usable mark could be found
// (Lawxy AI has no logo on its site; Adarsh Education Society has no findable
// official one).
const EXPERIENCE = [
  {
    num: "01",
    role: "Founder’s Office Intern",
    company: "Lawxy AI · Mumbai",
    line:
      "Built investor materials and led diligence for a $1M Peak XV pre-seed round, taking it to term-sheet stage plus $10K in AWS credits. Ran outbound with 8 SDRs — 8 enterprise meetings in a week — and coordinated 15 pilot clients.",
    period: "May — Jul 2026",
  },
  {
    num: "02",
    role: "Business Operations Intern",
    company: "Ninjacart · Bengaluru",
    logo: ninjacartLogo,
    line:
      "Built a 12-week price-intelligence model across 300 SKUs, cutting purchase price by ~₹4/unit (₹20–30 lakh a month) and supporting dark-store expansion from 5 to 30 locations. Automated competitor price tracking and WhatsApp reports with Apps Script and Twilio.",
    period: "Jan — Feb 2026",
  },
];

const EDUCATION = [
  {
    title: "B.Tech. Textile Engineering, Data Science minor",
    sub: "Veermata Jijabai Technological Institute (VJTI)",
    logo: vjtiLogo,
    period: "2023 — 2027",
  },
  {
    title: "Higher Secondary (12th) - Maharashtra State Board",
    sub: "Adarsh Education Society",
    period: "2022",
  },
];

const CERTIFICATIONS = [
  { title: "Financial Analysis", sub: "London Business School (LBS)", logo: lbsLogo },
  { title: "Code in Place (CS106A)", sub: "Stanford University", logo: stanfordLogo },
];

const EXTRACURRICULARS = [
  {
    title: "Sponsorship Head",
    sub: "Technovanza, VJTI — led a 30-member team to ₹4L+ in sponsorships; closed ₹1L+ personally",
    logo: vjtiLogo,
    period: "2025 — 26",
  },
  { title: "Sport & outdoors", sub: "Basketball, athletics, trekking" },
];

const HONORS = [
  {
    title: "National Semi-finalist, Finvent ’24",
    sub: "IIT Madras · Portfolio Management · 54 of 627",
    logo: iitMadrasLogo,
    period: "2024",
  },
  { title: "Gold Level, WorldQuant BRAIN", sub: "10K+ points" },
  { title: "1st of 80 teams, SIH ’25 inter-college round", sub: "Track Monitoring System", period: "2025" },
];

const TOOLKIT = [
  "Excel",
  "SQL",
  "Python",
  "Google Apps Script",
  "Tableau",
  "Streamlit",
  "OpenCV",
  "Twilio API",
  "Financial analysis",
  "English · Hindi · Marathi (basic)",
];

function BackgroundRow({ title, sub, period, logo }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-t border-line py-4">
      <div>
        <p className="m-0 text-[length:max(15px,calc(var(--u)*15))]">{title}</p>
        {sub ? (
          <p className="m-0 mt-1 flex items-center gap-2 text-[length:max(12px,calc(var(--u)*12))] text-muted">
            {logo ? <img src={logo} alt="" className="logo-img h-5 w-5 flex-none object-contain" /> : null}
            <span>{sub}</span>
          </p>
        ) : null}
      </div>
      <span className="font-mono text-[length:max(11px,calc(var(--u)*11))] uppercase text-muted">{period}</span>
    </div>
  );
}

function BackgroundColumn({ heading, items, align = "left" }) {
  return (
    <Reveal
      as="div"
      className={align === "left" ? "col-start-1 col-end-7 pr-10 max-md:pr-0" : "col-start-7 col-end-13 pl-10 max-md:pl-0"}
    >
      <h3 className="m-0 mb-4 text-[length:max(22px,calc(var(--u)*22))] font-medium tracking-[-0.02em]">{heading}</h3>
      {items.map((it) => (
        <BackgroundRow key={it.title} {...it} />
      ))}
    </Reveal>
  );
}

export function About() {
  return (
    <div className="relative min-h-screen w-full bg-paper font-sans text-ink">
      <PageLine />
      <header data-line-start className="g12 h-[max(56px,calc(var(--u)*72))] items-center border-b border-line text-[length:max(13px,calc(var(--u)*13))] max-md:flex max-md:h-14 max-md:justify-between max-md:gap-3">
        <nav aria-label="Primary left" className="col-start-1 col-end-5 flex gap-10 max-md:gap-4">
          <Link to="/" className="nav-link">
            home
          </Link>
          <Link to="/projects" className="nav-link">
            all work
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

      <section data-line aria-label="About title" className="g12 gap-y-6 border-b border-line pb-10 pt-16">
        <p className="font-mono col-start-1 col-end-3 m-0 text-[length:max(11px,calc(var(--u)*11))] uppercase leading-[1.5] text-muted">
          About
          <br />
          2026
        </p>
        <p className="font-mono col-start-10 col-end-13 m-0 text-right text-[length:max(11px,calc(var(--u)*11))] max-md:text-left uppercase leading-[1.5] text-muted">
          Based in
          <br />
          Mumbai, India
        </p>
        <Reveal
          as="h1"
          className="col-start-1 col-end-13 m-0 mt-3 text-u150 font-medium leading-[0.95] tracking-[-0.045em] max-md:text-[19vw]"
        >
          Aishw<span className="font-display font-normal italic">a</span>r
          <br />
          Mishra
        </Reveal>
        <Reveal
          as="p"
          delay={120}
          className="col-start-1 col-end-6 m-0 mt-6 text-[length:max(18px,calc(var(--u)*18))] leading-[1.4] text-soft max-md:mt-2 max-md:text-[16px]"
        >
          A business generalist working where technology, design and operations meet — turning rough ideas into
          things that ship.
        </Reveal>
      </section>

      <section data-line aria-label="Portrait and intro" className="g12 border-b border-line pb-10 pt-14">
        <div className="col-start-1 col-end-9 self-center">
          <LinePortrait />
        </div>
        <div className="col-start-9 col-end-13 flex flex-col justify-between gap-10 self-center max-md:gap-6">
          <Reveal as="p" delay={100} className="m-0 text-[length:max(15px,calc(var(--u)*15))] leading-[1.65] text-soft">
            I’m Aishwar — I like building across the stack of a problem: the product thinking, the scrappy
            prototype, the spreadsheet that proves it, and the story that sells it. I’ve worked on hardware and
            software side by side, and I care most about work that creates real, measurable change.
          </Reveal>
          <Reveal as="div" delay={180} className="mt-12 max-md:mt-8 grid grid-cols-2 gap-x-6 gap-y-7">
            {FACTS.map((f) => (
              <div key={f.label}>
                <p className="font-mono m-0 mb-2 text-[length:max(10px,calc(var(--u)*10))] uppercase text-muted">{f.label}</p>
                <p className="m-0 text-[length:max(14px,calc(var(--u)*14))] [overflow-wrap:anywhere]">{f.value}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section data-line aria-label="Bio" className="g12 border-b border-line pb-10 pt-14">
        <Reveal as="h2" className="col-start-1 col-end-5 m-0 text-u36 font-medium leading-[1.1] tracking-[-0.03em]">
          The short
          <br />
          <span className="text-faint">version</span>
        </Reveal>
        <div className="col-start-6 col-end-12 flex flex-col gap-5">
          {BIO.map((p, i) => (
            <Reveal as="p" key={p} delay={i * 80} className="m-0 text-[length:max(14px,calc(var(--u)*14))] leading-[1.6] text-soft">
              {p}
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-label="Experience" className="g12 pb-8 pt-14">
        <h2 className="col-start-1 col-end-13 m-0 mb-4 text-u36 font-medium tracking-[-0.03em]">Experience</h2>
        {EXPERIENCE.map((e) => (
          <Reveal
            as="div"
            key={e.num}
            className="col-start-1 col-end-13 grid grid-cols-12 items-baseline gap-6 border-t border-line py-8 max-md:gap-3"
          >
            <span className="col-start-1 col-end-2 text-u32 leading-none text-faint">{e.num}</span>
            <h3 className="col-start-2 col-end-6 m-0 text-[length:max(20px,calc(var(--u)*20))] font-medium">
              {e.role}
              <br />
              <span className="mt-1 flex items-center gap-2 text-[length:max(13px,calc(var(--u)*13))] text-muted">
                {e.logo ? <img src={e.logo} alt="" className="logo-img h-6 w-6 flex-none object-contain" /> : null}
                <span>{e.company}</span>
              </span>
            </h3>
            <p className="col-start-6 col-end-10 m-0 text-[length:max(13px,calc(var(--u)*13))] leading-[1.5] text-muted">{e.line}</p>
            <span className="font-mono col-start-11 col-end-13 text-right text-[length:max(11px,calc(var(--u)*11))] uppercase text-muted max-md:text-left">
              {e.period}
            </span>
          </Reveal>
        ))}
        <div className="col-start-1 col-end-13 border-t border-line" />
      </section>

      <section data-line aria-label="Background" className="g12 gap-y-10 border-b border-line pb-10 pt-14">
        <h2 className="col-start-1 col-end-13 m-0 text-u36 font-medium tracking-[-0.03em]">Background</h2>
        <BackgroundColumn heading="Education" items={EDUCATION} align="left" />
        <BackgroundColumn heading="Certifications" items={CERTIFICATIONS} align="right" />
        <BackgroundColumn heading="Extracurriculars" items={EXTRACURRICULARS} align="left" />
        <BackgroundColumn heading="Honors" items={HONORS} align="right" />
      </section>

      <section aria-label="Toolkit" className="g12 pb-14 pt-14">
        <h2 className="col-start-1 col-end-5 m-0 text-u36 font-medium tracking-[-0.03em]">Toolkit</h2>
        <Reveal as="div" className="col-start-6 col-end-13 flex flex-wrap gap-3">
          {TOOLKIT.map((t) => (
            <span key={t} className="rounded-full border border-chip px-4 py-2 text-[length:max(12px,calc(var(--u)*12))] text-soft">
              {t}
            </span>
          ))}
        </Reveal>
      </section>

      <FooterBar />
    </div>
  );
}
