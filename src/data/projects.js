// Project card + detail-page content. All four cards are real (Track
// Monitor, Startup Intelligence, Frappe Builder, Nearshore Siting Agent) and
// route to full detail pages. The Nearshore panels are rendered from the
// project's own README output (terminal run, pipeline, money layer, gate,
// measured limits) — see src/assets/projects/nearshore-*.jpg.
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
import nsTerminal from "@/assets/projects/nearshore-terminal.jpg";
import nsCard from "@/assets/projects/nearshore-card.jpg";
import nsArchitecture from "@/assets/projects/nearshore-architecture.jpg";
import nsMoney from "@/assets/projects/nearshore-money-layer.jpg";
import nsGate from "@/assets/projects/nearshore-gate.jpg";
import nsLimits from "@/assets/projects/nearshore-limits.jpg";

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
    listLine:
      "Contactless, indigenous track monitoring for Indian Railways — at about a sixth of the imported system’s cost.",
    listMeta: "Hardware · SIH 2025",
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
    listLine:
      "Describe a startup idea; get ranked competitors, a market-saturation score and an opportunity verdict.",
    listMeta: "Analysis · AI · 2026",
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
    cardTitle: "Frappe\nBuilder",
    cardDesc:
      "A technical blog on Frappe Builder — why a website shouldn’t need a sprint ticket — with annotated product screens.",
    cardImage: frappeCard,
    cardImageAlt: "Frappe Builder editor showing a brand-studio page on the canvas",
    cardImgHeight: 210,
    link: "/projects/3",
    listLine:
      "A self-initiated technical blog on Frappe Builder: the case for a visual page builder that gives marketing speed without handing back performance or brand.",
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
        "At small and mid-sized companies the same quiet bottleneck keeps repeating: marketing needs a landing page, engineering owns the website, and the page ships two weeks late — if it ships at all — by which time the campaign has moved on. The usual fix is a visual builder, but that trade has its own cost: drag-and-drop ease in exchange for performance, brand consistency and often a per-seat bill that grows faster than the team. On my own initiative, as a piece for the product marketing manager track, I wrote the technical blog for Frappe Builder — which was built to avoid that trade — aimed at the person who feels the pain most, the product manager, and anchored each claim to a screen from the product itself.",
      process: [
        {
          num: "01",
          title: "Problem",
          text: "Pages wait in a sprint queue. Engineering time is negotiated for, deploy windows decide the launch date, and a campaign that runs on a quarterly rhythm keeps losing the first two weeks to the website.",
        },
        {
          num: "02",
          title: "Angle",
          text: "Frame the blog around what actually changes when a PM has Builder, not around a feature list. Each section is a plain-spoken claim — “You stop waiting”, “You stop being afraid to touch it” — followed by the practical effect on the team.",
        },
        {
          num: "03",
          title: "Message",
          text: "Edit section by section on a visual canvas, preview, and publish in one click. Version control makes every change recoverable and preview means nothing goes live unseen. Design tokens define palette, fonts and templates once, so every new page inherits them and light and dark themes stay aligned as more people publish.",
        },
        {
          num: "04",
          title: "Differentiator",
          text: "AI at cost, not at markup. Builder ships with BOB, an AI page generator, and you bring your own API key — you pay the model provider directly, nothing sits in between. Cost tracks what you generate rather than headcount, so the AI bill scales with usage and not with how many people you hire.",
        },
        {
          num: "05",
          title: "Proof",
          text: "Speed is the claim almost no builder makes, because most produce pages weighed down by scripts nobody asked for. Builder’s creator set out to fix exactly that, frappe.io itself runs on Builder, and its pages score consistently well on Lighthouse. Domain, embeds and analytics sit in the same place the page was built, closing the loop between shipping and knowing from days to same-day.",
        },
        {
          num: "06",
          title: "Honest caveats",
          text: "A “Worth knowing” note closes the blog: Builder is open source under AGPL-3.0, so the licence terms matter if you plan to modify it commercially, and it can be self-hosted free or run managed on Frappe Cloud. The AI cost comparison is written as a formula — pages a month, users, rupees a year — ready for real usage numbers.",
        },
      ],
      highlights: [
        {
          src: frappeCanvas,
          alt: "A brand-studio landing page — hero, selected work cards and services — open on the Builder canvas at 44% zoom",
          caption: "01 · Visual canvas",
          title: "Edit the page where you see it",
          text: "The page is built section by section on a live canvas — hero, selected work, services — and previewed at desktop, tablet and mobile widths before one click publishes it. No ticket, no deploy window.",
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
          text: "Preview sits next to Publish in the toolbar, so a change is checked before it goes live — and because every change is versioned, a bad edit is recoverable in minutes, not hours.",
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
            { label: "Closed loop", text: "Custom domain, video and third-party embeds, and analytics in the same place the page is built — shipping to knowing in the same day." },
            { label: "Performance", text: "Lean pages by design: frappe.io runs on Builder and scores consistently well on Lighthouse." },
          ],
        },
        {
          heading: "Good to know",
          rows: [
            { label: "Licence", text: "Open source under AGPL-3.0 — check the terms before modifying it commercially." },
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
  {
    id: "4",
    cardTitle: "Nearshore\nSiting",
    cardDesc:
      "A site-screening agent for industrial plants: hard gates, a weighted ranking and a sensitivity pass — no LLM in the decision path.",
    cardImage: nsCard,
    cardImageAlt: "Nearshore Siting Agent result: top site scored 0.738 with water, power, cost and logistics bars",
    cardImgHeight: 210,
    link: "/projects/4",
    listLine:
      "Screens candidate plant sites on water, power, cost and logistics at about $0.045 a site — deterministic gates, ranked, then stress-tested.",
    listMeta: "Python · Geospatial",
    detail: {
      index: "04",
      category: "Geospatial analysis · Decision tooling",
      year: "Python",
      tagline: "Facts eliminate, priorities rank —\nand the ranking attacks itself",
      facts: [
        { label: "Brief", value: "Screening sites for a textile dye house" },
        { label: "My role", value: "Design, build & write-up" },
        { label: "Size", value: "582 lines · 12 candidates screened" },
        { label: "Stack", value: "Python · async HTTP · geospatial API" },
      ],
      factsAction: { type: "text", value: "( Dry run by default ·\nspends nothing )" },
      media: {
        type: "figure",
        src: nsTerminal,
        alt: "Terminal output of the siting agent: gate result of 3 passed, 5 eliminated, 4 unavailable; a ranked table of three sites with water, power, cost and logistics scores; and a sensitivity pass reporting the winner changes in 1 of 12 scenarios",
        caption: "python run.py --offline · ranked table and sensitivity pass",
        mobileMin: 640,
      },
      overviewHeading: ["Facts gate,", "priorities", "rank"],
      overviewText:
        "Choosing where to put a plant is a decision worth tens of millions of dollars that is still made largely by hand: an analyst pulls a dozen unrelated federal and state datasets for every candidate address, and the baseline is a task measured in weeks. For a textile dye house the stakes are sharper — wet processing is water- and effluent-bound, so a site where a discharge permit is unobtainable doesn’t get delayed, it dies after the land is bought. I built a four-layer pipeline that enriches each address from one API call, eliminates on physics and law, ranks the survivors, and then stress-tests its own answer. No LLM sits anywhere in the decision path, and every number carries its source, confidence and dataset vintage.",
      process: [
        {
          num: "01",
          title: "Problem",
          text: "Data is scattered across EPA, EIA, FEMA, HUD, Census, REGRID and state layers, so every site is a manual research project and comparisons are inconsistent. Outputs carry no provenance — a cell reading 345 can’t be defended six months later — and judgement and fact are mixed in the same step.",
        },
        {
          num: "02",
          title: "Why it stays hard",
          text: "Data goes missing unpredictably, and failures are location-specific rather than field-specific: a rural site and an urban site fail on completely different fields, so no reliable-subset assumption survives. And a single score hides its own fragility — a ranking that flips under a 10% weight change looks identical to one that doesn’t.",
        },
        {
          num: "03",
          title: "Design principle",
          text: "Separate what is a fact from what is a preference. The gate encodes physics and law and is absolute. The score encodes priorities and is explicitly declared, weighted and stress-tested. The layers don’t know about each other: gate and score accept anything exposing .value(field) and .citation(field), which let them be developed against cached responses at zero cost.",
        },
        {
          num: "04",
          title: "The money layer",
          text: "The client exists to make calls expensive to fire by accident: cache first, then dry-run, then a hard budget ceiling that raises before it increments, then a semaphore of ten. One preset call returns 72 fields, collapsing the design from three calls per site to one. Because the cache is checked before the budget and the semaphore, the full 12-site screen replays in 0.7 seconds for zero credits.",
        },
        {
          num: "05",
          title: "Gate, score, stress-test",
          text: "Eight rules, each with two independent axes — what to do when a value fails, and what to do when it is missing — give a three-state result: passed, eliminated (with the field, value, requirement and citation) or unavailable. Survivors are scored on 15 criteria in four dimensions — water 35%, power 30%, cost 20%, logistics 15% — with weights declared, not fitted. Then 12 reweightings try to break the winner, and every flip is reported.",
        },
        {
          num: "06",
          title: "Honest limits",
          text: "Real textile plants were eliminated on parcel size (2 of 2 closest analogues), an office park ranked second because the gate never tests permitted use, and Brea CA died on a 3 kV miss against a 69 kV threshold. Correlated power criteria are multiply counted and imputation is invisible in the total. All stated up front, with fixes.",
        },
        {
          num: "07",
          title: "Next",
          text: "Benchmark the thresholds: run 50–100 operating US textile and dye facilities through the same enrichment so each threshold becomes a percentile with a stated coverage level, then measure false-negative rate on a held-out 30%. After that: absolute scoring, confidence-aware weights, candidate discovery from bulk parcel data, and region-aware profiles for places where water allocation, not proximity, is the constraint.",
        },
      ],
      highlights: [
        {
          src: nsArchitecture,
          alt: "Pipeline diagram: client.py, gate.py, score.py and run.py, with the data passed between each layer",
          caption: "01 · Architecture",
          title: "Four layers that don’t know each other",
          text: "I/O and money, absolute gate, relative score, orchestrator — joined only by plain result objects. Swapping the data provider means rewriting one file, and the gate and score layers were built entirely against cached responses.",
          aspect: "1650 / 905",
          wide: true,
          mobileMin: 640,
        },
        {
          src: nsMoney,
          alt: "Order of operations in the client: cache, dry run, budget ceiling, semaphore, HTTP — with the cost and speed figures that follow from it",
          caption: "02 · The money layer",
          title: "Calls that are hard to fire by accident",
          text: "Cache before budget before concurrency. Dry run is the default and --live must be typed. A runaway at ten concurrent calls burns about 450 credits, not about 1,800.",
          aspect: "1650 / 843",
          wide: true,
          mobileMin: 640,
        },
        {
          src: nsGate,
          alt: "GateRule definition with severity and on_missing axes, and the three outcomes: passed, eliminated, unavailable",
          caption: "03 · The gate",
          title: "“Too far” and “not mapped” are different claims",
          text: "Each rule separates what happens when a value fails from what happens when it is absent, so a missing field is never silently scored as a bad one.",
          aspect: "1650 / 602",
          wide: true,
          mobileMin: 640,
        },
        {
          src: nsLimits,
          alt: "Three measured defects: false negatives on real plants, an office park ranked second, and a 66 kV site eliminated against a 69 kV threshold",
          caption: "04 · Honest limits",
          title: "Defects, measured and stated",
          text: "Two real plants eliminated on parcel size, a control site that should have failed but ranked second, and a threshold cliff. Each has a named fix, and the benchmarking plan is how thresholds stop being opinions.",
          aspect: "1650 / 609",
          wide: true,
          mobileMin: 640,
        },
      ],
      breakdowns: [
        {
          heading: "How it runs",
          rows: [
            { label: "Dry run", text: "python run.py — prints what it would cost and spends nothing. This is the default." },
            { label: "One address", text: "python run.py \"1000 Nissan Dr, Smyrna, TN\" screens a single site ad hoc." },
            { label: "Offline", text: "python run.py --offline replays the local cache for free, regardless of age, and never calls out." },
            { label: "Live", text: "python run.py --live --max-calls 20 spends credits, with a hard ceiling that raises BudgetExceeded rather than draining the account." },
            { label: "Output", text: "A ranked table plus shortlist.json carrying every raw value, normalised value, imputation flag, confidence and citation, and every elimination reason." },
          ],
        },
        {
          heading: "What it is not",
          rows: [
            { label: "Not a decision", text: "A screening funnel. It can’t say whether zoning permits the use, whether permits are obtainable, what incentives are negotiable, or whether the land is for sale." },
            { label: "Not discovery", text: "It is a point-query tool: hand it a location and it describes that location. Sourcing parcels worth screening is the missing front half." },
          ],
        },
      ],
      results: [
        { value: "$0.045", label: "Raw API cost per site · one call each" },
        { value: "582", label: "Lines of Python · no LLM in the decision path" },
        { value: "0.7 s", label: "Full 12-site screen replayed from cache, zero credits" },
      ],
      resultsSize: "text-u72 max-md:text-[52px]",
    },
  },
];

export function getProject(id) {
  return PROJECTS.find((p) => p.id === id);
}
