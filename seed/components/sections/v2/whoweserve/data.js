export const sidagoServiceLinks = {
  operations: {
    href: "/operations",
    label: "Operations",
    srText: "Operations",
  },
  businessProcesses: {
    href: "/business-processes",
    label: "Business Processes",
    srText: "Business Processes",
  },
  performance: {
    href: "/performance",
    label: "Performance",
    srText: "Performance",
  },
  execution: {
    href: "/execution",
    label: "Execution",
    srText: "Execution",
  },
  infrastructure: {
    href: "/infrastructure",
    label: "Infrastructure",
    srText: "Infrastructure",
  },
  insights: {
    href: "/insights",
    label: "Insights",
    srText: "Insights",
  },
  marketingGrowth: {
    href: "/marketing-growth",
    label: "Marketing & Growth",
    srText: "Marketing and Growth",
  },
  researchData: {
    href: "/research-data",
    label: "Research & Data",
    srText: "Research and Data",
  },
  supportCompliance: {
    href: "/support-compliance",
    label: "Support & Compliance",
    srText: "Support and Compliance",
  },
  processImprovement: {
    href: "/process-improvement",
    label: "Process Improvement",
    srText: "Process Improvement",
  },
  globalWorkforce: {
    href: "/global-workforce-solutions",
    label: "Global Workforce",
    srText: "Global Workforce Solutions",
  },
  scalableOps: {
    href: "/scalable-operations-management",
    label: "Scalable Operations",
    srText: "Scalable Operations Management",
  },
  strategy: {
    href: "/strategy",
    label: "Strategy",
    srText: "Strategy",
  },
  services: {
    href: "/services",
    label: "Services",
    srText: "Services",
  },
  contact: {
    href: "/contact",
    label: "Contact",
    srText: "Contact",
  },
};

const S = sidagoServiceLinks;

export const whoWeServeIntro = {
  headingId: "offers-for-every-operational-need",
  lead: "Built for",
  highlight: "every",
  trailing: "organization that needs operational scale",
  description:
    "Explore Sidago services matched to how your teams plan, deliver, and grow",
  watermark: {
    src: "/images/navbar-logo-icon.png",
    alt: "Sidago logo",
    width: 560,
    height: 446,
  },
};

export const audienceSegments = [
  {
    title: "Institutional and retail brokers",
    description:
      "Scale brokerage operations with structured back-office support, reporting, compliance workflows, and dedicated delivery teams.",
    links: [S.operations, S.businessProcesses, S.performance, S.infrastructure],
  },
  {
    title: "Asset managers",
    description:
      "Improve portfolio operations with reporting visibility, process control, execution support, and research-backed decision workflows.",
    links: [S.operations, S.performance, S.execution, S.insights],
  },
  {
    title: "Banks",
    description:
      "Strengthen operational infrastructure, compliance routines, and day-to-day delivery with secure, scalable Sidago support.",
    links: [S.supportCompliance, S.infrastructure, S.operations, S.businessProcesses],
  },
  {
    title: "Hedge funds",
    description:
      "Run leaner operations with performance tracking, execution support, research workflows, and managed back-office delivery.",
    links: [S.performance, S.execution, S.researchData, S.operations],
  },
  {
    title: "Venture capital funds",
    description:
      "Support portfolio companies with execution planning, growth operations, reporting visibility, and structured delivery support.",
    links: [S.execution, S.performance, S.marketingGrowth, S.insights],
  },
  {
    title: "Family offices",
    description:
      "Manage complex operational workloads with discreet support, compliance routines, reporting, and dedicated Sidago teams.",
    links: [S.operations, S.supportCompliance, S.businessProcesses, S.performance],
  },
  {
    title: "Crypto projects",
    description:
      "Build operational capacity across growth, delivery, performance reporting, and scalable service execution.",
    links: [S.marketingGrowth, S.operations, S.performance, S.services],
  },
  {
    title: "HNWIs",
    description:
      "Access white-glove operational support for documentation, coordination, compliance, and managed business workflows.",
    links: [S.operations, S.supportCompliance, S.businessProcesses, S.contact],
  },
  {
    title: "Miners",
    description:
      "Improve operational efficiency with workflow optimization, performance visibility, infrastructure support, and process control.",
    links: [S.operations, S.performance, S.processImprovement, S.infrastructure],
  },
  {
    title: "Exchanges and DeFi trading venues",
    description:
      "Strengthen platform operations with infrastructure support, delivery teams, performance reporting, and compliance workflows.",
    links: [S.infrastructure, S.operations, S.performance, S.supportCompliance],
  },
];
