/** Serializable research & data page content for Strapi */

export const researchDataHero = {
  eyebrow: "Sidago intelligence platform",
  title: "Sidago Research & Data Center",
  description:
    "Clean research, survey intelligence, reports, and open datasets for teams that need evidence-led decisions.",
};

export const reports = [
  {
    title: "Digital Economy Outlook 2026",
    category: "Economy",
    date: "May 2026",
    type: "Report",
    size: "18.2 MB",
    summary: "A concise outlook on digital adoption, workforce readiness, and regional investment signals.",
    color: "#3c85dd",
  },
  {
    title: "Agriculture Data Systems Benchmark",
    category: "Agriculture",
    date: "April 2026",
    type: "Dataset",
    size: "42.8 MB",
    summary: "Field survey coverage, logistics visibility, and production reporting benchmarks.",
    color: "#168b50",
  },
  {
    title: "Healthcare Access Intelligence Brief",
    category: "Healthcare",
    date: "December 2025",
    type: "Brief",
    size: "8.6 MB",
    summary: "Survey-led insight into care access, reporting gaps, and service quality signals.",
    color: "#E7512F",
  },
];

export const insights = [
  {
    title: "Digital adoption is becoming an operating capability",
    label: "Industry insight",
    summary: "Organizations are moving from one-off reporting to continuous intelligence workflows.",
  },
  {
    title: "Verified survey systems improve decision confidence",
    label: "Field research",
    summary: "Clean sampling, validation, and coverage tracking make research outputs easier to trust.",
  },
  {
    title: "Analytics teams need fewer tools and clearer signals",
    label: "Data operations",
    summary: "Focused dashboards help leaders compare regions, monitor shifts, and act faster.",
  },
];

export const datasets = [
  { name: "Digital Economy Outlook", format: "PDF", size: "18.2 MB", status: "Ready" },
  { name: "Agriculture Benchmark Data", format: "CSV", size: "42.8 MB", status: "Ready" },
  { name: "Survey Microdata Workbook", format: "XLSX", size: "11.4 MB", status: "Syncing" },
  { name: "Research API Access Pack", format: "API", size: "Docs", status: "Request" },
];

export const filters = ["All", "Economy", "Agriculture", "Healthcare", "Technology", "Dataset"];

export const defaultResearchDataPageContent = {
  hero: researchDataHero,
  reports,
  insights,
  datasets,
  filters,
};
