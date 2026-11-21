// Project card + detail-page content. Cards 1 and 2 are real (Track
// Monitor, Startup Intelligence) and route to full detail pages; cards 3
// and 4 are still wireframe placeholders and stay inert ("#work"), exactly
// as the design leaves them.
import trackPrototype from "@/assets/projects/track-monitoring-prototype.jpg";
import trackRobot from "@/assets/projects/track-monitoring-robot.jpg";
import trackSihTeam from "@/assets/projects/track-monitoring-sih-team.jpg";
import startupIntelCard from "@/assets/projects/startup-intel-card.jpg";
import screenIdea from "@/assets/projects/startup-intel-screen-01-idea.jpg";
import screenSaturation from "@/assets/projects/startup-intel-screen-02-saturation.jpg";
import screenSentiment from "@/assets/projects/startup-intel-screen-03-sentiment.jpg";
import screenWhitespace from "@/assets/projects/startup-intel-screen-04-whitespace.jpg";

export const PROJECTS = [
  {
    id: "1",
    cardTitle: "Track\nMonitor",
    cardDesc:
      "Integrated track-inspection prototype for Smart India Hackathon 2025 — a rail-mounted device that scans track health on the move.",
    cardImage: trackPrototype,
    cardImageAlt: "Track-inspection prototype on railway tracks",
    cardImgHeight: 210,
    link: "/projects/1",
    detail: {
      index: "01",
      category: "Hardware · Smart Automation",
      year: "SIH 2025",
      tagline: "Indigenous, contactless track monitoring —\nan affordable ITMS for Indian Railways",
      facts: [
        { label: "Brief", value: "Indian Railways · SIH PS 25020" },
        { label: "My role", value: "[Your role]" },
        { label: "Timeline", value: "[Duration]" },
        { label: "Team", value: "TraCkrCiT786" },
      ],
      factsAction: { type: "text", value: "( Field-tested ·\nCentral Railway, Mumbai )" },
      media: {
        type: "carousel",
        slides: [
          { src: trackPrototype, alt: "Track inspection prototype being tested on railway tracks" },
          { src: trackRobot, alt: "Four-wheeled robot prototype with electronics board" },
          { src: trackSihTeam, alt: "Team presenting the project to judges at Smart India Hackathon 2025" },
        ],
      },
      overviewHeading: ["Track monitoring,", "made in", "India"],
      overviewText:
        "Indian Railways inspects track with Integrated Track Monitoring Systems (ITMS) mounted on Track Recording Cars — but the current system is imported and costs about ₹180 crore. We built a compact, contactless, indigenous alternative that analyses track geometry and the condition of track components, and is designed to comply with EN 13848 Parts 1 & 2 and RDSO TM/IM/448 (Rev. 1, 2023).",
      process: [
        {
          num: "01",
          title: "Challenge",
          text: "The imported system brings high procurement and maintenance costs, closed-source software, little room to customise and vendor lock-in — and its GPS-only chainage makes defects hard to pinpoint on the track.",
        },
        {
          num: "02",
          title: "Approach",
          text: "Plug-and-play hardware (IMU, laser sensor, ESP32-CAM, ESP32, Raspberry Pi 400) running Python, OpenCV, an ANN and SQL. GPS + IMU fusion keeps chainage mapping unbroken, RFID tags on the track sharpen defect location, edge computing handles real-time analytics, and the cloud tracks long-term trends.",
        },
        {
          num: "03",
          title: "Outcome",
          text: "A working prototype field-tested on Central Railway in Mumbai: real-time data capture and geometry/component analysis tested, ML that spots defect patterns for predictive maintenance, and exports to CSV, XML and JPEG with synchronised video.",
        },
      ],
      results: [
        { value: "₹30 Cr", label: "Estimated system cost" },
        { value: "~83%", label: "Projected cost cut vs the ₹180 Cr imported ITMS" },
        { value: "1st", label: "Of 80 teams · SIH ’25 inter-college round" },
      ],
      resultsSize: "text-u88 max-md:text-[56px]",
    },
  },
  {
    id: "2",
    cardTitle: "Startup\nIntel",
    cardDesc:
      "Type a startup idea, get ranked competitors, a saturation score and an opportunity verdict — a web-mining decision tool.",
    cardImage: startupIntelCard,
    cardImageAlt: "Startup Intelligence saturation gauge reading 86.2, Crowded",
    cardImgHeight: 200,
    cardImageBg: "#ffffff",
    link: "/projects/2",
    detail: {
      index: "02",
      category: "Web mining · NLP",
      year: "2026",
      tagline: "Has my idea already been done —\nand is the space worth entering?",
      facts: [
        { label: "Context", value: "Web-mining project" },
        { label: "My role", value: "Research & build" },
        { label: "Timeline", value: "[Duration]" },
        { label: "Stack", value: "Python · Streamlit · scikit-learn" },
      ],
      factsAction: {
        type: "link",
        href: "https://startup-intelligence-ht.streamlit.app",
        label: "( View live ↗ )",
      },
      media: {
        type: "screens",
        items: [
          {
            src: screenIdea,
            alt: "Startup Intelligence home: describe an idea and a news topic, then Analyze",
            caption: "01 · Describe the idea",
          },
          {
            src: screenSaturation,
            alt: "Market saturation gauge reading 86.2, Crowded, with breadth, closeness and vitality",
            caption: "02 · Market saturation",
          },
          {
            src: screenSentiment,
            alt: "Sentiment of 50 English mentions: mostly positive",
            caption: "03 · Community & news sentiment",
          },
          {
            src: screenWhitespace,
            alt: "White space tab: crowded dimensions versus underserved gaps",
            caption: "04 · White-space gaps",
          },
        ],
        href: "https://startup-intelligence-ht.streamlit.app",
      },
      overviewHeading: ["Idea in,", "verdict", "out"],
      overviewText:
        "Type a startup idea in plain English and get four things back: a ranked list of the most similar existing startups, a Market Saturation Score for how crowded the space is, a community-and-news sentiment read, and one Opportunity Score with a plain-English verdict — built for first-time founders, students and accelerator applicants.",
      process: [
        {
          num: "01",
          title: "Challenge",
          text: "Founders had no fast, data-driven way to tell if an idea is already crowded, or how the world feels about that space — only gut feel and hours of manual Googling.",
        },
        {
          num: "02",
          title: "Approach",
          text: "Fused four web-mining techniques into one pipeline — information retrieval and TF-IDF plus semantic search over ~6,345 YC companies for competitor discovery, a custom saturation metric, and VADER sentiment over live Hacker News and GDELT news.",
        },
        {
          num: "03",
          title: "Outcome",
          text: "A live Streamlit app: enter an idea and see ranked competitors, a Market Saturation Score, a sentiment read, and a single Opportunity Score with a 2×2 verdict — each technique evaluated with its own metric.",
        },
      ],
      results: [
        { value: "6,345", label: "YC companies indexed" },
        { value: "4", label: "Web-mining techniques fused" },
        { value: "5", label: "Dashboard tabs" },
      ],
      resultsSize: "text-u72 max-md:text-[52px]",
    },
  },
  {
    id: "3",
    cardTitle: "[Project\nthree]",
    cardDesc: "[One-line project description, two or three lines long.]",
    cardImage: null,
    cardImgHeight: 210,
    link: "#work",
  },
  {
    id: "4",
    cardTitle: "[Project\nfour]",
    cardDesc: "[One-line project description, two or three lines long.]",
    cardImage: null,
    cardImgHeight: 210,
    link: "#work",
  },
];

export function getProject(id) {
  return PROJECTS.find((p) => p.id === id);
}
