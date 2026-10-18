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
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  year?: string;
  role?: string;
  sections: ProjectSection[];
  /** true until the owner supplies real, approved case-study content. */
  placeholder: boolean;
};

// Routes named in the brief (DPP, Analytics) are scaffolded below with
// explicit "pending" placeholders — no case-study specifics are invented.
// Each `sections` entry states exactly what's needed to replace it.
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
    slug: "analytics",
    title: "Analytics",
    category: "Data & analytics",
    summary:
      "Case study pending — the specific project this page covers hasn't been confirmed yet.",
    placeholder: true,
    sections: [
      {
        id: "context",
        heading: "Context",
        body: "Pending: which project this covers, and the business or analytical question it answers.",
      },
      {
        id: "problem",
        heading: "Problem & objective",
        body: "Pending: the dataset, its limitations, and what the analysis needed to resolve.",
      },
      {
        id: "approach",
        heading: "Approach",
        body: "Pending: data cleaning, preparation, and analytical methodology — tools only named if actually used.",
      },
      {
        id: "execution",
        heading: "Execution",
        body: "Pending: the analysis itself — visualisations, dashboards, or models produced.",
      },
      {
        id: "results",
        heading: "Results & findings",
        body: "Pending: key findings and their business implications, using only verified figures.",
      },
      {
        id: "reflection",
        heading: "Reflection",
        body: "Pending: limitations encountered and what would be done differently next time.",
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
