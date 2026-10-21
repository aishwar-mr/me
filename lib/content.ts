import type { StaticImageData } from "next/image";
import prototypeOnTrack from "@/assets/work/track-monitoring/prototype-on-track.jpg";
import fastenerDetection from "@/assets/work/track-monitoring/fastener-detection.jpg";
import teardownsCover from "@/assets/work/product-teardowns/cover.png";

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
    linkedin: "https://linkedin.com/in/aishwar-mishra",
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
      "A low-cost, contactless track-monitoring prototype for Indian Railways, built for Smart India Hackathon 2025.",
    year: "2025",
    role: "Computer vision & field testing",
    placeholder: false,
    cover: {
      src: prototypeOnTrack,
      alt: "The track-monitoring prototype rig mounted on live railway track, with sensors, a camera and wiring visible.",
    },
    sections: [
      {
        id: "problem",
        heading: "Problem",
        body: "Indian Railways depends on imported track-monitoring systems — about ₹180 crore for a full system — that are closed-source, hard to customise and lock the buyer to one vendor. GPS-only defect localisation is also imprecise.",
      },
      {
        id: "approach",
        heading: "Approach",
        body: "A compact, contactless rig built on ITMS principles: laser, ultrasonic and IMU sensors plus an ESP32 camera, with Python, OpenCV and a neural network on a Raspberry Pi. Edge computing flags faults in real time; the cloud handles long-term trends. GPS and IMU are fused so defects keep a chainage position when GPS drops.",
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
        heading: "Result",
        body: "Field-tested on live Central Railway track in Mumbai: real-time data acquisition and defect detection worked end to end. Projected full-system cost is about ₹30 crore against ₹180 crore for the current system — roughly one-sixth (team cost analysis).",
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
