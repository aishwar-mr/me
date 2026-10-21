import type { StaticImageData } from "next/image";
import prototypeOnTrack from "@/assets/work/track-monitoring/prototype-on-track.jpg";
import fastenerDetection from "@/assets/work/track-monitoring/fastener-detection.jpg";

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
  image?: { src: StaticImageData; alt: string; caption?: string };
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  year?: string;
  role?: string;
  cover?: { src: StaticImageData; alt: string };
  sections: ProjectSection[];
  /** true until the owner supplies real, approved case-study content. */
  placeholder: boolean;
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
      "Case study pending — content for this project hasn't been supplied yet.",
    placeholder: true,
    sections: [
      {
        id: "context",
        heading: "Context",
        body: "Pending: the industry, business, or academic context for this project — e.g. the textile/apparel value-chain problem it addresses.",
      },
      {
        id: "problem",
        heading: "Problem & objective",
        body: "Pending: the specific problem statement and what the project set out to achieve.",
      },
      {
        id: "approach",
        heading: "Approach",
        body: "Pending: the research methodology, framework, or proposed information architecture.",
      },
      {
        id: "execution",
        heading: "Execution",
        body: "Pending: the actual work — diagrams, proposed solution, or implementation detail, clearly separated from proposed concepts not yet built.",
      },
      {
        id: "results",
        heading: "Results & findings",
        body: "Pending: verified findings, limitations, and recommendations. Only figures confirmed and approved for publication will appear here.",
      },
      {
        id: "reflection",
        heading: "Reflection",
        body: "Pending: personal contribution and what the project demonstrated or taught.",
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
