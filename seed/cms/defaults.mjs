export { defaultCareersPage } from "./careers-page.mjs";

export const defaultGlobalSettings = {
  siteName: "Sidago",
  siteContactEmail: "mailto:hello@sidago.com",
  siteLogo: {
    url: "/images/logo1.png",
    alternativeText: "Sidago",
  },
  version: {
    label: "v2",
  },
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/sidago-integrated-solutions",
      icon: "FaLinkedinIn",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/sidagooutsourcing",
      icon: "FaFacebookF",
    },
    {
      label: "Twitter",
      href: "https://twitter.com/sidagobpo",
      icon: "FaTwitter",
    },
  ],
  footer: {
    navLinks: [
      { label: "Contact", href: "/contact", srLabel: "Contact", sortOrder: 1 },
      {
        label: "Careers",
        href: "/company/careers",
        srLabel: "Careers",
        sortOrder: 2,
      },
      {
        label: "Events",
        href: "/events",
        srLabel: "Events",
        sortOrder: 3,
      },
      { label: "Brand", href: "/brand", srLabel: "Brand", sortOrder: 4 },
    ],
    socialLinks: [
      {
        label: "YouTube",
        href: "https://www.youtube.com/@sidago",
        platform: "youtube",
        sortOrder: 1,
      },
      {
        label: "X",
        href: "https://x.com/sidago",
        platform: "x",
        sortOrder: 2,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/sidago",
        platform: "linkedin",
        sortOrder: 3,
      },
    ],
    legalBlocks: [
      {
        text: "Office: Sidago USA, Chicago",
        sortOrder: 1,
      },
      {
        text: "Address: 111 West Jackson, Suite 34450, Chicago, IL 60604, United States",
        sortOrder: 2,
      },
      {
        text: "Email: contact+chicago@sidago.com",
        sortOrder: 3,
      },
      {
        text: "© Copyright 2026 Sidago Integrated Solutions - All Rights Reserved.",
        sortOrder: 4,
      },
    ],
    policyLinks: [
      {
        label: "Privacy Policy",
        href: "/privacy",
        srLabel: "Privacy Policy",
        sortOrder: 1,
      },
      {
        label: "Cookies Policy",
        href: "/cookies",
        srLabel: "Cookies Policy",
        sortOrder: 2,
      },
      {
        label: "Modern Slavery Statement",
        href: "/modern-slavery",
        srLabel: "Modern Slavery Statement",
        sortOrder: 3,
      },
    ],
    contactAlign: "start",
    copyrightAlign: "center",
    policyLinksAlign: "end",
  },
};

export const defaultServicesPage = {
  serviceGroups: [
    {
      groupId: "development-it",
      title: "Development & IT",
      href: "/services/development-it/",
      children: [
        {
          title: "System Administration",
          href: "/services/server-administration/",
        },
        {
          title: "Application Interface Design",
          href: "/services/application-interface-design/",
        },
        {
          title: "Desktop Applications",
          href: "/services/desktop-applications/",
        },
        { title: "E-Commerce", href: "/services/e-commerce/" },
        { title: "Game Development", href: "/services/game-development/" },
        { title: "Mobile Apps", href: "/services/mobile-apps/" },
        { title: "Plugin Development", href: "/services/plugin-development/" },
        {
          title: "Scripts and Utilities",
          href: "/services/scripts-and-utilities/",
        },
        {
          title: "Software Development",
          href: "/services/software-developement/",
        },
        {
          title: "Software Project Management",
          href: "/services/project-management/",
        },
        { title: "Software QA", href: "/services/software-qa/" },
      ],
    },
    {
      groupId: "admin-support",
      title: "Administrative Support",
      href: "/services/administrative-service/",
      children: [
        {
          title: "Administrative Services",
          href: "/services/administrative-services/",
        },
        { title: "Data Entry", href: "/services/data-entry/" },
        {
          title: "Email Response Handling",
          href: "/services/email-response-handling/",
        },
        { title: "Personal Assistant", href: "/services/personal-assistant/" },
        { title: "Transcription", href: "/services/transcription/" },
        { title: "Web Research", href: "/services/web-research/" },
        {
          title: "What We Write",
          href: "/services/what-we-write/",
          children: [
            { title: "Copywriting", href: "/services/copywriting/" },
            { title: "Creative Writing", href: "/services/creative-writing/" },
            {
              title: "Web Content Writing",
              href: "/services/web-content-writing/",
            },
          ],
        },
        { title: "Data Mining", href: "/services/data-mining/" },
        {
          title: "Translation Services",
          href: "/services/translation-services/",
        },
      ],
    },
    {
      groupId: "ad-marketing",
      title: "Advertising & Marketing",
      href: "/services/advertising/",
      children: [
        { title: "Advertising", href: "/services/advertising/" },
        {
          title: "Customer Acquisition & Sales",
          href: "/services/customer-acquisition-sales/",
        },
        { title: "Email Marketing", href: "/services/email-marketing/" },
        { title: "Lead Generation", href: "/services/lead-generation/" },
        { title: "Market Research", href: "/services/market-research/" },
        {
          title: "Negotiation Management",
          href: "/services/negotiation-management/",
        },
        {
          title: "Online Marketing Strategy",
          href: "/services/online-marketing-strategy/",
        },
        { title: "Public Relations", href: "/services/public-relations/" },
        {
          title: "Social Media Marketing",
          href: "/services/social-media-marketing/",
        },
        {
          title: "Telemarketing & Telesales",
          href: "/services/telemarketing-telesales/",
        },
        { title: "Branding", href: "/services/branding/" },
        { title: "Display Marketing", href: "/services/display-marketing/" },
        { title: "Viral Marketing", href: "/services/viral-marketing/" },
      ],
    },
    {
      groupId: "design-multimedia",
      title: "Design & Multimedia",
      href: "/services/design-multimedia",
      children: [
        { title: "3D Modelling", href: "/services/3d-modelling/" },
        { title: "Animation", href: "/services/animation/" },
        { title: "Audio Production", href: "/services/audio-production/" },
        {
          title: "Design & Multimedia",
          href: "/services/design-multimedia/",
        },
        {
          title: "Engineering & Technical Design",
          href: "/services/engineering-technical-design/",
        },
        { title: "Graphics Design", href: "/services/graphics-design/" },
        { title: "Illustration", href: "/services/illustration/" },
        { title: "Logo Design", href: "/services/logo-design/" },
        { title: "Presentations", href: "/services/presentations/" },
        { title: "Print Design", href: "/services/print-design/" },
        { title: "UI Design", href: "/services/ui-design/" },
        { title: "Video Production", href: "/services/video-production/" },
        { title: "Voice Talent", href: "/services/voice-talent/" },
        { title: "Web Design", href: "/services/web-design/" },
      ],
    },
    {
      groupId: "business-services",
      title: "Business Services",
      href: "/services/business-services/",
      children: [
        { title: "Business Services", href: "/services/business-services/" },
        { title: "Accounting", href: "/services/accounting/" },
        { title: "Bookkeeping", href: "/services/bookkeeping/" },
        {
          title: "Back Office Solutions",
          href: "/services/back-office-solutions/",
        },
        { title: "Business Consulting", href: "/services/business-consulting/" },
        {
          title: "Financial Services & Planning",
          href: "/services/financial-services-planning/",
        },
        { title: "Legal Assistance", href: "/services/legal-assistance/" },
        { title: "Recruiting", href: "/services/recruiting/" },
        {
          title: "Statistical Analysis",
          href: "/services/statistical-analysis/",
        },
        { title: "Translation", href: "/services/translation/" },
        { title: "Customer Service", href: "/services/customer-service/" },
        {
          title: "Data Science And Analysis",
          href: "/services/data-science-analysis/",
        },
        {
          title: "Paralegal Services",
          href: "/services/paralegal-services/",
        },
        { title: "Technical Writing", href: "/services/technical-writing/" },
      ],
    },
  ],
};

export const defaultHomepage = {
  hero: {
    useVideo: true,
    videoSrc: "/videos/home2.mp4",
    videoPoster: "",
    imageSrc: "",
    subtitle:
      "Sidago helps companies streamline operations, reduce costs, and scale efficiently through reliable outsourcing and digital solutions.",
    fontWeight: 400,
    lighterTheme: false,
    loop: false,
    lighterBgColor: "bg-[#f0f1f1]",
    videoSectionClass: "",
    videoClass: "",
    titles: [
      {
        title: "We understand",
        color: "",
        className: "text-[#E7512F]",
        line: 1,
        sortOrder: 1,
      },
      {
        title: "the",
        color: "",
        className: "",
        line: 1,
        sortOrder: 2,
      },
      {
        title: "modern business landscape",
        color: "",
        className: "",
        line: 2,
        sortOrder: 3,
      },
    ],
    ctaLabel: "Contact us",
    ctaHref: "/contact",
  },
  insightNews: [
    {
      title: "Digital Support Services",
      href: "/services/digital-support",
      srText: "Digital Support Services",
      sortOrder: 1,
    },
    {
      title: "Global Workforce Solutions",
      href: "/global-workforce-solutions",
      srText: "Global Workforce Solutions",
      sortOrder: 2,
    },
    {
      title: "Scalable Operations Management",
      href: "/scalable-operations-management",
      srText: "Scalable Operations Management",
      sortOrder: 3,
    },
  ],
  statistics: [
    {
      stat: "75",
      label: "Cost Savings",
      width: 244,
      activeDotColor: "#E7512F",
      sortOrder: 1,
    },
    {
      stat: "81",
      label: "Increased Output",
      width: 248,
      activeDotColor: "#E7512F",
      sortOrder: 2,
    },
    {
      stat: "87",
      label: "Operational Efficiency",
      width: 198,
      activeDotColor: "#E7512F",
      sortOrder: 3,
    },
    {
      stat: "92",
      label: "Client Retention",
      width: 192,
      activeDotColor: "#E7512F",
      sortOrder: 4,
    },
    {
      stat: "88",
      label: "Service Reliability",
      width: 192,
      activeDotColor: "#E7512F",
      sortOrder: 5,
    },
  ],
  marketTicker: [
    {
      title: "BPO",
      price: "24/7",
      avg: "+SUPPORT",
      sortOrder: 1,
    },
    {
      title: "OPS",
      price: "75%",
      avg: "-COSTS",
      sortOrder: 2,
    },
    {
      title: "DEV",
      price: "99%",
      avg: "+UPTIME",
      sortOrder: 3,
    },
    {
      title: "MKT",
      price: "360",
      avg: "+LEADS",
      sortOrder: 4,
    },
    {
      title: "ADM",
      price: "12H",
      avg: "-WORKLOAD",
      sortOrder: 5,
    },
    {
      title: "CRM",
      price: "92%",
      avg: "+RETENTION",
      sortOrder: 6,
    },
    {
      title: "HRM",
      price: "48H",
      avg: "+HIRING",
      sortOrder: 7,
    },
    {
      title: "WEB",
      price: "100%",
      avg: "+DELIVERY",
      sortOrder: 8,
    },
  ],
  capabilities: [
    {
      title: "Operations",
      description:
        "Process-driven operational support that helps businesses reduce friction, manage workloads, and improve day-to-day efficiency.",
      href: "/operations",
      video:
        "https://wp-corp-site.s3.eu-central-1.amazonaws.com/wp-content/uploads/2025/03/19200719/Accordion-OTC.mp4#t=2",
      rotate: "rotate(30deg)",
      sr: "Operations",
      sortOrder: 1,
    },
    {
      title: "Insights",
      description:
        "Research and reporting services that turn business data into clearer decisions, planning, and measurable performance insight.",
      href: "/insights",
      video:
        "https://wp-corp-site.s3.eu-central-1.amazonaws.com/wp-content/uploads/2025/03/19200829/Accordion-Liquidity.mp4#t=3.15",
      rotate: "rotate(-25deg)",
      sr: "Insights",
      sortOrder: 2,
    },
    {
      title: "Infrastructure",
      description:
        "Infrastructure support that helps businesses maintain systems, workflows, and stable operational foundations for scale.",
      href: "/infrastructure",
      video:
        "https://wp-corp-site.s3.eu-central-1.amazonaws.com/wp-content/uploads/2025/03/19200844/Accordion-Governance-DeFi.mp4#t=1",
      rotate: "rotate(0deg)",
      sr: "Infrastructure",
      sortOrder: 3,
    },
    {
      title: "Execution",
      description:
        "Hands-on project execution that helps companies deliver tasks faster, maintain standards, and scale output with confidence.",
      href: "/execution",
      video:
        "https://wp-corp-site.s3.eu-central-1.amazonaws.com/wp-content/uploads/2025/03/19200933/Accordion-Ventures.mp4#t=1.65",
      rotate: "rotate(0deg)",
      sr: "Execution",
      sortOrder: 4,
    },
    {
      title: "Performance",
      description:
        "Performance support that helps companies improve results, increase efficiency, and strengthen long-term business outcomes.",
      href: "/performance",
      video:
        "https://wp-corp-site.s3.eu-central-1.amazonaws.com/wp-content/uploads/2025/03/17212516/Accordion-Prop-trading.mp4#t=4.14",
      rotate: "rotate(0deg)",
      sr: "Performance",
      sortOrder: 5,
    },
  ],
  whoWeServe: {
    title: "Who we serve",
    description:
      "Dedicated trading and liquidity solutions built around the needs of market participants across global markets.",
    ctaLabel: "Explore",
    href: "/who-we-serve",
  },
  cardsGrid: [
    {
      cardId: "bpo",
      href: "/business-processes",
      srLabel: "Business Process Outsourcing",
      bgClass:
        "bg-[#171d1a] bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,transparent_52%)]",
      textClass: "text-white",
      colSpan: "col-span-6",
      title: "Business Process Outsourcing",
      subtitle: "Reliable offshore teams for daily operations",
      decorationType: "node",
      topType: "none",
      leadingIcon: null,
      sortOrder: 1,
    },
    {
      cardId: "research-data",
      href: "/research-data",
      srLabel: "Research and Data",
      bgClass: "bg-[#EC9B9B]",
      textClass: "text-black",
      colSpan: "col-span-6",
      title: "Research & Data",
      subtitle: "Reporting, analysis, and actionable business insight",
      decorationType: "none",
      topType: "research",
      leadingIcon: null,
      sortOrder: 2,
    },
    {
      cardId: "marketing-growth",
      href: "/marketing-growth",
      srLabel: "Marketing and Growth",
      bgClass: "bg-[#AEA9EA]",
      textClass: "text-black",
      colSpan: "col-span-12 xl:col-span-4",
      title: "Marketing & Growth",
      subtitle: "Campaign support that builds reach and demand",
      decorationType: "events",
      topType: "none",
      leadingIcon: null,
      sortOrder: 3,
    },
    {
      cardId: "support-compliance",
      href: "/support-compliance",
      srLabel: "Business Support and Compliance",
      bgClass: "bg-[#7FB2F1]",
      textClass: "text-black",
      colSpan: "col-span-5 xl:col-span-4",
      title: "Business Support & Compliance",
      subtitle: "Structured support for process, records, and controls",
      decorationType: "none",
      topType: "none",
      leadingIcon: "shield",
      sortOrder: 4,
    },
    {
      cardId: "process-improvement",
      href: "/process-improvement",
      srLabel: "Process Improvement",
      bgClass: "bg-[#333935]",
      textClass: "text-white",
      colSpan: "col-span-7 xl:col-span-4",
      title: "Process Improvement",
      subtitle: "Smarter workflows for lower costs and better output",
      decorationType: "market",
      topType: "none",
      leadingIcon: null,
      sortOrder: 5,
    },
  ],
  cta: [
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
  ],
};

export const defaultBusinessProcessesPage = {
  hero: {
    useVideo: true,
    videoSrc: "https://www.wintermute.com/videos/heroes/ventures.mp4",
    imageSrc: "",
    subtitle:
      "Work with a high-performance BPO partner to optimize workflows, cut overhead, and accelerate growth",
    fontWeight: 400,
    lighterTheme: false,
    loop: true,
    lighterBgColor: "bg-[#f0f1f1]",
    videoSectionClass: "",
    videoClass: "left-[500px] top-[70px] !w-3/4 !h-3/4",
    titles: [
      {
        title: "Turn operations into",
        color: "",
        className: "",
        sortOrder: 1,
      },
      {
        title: "your competitive advantage",
        color: "#3c85dd",
        className: "",
        sortOrder: 2,
      },
    ],
  },
  statistics: [
    {
      stat: "60%",
      label: "Average cost reduction",
      width: 244,
      activeDotColor: "#3C85DD",
      sortOrder: 1,
    },
    {
      stat: "40+",
      label: "Dedicated operations specialists",
      width: 248,
      activeDotColor: "#3C85DD",
      sortOrder: 2,
    },
    {
      stat: "95%",
      label: "Client satisfaction rate",
      width: 220,
      activeDotColor: "#3C85DD",
      sortOrder: 3,
    },
    {
      stat: "3X",
      label: "Faster workflow execution",
      width: 220,
      activeDotColor: "#3C85DD",
      sortOrder: 4,
    },
    {
      stat: "24/7",
      label: "Operational support coverage",
      width: 220,
      activeDotColor: "#3C85DD",
      sortOrder: 5,
    },
  ],
  partnerBenefit: {
    title: "Why Choose Our BPO Services",
    benefits: [
      {
        title: "Results-Driven Operations",
        description:
          "We focus on measurable outcomes that improve efficiency, service quality, and operating cost.",
        iconPath: "M6 29h28M10 25l6-6 5 4 9-11M28 12h6v6",
      },
      {
        title: "Skilled Dedicated Teams",
        description:
          "Trained specialists support daily business tasks with accuracy, consistency, and clear ownership.",
        iconPath:
          "M13 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM27 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM5 33c1-6 4-10 8-10s7 4 8 10M19 33c1-5 4-8 8-8s7 3 8 8",
      },
      {
        title: "Flexible Scaling",
        description:
          "Scale capacity up or down based on demand without the overhead of constant hiring.",
        iconPath: "M7 29V11h6v18M17 29V7h6v22M27 29V15h6v14",
      },
      {
        title: "End-to-End Management",
        description:
          "From onboarding to execution, we manage workflows, handoffs, reporting, and continuous improvement.",
        iconPath: "M8 9h24v22H8zM13 15h14M13 20h14M13 25h8",
      },
      {
        title: "Cost Efficiency",
        description:
          "Optimize operational expenses while maintaining reliable, high-quality service delivery.",
        iconPath:
          "M20 6v28M26 12c-2-2-5-3-8-2-4 1-5 6-1 8l7 3c4 2 3 7-1 8-4 1-8-1-10-3",
      },
      {
        title: "Performance Reporting",
        description:
          "Track delivery with practical insights, regular reporting, and improvement plans your team can act on.",
        iconPath: "M7 31h26M11 27v-8M19 27V9M27 27V15",
      },
    ],
  },
  processes: {
    title: "Business Processes We Support",
    subtitle:
      "Flexible teams for the operational work that keeps your business moving, from customer care to back-office execution.",
    items: [
      {
        title: "Customer Support",
        short: "Support",
        description:
          "Call center, email handling, live chat, and customer experience management.",
      },
      {
        title: "Data & Analytics",
        short: "Data",
        description:
          "Data entry, data processing, reporting, and business insights.",
      },
      {
        title: "Finance & Accounting",
        short: "Finance",
        description:
          "Bookkeeping, payroll support, invoicing, and financial reports.",
      },
      {
        title: "E-commerce Operations",
        short: "Commerce",
        description:
          "Order management, product listing, inventory updates, and support.",
      },
      {
        title: "Back-Office Operations",
        short: "Back Office",
        description:
          "Administrative tasks, documentation, records, and workflow support.",
      },
      {
        title: "HR & Recruitment",
        short: "People",
        description:
          "Talent sourcing, candidate coordination, onboarding, and HR admin.",
      },
      {
        title: "IT & Technical Support",
        short: "Technical",
        description:
          "System support, troubleshooting, ticket handling, and user assistance.",
      },
      {
        title: "Sales & Lead Generation",
        short: "Growth",
        description:
          "Outbound calling, lead qualification, CRM updates, and follow-ups.",
      },
    ],
  },
  solutions: {
    title: "Solutions We Deliver",
    subtitle:
      "Dedicated support models built around the daily workflows your business needs to run smoothly and scale confidently.",
    items: [
      {
        title: "Customer Support Solutions",
        label: "Solution",
        description:
          "End-to-end support operations designed to improve response quality, customer satisfaction, and retention.",
      },
      {
        title: "Back-Office Management",
        label: "Solution",
        description:
          "Reliable administrative and operational support that keeps daily workflows accurate and organized.",
      },
      {
        title: "Process Optimization",
        label: "Solution",
        description:
          "Practical workflow improvements that reduce friction, speed up execution, and make performance easier to track.",
      },
    ],
  },
  workOverview: {
    eyebrow: "Ready to streamline operations?",
    title: "Focus on Growth. We Handle the Operations.",
    description:
      "Partner with Sidago to streamline business processes, reduce operating costs, and scale your team with confidence.",
    buttonText: "Get Started",
    href: "/contact",
    metrics: [
      { value: "60%", label: "Cost reduction" },
      { value: "3X", label: "Faster execution" },
      { value: "24/7", label: "Operational support" },
    ],
  },
};

export const defaultOperationsPage = {
  hero: {
    useVideo: true,
    lighterTheme: false,
    videoSrc:
      "https://wp-corp-site.s3.eu-central-1.amazonaws.com/wp-content/uploads/2025/03/19200719/Accordion-OTC.mp4#t=2",
    imageSrc: null,
    titles: [
      {
        title: "Operations built for",
        color: "#168b50",
        className: null,
        sortOrder: 1,
      },
      {
        title: "consistent execution",
        color: "",
        className: "",
        sortOrder: 2,
      },
    ],
    subtitle:
      "Scale daily workflows with dedicated Sidago teams, structured processes, and clear performance visibility.",
    videoSectionClass: "bg-gray-night-green text-gray-off-white",
    videoClass: "left-[500px] !w-3/4",
    fontWeight: 400,
    loop: true,
    videoOverlay: true,
    backgroundClassName: "bg-gray-night-green",
    lighterBgColor: "bg-gray-night-green",
  },
  videoInMotion: {
    videoSrc: "/videos/overview.mp4",
    posterSrc: "/images/operation-video-placeholder.png",
    posterAlt:
      "Smart home and connected operations dashboard on a tablet in a modern living room",
  },
  insightNews: [
    {
      title: "Operational playbooks for scalable teams",
      href: "/business-processes",
      srText: "Operations insights - Operational playbooks for scalable teams",
      sortOrder: 1,
    },
    {
      title: "How Sidago improves back-office delivery",
      href: "/services",
      srText: "Operations insights - How Sidago improves back-office delivery",
      sortOrder: 2,
    },
    {
      title: "Building reliable support coverage across time zones",
      href: "/contact",
      srText:
        "Operations insights - Building reliable support coverage across time zones",
      sortOrder: 3,
    },
  ],
  statistics: [
    {
      stat: "24/7",
      label: "Operational support coverage",
      width: 244,
      activeDotColor: "#E7512F",
      sortOrder: 1,
    },
    {
      stat: "40+",
      label: "Dedicated operations specialists",
      width: 248,
      activeDotColor: "#E7512F",
      sortOrder: 2,
    },
    {
      stat: "95%",
      label: "Client satisfaction rate",
      width: 220,
      activeDotColor: "#E7512F",
      sortOrder: 3,
    },
    {
      stat: "3X",
      label: "Faster workflow execution",
      width: 220,
      activeDotColor: "#E7512F",
      sortOrder: 4,
    },
    {
      stat: "60%",
      label: "Average cost reduction",
      width: 220,
      activeDotColor: "#E7512F",
      sortOrder: 5,
    },
  ],
  capabilities: [
    {
      title: "Customer Operations",
      description:
        "Dedicated support teams for call handling, live chat, email response, and customer experience workflows.",
      href: "customer-operations",
      video: "/media/Accordion-Spot.mp4#t=2",
      rotate: "rotate(30deg)",
      sr: "Customer operations",
      sortOrder: 1,
    },
    {
      title: "Back-Office Delivery",
      description:
        "Reliable administrative support for documentation, records, task coordination, and daily process execution.",
      href: "back-office-delivery",
      video: "/media/Accordion-Options.mp4#t=3.15",
      rotate: "rotate(-25deg)",
      sr: "Back-office delivery",
      sortOrder: 2,
    },
    {
      title: "Data & Reporting",
      description:
        "Accurate data entry, processing, reporting, and operational visibility for better business decisions.",
      href: "data-reporting",
      video: "/media/Accordion-Forwards.mp4#t=1",
      rotate: "rotate(0deg)",
      sr: "Data and reporting",
      sortOrder: 3,
    },
    {
      title: "Process Improvement",
      description:
        "Workflow reviews and practical improvements that reduce friction, improve handoffs, and increase delivery speed.",
      href: "process-improvement",
      video: "/media/Accordion-CFDs.mp4#t=1",
      rotate: "rotate(0deg)",
      sr: "Process improvement",
      sortOrder: 4,
    },
    {
      title: "Flexible Team Scaling",
      description:
        "On-demand operational capacity that helps your business respond to changing workloads without hiring overhead.",
      href: "flexible-team-scaling",
      video: "/media/Accordion-Tailored-products.mp4#t=1",
      rotate: "rotate(0deg)",
      sr: "Flexible team scaling",
      sortOrder: 5,
    },
  ],
  cta: [
    {
      title: "Build your operations team",
      description: "Talk to Sidago about workflow coverage and delivery needs",
      href: "/contact",
      srLabel: "Contact Sidago about operations support",
      backgroundColor: "#FF5D3C",
      sortOrder: 1,
    },
    {
      title: "Explore business processes",
      description: "See the services Sidago can manage for your business",
      href: "/business-processes",
      srLabel: "Explore Sidago business process services",
      backgroundColor: "#FF8C69",
      sortOrder: 2,
    },
  ],
  globalReachCta: {
    label: "Explore Coverage",
    href: "/global-workforce-solutions",
    srLabel: "Explore Sidago global workforce coverage",
    sortOrder: 1,
  },
};

export const defaultInfrastructurePage = {
  hero: {
    useVideo: true,
    lighterTheme: false,
    videoSrc: "https://www.wintermute.com/videos/heroes/governance.mp4",
    imageSrc: "",
    titles: [
      {
        title: "Infrastructure for a truly",
        color: "",
        className: "text-white",
        line: 1,
        sortOrder: 1,
      },
      {
        title: "scalable",
        color: "#EC5B5B",
        className: "",
        line: 1,
        sortOrder: 2,
      },
      {
        title: "business-driven world",
        color: "",
        className: "text-white",
        line: 2,
        sortOrder: 3,
      },
    ],
    subtitle:
      "Sidago delivers reliable systems and global support to ensure performance, security, and continuous growth",
    videoClass: "left-[500px] !w-3/4",
    videoSectionClass: "",
    fontWeight: 400,
    loop: true,
    lighterBgColor: "bg-[#f0f1f1]",
  },
  statistics: [
    {
      stat: "2B",
      label: "Daily DeFi Trading Volume",
      width: 244,
      activeDotColor: "#E7512F",
      sortOrder: 1,
    },
    {
      stat: "45",
      label: "DeFi Venues Integrated",
      width: 248,
      activeDotColor: "#E7512F",
      sortOrder: 2,
    },
    {
      stat: "10",
      label: "Chains Covered",
      width: 198,
      activeDotColor: "#E7512F",
      sortOrder: 3,
    },
    {
      stat: "2K",
      label: "Governance Votes",
      width: 192,
      activeDotColor: "#E7512F",
      sortOrder: 4,
    },
    {
      stat: "5",
      label: "Incubated Projects",
      width: 192,
      activeDotColor: "#E7512F",
      sortOrder: 5,
    },
  ],
  visionTitle: "Principles that guide our vision",
  visionDescription:
    "The infrastructure behind Sidago is designed for resilience, security, and the operational clarity teams need to scale with confidence. These principles guide how we build, support, and evolve the systems that keep clients running reliably every day.",
  vision: [
    {
      title: "Reliable uptime",
      description:
        "Build resilient systems with stable hosting, proactive monitoring, and rapid issue response to keep operations running without interruption. We design for redundancy, clear escalation paths, and recovery practices that limit downtime and restore service quickly when issues arise.",
      iconType: "uptime",
      sortOrder: 1,
    },
    {
      title: "Secure by design",
      description:
        "Protect business-critical systems through controlled access, hardened environments, backup discipline, and continuous risk awareness. Security is built into how infrastructure is planned, deployed, and maintained—not bolted on after the fact.",
      iconType: "security",
      sortOrder: 2,
    },
    {
      title: "Scalable architecture",
      description:
        "Design infrastructure that can grow with demand, support expansion, and adapt to new workflows without creating operational friction. Modular foundations and consistent standards make it easier to add capacity, teams, and tools without rebuilding from scratch.",
      iconType: "architecture",
      sortOrder: 3,
    },
    {
      title: "Operational visibility",
      description:
        "Give teams clear insight into system health, performance, and dependencies so decisions can be made faster and with confidence. Dashboards, alerts, and structured reporting turn operational data into actionable intelligence across the business.",
      iconType: "visibility",
      sortOrder: 4,
    },
  ],
  supportTitle: "Supporting infrastructure",
  supportHighlight: " at every stage",
  supportDescription:
    "Sidago builds the operational infrastructure that helps businesses run with more control, consistency, and confidence as they grow.",
  supportImageSrc:
    "https://wp-corp-site.s3.eu-central-1.amazonaws.com/wp-content/uploads/2025/03/18223135/Governance-Watermark2.svg",
  support: [
    {
      title: "Business infrastructure setup",
      expandedClassName: "bg-green-light",
      description:
        "Sidago helps businesses set up the operational infrastructure behind daily execution, from core systems and workflow design to the stable foundations teams need to work efficiently at scale.",
      sortOrder: 1,
    },
    {
      title: "Process continuity",
      expandedClassName: "bg-orange-light",
      description:
        "We build dependable operating rhythms, fallback processes, and support structures that reduce disruption and keep business-critical work moving even as demand changes.",
      sortOrder: 2,
    },
    {
      title: "Visibility and support",
      expandedClassName: "bg-purple-light",
      description:
        "Sidago gives clients clearer visibility into performance, bottlenecks, and operational risk through structured oversight, responsive support, and consistent day-to-day management.",
      sortOrder: 3,
    },
    {
      title: "Control and reliability",
      expandedClassName: "bg-blue-light",
      description:
        "Our infrastructure approach focuses on control, consistency, and reliability so businesses can scale service delivery, protect essential workflows, and maintain confidence in execution.",
      sortOrder: 4,
    },
  ],
  profilesTitle: "Explore Sidago infrastructure",
  profilesDescription:
    "See how Sidago turns operational infrastructure into clearer execution, stronger visibility, and more dependable business support.",
  profiles: [
    {
      eyebrow: "Infrastructure Visibility",
      title: "Operations Control Dashboard",
      description:
        "Track workflow health, delivery coverage, issue queues, and execution trends through a clear operational view built for day-to-day management.",
      cta: "Explore dashboard",
      href: "/performance",
      visualType: "dashboard",
      srText: "Sidago infrastructure - Operations Control Dashboard",
      sortOrder: 1,
    },
    {
      eyebrow: "Infrastructure Updates",
      title: "Weekly Operations Brief",
      description:
        "Receive structured updates on performance trends, delivery priorities, support risks, and system changes that affect business continuity.",
      cta: "View brief",
      href: "/operations",
      visualType: "brief",
      srText: "Sidago infrastructure - Weekly Operations Brief",
      sortOrder: 2,
    },
    {
      eyebrow: "Infrastructure Partnership",
      title: "Build a more reliable operating foundation",
      description:
        "Sidago works with businesses that need stronger delivery structure, clearer visibility, and operational systems that can scale without losing control.",
      cta: "Talk to Sidago",
      href: "/contact",
      visualType: "partnership",
      srText: "Sidago infrastructure partnership",
      sortOrder: 3,
    },
  ],
  cta: [
    {
      title: "Contact",
      description: "Talk to Sidago about infrastructure and scale",
      href: "/contact",
      srLabel: "Contact Sidago about infrastructure",
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
  ],
};

export const defaultPerformancePage = {
  hero: {
    useVideo: true,
    lighterTheme: false,
    videoSrc:
      "https://wp-corp-site.s3.eu-central-1.amazonaws.com/wp-content/uploads/2025/03/17212516/Accordion-Prop-trading.mp4#t=4.14",
    imageSrc: "",
    subtitle:
      "Sidago Performance helps teams improve speed, quality, capacity, and reporting visibility through measurable operating systems",
    videoClass: "left-[500px] !w-3/4",
    videoSectionClass: "",
    fontWeight: 400,
    loop: true,
    lighterBgColor: "bg-[#f0f1f1]",
    titles: [
      {
        title: "Sidago Performance",
        color: "",
        className: "",
        line: 1,
        sortOrder: 1,
      },
      {
        title: "turns operational signals",
        color: "#f075e4",
        className: "",
        line: 2,
        sortOrder: 2,
      },
      {
        title: "into measurable progress",
        color: "",
        className: "",
        line: 3,
        sortOrder: 3,
      },
    ],
  },
  stats: [
    {
      value: "42%",
      label: "Faster turnaround",
      detail:
        "Sidago Performance shortens delivery cycles through cleaner ownership and fewer stalled handoffs.",
    },
    {
      value: "91%",
      label: "SLA visibility",
      detail:
        "Sidago Performance tracks core service commitments through practical operating dashboards.",
    },
    {
      value: "3.4x",
      label: "Review cadence",
      detail:
        "Sidago Performance increases review rhythm without adding reporting overhead.",
    },
    {
      value: "28%",
      label: "Less rework",
      detail:
        "Sidago Performance reduces repeat work by aligning intake, standards, and escalation paths.",
    },
  ],
  dashboardSection: {
    eyebrow: "Performance System",
    title:
      "Sidago Performance creates a clearer operating view for faster decisions.",
    description:
      "Sidago Performance connects measurement, workflow discipline, and leadership reporting so teams can see what is healthy, what is blocked, and where improvement will matter most.",
    panelEyebrow: "Live performance view",
    panelTitle: "Operational health",
    status: "Active",
    signals: [
      "Cycle time",
      "Backlog health",
      "Service quality",
      "Owner coverage",
      "Escalation load",
      "Decision velocity",
    ],
    bars: [52, 68, 61, 74, 88, 79, 94],
    metrics: [
      { value: "96%", label: "Coverage" },
      { value: "18h", label: "Avg cycle" },
      { value: "12", label: "Risks" },
    ],
  },
  tabsSection: {
    eyebrow: "Sidago Performance Lens",
    title: "Choose the Sidago Performance lens your team needs.",
    description:
      "Sidago Performance can focus on speed, quality, or capacity while keeping each view tied to the same operating rhythm.",
    tabs: [
      {
        label: "Speed",
        title:
          "Sidago Performance shortens delivery loops without losing control.",
        description:
          "Sidago Performance tracks cycle time, blocker age, handoff delay, and decision queues so teams know where speed is being lost.",
        image: "/images/sidago-performance-dashboard.png",
        stats: [
          ["32%", "less idle time"],
          ["18h", "average cycle"],
          ["7", "active blockers"],
        ],
      },
      {
        label: "Quality",
        title: "Sidago Performance keeps standards cleaner across repeated work.",
        description:
          "Sidago Performance connects checklists, review points, escalation rules, and exception trends to reduce avoidable rework.",
        image: "/images/sidago-performance-dashboard.png",
        stats: [
          ["28%", "less rework"],
          ["94%", "standard coverage"],
          ["11", "quality checks"],
        ],
      },
      {
        label: "Capacity",
        title: "Sidago Performance gives teams a practical view of workload.",
        description:
          "Sidago Performance uses capacity signals to balance teams, plan support coverage, and prevent silent overload before it slows delivery.",
        image: "/images/sidago-performance-dashboard.png",
        stats: [
          ["86%", "owner coverage"],
          ["4.2x", "review cadence"],
          ["15", "open queues"],
        ],
      },
    ],
  },
  capabilitiesSection: {
    eyebrow: "Sidago Performance Capabilities",
    title:
      "Performance support built around the way Sidago helps teams deliver.",
    description:
      "Sidago Performance is not more reporting. It is a sharper system for seeing progress, protecting quality, and making work easier to manage at scale.",
    items: [
      {
        title: "Performance Measurement",
        description:
          "Sidago Performance defines the KPIs, service levels, and quality signals that show how work is actually moving.",
        image: "/images/performance-measurement-capabilities.png",
      },
      {
        title: "Workflow Diagnostics",
        description:
          "Sidago Performance finds the friction points behind missed deadlines, unclear ownership, duplicate effort, and slow approvals.",
        image: "/images/workflow-diagnostics-capabilities.png",
      },
      {
        title: "Sidago Performance rhythm",
        description:
          "Sidago Performance connects reviews, risks, actions, and measurable service movement.",
        image: "/images/performance-rhythm-slide-v2.png",
      },
      {
        title: "Reporting Systems",
        description:
          "Sidago Performance turns fragmented updates into concise dashboards that leaders and delivery teams can use every week.",
        image: "/images/performance-capabilities-illustration.png",
      },
    ],
  },
  imageCarouselSection: {
    eyebrow: "Sidago Performance Views",
    title: "A visual layer for Sidago Performance work.",
    description:
      "Simple image-backed views for visibility, quality, review rhythm, and capacity conversations.",
    viewAllHref: "/performance",
    items: [
      {
        title: "Sidago Performance capacity",
        description:
          "Gives teams a practical capacity view before workload issues slow delivery.",
        visual: "capacity",
        href: "/performance",
      },
      {
        title: "Sidago Performance visibility",
        description:
          "Turns workflow activity into clearer delivery visibility and review context.",
        visual: "visibility",
        href: "/performance",
      },
      {
        title: "Sidago Performance quality",
        description:
          "Helps teams protect standards, reduce rework, and keep operations measurable.",
        visual: "quality",
        href: "/performance",
      },
      {
        title: "Sidago Performance rhythm",
        description:
          "Connects reviews, risks, actions, and measurable service movement.",
        visual: "rhythm",
        href: "/performance",
      },
      {
        title: "Sidago Performance insight",
        description:
          "Surfaces patterns and signals across teams so decision-makers always have context.",
        visual: "insight",
        href: "/performance",
      },
    ],
  },
  methodSection: {
    eyebrow: "Sidago Performance Method",
    title: "From unclear performance to managed improvement.",
    description:
      "Sidago Performance helps teams turn scattered updates into clear priorities, visible blockers, and steady action.",
    steps: [
      {
        icon: "flow",
        title: "Map the work clearly",
        description:
          "Understand how work moves, who owns each step, and where progress starts to slow down.",
      },
      {
        icon: "scorecard",
        title: "Measure what matters",
        description:
          "Create simple metrics for speed, quality, capacity, risk, and customer-facing outcomes.",
      },
      {
        icon: "rhythm",
        title: "Improve every cycle",
        description:
          "Use review routines, escalation paths, and reporting loops to make improvement repeatable.",
      },
    ],
  },
  cta: [
    {
      title: "Improve operating performance",
      description: "Talk to Sidago about performance visibility",
      href: "/contact",
      srLabel: "Contact Sidago about performance support",
      backgroundColor: "#f075e4",
      sortOrder: 1,
    },
    {
      title: "Explore execution",
      description: "See how Sidago keeps delivery moving",
      href: "/execution",
      srLabel: "Explore Sidago execution",
      backgroundColor: "#eef0ee",
      sortOrder: 2,
    },
  ],
};

export const defaultExecutionPage = {
  hero: {
    useVideo: true,
    lighterTheme: false,
    videoSrc: "https://www.wintermute.com/videos/heroes/ventures.mp4",
    imageSrc: "",
    subtitle:
      "Sidago ensures consistent performance with optimized workflows and dedicated global support",
    fontWeight: 400,
    loop: true,
    lighterBgColor: "bg-[#f0f1f1]",
    videoSectionClass: "",
    videoClass: "left-[500px] top-[70px] !w-3/4 !h-3/4",
    titles: [
      {
        title: "Work with experts focused on",
        color: "",
        className: "",
        sortOrder: 1,
      },
      {
        title: "efficient operational execution",
        color: "#3c85dd",
        className: "",
        sortOrder: 2,
      },
    ],
  },
  aboutSection: {
    label: "About Sidago Execution",
    title: "Build a simple system for",
    highlight: "consistent execution",
    subtitle:
      "Sidago Execution helps organizations turn strategy into disciplined implementation. We align priorities, workflows, teams, and reporting so business operations move with more speed, clarity, and efficiency.",
    supportChips: [
      "Strategy implementation",
      "Operating rhythm",
      "Delivery governance",
      "Performance visibility",
      "Process discipline",
      "Scalable growth",
    ],
    visual: {
      eyebrow: "Execution snapshot",
      title: "Simple. Visible. Moving.",
      statusText: "Active",
      imageSrc: "/images/Paralegal-and-Bookkeeping2.jpg",
      imageAlt: "Sidago execution operations team at work",
      imageEyebrow: "Active delivery view",
      imageTitle:
        "Teams, workflow, and reporting aligned in one operating rhythm.",
      coordinationLabel: "Live coordination",
      coordinationText: "Clear owners, cleaner handoffs, faster follow-through.",
      deliveryStatusLabel: "Delivery status",
      deliveryStatusValue: "Stable",
      planningLabel: "Planning",
      planningValue: "92%",
      reportingLabel: "Reporting",
      reportingValue: "84%",
    },
    overviewItems: [
      {
        value: "42%",
        title: "Faster cycle time",
        description:
          "Execution models designed to reduce friction, improve decisions, and shorten delivery loops.",
      },
      {
        value: "6",
        title: "Core operating lanes",
        description:
          "Strategy, planning, process, delivery, reporting, and growth support aligned in one system.",
      },
      {
        value: "90%",
        title: "Clearer visibility",
        description:
          "Practical dashboards and routines help leaders see progress, blockers, and next actions.",
      },
    ],
  },
  coreSection: {
    label: "Core Capabilities",
    title: "Everything needed to move work forward.",
    subtitle:
      "Focused services for planning, delivery, process, performance, and growth.",
    cards: [
      {
        title: "Strategic Execution",
        description:
          "Translate priorities into focused initiatives, clear owners, and measurable execution plans.",
        iconPath: "M6 29h28M10 25l6-6 5 4 9-11M28 12h6v6",
      },
      {
        title: "Operational Planning",
        description:
          "Build capacity plans, cadences, and delivery routines that keep work moving with less drag.",
        iconPath: "M9 10h22M9 18h14M9 26h22M28 15l4 4-4 4M13 7v6M24 23v6",
      },
      {
        title: "Process Optimization",
        description:
          "Refine workflows, handoffs, controls, and documentation so teams can deliver repeatedly.",
        iconPath: "M8 9h24v22H8zM13 15h14M13 20h14M13 25h8",
      },
      {
        title: "Project Delivery",
        description:
          "Coordinate milestones, dependencies, risks, and follow-through across strategic initiatives.",
        iconPath: "M8 20h7l4-9 5 18 4-9h4M9 31h22M9 9h22",
      },
      {
        title: "Performance Tracking",
        description:
          "Create scorecards and operating reviews that show progress, blockers, and accountability.",
        iconPath: "M7 31h26M11 27v-8M19 27V9M27 27V15",
      },
      {
        title: "Growth Support",
        description:
          "Strengthen execution capacity as teams, markets, and operational demands expand.",
        iconPath: "M7 29V11h6v18M17 29V7h6v22M27 29V15h6v14",
      },
    ],
  },
  workflowSection: {
    label: "Execution Workflow",
    title: "A clean four-step workflow.",
    subtitle:
      "A practical execution sequence that keeps priorities, delivery, and improvement moving in one direction.",
    steps: [
      {
        title: "Discover",
        description:
          "Assess priorities, operating gaps, current workflows, and the outcomes that matter most.",
        tag: "Priority mapping",
      },
      {
        title: "Plan",
        description:
          "Define owners, milestones, capacity, governance, and the operating cadence for delivery.",
        tag: "Delivery planning",
      },
      {
        title: "Execute",
        description:
          "Coordinate teams, track dependencies, remove blockers, and keep decisions moving.",
        tag: "Live execution",
      },
      {
        title: "Optimize",
        description:
          "Measure performance, improve workflows, and scale the system as the business grows.",
        tag: "Performance tuning",
      },
    ],
  },
  resultsSection: {
    label: "Results / Impact",
    title: "Clear improvements without extra complexity.",
    subtitle:
      "Visible delivery gains, cleaner execution, and stronger reporting without adding operational drag.",
    metrics: [
      {
        value: "35%",
        label: "Faster Delivery",
        description:
          "Shorter planning-to-launch cycles through clearer ownership.",
        progress: "78%",
      },
      {
        value: "48%",
        label: "Improved Workflow",
        description:
          "Less rework with cleaner handoffs and stronger operating rhythm.",
        progress: "84%",
      },
      {
        value: "90%",
        label: "Better Visibility",
        description:
          "Transparent progress reporting for decisions and accountability.",
        progress: "90%",
      },
      {
        value: "3X",
        label: "Scalable Growth",
        description:
          "Execution capacity that adapts as new initiatives expand.",
        progress: "72%",
      },
    ],
  },
  cta: [
    {
      title: "Start execution planning",
      description: "Talk to Sidago about your execution priorities",
      href: "/contact",
      srLabel: "Start execution planning with Sidago",
      backgroundColor: "#3c85dd",
      sortOrder: 1,
    },
    {
      title: "Explore our services",
      description: "See how Sidago supports planning, delivery, and growth",
      href: "/services",
      srLabel: "Explore Sidago services",
      backgroundColor: "#eef0ee",
      sortOrder: 2,
    },
  ],
};

export const defaultInsightsPage = {
  hero: {
    useVideo: true,
    lighterTheme: false,
    videoSrc: "https://www.wintermute.com/videos/heroes/liquidity.mp4",
    imageSrc: "",
    subtitle:
      "Make smarter decisions with clear, data-driven strategies that improve performance and support long-term business growth",
    fontWeight: 400,
    loop: true,
    lighterBgColor: "bg-[#f0f1f1]",
    videoSectionClass: "",
    videoClass: "left-[500px] top-[70px] !w-3/4 !h-3/4",
    titles: [
      {
        title: "Turning data into",
        color: "",
        className: "",
        line: 1,
        sortOrder: 1,
      },
      {
        title: "actionable",
        color: "#958dec",
        className: "",
        line: 1,
        sortOrder: 2,
      },
      {
        title: "business insights",
        color: "#958dec",
        className: "",
        line: 2,
        sortOrder: 3,
      },
    ],
    ctaLabel: "Get in touch",
    ctaHref: "/contact",
    ctaButtonClass:
      "group/interactive mt-6 inline-flex items-center justify-between gap-md bevel bevel-[0.25rem] bg-[#958dec] px-md py-sm text-sm font-medium !text-black transition-opacity hover:!text-black hover:opacity-90",
    ctaFocusClassName:
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#958dec]",
  },
  statistics: [
    {
      stat: "10+",
      label: "Years experience",
      width: 170,
      activeDotColor: "#3C85DD",
      sortOrder: 1,
    },
    {
      stat: "500+",
      label: "Projects delivered",
      width: 190,
      activeDotColor: "#3C85DD",
      sortOrder: 2,
    },
    {
      stat: "50+",
      label: "Global clients",
      width: 170,
      activeDotColor: "#3C85DD",
      sortOrder: 3,
    },
    {
      stat: "100+",
      label: "Team members",
      width: 180,
      activeDotColor: "#3C85DD",
      sortOrder: 4,
    },
    {
      stat: "24/7",
      label: "Support coverage",
      width: 170,
      activeDotColor: "#3C85DD",
      sortOrder: 5,
    },
  ],
  benefits: {
    title: "Insights That Scale",
    subtitle:
      "Clarity, efficiency, and performance built for modern business growth",
    items: [
      {
        title: "Operational Efficiency",
        description:
          "Streamlined processes that reduce costs and improve productivity",
        iconKey: "coverage",
      },
      {
        title: "Global Workforce Access",
        description:
          "Skilled talent across regions to support scalable operations",
        iconKey: "octagon",
      },
      {
        title: "Process Optimization",
        description:
          "Continuous improvement to enhance workflows and performance",
        iconKey: "process",
      },
      {
        title: "Data-Driven Decisions",
        description: "Insights that guide smarter business strategies and outcomes",
        iconKey: "badge",
      },
      {
        title: "24/7 Business Support",
        description:
          "Round-the-clock services to ensure uninterrupted operations",
        iconKey: "support",
      },
      {
        title: "Performance Transparency",
        description: "Clear reporting and measurable results you can trust",
        iconKey: "reporting",
      },
    ],
  },
  featuredInsights: {
    title: "Featured service insights",
    subtitle: "Practical insight areas connected to real Sidago delivery.",
    items: [
      {
        title: "Research and data intelligence",
        category: "Research",
        metric: "01",
        accent: "#958dec",
        description:
          "Market research, web research, data mining, and verified source collection for clearer business decisions.",
        services: ["Web research", "Data mining", "Lead research"],
      },
      {
        title: "Operational workflow support",
        category: "Operations",
        metric: "02",
        accent: "#3C85DD",
        description:
          "Repeatable admin, documentation, reporting, and task coordination that keeps daily work moving.",
        services: ["Back office", "Reporting", "Task support"],
      },
      {
        title: "Growth and content execution",
        category: "Marketing",
        metric: "03",
        accent: "#FF5D3C",
        description:
          "Website content, campaign support, digital marketing assistance, and publishing workflows for steady growth.",
        services: ["Content", "Campaigns", "Publishing"],
      },
      {
        title: "Business support at scale",
        category: "Support",
        metric: "04",
        accent: "#5FE18B",
        description:
          "Virtual assistance, customer support, bookkeeping support, and process help for teams that need dependable capacity.",
        services: ["Virtual assistants", "Customer support", "Bookkeeping"],
      },
    ],
  },
  coverageMatrix: {
    title: "Coverage Matrix",
    subtitle: "Insight categories mapped to real Sidago services.",
    items: [
      {
        title: "Research",
        description:
          "Market scans, data gathering, source validation, competitor research",
        image: "/images/Market-Research2.jpg",
      },
      {
        title: "Data",
        description:
          "Entry, cleanup, mining, dashboards, recurring operational reports",
        image: "/images/Data-Mining2.png",
      },
      {
        title: "Admin",
        description:
          "Inbox support, scheduling, document preparation, task coordination",
        image: "/images/Administrative-Assistants2-1.jpg",
      },
      {
        title: "Marketing",
        description:
          "Content planning, website updates, campaign support, publishing",
        image: "/images/Web-Content3-1.png",
      },
      {
        title: "Business",
        description: "Bookkeeping support, documentation, process organization",
        image: "/images/Paralegal-and-Bookkeeping2.jpg",
      },
      {
        title: "Strategy",
        description: "Planning support, vendor comparison, decision preparation",
        image: "/images/Expert-Negotiation2.png",
      },
    ],
  },
  timeline: {
    title: "Editorial Timeline",
    subtitle: "Recent Sidago insight releases.",
    items: [
      {
        date: "4 May 2026",
        category: "Operations",
        title: "Designing a dependable delivery rhythm for growing teams",
      },
      {
        date: "30 Apr 2026",
        category: "Research",
        title: "How Sidago structures better research handoffs",
      },
      {
        date: "24 Apr 2026",
        category: "Data",
        title: "Turning raw sheets into operational reporting",
      },
      {
        date: "18 Apr 2026",
        category: "Admin",
        title: "Reducing daily friction with repeatable support workflows",
      },
    ],
  },
  discover: {
    title: "Discover More",
    variant: "animated-svg",
    items: [
      {
        title: "Research & Data Insights",
        text: "Explore how Sidago turns market research, web data, competitor tracking, and source validation into clear decision support.",
        href: "/research-data",
        image: "/images/Market-Research2.jpg",
      },
      {
        title: "Workflow & Support Insights",
        text: "See how Sidago structures admin support, reporting, documentation, and back-office workflows for dependable business execution.",
        href: "/operations",
        image: "/images/Administrative-Assistants2-1.jpg",
      },
    ],
  },
};
