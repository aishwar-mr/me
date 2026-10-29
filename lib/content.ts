import type { StaticImageData } from "next/image";
import prototypeOnTrack from "@/assets/work/track-monitoring/prototype-on-track.jpg";
import fastenerDetection from "@/assets/work/track-monitoring/fastener-detection.jpg";
import frappeBanner from "@/assets/work/frappe-builder/blog-banner.png";
import frappeTokens from "@/assets/work/frappe-builder/design-tokens.png";
import frappeCanvas from "@/assets/work/frappe-builder/builder-canvas.png";
import teardownsCover from "@/assets/work/product-teardowns/cover.png";
import portrait from "@/assets/info/portrait.jpg";
import lawxyLogo from "@/assets/logos/lawxy.png";
import lvlupLogo from "@/assets/logos/lvlup-venture.png";
import newtonLogo from "@/assets/logos/newton-school.png";
import ninjacartLogo from "@/assets/logos/ninjacart.png";
import technovanzaLogo from "@/assets/logos/technovanza.png";
import vjtiLogo from "@/assets/logos/vjti.jpg";
import worldquantLogo from "@/assets/logos/worldquant-brain.png";

export const portraitImage = {
  src: portrait,
  alt: "Portrait of Aishwar Mishra in a burgundy velvet blazer and pale blue striped shirt",
};

// GH Pages serves this repo at /me under the account's github.io domain,
// derived from the GitHub handle below. Update if a custom domain is added.
export const siteUrl = "https://aishwar-mr.github.io/me";

export const site = {
  firstName: "AISHWAR",
  lastName: "MISHRA",
  tagline: "PRODUCT & STRATEGY EXPERT — TECHNICAL GENERALIST",
  email: "aishwar.r.mishra@gmail.com",
  phone: "+91 75587 73043",
  socials: {
    linkedin: "https://www.linkedin.com/in/aishwar-mishra",
    github: "https://github.com/aishwar-mr",
    x: "https://x.com/aishwar_mr",
  },
};

export const navLinks = [
  { label: "INFO", href: "/info" },
  { label: "WORK", href: "/work" },
  { label: "CONTACT", href: "/contact" },
];

export const introStatement =
  "An operator and generalist who turns ambiguous problems into decisions people can act on — building the pricing models, programs, and product teardowns that fast-growing startups and founders act on.";

export const capabilities = [
  {
    label: "Strategy",
    description:
      "Structuring ambiguous, cross-functional problems into decisions founders and operators can act on.",
  },
  {
    label: "Program management",
    description:
      "Standing up new verticals and pilots from zero — SOPs, funnels, and the tracking that keeps them honest.",
  },
  {
    label: "GTM & fundraising",
    description:
      "Investor materials, diligence, and structured outbound that move a raise or a pipeline forward.",
  },
  {
    label: "Data & pricing models",
    description:
      "Competitor tracking, pricing intelligence, and the automation that keeps it running daily.",
  },
  {
    label: "AI evaluation",
    description:
      "Tearing down AI agents turn by turn to find where they actually fail, not where the demo hides it.",
  },
  {
    label: "Computer vision",
    description:
      "Dataset build, model pipeline, and field-testing for real-world detection systems.",
  },
];

export type TimelineEntry = {
  period: string;
  /** Qualifier shown under the period, e.g. "part-time". */
  note?: string;
  title: string;
  organisation: string;
  /** Team or function within the organisation, shown after its name. */
  team?: string;
  location?: string;
  /** Organisation website; the name links to it when set. */
  href?: string;
  /** Organisation mark, taken from its own website. Entries without one show an initials tile. */
  logo?: StaticImageData;
  points: string[];
};

// Sources: Aishwar_Mishra_Résumé.pdf and the owner's Notion portfolio (INFO page).
// Where the two differ (titles, dates), the résumé wording is used.
export const education: TimelineEntry[] = [
  {
    period: "2023 — 2027",
    title: "B.Tech. Textile Engineering, Data Science minor",
    organisation: "Veermata Jijabai Technological Institute (VJTI)",
    logo: vjtiLogo,
    location: "Mumbai, MH",
    points: [
      "Coursework: Product Design and Development, Research Methodology, Linear Programming, Entrepreneurship for Engineers",
    ],
  },
];

export const experience: TimelineEntry[] = [
  {
    period: "Oct 2026 — Present",
    note: "Part-time",
    title: "Program Intern",
    organisation: "Newton School",
    href: "https://www.newtonschool.co",
    logo: newtonLogo,
    location: "Mumbai, India",
    points: [
      "Built the SOP and funnel tracker for a new alumni placement pilot (15+ companies, 140+ candidates), increasing outreach by 30+ emails a day",
      "Onboarded 80+ candidates to the screening assessment through one-on-one call strategy with Key Account Managers, with 44 completing it (55%)",
      "Screened and referred 60 candidates to partner companies, securing 8 interviews and the pilot’s first placement",
    ],
  },
  {
    period: "May — Jul 2026",
    note: "Summer",
    title: "Founder’s Office Intern",
    organisation: "Lawxy AI",
    team: "Strategy & Investments",
    href: "https://www.lawxyai.com",
    logo: lawxyLogo,
    location: "Mumbai, India",
    points: [
      "Built investor materials and led diligence follow-ups for a $1M Peak XV (Sequoia India) pre-seed round, taking it through to term-sheet stage",
      "Led a team of 8 SDRs, generated 8 enterprise meetings in one week through structured outbound, and onboarded 15 pilot clients",
      "Secured startup grants and programs including Nvidia Inception and $10K in AWS credits",
    ],
  },
  {
    period: "Jan — Mar 2026",
    title: "Business Operations Intern",
    organisation: "Ninjacart",
    team: "Central Analytics",
    href: "https://ninjacart.com",
    logo: ninjacartLogo,
    location: "Bengaluru, India",
    points: [
      "Built a 12-week price intelligence model tracking GRN, purchase price and variance across 300 SKUs, and reduced purchase price by Rs.4/unit through competitor benchmarking — resulting in dark store expansion from 5 to 30 locations",
      "Automated daily competitor price tracking and WhatsApp reporting using Google Apps Script and the Twilio API, giving the team same-day pricing visibility",
    ],
  },
];

export const community: TimelineEntry[] = [
  {
    period: "Dec 2026 — Present",
    title: "Venture Scout",
    organisation: "LvlUp Venture",
    href: "https://www.lvlup.vc",
    logo: lvlupLogo,
    points: [
      "Venture Scout (conducted 8 interviews with folks from Retail, Edtech, SaaS domains; submitted 2 for review & further processing)",
    ],
  },
  {
    period: "Dec 2025 — May 2026",
    title: "Sponsorship Head",
    organisation: "Technovanza VJTI",
    href: "https://www.linkedin.com/company/technovanza-vjti/",
    logo: technovanzaLogo,
    location: "Mumbai, India",
    points: [
      "Led a 30-member team to secure INR 4L+ in corporate sponsorship; personally closed INR 1L+ (20% of total) through structured outreach & negotiation",
    ],
  },
  {
    period: "May — Nov 2025",
    title: "Gold Researcher",
    organisation: "WorldQuant BRAIN",
    href: "https://worldquantbrain.com/consultant",
    logo: worldquantLogo,
    points: [
      "Gold Level Researcher (10k+ points); submitted 14 alphas & got an offer to work as Research Consultant",
    ],
  },
];

export type Honor = { title: string; detail: string; href?: string };

export const honors: Honor[] = [
  {
    title: "National Semi-finalist — Finvent (Portfolio Management Competition)",
    detail: "Shaastra 2025, IIT Madras · rank 54 of 627 participants · Team “Finzard”",
    href: "https://unstop.com/competitions/finvent-finance-reimagined-shaastra-2025-iit-madras-1204197",
  },
  {
    title: "Enthusia ’25 — 10 km",
    detail: "44 min 18 s; placed among the top 20 of 300+ participants",
  },
];

export type Certification = { title: string; issuer: string; date: string; href: string };

export const certifications: Certification[] = [
  {
    title: "Agile Project Management",
    issuer: "Google",
    date: "Sep 2024",
    href: "https://www.coursera.org/account/accomplishments/verify/W01ZGR4EP87W",
  },
  {
    title: "Financial Analysis",
    issuer: "London Business School",
    date: "Dec 2025",
    href: "https://www.coursera.org/account/accomplishments/verify/5CZ9CSS9WOFQ",
  },
  {
    title: "Intro to Programming with Python (CS106A)",
    issuer: "Stanford Code In Place",
    date: "Nov 2026 (ongoing)",
    href: "https://codeinplace.stanford.edu",
  },
  {
    title: "Gold Level",
    issuer: "WorldQuant BRAIN",
    date: "Jun 2025",
    href: "https://drive.google.com/file/d/1Hj-Lv8foID-jK6VPGM9v3rvnwRehrgP3/view?usp=sharing",
  },
];

export const additionalInfo = [
  { label: "Languages", value: "Fluent in English and Marathi; native speaker of Hindi; basic Spanish" },
  {
    label: "Core skills",
    value:
      "Business Operations & Analytics, Competitive Intelligence, Pricing & Procurement Analysis, Sales & Business Development, Fundraising Support, Process Improvement, Project & Program Management, Stakeholder Management, and Cross-Functional Execution",
  },
  {
    label: "Tools & technologies",
    value:
      "Excel, Google Sheets, SQL, Python, Tableau, Google Apps Script, API Integration, and AI tools for research and workflow automation",
  },
  { label: "Interests", value: "Athletics, Basketball, Trekking & Trail" },
];

/** "My story", from the owner's Notion portfolio (home page). The first paragraph is the lead line. */
export const storyKicker = "Your neighborhood builder";
export const storyHeading = "Hi, I’m Aishwar";
export const story: string[] = [
  "Business generalist across startups, technology, and consumer businesses.",
  "I’m an Engineering senior undergrad at Veermata Jijabai Technological Institute (VJTI), Mumbai with a minor in Data Science, interested in solving business problems at the intersection of strategy, technology, and operations.",
  "I’ve worked in fundraising, business analytics, sales, and program management at startups, turning ambiguous problems into structured processes and measurable outcomes. I learn quickly, collaborate across functions, and take ownership from research through execution.",
  "I’ve worked on commercial pricing analysis at Ninjacart, fundraising and enterprise outreach at Lawxy AI, and program development at Newton School. I’m currently focused on opportunities in strategy, founder’s office, business operations, and commercial growth where I can combine analytical thinking with hands-on execution.",
];

export type ProjectSection = {
  id: string;
  heading: string;
  body: string;
  /** Optional short bullet list rendered under the paragraph. */
  points?: string[];
  image?: { src: StaticImageData; alt: string; caption?: string };
};

export type ProjectItem = {
  title: string;
  summary: string;
  /** Items with `slug` + `sections` get their own page at /work/<project>/<slug>. */
  slug?: string;
  year?: string;
  role?: string;
  sections?: ProjectSection[];
  /** Optional external link, used when there is no on-site page. */
  href?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  year?: string;
  role?: string;
  cover?: { src: StaticImageData; alt: string; fit?: "cover" | "contain" };
  /** A list of entries (e.g. individual teardowns) shown under the sections. */
  items?: ProjectItem[];
  /** Heading above `items`; defaults to "Teardowns". */
  itemsHeading?: string;
  sections: ProjectSection[];
  /** true until the owner supplies real, approved case-study content. */
  placeholder: boolean;
  /** Real content exists but the work itself is ongoing: shows a looping "check back" state. */
  inProgress?: boolean;
};

// Case-study sections are per-project: published ones use Problem / Approach /
// Solution / Result; placeholders carry explicit "Pending:" text naming what's
// needed, so no case-study specifics are ever invented.
export const projects: Project[] = [
  {
    slug: "digital-product-passport",
    title: "Digital Product Passport",
    category: "Sustainability & traceability",
    summary:
      "A take-back passport for soft furnishings under the EU Digital Product Passport rules — work in progress.",
    year: "2026",
    role: "Research & design",
    placeholder: false,
    inProgress: true,
    sections: [
      {
        id: "scope",
        heading: "Scope",
        body: "A voluntary take-back passport for soft furnishings (sofas, curtains, rugs), written as a VJTI project report. It sits alongside, not inside, the first EU apparel act, which is expected to cover finished apparel with at least 80% textile fibre.",
        points: [
          "The EU registry has been live since 20 July 2026; product data stays with each company and is reached through a QR code.",
          "What a textile passport must contain is still open — nothing is binding until the delegated act, expected Q4 2027, with mandatory use around 2029.",
          "The hardest data sits with Tier 2–3 suppliers (spinning, weaving, dyeing), not with brands.",
        ],
      },
      {
        id: "problem",
        heading: "Problem",
        body: "The EU has fixed how Digital Product Passports work but not yet what a textile passport must contain, leaving roughly three years to prepare. And tracking only tells you where products go — it doesn't make anyone return them, and without a recycler's write-back a passport proves an item was scanned, not that it was recycled.",
      },
      {
        id: "approach",
        heading: "Approach",
        body: "I checked the DPP research — a systematic review of 87 papers and a 2026 review — against the live regulatory picture. Unique IDs, standardised data, traceability and batch-level passports held up; centralised data and item-level-by-default did not, and blockchain as a key enabler was weakened, since the law requires only open standards and a QR code.",
      },
      {
        id: "solution",
        heading: "Solution",
        body: "Built around handover scans rather than continuous tracking:",
        points: [
          "A dual-frequency tag (UHF RFID plus NFC) in every product, sewn into the deck rather than a removable cover.",
          "A timestamped scan at each handover — factory, delivery, repair, resale, pickup, recycler intake.",
          "A reason to return: buy-back credit, trade-in discount or free pickup.",
          "A recycler write-back against the same tag ID — condition, weight by stream, route taken.",
          "One data card per model listing each component, material, how it is joined and what blocks recovery.",
        ],
      },
      {
        id: "result",
        heading: "Result",
        body: "Pending — nothing has been tested yet. Planned in three steps: sign off a sofa, curtain and rug data card with a recycler; run a 50-unit tag trial targeting a read rate above 95%; then pilot a few hundred units, measuring return rate and recovered weight per unit.",
      },
    ],
  },
  {
    slug: "track-monitoring",
    title: "Track Monitoring",
    category: "Rail infrastructure",
    summary:
      "A low-cost, contactless track-monitoring prototype for Indian Railways. Smart India Hackathon ’25 — 1st out of 80 teams (inter-college).",
    year: "2025",
    role: "Team member — architecture & hybrid localisation",
    placeholder: false,
    cover: {
      src: prototypeOnTrack,
      alt: "The track-monitoring prototype rig mounted on live railway track, with sensors, a camera and wiring visible.",
    },
    sections: [
      {
        id: "problem",
        heading: "Problem",
        body: "Current ITMS technology deployed by Indian Railways relies on closed-source Russian systems costing upwards of ₹180 crore. This reliance creates high procurement and maintenance costs, limited customisation, vendor lock-in, and inefficient defect localisation (due to poor GPS accuracy).",
      },
      {
        id: "contribution",
        heading: "My contribution",
        body: "As part of the team:",
        points: [
          "Helped develop a scalable, compact, and plug-and-play architecture that analyses track geometry parameters",
          "Assisted in implementing a hybrid localisation system fusing GPS and IMU sensors for uninterrupted chainage mapping",
        ],
      },
      {
        id: "approach",
        heading: "Approach & key decisions",
        body: "A compact, contactless rig built on ITMS principles: laser, ultrasonic and IMU sensors plus an ESP32 camera, with Python, OpenCV and a neural network on a Raspberry Pi. Edge computing flags faults in real time; the cloud handles long-term trends.",
        points: [
          "Understanding the problem: evaluated EN 13848 standards and RDSO (Research Designs and Standards Organization) accuracy requirements, so the indigenous solution would meet or exceed current proprietary benchmarks",
          "Building the solution: an open, standards-compliant software stack (Python, OpenCV) on edge computing (Raspberry Pi), with AI/ML-driven analytics to identify defect patterns and a modular hardware setup using laser sensors, ultrasonic sensors, and an IMU",
          "Testing & iteration: prototyped and tested the hardware live on the Central Railways tracks in Mumbai, validating real-time data acquisition and processing",
        ],
      },
      {
        id: "solution",
        heading: "Solution",
        body: "A modular, open software stack where the geometry, rail-profile and acceleration subsystems can be deployed in full or in part. Computer vision flags broken fasteners from camera frames, and IMU and ultrasonic readings flag misalignment — either triggers a dashboard alert and an SMS.",
        image: {
          src: fastenerDetection,
          alt: "Camera frame of a railway sleeper with three bounding boxes labelled as broken fasteners at 95 to 96 percent confidence.",
          caption: "Broken-fastener detection on a live track frame.",
        },
      },
      {
        id: "result",
        heading: "Results & impact",
        body: "Smart India Hackathon ’25: 1st out of 80 teams (inter-college). Field-tested on live Central Railway track in Mumbai — real-time data acquisition and defect detection worked end to end.",
        points: [
          "Cost reduction: projected system cost falls from ₹180 crore (imported) to ₹30 crore (indigenous), lowering capital and operating expenses",
          "Accuracy & compliance: the system complied with EN 13848 Part 1 & 2 and RDSO TM/IM/448 (Rev 1: 2023) accuracy standards during testing",
          "National impact: advances “Atmanirbhar Bharat” (self-reliance) by ensuring data sovereignty and removing foreign vendor lock-in for critical railway safety data",
        ],
      },
      {
        id: "challenges",
        heading: "Challenges",
        body: "A major challenge was the low accuracy of standard GPS for precise defect localisation along the tracks.",
      },
      {
        id: "next-steps",
        heading: "Learnings / next steps",
        body: "To solve the GPS accuracy limitation, the team proposed integrating RFID tags directly on the railway tracks to significantly improve the accuracy of chainage mapping for defect localisation in future iterations.",
      },
    ],
  },
  {
    slug: "product-teardowns",
    title: "Product Teardowns",
    category: "Product breakdowns",
    summary:
      "Breakdowns of products — what they do, where they work, and where they fall short.",
    placeholder: true,
    cover: {
      src: teardownsCover,
      alt: "Venn diagram of three overlapping circles labelled UX, Tech and Business, with a point marked at the centre where they meet.",
      fit: "contain",
    },
    itemsHeading: "Teardowns",
    sections: [],
    // Add each breakdown here. With `slug` + `sections` it gets its own page
    // (same Problem / Approach / Solution / Result format); otherwise it's a
    // plain row with an optional external `href`.
    items: [
      {
        slug: "arrowhead-collections-bot",
        title: "Arrowhead — Collections Voice Bot",
        summary:
          "Turn-by-turn teardown of a Hindi collections call: the leak was comprehension, not interest.",
        year: "2026",
        role: "Analysis & redesign",
        sections: [
          {
            id: "problem",
            heading: "Problem",
            body: "In Arrowhead's 1:43 Hindi collections demo call, the key ask — pay 30%, ₹15,000 — didn't register: the customer answered \"kitna percent?\" and the bot had to repeat itself. Around that leak sat a 23-second unbroken monologue (empathy, credit-score and legal warnings, then an offer) aimed at someone who had just said they had no money; no disclosure that the caller is a bot; and a follow-up set for 23 November against a 3 May due date, unexplained.",
          },
          {
            id: "approach",
            heading: "Approach",
            body: "I mapped the call into a ten-stage funnel — timestamp, what happens, assessment — read the transcript against it, and ranked six issues. The funnel leak wasn't disinterest; the customer simply didn't process the figure.",
          },
          {
            id: "solution",
            heading: "Solution",
            body: "Two fixes built on one principle: never collapse two decisions into one bot turn. First, a confirm-back checkpoint after stating the amount and before asking for commitment — a reusable pattern for any numeric ask. Second, break the monologue: after hardship is stated, pause and acknowledge; if hardship cues appear (job loss, no income, medical), let the customer absorb the consequence in its own turn before any offer.",
          },
          {
            id: "result",
            heading: "Result",
            body: "Not yet run. Proposed A/B test on Hindi collections calls: current flow against confirm-back plus gated hardship handling. Primary metric is valid promise-to-pay rate; secondary are comprehension, call duration and interruptions; guardrails are complaints, escalations and compliance events. One open question to settle before shipping: whether bot disclosure is handled before or at call initiation.",
          },
        ],
      },
      {
        slug: "juicebox-recruiting-agent",
        title: "Juicebox — AI Recruiting Agent",
        summary:
          "Teardown of an AI recruiting agent's feedback loop: where calibration helps, and where it quietly rewrites the search.",
        year: "2026",
        role: "Analysis",
        sections: [
          {
            id: "problem",
            heading: "Problem",
            body: "I ran a Founder's Office search (296 matches) through Juicebox's recruiting agent, approving one candidate who had been 9 months in role and rejecting two who had just joined. Its handling of that feedback broke trust: the pool jumped from 296 to 736 after it said it had refined the search; years of experience widened to 4 before it asked; it cited a 9-month pattern but applied a 6-month hard floor, using 9 months only as a rank boost; and \"likely to leave\" became a ranking rule from a single approval, unasked.",
          },
          {
            id: "approach",
            heading: "Approach",
            body: "I stepped through the agent's calibration loop turn by turn — what it showed, what it asked, what it changed — and compared its stated reasoning with the filters it actually applied. I also looked at the search filters themselves.",
          },
          {
            id: "solution",
            heading: "Solution",
            body: "Three product fixes: show the net effect of every change (pool size, filters) before the next batch; ask one disambiguating question before turning feedback into a ranking rule; and treat a missing rejection reason as a blocker, not a note. Separately, there is no first-class employment-type filter (intern, part-time, contract, full-time) — title keywords, years of experience and graduation year are only noisy stand-ins.",
          },
          {
            id: "result",
            heading: "Result",
            body: "What held up: the agent closed the feedback loop quickly, separated hard constraints from ranking boosts, and didn't invent a reason for a blank rejection. The differentiated parts are the Filters vs Criteria split, pinned skills (AND vs OR), company-group timing and Likely to Switch; Boolean still earns its place for exact conditions. Open question: when does feedback become a hard filter rather than a ranking signal?",
          },
        ],
      },
    ],
  },
  {
    slug: "frappe-builder-blog",
    title: "Frappe Builder Blog",
    category: "Content & positioning",
    summary:
      "A marketing blog positioning Frappe Builder as an operational lever for product and marketing teams tired of waiting on engineering.",
    year: "2026",
    role: "Writing & positioning",
    placeholder: false,
    cover: {
      src: frappeCanvas,
      alt: "Frappe Builder’s visual editor showing a page layout tree, the page canvas and a properties panel.",
    },
    itemsHeading: "Deliverable",
    sections: [
      {
        id: "context",
        heading: "Context & goal",
        body: "The objective was to position Frappe Builder not just as another drag-and-drop website tool, but as a strategic operational lever for small-to-mid-sized companies. The goal was a compelling blog post speaking directly to the pain points of Product Managers (PMs) and Marketing teams tired of being bottlenecked by engineering cycles.",
      },
      {
        id: "approach",
        heading: "Strategy & approach",
        body: "Instead of a laundry list of technical features, the narrative is structured around organisational friction and cost-efficiency:",
        points: [
          "The “sprint ticket” hook: addressed the universal friction between Marketing and Engineering in the opening line (“Your website shouldn’t need a sprint ticket”), establishing empathy with the target persona",
          "Reframing the cost of AI: positioned Frappe’s Bring-Your-Own-Key (BYOK) AI generation as a structural pricing advantage (“You pay for AI at cost, not at markup”) rather than just a feature, appealing to budget-conscious founders and RevOps leaders",
          "Mitigating fear (version control): highlighted that the real reason non-technical teams don’t edit websites is fear of breaking them, positioning version control as a psychological safety net",
          "Addressing the speed elephant: tackled the common objection to visual builders (bloated code) by tying Frappe’s open-source ethos to its Lighthouse performance scores",
        ],
      },
      {
        id: "skills",
        heading: "Key highlights & skills demonstrated",
        body: "What this piece shows:",
        points: [
          "Value-based messaging: translating technical features (design tokens, AGPL-3.0, version control) into tangible business outcomes — brand intactness, recovered engineering hours, removing the “don’t touch it” tax",
          "Persona targeting: writing for a dual audience — the speed Marketing and PMs need, while respecting the performance standards Engineering demands",
          "B2B SaaS storytelling: a clear, readable narrative that guides the reader from the problem (bottlenecks) to the solution (Frappe), ending with clear next steps (Frappe Cloud vs. self-hosted)",
        ],
      },
    ],
    items: [
      {
        slug: "your-website-shouldnt-need-a-sprint-ticket",
        title: "Your website shouldn’t need a sprint ticket",
        summary: "The full blog post, as written.",
        year: "2026",
        role: "Writing & positioning",
        sections: [
          {
            id: "intro",
            heading: "Introduction",
            body: "Most product teams at small and mid-sized companies share the same quiet bottleneck. Marketing needs a landing page. Engineering owns the website. The page ships two weeks late, if it ships at all - and by then the campaign has moved on.\n\nThe usual fix is a visual builder. But that trade has its own cost: you get drag-and-drop ease and you hand back performance, brand consistency, and often a per-seat bill that grows faster than your team.\n\nFrappe Builder was built to avoid that trade. Here’s what actually changes when a PM has it.",
            image: {
              src: frappeBanner,
              alt: "Frappe Builder landing page headline reading “Build your website blazingly fast.” with a “Try Frappe Builder for free” button.",
            },
          },
          {
            id: "waiting",
            heading: "You stop waiting",
            body: "Edit a page section by section on a visual canvas, preview it, publish in one click. No ticket, no deploy window, no negotiating for engineering time.\n\nFor a team running multiple campaigns a quarter, this returns roughly 30 engineering hours to the roadmap and moves page turnaround from days to hours.",
            image: {
              src: frappeCanvas,
              alt: "Frappe Builder’s visual editor showing a page layout tree, the page canvas and a properties panel.",
            },
          },
          {
            id: "fear",
            heading: "You stop being afraid to touch it",
            body: "The reason non-technical teams avoid the website isn’t that editing is hard - it’s that breaking something is expensive. Builder has version control, so every change is recoverable, and preview means nothing goes live unseen.\n\nPractically: mean-time-to-fix on a bad page drops from hours to minutes, and the “let’s just not touch it” tax disappears.",
          },
          {
            id: "brand",
            heading: "Your brand stays intact when more people can publish",
            body: "Design tokens let you define your palette, fonts and templates once. Every new page inherits them. Light and dark themes stay aligned without anyone thinking about it.\n\nThen invite your sales, support and regional teams as business users while keeping admin control where it belongs. Publishing capacity goes from 5-10 people to 2-3 - without a proportional increase in design review or brand cleanup.",
            image: {
              src: frappeTokens,
              alt: "Frappe Builder’s Design Tokens panel listing six colour tokens with light and dark values.",
            },
          },
          {
            id: "ai-cost",
            heading: "You pay for AI at cost, not at markup",
            body: "This is the part worth pausing on.\n\nBuilder ships with BOB, an AI page generator - and you bring your own API key. You pay the model provider directly. Nothing sits in between adding margin.\n\nCompare that to the standard model, where AI generation is bundled into a per-seat subscription per user per month whether you use it or not. With your own key, cost tracks usage rather than headcount. At X pages a month across M users, the difference is ₹N a year.\n\nThe deeper point is structural: your AI bill scales with what you actually generate, not with how many people you hire.",
          },
          {
            id: "measure",
            heading: "You see whether it worked",
            body: "Connect your own domain, embed video or third-party content, and read analytics in the same place you built the page. The loop between shipping and knowing closes from multiple days to same-day.",
          },
          {
            id: "performance",
            heading: "The performance question",
            body: "Every builder claims ease. Almost none claim speed, because most of them produce pages weighed down by scripts nobody asked for.\n\nBuilder’s creator was explicit that this was the problem being solved - existing tools produced bloated pages, and performance was prioritised from the start. The evidence is that frappe.io itself runs on Builder, and pages score consistently well on Lighthouse.",
          },
          {
            id: "worth-knowing",
            heading: "Worth knowing",
            body: "It’s open source under AGPL-3.0, so check the license terms if you plan to modify it commercially. Self-host it free, or run it managed on Frappe Cloud.\n\n~ Aishwar Mishra",
          },
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}

export function getProjectItem(projectSlug: string, itemSlug: string) {
  const project = getProject(projectSlug);
  const items = project?.items ?? [];
  const index = items.findIndex((item) => item.slug === itemSlug);
  if (!project || index < 0) return undefined;
  return {
    project,
    item: items[index],
    previous: index > 0 ? items[index - 1] : undefined,
    next: index < items.length - 1 ? items[index + 1] : undefined,
  };
}
