// Project card + detail-page content for the three projects (Track Monitor,
// Startup Intelligence, Frappe Builder), each routing to a full detail page.
import trackPrototype from "@/assets/projects/track-monitoring-prototype.jpg";
import trackRobot from "@/assets/projects/track-monitoring-robot.jpg";
import trackSihTeam from "@/assets/projects/track-monitoring-sih-team.jpg";
import startupIntelCard from "@/assets/projects/startup-intel-card.jpg";
import screenIdea from "@/assets/projects/startup-intel-screen-01-idea.jpg";
import screenSaturation from "@/assets/projects/startup-intel-screen-02-saturation.jpg";
import screenSentiment from "@/assets/projects/startup-intel-screen-03-sentiment.jpg";
import screenWhitespace from "@/assets/projects/startup-intel-screen-04-whitespace.jpg";
import frappeEditor from "@/assets/projects/frappe-builder-editor.jpg";
import frappeCard from "@/assets/projects/frappe-builder-card.jpg";
import frappeLayers from "@/assets/projects/frappe-builder-layers.jpg";
import frappeCanvas from "@/assets/projects/frappe-builder-canvas.jpg";
import frappeProperties from "@/assets/projects/frappe-builder-properties.jpg";
import frappeToolbar from "@/assets/projects/frappe-builder-toolbar.jpg";
import frappeTokens from "@/assets/projects/frappe-builder-tokens.jpg";
import frappeThemes from "@/assets/projects/frappe-builder-tokens-themes.jpg";

export const PROJECTS = [
  {
    id: "1",
    cardTitle: "Track\nMonitor",
    cardDesc:
      "Smart India Hackathon 2025 prototype: a rail-mounted device that scans track health on the move.",
    cardImage: trackPrototype,
    cardImageAlt: "Track-inspection prototype on railway tracks",
    cardImgHeight: 210,
    link: "/projects/1",
    listLine:
      "Contactless, indigenous track monitoring for Indian Railways at about a sixth of the imported system’s cost.",
    listMeta: "Hardware · SIH 2025",
    detail: {
      index: "01",
      category: "Hardware · Smart Automation",
      year: "SIH 2025",
      tagline: "Indigenous, contactless track monitoring,\nan affordable ITMS for Indian Railways",
      facts: [
        { label: "Brief", value: "Indian Railways · SIH PS 25020" },
        { label: "My role", value: "ML integration" },
        { label: "Timeline", value: "5 weeks to build" },
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
        "Indian Railways inspects track with Integrated Track Monitoring Systems (ITMS) mounted on Track Recording Cars, but the current system is imported Russian technology costing about ₹180 crore. For Smart India Hackathon 2025 (problem statement 25020, Smart Automation, Hardware) we built a compact, contactless, indigenous alternative that analyses track geometry and component condition, and complies with EN 13848 Parts 1 & 2 and RDSO TM/IM/448 (Rev. 1, 2023).",
      process: [
        {
          num: "01",
          title: "Challenge",
          text: "The imported system means high procurement and maintenance costs, closed-source software, little room to customise, limited scalability and vendor lock-in. Chainage mapping relies on GPS alone, so accuracy is low and defects are hard to pinpoint.",
        },
        {
          num: "02",
          title: "Approach",
          text: "A compact, low-cost rig that mounts on a track recording car: an IMU, laser sensor and ESP32-CAM feed an ESP32 and a Raspberry Pi 400 running Python, OpenCV, an ANN and SQL. Edge computing detects first-level faults in real time; the cloud holds long-term trends. The open, standards-compliant stack avoids vendor lock-in.",
        },
        {
          num: "03",
          title: "Innovation",
          text: "Hybrid localisation fuses GPS and IMU for uninterrupted chainage mapping, and RFID tags on the track sharpen defect location. AI/ML analytics find defect patterns and the full rail profile, moving maintenance from reactive to predictive. A plug-and-play architecture lets a railway zone deploy the full system or a single sub-system: geometry, rail profile or acceleration.",
        },
        {
          num: "04",
          title: "Feasibility",
          text: "We tested extraction of track-geometry parameters and component conditions, and real-time data acquisition and processing. The system is built to EN 13848 Parts 1 & 2 and RDSO TM/IM/448 (Rev. 1, 2023) accuracy standards and was field-tested on Central Railway in Mumbai.",
        },
        {
          num: "05",
          title: "Impact",
          text: "Less foreign dependence, with the system developed, owned and maintained in India; lower capital and operating cost; fewer accidents, derailments and downtime through early detection of critical defects; sensitive railway data processed and stored entirely in India; greater public trust in rail safety.",
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
            { label: "RDSO", text: "Technical Specification for Integrated Track Monitoring System, TM/IM/382, Ministry of Railways, December 2017" },
            { label: "Standard", text: "SIST EN 13848-1 (Slovenski standard), CEN/TC, June 2019" },
            { label: "Paper", text: "Introduction of Modern Track Inspection Technology in Indian Railways – ITMS – New TRC, Rahul Singh, Saroj Kumar Barnwal" },
            { label: "Paper", text: "Reliability of Track Geometry Reported by Track Recording Cars (TRCs): Provisions in EN 13848-2, Saroj Kumar Barnwal, Saurabh Srivastava, Anupam Kumar Tiwary" },
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
      "Type a startup idea, get ranked competitors, a saturation score and an opportunity verdict: a web-mining decision tool.",
    cardImage: startupIntelCard,
    cardImageAlt: "Startup Intelligence saturation gauge reading 86.2, Crowded",
    cardImgHeight: 200,
    cardImageBg: "#ffffff",
    link: "/projects/2",
    listLine:
      "Describe a startup idea; get ranked competitors, a market-saturation score and an opportunity verdict.",
    listMeta: "Analysis · AI · 2026",
    detail: {
      index: "02",
      category: "Business analysis · Automation · AI",
      year: "Nov 2026",
      tagline: "Has my idea already been done,\nand is the space worth entering?",
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
        "Before committing resources, founders and analysts ask the same thing: has this been built, and is the space worth entering? Describe an idea in plain English and the platform retrieves the most similar companies from 6,342 validated Y Combinator records, scores market saturation, measures public sentiment from Hacker News and global news, and combines the signals into a transparent opportunity verdict. I treated it as a delivery exercise as much as a technical one: requirements first, then build, validation, testing, documentation and controlled release.",
      process: [
        {
          num: "01",
          title: "Challenge",
          text: "Answering by hand takes days of searching directories and reading news, ending in an unstructured opinion: gut feel and hours of manual Googling, with nothing to trace back to.",
        },
        {
          num: "02",
          title: "Requirements",
          text: "I wrote requirements, user stories and acceptance criteria first, then built to them. Example: “As a founder, I want to see how crowded my idea’s market is, so that I can decide whether to proceed”, a 0–100 score labelled from Wide open to Crowded, with its three components visible and the formula explained on screen. A process-flow diagram maps idea to verdict, and the needs of a founder, an analyst and a reviewer shaped the four screens: Market Overview, Competitor Intelligence, AI Insights and Data Quality.",
        },
        {
          num: "03",
          title: "Data validation",
          text: "Data quality was a design requirement, not a cleanup step. Named rules cover missing identifiers, duplicates, empty descriptions and probable duplicates, with separate flag and normalisation rules. Every exclusion is logged with its reason, and a fingerprint of the input makes each run reproducible. The counts reconcile exactly: 6,399 records received, 6,342 passed, 57 excluded.",
        },
        {
          num: "04",
          title: "Testing & QA",
          text: "29 automated tests cover validation rules, determinism, search, analytics and the insight layer, and pass in about two seconds. Streamlit smoke tests confirm each screen loads, and written test cases were checked against live outputs in the spirit of UAT: the saturation score for a known idea (86.2, Crowded, 53 matched competitors) is reproducible across runs. Retrieval was evaluated with a known-item test (Hit@1, Hit@k, MRR), and VADER was compared with a trained logistic-regression classifier; results are indicative, with limitations stated.",
        },
        {
          num: "05",
          title: "Responsible AI",
          text: "AI Insights sends the retrieved companies and computed scores to a language model through OpenRouter, with three controls: the prompt holds only evidence from the data and forbids outside facts; a grounding check compares the response against that evidence; and a rule-based summary takes over if the check fails or the service is down. The API key lives in the hosting platform’s secrets, never the repository.",
        },
        {
          num: "06",
          title: "Release",
          text: "Built in Google Colab, moved to GitHub and deployed on Streamlit Community Cloud, which rebuilds on every push. The v2 upgrade followed the same path (tested locally, committed with a clear message, pushed and verified on the live URL) with a changelog and user guide. I diagnosed environment and deployment issues from logs: a mismatched Python interpreter, a missing import and a failed model call.",
        },
        {
          num: "07",
          title: "Limits & next",
          text: "Scores are decision aids, not market facts: they rest on Y Combinator data only, and sentiment covers English text only. Both limits are stated in the app. Next: precision-at-K evaluation against hand-labelled results, sources beyond Y Combinator, and multilingual sentiment.",
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
    cardTitle: "Frappe\nBuilder",
    cardDesc:
      "A technical blog on Frappe Builder (why a website shouldn’t need a sprint ticket), with annotated product screens.",
    cardImage: frappeCard,
    cardImageAlt: "Frappe Builder editor showing a brand-studio page on the canvas",
    cardImgHeight: 210,
    link: "/projects/3",
    listLine:
      "A self-initiated technical blog on Frappe Builder: the case for a visual page builder that gives marketing speed without sacrificing performance or brand.",
    listMeta: "Technical blog · PMM",
    detail: {
      index: "03",
      category: "Technical blog · Product marketing",
      year: "Self-initiated",
      tagline: "Your website shouldn’t\nneed a sprint ticket",
      facts: [
        { label: "Track", value: "Product marketing manager · self-initiated" },
        { label: "My role", value: "Author · positioning, copy & product walkthrough" },
        { label: "Product", value: "Frappe Builder" },
        { label: "Format", value: "Technical blog + annotated screens" },
      ],
      factsAction: {
        type: "link",
        href: "https://frappe.io/builder",
        label: "( Frappe Builder ↗ )",
      },
      media: {
        type: "figure",
        src: frappeEditor,
        alt: "Frappe Builder editor: layer tree on the left, a brand-studio landing page on the canvas, style properties on the right, and a Publish button",
        caption: "Frappe Builder · layers, canvas and properties in one view",
      },
      overviewHeading: ["Ship pages", "without", "a ticket"],
      overviewText:
        "At small and mid-sized companies the same bottleneck recurs: marketing needs a landing page, engineering owns the website, and the page ships two weeks late, if at all, after the campaign has moved on. The usual fix, a visual builder, has its own cost: drag-and-drop ease in exchange for performance, brand consistency and often a per-seat bill that outgrows the team. Frappe Builder was built to avoid that trade. On my own initiative, for the product marketing manager track, I wrote its technical blog for the person who feels the pain most, the product manager, and anchored each claim to a screen from the product.",
      process: [
        {
          num: "01",
          title: "Problem",
          text: "Pages wait in a sprint queue. Engineering time must be negotiated, deploy windows set the launch date, and a team running campaigns quarterly loses the first two weeks to the website.",
        },
        {
          num: "02",
          title: "Angle",
          text: "Frame the blog around what changes when a PM has Builder, not around a feature list. Each section makes a plain claim (“You stop waiting”, “You stop being afraid to touch it”) then states the practical effect on the team.",
        },
        {
          num: "03",
          title: "Message",
          text: "Edit section by section on a visual canvas, preview, and publish in one click. Version control makes every change recoverable, and preview means nothing goes live unseen. Design tokens define palette, fonts and templates once, so every new page inherits them and light and dark themes stay aligned as more people publish.",
        },
        {
          num: "04",
          title: "Differentiator",
          text: "AI at cost, not at markup. Builder ships with BOB, an AI page generator, and you bring your own API key: you pay the model provider directly, with nothing in between. Cost tracks what you generate, not headcount, so the AI bill scales with usage rather than hiring.",
        },
        {
          num: "05",
          title: "Proof",
          text: "Almost no builder claims speed, because most produce pages weighed down by scripts nobody asked for. Builder’s creator set out to fix exactly that, frappe.io itself runs on Builder, and its pages score consistently well on Lighthouse. Domain, embeds and analytics sit where the page was built, shortening the loop from shipping to knowing from days to same-day.",
        },
        {
          num: "06",
          title: "Honest caveats",
          text: "A “Worth knowing” note closes the blog: Builder is open source under AGPL-3.0, so the licence terms matter if you plan to modify it commercially, and it can be self-hosted free or run managed on Frappe Cloud. The AI cost comparison is written as a formula (pages a month, users, rupees a year), ready for real usage numbers.",
        },
      ],
      highlights: [
        {
          src: frappeCanvas,
          alt: "A brand-studio landing page with a hero, selected work cards and services, open on the Builder canvas at 44% zoom",
          caption: "01 · Visual canvas",
          title: "Edit the page where you see it",
          text: "Build the page section by section on a live canvas (hero, selected work, services) and preview it at desktop, tablet and mobile widths before one click publishes it. No ticket, no deploy window.",
          aspect: "882 / 915",
        },
        {
          src: frappeLayers,
          alt: "Layer tree listing Root, Bureau Nav, Section Hero, Work, Services, Manifesto, Clients and Bureau Footer",
          caption: "02 · Layers",
          title: "Structure you can read",
          text: "Every page is a tree of named sections, with shared pieces such as the nav and footer reused across pages. Anyone on the team can find the block they need without reading code.",
          aspect: "430 / 470",
        },
        {
          src: frappeProperties,
          alt: "Properties panel with Layout, Typography and Style controls including opacity and background colour",
          caption: "03 · Properties",
          title: "Styling without a stylesheet",
          text: "Layout, typography and style controls sit beside the canvas, with search across properties. Fine control is there when it’s needed, without opening a code editor.",
          aspect: "384 / 927",
        },
        {
          src: frappeThemes,
          alt: "Design tokens table listing six colours with matching light and dark values",
          caption: "04 · Design tokens",
          title: "Brand defined once",
          text: "Palette, fonts and dimensions live as named tokens, each with a light and a dark value. New pages inherit them automatically, so the brand holds even as sales, support and regional teams start to publish.",
          aspect: "1014 / 590",
        },
        {
          src: frappeToolbar,
          alt: "Builder toolbar with the page name and path, settings, preview and Publish",
          caption: "05 · Preview & publish",
          title: "One click to live",
          text: "Preview sits next to Publish in the toolbar, so a change is checked before it goes live, and because every change is versioned, a bad edit is recoverable in minutes, not hours.",
          aspect: "2048 / 72",
        },
      ],
      breakdowns: [
        {
          heading: "What the blog argues",
          rows: [
            { label: "You stop waiting", text: "Visual canvas, preview, one-click publish. Roughly 30 engineering hours back on the roadmap for a team running multiple campaigns a quarter; page turnaround from days to hours." },
            { label: "Fearless edits", text: "Version control and preview mean every change is recoverable. Mean time to fix a bad page drops from hours to minutes." },
            { label: "Brand intact", text: "Design tokens and templates defined once; business users invited while admin control stays where it belongs." },
            { label: "AI at cost", text: "BOB, the AI page generator, runs on your own API key: you pay the provider directly, and cost follows usage instead of headcount." },
            { label: "Closed loop", text: "Custom domain, video and third-party embeds, and analytics in the same place the page is built, shipping to knowing in the same day." },
            { label: "Performance", text: "Lean pages by design: frappe.io runs on Builder and scores consistently well on Lighthouse." },
          ],
        },
        {
          heading: "Good to know",
          rows: [
            { label: "Licence", text: "Open source under AGPL-3.0, so check the terms before modifying it commercially." },
            { label: "Hosting", text: "Self-host for free, or run it managed on Frappe Cloud." },
          ],
        },
      ],
      results: [
        { value: "~30 hrs", label: "Engineering hours returned to the roadmap" },
        { value: "Days → hours", label: "Page turnaround" },
        { value: "Hrs → mins", label: "Mean time to fix a bad page" },
      ],
      resultsSize: "text-u44 max-md:text-[34px]",
    },
  },
];

export function getProject(id) {
  return PROJECTS.find((p) => p.id === id);
}
