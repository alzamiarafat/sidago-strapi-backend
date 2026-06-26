/** Props for reusable HeroBannerSection (homepage / operations pattern). */
export const heroBanner = {
  useVideo: false,
  imageSrc: null,
  titles: [
    { title: "Empowering people to", sortOrder: 1 },
    {
      title: "achieve more",
      className: "text-green-dark",
      sortOrder: 2,
    },
  ],
  subtitle:
    "Join Sidago's dynamic, high-performing, and collaborative team culture",
  ctaLabel: "Explore open roles",
  ctaHref: "/company/opportunities",
  ctaSrText: "Company › Opportunities",
  ctaButtonClass:
    "group/interactive gap-md inline-flex items-center justify-between font-medium disabled:opacity-50 bevel bevel-[0.25rem] px-sm py-xs text-gray-night-green bg-green-dark",
  videoSectionClass:
    "bg-gray-night-green text-gray-off-white lg:min-h-[75svh]",
  videoClass: "careers-hero-visual",
  fontWeight: 400,
  lighterTheme: false,
  loop: false,
  sideLogo: {
    src: "/images/navbar-logo-icon.png",
    alt: "Sidago",
    width: 560,
    height: 446,
    position: "right",
    offsetRight: 0,
  },
};

/** Quote block below statistics (culture / hiring message). */
export const quoteSection = {
  quote:
    "We focus on hiring the fewest number of the most talented and high-performing individuals, who can be versatile and grow within the company. At Sidago, every role is a revenue generating one and expected to make true impact.”",
  attribution: "Marina Gurevich, COO of Sidago",
};

/** Dotted matrix stats (homepage Statistics component). */
export const statistics = [
  {
    stat: "140",
    labelLines: ["HIGH PERFORMING", "INDIVIDUALS"],
    width: 244,
    activeDotColor: "#E7512F",
    sortOrder: 1,
  },
  {
    stat: "40",
    labelLines: ["NATIONALITIES", "REPRESENTED"],
    width: 248,
    activeDotColor: "#E7512F",
    sortOrder: 2,
  },
  {
    stat: "95",
    labelLines: ["VOLUNTARY RETENTION,", "%"],
    width: 220,
    activeDotColor: "#7A9BB5",
    sortOrder: 3,
  },
  {
    stat: "70",
    labelLines: ["EMPLOYEE", "SHAREHOLDERS, %"],
    width: 220,
    activeDotColor: "#E7512F",
    sortOrder: 4,
  },
  {
    stat: "140",
    labelLines: ["EMPLOYEES BENEFITTING", "FROM PROFIT SHARING"],
    width: 244,
    activeDotColor: "#E7512F",
    sortOrder: 5,
  },
];

/** Flip cards section (shared OurVision component, green variant). */
export const valuesFlipSection = {
  title: "Sidago values",
  headingId: "wintermute-values",
  items: [
    {
      title: "Ambitious",
      iconType: "ambitious",
      sortOrder: 1,
      bullets: [
        "We set the most ambitious goals",
        "We set the highest standards for ourselves and work hard",
        "We play to win",
      ],
    },
    {
      title: "Collaborative",
      iconType: "collaborative",
      sortOrder: 2,
      bullets: [
        "We go above and beyond to help our partners and counterparties grow",
        "We work as a team, not as siloed groups or individuals",
        "We are united by common goals and values",
      ],
    },
    {
      title: "Entrepreneurial",
      iconType: "entrepreneurial",
      sortOrder: 3,
      bullets: [
        "We love building new innovative things",
        "We move very fast and focus on the results",
        "We empower everyone from day 1 to act like an owner",
      ],
    },
    {
      title: "Meritocratic",
      iconType: "meritocratic",
      sortOrder: 4,
      bullets: [
        "We are non-hierarchical, informal, and direct",
        "We focus on results above seniority and experience",
        "We generously reward results",
      ],
    },
  ],
};

/** Per-team hover panel colors (CareersTeamsSection). */
export const teamHoverColors = ["#958DEC", "#EC9BE5", "#EF7B7B", "#7FB2F1"];

/** Teams heading + hover accordion (CareersTeamsSection). */
export const teamsSection = {
  lead: "Sidago",
  highlight: "teams",
  headingId: "sidago-teams",
  items: [
    {
      title: "Trading",
      sortOrder: 1,
      hoverColor: "#958DEC",
      description:
        "At Sidago, trading encompasses algorithmic trading on exchanges, quantitative, OTC and sales trading of spot and derivatives. Our traders work closely together across all asset classes, are exceptionally smart, driven, and truly understand the industry behind the ticker signs.",
      image: { src: "/images/image_2.jpg", width: 1152, height: 1182 },
      links: [
        {
          href: "/company/opportunities?team=Trading",
          label: "Open roles",
          srText: "Company › Opportunities",
        },
        {
          href: "/infrastructure",
          label: "Explore Sidago trading",
          srText: "Sidago infrastructure",
        },
      ],
    },
    {
      title: "Technology",
      sortOrder: 2,
      hoverColor: "#EC9BE5",
      description:
        "Technology is a very core driver of Sidago’s edge. Our technology team includes trading system focused developers, data and market signal focused developers, and infrastructure specialists who build our advantage in low latency. We apply the highest standards of security and performance in our trading technology and expect top performance from our engineering talent.",
      image: { src: "/images/image_7.jpg", width: 1152, height: 1182 },
      links: [
        {
          href: "/company/opportunities?team=Technology",
          label: "Open roles",
          srText: "Company › Opportunities",
        },
        {
          href: "/infrastructure",
          label: "Explore Sidago technology",
          srText: "Sidago infrastructure",
        },
      ],
    },
    {
      title: "Business development & partnerships",
      sortOrder: 3,
      hoverColor: "#EF7B7B",
      description:
        "Sidago BD team drives value creation with our key partners: from OTC counterparties, blockchain projects, and ecosystem players. Our BD team are not salespeople, they are multidisciplinary experts with deep knowledge of both traditional finance and cutting-edge crypto products, bridging two worlds to unlock value for our partners.",
      image: { src: "/images/image_5.jpg", width: 1152, height: 1159 },
      links: [
        {
          href: "/company/opportunities?team=Business+Development",
          label: "Open roles",
          srText: "Company › Opportunities",
        },
      ],
    },
    {
      title: "DeFi & Research",
      sortOrder: 4,
      hoverColor: "#7FB2F1",
      description:
        "Sidago's DeFi team isn’t just part of the DeFi ecosystem—we helped build it from the beginning. From DeFi summer of 2020 to innovation in MEV and building Rizzolver, our fingerprints are on every major milestone. Our DeFi team spans trading, technology, research, and governance, making it a dynamic destination for entrepreneurial minds looking to define the future.",
      image: { src: "/images/image_6.jpg", width: 1152, height: 1182 },
      links: [
        {
          href: "/company/opportunities?team=DeFi",
          label: "Open roles",
          srText: "Company › Opportunities",
        },
      ],
    },
    {
      title: "Control",
      sortOrder: 5,
      hoverColor: "#958DEC",
      description:
        "The control teams at Sidago are more than oversight— they are part of our driving force for sustainable growth. Bringing together legal, compliance, risk, middle office, and corporate finance, they help us achieve business objectives in a compliant and risk measured way. Their efficiency and customer-first mindset are part of Sidago's competitive edge.",
      image: { src: "/images/image_1.jpg", width: 1152, height: 1167 },
      links: [
        {
          href: "/company/opportunities",
          label: "Open roles",
          srText: "Company › Opportunities",
        },
      ],
    },
    {
      title: "Product and marketing",
      sortOrder: 6,
      hoverColor: "#EC9BE5",
      description:
        "At Sidago, product and marketing mirror the agility of tech companies closer than that of our trading competitors. Our product team shapes the end-to-end counterparty experience, from platform products like Sidago Node to all lifecycle touchpoints. Marketing builds our brand’s impact in the industry and works closely with the product team to ensure successful product launches that shape the industry.",
      image: { src: "/images/image_3.jpg", width: 1152, height: 804 },
      links: [
        {
          href: "/company/opportunities",
          label: "Open roles",
          srText: "Company › Opportunities",
        },
      ],
    },
    {
      title: "Business operations",
      sortOrder: 7,
      hoverColor: "#EF7B7B",
      description:
        "Our business operations teams drive Sidago's people and strategic initiatives. Covering functions like recruitment, HR, as well as strategy & operations, together they ensure that Sidago attracts exceptional talent with aligned values and tackle the most pressing strategic projects with critical cross-functional problem-solving skills.",
      image: { src: "/images/image_4.jpg", width: 1152, height: 1182 },
      links: [
        {
          href: "/company/opportunities",
          label: "Open roles",
          srText: "Company › Opportunities",
        },
      ],
    },
  ],
};

/** “Hear from our team” testimonial carousel. */
export const teamTestimonialsSection = {
  title: "Hear from our team",
  headingId: "hear-from-our-team",
  className: "bg-[#070B09] text-gray-off-white",
  items: [
    {
      sortOrder: 1,
      name: "David",
      role: "Algorithmic Trader",
      titleParts: [
        { text: "Meaningful " },
        { text: "impact", highlight: true },
        { text: " right from the start" },
      ],
      quote:
        "When applying to Sidago, I knew that I would be working hands on in the middle of the crypto landscape. From day one, I was working on new exchange infrastructure, interacting with the trading system and helping to improve the existing code base. Even as a new joiner, my ideas were given time and thought and I had the opportunity to work on projects that I helped propose - including an improved tracker for trade P&L and better metrics for our OTC trades. The small team and focus on meritocracy makes you feel like you're having a meaningful impact. It's great to be able to see your improvements working live, and to be rewarded for their success.",
      image: {
        src: "/images/image_1.jpg",
        width: 1000,
        height: 800,
        alt: "Meaningful impact right from the start",
      },
    },
    {
      sortOrder: 2,
      name: "Zak",
      role: "DeFi Researcher",
      titleParts: [
        { text: "Cross-team " },
        { text: "collaboration", highlight: true },
        { text: " is integral" },
      ],
      quote:
        "Being at the forefront of DeFi, Sidago's Research team offered me a perspective that is often elusive from the outside. One of the most enriching aspects of my experience at Sidago is the chance to collaborate across our multi talented team. Their mentorship and insights play a pivotal role in my growth. One of my projects involved diving into the MEV Supply Chain, and I encountered a problem whilst analyzing block builder behaviors. Being able to turn around to discuss with the Sidago DeFi team, helped me quickly unlock new ways of tackling the issue at hand.",
      image: {
        src: "/images/image_5.jpg",
        width: 1100,
        height: 880,
        alt: "Cross-team collaboration is integral",
      },
    },
    {
      sortOrder: 3,
      name: "Aytzhan",
      role: "Business Development Manager",
      titleParts: [
        { text: "Sidago values " },
        { text: "entrepreneurship ", highlight: true },
      ],
      quote:
        "I started my journey with Sidago as an intern. From cooperating with different blockchain projects, providing liquidity to the crypto markets, or building new projects on DeFi, you get to work in the epicenter of the ecosystem. Sidago values entrepreneurship. Your career growth is highly correlated with your drive to bring new ideas, improve existing systems and expand your accountabilities. Even as an intern, my voice was heard and my contributions were well accounted for. Now I am overseeing an extensive number of partnerships across liquidity provisioning and OTC trading.",
      image: {
        src: "/images/image_6.jpg",
        width: 1100,
        height: 880,
        alt: "Sidago values entrepreneurship",
      },
    },
    {
      sortOrder: 4,
      name: "Felix",
      role: "DeFi Searcher",
      titleParts: [
        { text: "Evolving challenges", highlight: true },
        { text: " keep the job interesting" },
      ],
      quote:
        "Driven by my passion for crypto, I joined Sidago to elevate my personal interest into a career. I work on building internal trading systems that integrate with leading DeFi protocols. DeFi, being a relatively novel ecosystem, exposes me to diverse and challenging problems daily: from modeling various sources of AMM liquidity, to optimizing transaction execution on chains like Ethereum and Solana that have very different approaches to transaction inclusion and ordering. The ambition of the Sidago DeFi team and the constantly evolving on-chain trading landscape keep the job interesting, making this an exciting place to work.",
      image: {
        src: "/images/image_3.jpg",
        width: 1100,
        height: 880,
        alt: "Evolving challenges keep the job interesting",
      },
    },
  ],
};

/** Sidago life heading, copy, decor, and culture network stage (CareersLifeSection). */
export const lifeSection = {
  lead: "Sidago",
  highlight: "life",
  headingId: "sidago-life",
  description:
    "Sidago's culture is all about balance, we work hard and play hard. With an informal, non-hierarchical environment, we bond over shared meals, social events, and unique experiences that build a strong sense of connection and community.",
  stage: {
    label: "Culture orbit",
    footTitle: "Where teams actually connect",
    footDescription:
      "Sidago life isn't a slide — it's shared meals, clubs, offsites, and the informal rituals that keep global teams aligned without adding hierarchy.",
    pillars: [
      { label: "Shared meals", tone: "warm" },
      { label: "Game nights", tone: "hot" },
      { label: "Offsites", tone: "cool" },
      { label: "Interest clubs", tone: "glow" },
      { label: "Workshops", tone: "warm" },
      { label: "Mentorship", tone: "hot" },
    ],
    stats: [
      { value: 52, suffix: "", label: "events / year" },
      { value: 0, suffix: "", label: "hierarchy layers" },
      { value: 100, suffix: "%", label: "teams connected" },
    ],
  },
};

/** @deprecated Stats now live on lifeSection.stage.stats; kept for Strapi seed compat. */
export const lifeStatsSection = {
  fontSizeMobile: 28,
  fontSizeDesktop: 40,
  items: [
    {
      stat: "1K",
      label: "Working lunch options",
      sortOrder: 1,
      width: 72,
      activeDotColor: "#E7512F",
    },
    {
      stat: "12",
      label: "Activities organized at our annual team building event",
      sortOrder: 2,
      width: 56,
      activeDotColor: "#E7512F",
    },
    {
      stat: "10",
      label: "Interest clubs with monthly activity",
      sortOrder: 3,
      width: 56,
      activeDotColor: "#7A9BB5",
    },
    {
      stat: "200",
      label: "Hours people played D&D in the office",
      sortOrder: 4,
      width: 84,
      activeDotColor: "#E7512F",
    },
  ],
};

export const careersCta = [
  {
    title: "Contact",
    description: "To access top crypto liquidity",
    href: "/contact",
    srLabel: "Contact",
    backgroundColor: "#FF5D3C",
    sortOrder: 1,
  },
  {
    title: "Subscribe",
    description: "To get the latest insights",
    href: "/insights/subscribe",
    srLabel: "Insights › Subscribe",
    backgroundColor: "#FA7248",
    sortOrder: 2,
  },
  {
    title: "Apply",
    description: "To join the Sidago team",
    href: "/company/opportunities",
    srLabel: "Company › Opportunities",
    backgroundColor: "#FF8C69",
    sortOrder: 3,
  },
];

export const values = [
  {
    title: "Ownership with clarity",
    description:
      "Every role has defined outcomes, reporting lines, and quality standards so you know what good looks like from day one.",
  },
  {
    title: "Learn while you deliver",
    description:
      "Training, playbooks, and peer review are built into how we work—not reserved for annual reviews.",
  },
  {
    title: "Global collaboration",
    description:
      "Work with clients and teammates across time zones using structured handoffs and shared tooling.",
  },
  {
    title: "Room to grow",
    description:
      "Clear career paths from specialist to lead roles across operations, support, marketing, and process improvement.",
  },
];

export const benefits = [
  {
    title: "Remote-first flexibility",
    description:
      "Structured remote work with core collaboration hours and async-friendly documentation.",
  },
  {
    title: "Professional development",
    description:
      "Access to training, certifications, and internal knowledge bases aligned to your function.",
  },
  {
    title: "Stable delivery culture",
    description:
      "Repeatable workflows, QA sampling, and leadership visibility—not constant firefighting.",
  },
  {
    title: "Inclusive hiring",
    description:
      "We evaluate skills, judgment, and collaboration—background and location should not limit opportunity.",
  },
  {
    title: "Cross-functional exposure",
    description:
      "See how operations, client delivery, and strategy connect across real client engagements.",
  },
  {
    title: "Performance transparency",
    description:
      "Regular feedback, measurable goals, and clear promotion criteria for every track.",
  },
];

export const openRoles = [
  {
    title: "Operations Specialist",
    team: "Operations",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Coordinate workflows, SLAs, and reporting for client operations pods.",
    href: "/contact",
  },
  {
    title: "Digital Support Agent",
    team: "Digital Support",
    location: "Remote · APAC / EMEA",
    type: "Full-time",
    summary:
      "Deliver tier-1/2 support across chat, email, and ticketing with documented escalation paths.",
    href: "/contact",
  },
  {
    title: "Business Process Analyst",
    team: "Process Improvement",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Map processes, identify bottlenecks, and design improvements clients can adopt at scale.",
    href: "/contact",
  },
  {
    title: "Marketing Growth Associate",
    team: "Marketing",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Support campaign execution, reporting, and conversion experiments for growth programs.",
    href: "/contact",
  },
  {
    title: "Client Success Coordinator",
    team: "Client Delivery",
    location: "Remote · Americas / EMEA",
    type: "Full-time",
    summary:
      "Own onboarding checklists, health reviews, and proactive outreach for assigned accounts.",
    href: "/contact",
  },
];

/** Open roles listing page (Wintermute-style filters + grouped jobs). */
export const openRolesPage = {
  hero: {
    titlePrefix: "Join the",
    titleHighlight: "Sidago team",
    subtitlePrefix: "Search open roles or",
    openApplicationLabel: "send us an open application",
    openApplicationHref: "/contact",
  },
  filters: [
    {
      key: "locationType",
      label: "Location type",
      color: "#EFA4E5",
      options: ["All", "Onsite", "Remote", "Hybrid"],
    },
    {
      key: "location",
      label: "Location",
      color: "#B1A9E9",
      options: [
        "All",
        "New York",
        "London",
        "London/New York",
        "Singapore",
        "Remote · Global",
        "Remote · APAC / EMEA",
        "Remote · Americas / EMEA",
      ],
    },
    {
      key: "team",
      label: "Team",
      color: "#F19E9E",
      options: [
        "All",
        "Trading",
        "Technology",
        "Operations",
        "Digital Support",
        "Process Improvement",
        "Marketing",
        "Client Delivery",
        "Business Development",
        "DeFi",
      ],
    },
    {
      key: "workType",
      label: "Work type",
      color: "#7FB1EF",
      options: ["All", "Full-time", "Part-time", "Contract"],
    },
  ],
  roles: [
    {
      id: "algo-trader-ny",
      title: "Algorithmic Trader",
      department: "TRADING",
      locationType: "Onsite",
      location: "New York",
      team: "Trading",
      workType: "Full-time",
      href: "/contact",
    },
    {
      id: "algo-trader-london",
      title: "Algorithmic Trader",
      department: "TRADING",
      locationType: "Onsite",
      location: "London",
      team: "Trading",
      workType: "Full-time",
      href: "/contact",
    },
    {
      id: "quant-researcher-london",
      title: "Quantitative Researcher",
      department: "TRADING",
      locationType: "Onsite",
      location: "London",
      team: "Trading",
      workType: "Full-time",
      href: "/contact",
    },
    {
      id: "trading-systems-dev",
      title: "Trading Systems Developer",
      department: "TECHNOLOGY",
      locationType: "Hybrid",
      location: "London",
      team: "Technology",
      workType: "Full-time",
      href: "/contact",
    },
    {
      id: "infra-engineer-sg",
      title: "Infrastructure Engineer",
      department: "TECHNOLOGY",
      locationType: "Onsite",
      location: "Singapore",
      team: "Technology",
      workType: "Full-time",
      href: "/contact",
    },
    {
      id: "defi-researcher-remote",
      title: "DeFi Researcher",
      department: "DEFI & RESEARCH",
      locationType: "Remote",
      location: "Remote · Global",
      team: "DeFi",
      workType: "Full-time",
      href: "/contact",
    },
    {
      id: "bd-partnerships-director",
      title: "Business Development & Partnerships Director",
      department: "BUSINESS DEVELOPMENT",
      locationType: "Hybrid",
      location: "London",
      team: "Business Development",
      workType: "Full-time",
      href: "/contact",
    },
    {
      id: "institutional-bd-director",
      title: "Institutional Business Development Director",
      department: "BUSINESS DEVELOPMENT",
      locationType: "Hybrid",
      location: "London/New York",
      team: "Business Development",
      workType: "Full-time",
      href: "/contact",
    },
    {
      id: "institutional-bd-manager",
      title: "Institutional Business Development Manager",
      department: "BUSINESS DEVELOPMENT",
      locationType: "Hybrid",
      location: "London/New York",
      team: "Business Development",
      workType: "Full-time",
      href: "/contact",
    },
    {
      id: "bd-manager-london",
      title: "Business Development Manager",
      department: "BUSINESS DEVELOPMENT",
      locationType: "Hybrid",
      location: "London",
      team: "Business Development",
      workType: "Full-time",
      href: "/contact",
    },
    {
      id: "ops-specialist",
      title: "Operations Specialist",
      department: "OPERATIONS",
      locationType: "Remote",
      location: "Remote · Global",
      team: "Operations",
      workType: "Full-time",
      href: "/contact",
    },
    {
      id: "digital-support-agent",
      title: "Digital Support Agent",
      department: "DIGITAL SUPPORT",
      locationType: "Remote",
      location: "Remote · APAC / EMEA",
      team: "Digital Support",
      workType: "Full-time",
      href: "/contact",
    },
    {
      id: "process-analyst",
      title: "Business Process Analyst",
      department: "PROCESS IMPROVEMENT",
      locationType: "Remote",
      location: "Remote · Global",
      team: "Process Improvement",
      workType: "Full-time",
      href: "/contact",
    },
    {
      id: "marketing-growth",
      title: "Marketing Growth Associate",
      department: "MARKETING",
      locationType: "Remote",
      location: "Remote · Global",
      team: "Marketing",
      workType: "Full-time",
      href: "/contact",
    },
    {
      id: "client-success",
      title: "Client Success Coordinator",
      department: "CLIENT DELIVERY",
      locationType: "Remote",
      location: "Remote · Americas / EMEA",
      team: "Client Delivery",
      workType: "Full-time",
      href: "/contact",
    },
  ],
};

/** CTA row for opportunities page — replaces Apply with Meet us → events. */
export const openRolesPageCta = [
  {
    title: "Contact",
    description: "To access top crypto liquidity",
    href: "/contact",
    srLabel: "Contact",
    backgroundColor: "#FF5D3C",
    sortOrder: 1,
  },
  {
    title: "Subscribe",
    description: "To get the latest insights",
    href: "/insights/subscribe",
    srLabel: "Insights › Subscribe",
    backgroundColor: "#FA7248",
    sortOrder: 2,
  },
  {
    title: "Meet us",
    description: "To chat with us at the next event",
    href: "/events",
    srLabel: "Events",
    backgroundColor: "#FF8C69",
    sortOrder: 3,
  },
];

export const hiringSteps = [
  {
    step: "01",
    title: "Apply",
    description:
      "Share your CV and the role you are interested in. Tell us what you have shipped and how you measure quality.",
  },
  {
    step: "02",
    title: "Intro conversation",
    description:
      "A short call with our People team to align on expectations, location, and working style.",
  },
  {
    step: "03",
    title: "Skills review",
    description:
      "Role-specific exercise or scenario—practical work samples, not abstract brain teasers.",
  },
  {
    step: "04",
    title: "Team interviews",
    description:
      "Meet future peers and leads. We focus on collaboration, communication, and judgment.",
  },
  {
    step: "05",
    title: "Offer & onboarding",
    description:
      "Clear offer terms, equipment setup, and a structured first 30/60/90 day plan.",
  },
];
