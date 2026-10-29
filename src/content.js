export const NAME = "Aishwar Mishra";
export const ROLE = "Generalist";
export const EMAIL = "aishwar.r.mishra@gmail.com";

export const HERO = {
  eyebrowName: NAME,
  eyebrowRole: ROLE,
  lines: ["One person,", "every room."],
  sub: "A generalist who can sit on a complex technical call with a customer, move straight into a normal stakeholder meeting, then do the ops work — or sit with marketing to unblock what's stuck.",
  meta: [
    { k: "Based in", v: "Mumbai" },
    { k: "Currently", v: "Supply Chain Intern, TCI" },
    { k: "Status", v: "Open to work" },
  ],
};

export const MARQUEE_ITEMS = [
  "Technical calls",
  "Stakeholder management",
  "Operations",
  "Marketing",
  "Product life cycle management (PLM)",
];

// Stories are drawn from the résumé and the Notion portfolio; nothing beyond them.
export const PROOF = [
  {
    num: "01",
    tag: "Sponsorship",
    title: "₹4L+ sponsorship raised as Technovanza Sponsorship Head",
    teaser: "₹1L+ closed personally",
    deep: "As Sponsorship Head at Technovanza VJTI (Dec 2025 – May 2026), I led a 30-member team that secured ₹4L+ in corporate sponsorship. I personally closed ₹1L+ of it — about 20% of the total — through structured outreach and negotiation.",
  },
  {
    num: "02",
    tag: "Smart India Hackathon '25",
    title: "1st / 80 — Smart India Hackathon '25",
    teaser: "Building a track monitoring system for Indian Railways",
    deep: "Indian Railways relies on imported, closed-source track-monitoring systems costing upwards of ₹180 crore, with vendor lock-in and imprecise GPS-based defect localisation. Our team built a compact, plug-and-play rig — laser, ultrasonic and IMU sensors with computer vision on a Raspberry Pi — and tested it live on Central Railway track in Mumbai. I helped develop the architecture and the GPS + IMU hybrid localisation. We placed 1st of 80 teams, with a projected system cost of ₹30 crore against ₹180 crore.",
  },
  {
    num: "03",
    tag: "WorldQuant BRAIN",
    title: "Gold — WorldQuant BRAIN",
    teaser: "10K+ points and a Research Consultant offer",
    deep: "Between May and November 2025 I researched and submitted 14 alphas on WorldQuant BRAIN, reaching Gold Level with 10K+ points. That work led to an offer to join as a Research Consultant.",
  },
  {
    num: "04",
    tag: "10K run",
    title: "44:18 10K run",
    teaser: "Top 20 of 300+",
    deep: "At Enthusia '25 I ran 10 km in 44 minutes 18 seconds, finishing in the top 20 of 300+ participants.",
  },
];

export const DAY = {
  heading: "A typical day across functions",
  items: [
    {
      time: "09:30",
      href: "#proof",
      caseStudy: "The 30-second proof",
      tag: "Ops",
      text: "Turn 10+ new job openings into accurate candidate emails, each in the same format with zero errors.",
    },
    {
      time: "11:00",
      href: "#proof",
      caseStudy: "The 30-second proof",
      tag: "Technical",
      text: "Scope the automation that replaces that manual work: Slack → Claude → Google Form → Gmail, with guardrails.",
    },
    {
      time: "13:00",
      href: "#proof",
      caseStudy: "The 30-second proof",
      tag: "Analytics",
      text: "Pressure-test a pricing model or recruiter data until the numbers hold up.",
    },
    {
      time: "15:00",
      href: "#proof",
      caseStudy: "The 30-second proof",
      tag: "Product",
      text: "Test an AI tool and write up where it breaks trust, for example 296 candidates silently widened to 736.",
    },
    {
      time: "17:00",
      href: "#proof-01",
      caseStudy: "Technovanza sponsorship story",
      tag: "Sales",
      text: "Negotiate with sponsors or interview founders for deal flow.",
    },
    {
      time: "19:00",
      href: "#proof",
      caseStudy: "The 30-second proof",
      tag: "Marketing",
      text: "Turn a technical feature into a message a buyer cares about.",
    },
  ],
  footer:
    "Six functions, one notebook. Nothing is lost in the switch, because every handoff is written down.",
};

export const CONTACT = {
  headingLines: ["Let's", "talk."],
  note: "Hiring for a strategy or founder's office role? Write to me — I work where customer, technology and operations meet.",
  footerNote: "Based in Mumbai, India",
};
