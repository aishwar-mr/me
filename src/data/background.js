// Experience, education, honors, certifications and the "My story" bio —
// ported from the owner's main portfolio project (lib/content.ts) so this
// project carries the same information without depending on that project.
// Sources there: Aishwar_Mishra_Résumé.pdf and the owner's Notion portfolio.
import portrait from "@/assets/info/portrait.jpg";
import lawxyLogo from "@/assets/logos/lawxy.png";
import lvlupLogo from "@/assets/logos/lvlup-venture.png";
import newtonLogo from "@/assets/logos/newton-school.png";
import ninjacartLogo from "@/assets/logos/ninjacart.png";
import technovanzaLogo from "@/assets/logos/technovanza.png";
import vjtiLogo from "@/assets/logos/vjti.jpg";
import worldquantLogo from "@/assets/logos/worldquant-brain.png";

export const PORTRAIT = {
  src: portrait,
  alt: "Portrait of Aishwar Mishra in a burgundy velvet blazer and pale blue striped shirt",
};

export const STORY = {
  kicker: "Your neighborhood builder",
  heading: "Hi, I’m Aishwar",
  paragraphs: [
    "Business generalist across startups, technology, and consumer businesses.",
    "I’m an Engineering senior undergrad at Veermata Jijabai Technological Institute (VJTI), Mumbai with a minor in Data Science, interested in solving business problems at the intersection of strategy, technology, and operations.",
    "I’ve worked in fundraising, business analytics, sales, and program management at startups, turning ambiguous problems into structured processes and measurable outcomes. I learn quickly, collaborate across functions, and take ownership from research through execution.",
    "I’ve worked on commercial pricing analysis at Ninjacart, fundraising and enterprise outreach at Lawxy AI, and program development at Newton School. I’m currently focused on opportunities in strategy, founder’s office, business operations, and commercial growth where I can combine analytical thinking with hands-on execution.",
  ],
};

// Each entry with a `slug` gets its own page at /experience/:slug.
export const EXPERIENCE = [
  {
    slug: "newton-school",
    group: "Corporate",
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
    slug: "lawxy-ai",
    group: "Corporate",
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
    slug: "ninjacart",
    group: "Corporate",
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
  {
    slug: "lvlup-venture",
    group: "Community-led / Collegiate",
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
    slug: "technovanza",
    group: "Community-led / Collegiate",
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
    slug: "worldquant-brain",
    group: "Community-led / Collegiate",
    period: "May — Nov 2025",
    title: "Gold Researcher",
    organisation: "WorldQuant BRAIN",
    href: "https://worldquantbrain.com/consultant",
    logo: worldquantLogo,
    points: [
      "Gold Level Researcher (10k+ points); submitted 14 alphas & got an offer to work as Research Consultant",
    ],
  },
  {
    slug: "vjti",
    group: "Education",
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

export const EXPERIENCE_GROUPS = ["Corporate", "Community-led / Collegiate", "Education"];

export function getExperience(slug) {
  return EXPERIENCE.find((e) => e.slug === slug);
}

export function getAdjacentExperience(slug) {
  const index = EXPERIENCE.findIndex((e) => e.slug === slug);
  return {
    previous: index > 0 ? EXPERIENCE[index - 1] : undefined,
    next: index >= 0 && index < EXPERIENCE.length - 1 ? EXPERIENCE[index + 1] : undefined,
  };
}

export const HONORS = [
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

export const CERTIFICATIONS = [
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

export const ADDITIONAL = [
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
