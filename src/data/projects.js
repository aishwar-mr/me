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
        { label: "Team", value: "TraCkrCiT786 · ID 114406" },
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
        "Indian Railways inspects track with Integrated Track Monitoring Systems (ITMS) mounted on Track Recording Cars — but the current system is imported Russian technology and costs about ₹180 crore. For Smart India Hackathon 2025 (problem statement 25020, Smart Automation, Hardware) we built a compact, contactless, indigenous alternative that analyses track geometry and the condition of track components, and complies with EN 13848 Parts 1 & 2 and RDSO TM/IM/448 (Rev. 1, 2023).",
      process: [
        {
          num: "01",
          title: "Challenge",
          text: "The imported system brings high procurement and maintenance costs, closed-source software, little room to customise, scalability limits and vendor lock-in. Chainage mapping relies on GPS signals alone, so its accuracy is low and defects are hard to pinpoint on the track.",
        },
        {
          num: "02",
          title: "Approach",
          text: "A compact, cost-effective rig that mounts on a track recording car: IMU, laser sensor and ESP32-CAM feeding an ESP32 and a Raspberry Pi 400, running Python, OpenCV, an ANN and SQL. Edge computing does the first-level fault detection in real time; the cloud holds long-term trends. The software stack is open and standards-compliant, to avoid vendor lock-in.",
        },
        {
          num: "03",
          title: "Innovation",
          text: "Hybrid localisation fuses GPS and IMU for uninterrupted chainage mapping, with RFID tags on the track to sharpen defect location. AI/ML analytics find defect patterns and the full rail profile, moving maintenance from reactive to predictive. A plug-and-play architecture lets a railway zone deploy the full system or just a sub-system — geometry, rail profile or acceleration.",
        },
        {
          num: "04",
          title: "Feasibility",
          text: "Extracting track-geometry parameters and track-component conditions, and real-time data acquisition and processing, were both tested. The system is built to meet EN 13848 Parts 1 & 2 and RDSO TM/IM/448 (Rev. 1, 2023) accuracy standards, and was field-tested on Central Railway in Mumbai.",
        },
        {
          num: "05",
          title: "Impact",
          text: "Less foreign dependence and a system developed, owned and maintained in India; lower capital and operating cost; fewer accidents, derailments and downtime through early detection of critical defects; sensitive railway data processed and stored entirely within India; and more public trust in rail safety.",
        },
        {
          num: "06",
          title: "Outcome",
          text: "A working prototype. On test runs the dashboard flagged a misalignment from acceleration, gyroscope and ultrasonic readings, the camera detected broken fasteners at about 95% confidence, the accelerometer trace marked the defect point, and an SMS alert reached a phone. Data exports to CSV, XML and JPEG, with synchronised video.",
        },
      ],
      breakdowns: [
        {
          heading: "Technology stack",
          rows: [
            { label: "Hardware", text: "IMU · laser sensor · ESP32-CAM · ESP32 · Raspberry Pi 400" },
            { label: "Software", text: "Python · OpenCV & ANN · SQL" },
            { label: "Standards", text: "EN 13848 Parts 1 & 2 · RDSO TM/IM/448 (Rev. 1, 2023)" },
            { label: "Data out", text: "CSV, XML and JPEG exports with synchronised video" },
          ],
        },
        {
          heading: "Research & references",
          rows: [
            { label: "RDSO", text: "Technical Specification for Integrated Track Monitoring System, TM/IM/382 — Ministry of Railways, December 2017" },
            { label: "Standard", text: "SIST EN 13848-1 (Slovenski standard) — CEN/TC, June 2019" },
            { label: "Paper", text: "Introduction of Modern Track Inspection Technology in Indian Railways – ITMS – New TRC — Rahul Singh, Saroj Kumar Barnwal" },
            { label: "Paper", text: "Reliability of Track Geometry Reported by Track Recording Cars (TRCs): Provisions in EN 13848-2 — Saroj Kumar Barnwal, Saurabh Srivastava, Anupam Kumar Tiwary" },
          ],
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
      category: "Business analysis · Automation · AI",
      year: "Nov 2026",
      tagline: "Has my idea already been done —\nand is the space worth entering?",
      facts: [
        { label: "Context", value: "Business analysis, automation & AI project" },
        { label: "My role", value: "Requirements to release" },
        { label: "Delivered", value: "Nov 2026" },
        { label: "Stack", value: "Python · Streamlit · NLP" },
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
        "Founders and analysts keep asking the same thing before committing resources: has this been built already, and is the space worth entering? Describe an idea in plain English and the platform retrieves the most similar companies from 6,342 validated Y Combinator records, scores how saturated the space is, measures public sentiment from Hacker News and global news, and combines the signals into a transparent opportunity verdict. I treated it as a delivery exercise as much as a technical one: requirements first, then build, validation, testing, documentation and controlled release.",
      process: [
        {
          num: "01",
          title: "Challenge",
          text: "Answering the question by hand means days of searching directories, reading news and forming an unstructured opinion — gut feel and hours of manual Googling, with nothing to trace back to.",
        },
        {
          num: "02",
          title: "Requirements",
          text: "I wrote a requirements document, user stories and acceptance criteria first, then built to them. Example: “As a founder, I want to see how crowded my idea’s market is, so that I can decide whether to proceed” — a 0–100 score with a label from Wide open to Crowded, its three components visible and the formula explained on screen. A process-flow diagram maps idea to verdict, and the needs of a founder, an analyst and a reviewer shaped the four screens: Market Overview, Competitor Intelligence, AI Insights and Data Quality.",
        },
        {
          num: "03",
          title: "Data validation",
          text: "Data quality was a design requirement, not a cleanup step. Named rules cover missing identifiers, duplicates, empty descriptions and probable duplicates, with separate flag and normalisation rules; every exclusion is logged with its reason and a fingerprint of the input makes each run reproducible. It reconciles exactly: 6,399 records received, 6,342 passed, 57 excluded.",
        },
        {
          num: "04",
          title: "Testing & QA",
          text: "29 automated tests cover validation rules, determinism, search, analytics and the insight layer, and all pass in about two seconds. Streamlit smoke tests confirm each screen loads, and written test cases were checked against live outputs in the spirit of UAT — the saturation score for a known idea (86.2, Crowded, 53 matched competitors) is reproducible across runs. Retrieval was evaluated with a known-item test (Hit@1, Hit@k, MRR) and VADER was compared against a trained logistic-regression classifier, reported as indicative results with limitations stated.",
        },
        {
          num: "05",
          title: "Responsible AI",
          text: "AI Insights sends the retrieved companies and computed scores to a language model through OpenRouter, with three controls: the prompt holds only evidence from the data and tells the model not to add outside facts; a grounding check compares the response against that evidence; and if the check fails or the service is down, a rule-based summary takes over. The API key lives in the hosting platform’s secrets, never in the repository.",
        },
        {
          num: "06",
          title: "Release",
          text: "Built in Google Colab, moved to GitHub and deployed on Streamlit Community Cloud, which rebuilds on every push. The v2 upgrade followed the same path — tested locally, committed with a clear message, pushed and verified on the live URL — with a changelog and a user guide. Along the way I diagnosed environment and deployment issues from logs: a mismatched Python interpreter, a missing import and a failed model call.",
        },
        {
          num: "07",
          title: "Limits & next",
          text: "Scores are decision aids, not market facts: they rest on Y Combinator data only, and sentiment covers English text only — both limits are stated in the app. Next: precision-at-K evaluation against hand-labelled results, data sources beyond Y Combinator, and multilingual sentiment.",
        },
      ],
      breakdowns: [
        {
          heading: "How it works",
          rows: [
            { label: "Data intake", text: "Pulls the public Y Combinator directory (6,399 records) through an open API." },
            { label: "Validation", text: "Applies documented rules; excludes, flags or normalises records and keeps the raw data untouched." },
            { label: "Retrieval", text: "Ranks companies against the idea by TF-IDF and cosine similarity, or by sentence embeddings for meaning-based matching." },
            { label: "Analytics", text: "Computes the Market Saturation Score, category density and momentum indicators, and a white-space view of underserved angles." },
            { label: "Sentiment", text: "Scores recent mentions with VADER and fuses the result with saturation into an Opportunity Score." },
            { label: "AI insights", text: "Generates a short written summary grounded only in the retrieved evidence." },
            { label: "Interface", text: "Streamlit application with filters by industry, status, region, stage and batch year." },
          ],
        },
      ],
      results: [
        { value: "6,342", label: "Validated YC companies · 6,399 received, 57 excluded" },
        { value: "29", label: "Automated tests, all passing" },
        { value: "4", label: "Screens · Overview, Competitors, AI Insights, Data Quality" },
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
