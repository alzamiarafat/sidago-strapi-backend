/** Serializable sales page content for Strapi */

export const salesHero = {
  useVideo: true,
  lighterTheme: true,
  videoSrc: "https://www.wintermute.com/videos/heroes/cfds.mp4",
  titles: [
    {
      title: "Helping companies build",
      color: "",
      className: "text-black",
    },
    {
      title: "stronger sales relationships",
      color: "#4f8b66",
      className: "block mt-1",
    },
  ],
  subtitle:
    "Strengthen employee teamwork, customer service, and external business relationships with Sidago to create more reliable sales growth and stronger long-term business value.",
  videoClass: "left-[500px] !w-3/4",
  lighterBgColor: "bg-[#f8f8f8]",
};

export const trustChips = [
  "Chicago, USA",
  "Dhaka, Bangladesh",
  "Bogra, Bangladesh",
  "Bharatpur, India",
  "Lucknow, India",
  "Bucharest, Romania",
  "Manila, Philippines",
  "Cavite, Philippines",
];

export const heroStats = [
  {
    value: "24",
    suffix: "hrs",
    label: "target response window for sales follow-up",
    activeDotColor: "#5cf0a5",
  },
  {
    value: "8",
    suffix: " hubs",
    label: "listed Sidago office locations supporting delivery",
    activeDotColor: "#ff8c6a",
  },
  {
    value: "6",
    suffix: "+",
    label: "core commercial support areas across sales and service",
    activeDotColor: "#7aa8ff",
  },
];

export const serviceCards = [
  {
    title: "Customer Acquisition & Sales",
    body:
      "Sidago lists customer acquisition and sales as a core marketing capability for teams that need disciplined growth execution.",
  },
  {
    title: "Telemarketing & Telesales",
    body:
      "Sidago's broader outsourcing model includes telesales and online marketing for companies expanding demand without building every role in-house.",
  },
  {
    title: "CRM / Contact Management",
    body:
      "Contact management and CRM management are presented by Sidago as practical support for protecting customer relationships at scale.",
  },
  {
    title: "Customer Service",
    body:
      "Customer service is treated as a business-critical retention layer, with support available across phone, email, and social channels.",
  },
  {
    title: "Market Research & Data Mining",
    body:
      "Research and data support help commercial teams reach better accounts with stronger context before outreach begins.",
  },
  {
    title: "Negotiation Management",
    body:
      "Sidago emphasizes support for important business relationships, including mediation and negotiation when outcomes need to stay mutually beneficial.",
  },
];

export const featureHighlights = [
  {
    title: "Improve employee teamwork",
    text:
      "The original Sidago sales page focuses on training sessions, team building, and positive attitudes that improve productivity and customer satisfaction.",
  },
  {
    title: "Strengthen external relationships",
    text:
      "Sidago positions sales support around maintaining profitable, efficient relationships with other organizations and business partners.",
  },
  {
    title: "Use online networks with confidence",
    text:
      "Sidago specifically highlights online networks as a way to make communication easier while keeping information safe and secure.",
  },
  {
    title: "Deliver measurable business outcomes",
    text:
      "Every Sidago engagement is tied to real results — reduced costs, faster execution, and compounding value across every service line.",
  },
];

export const dashboardBars = [
  { label: "Customer service", value: 92, color: "#5CF0A5" },
  { label: "Telesales / outreach", value: 84, color: "#FF7A59" },
  { label: "CRM management", value: 76, color: "#7AA8FF" },
  { label: "Market research", value: 68, color: "#C7F36B" },
];

export const benefitRows = [
  "Save on operating costs while growing the business",
  "Access customer service, tech support, telesales, and online marketing support",
  "Use solutions personalized for your business and relationship model",
  "Support customers through phone, email, and social media channels",
];

export const workflowSteps = [
  {
    step: "01",
    title: "Assess relationship pressure points",
    body:
      "Sidago starts from the idea that businesses rely on many kinds of relationships to stay profitable, so the first job is understanding where friction exists.",
  },
  {
    step: "02",
    title: "Deploy the right support mix",
    body:
      "From customer acquisition and telesales to customer service and administrative support, Sidago's service catalog lets teams assemble practical commercial coverage.",
  },
  {
    step: "03",
    title: "Improve loyalty, visibility, and follow-through",
    body:
      "The intended outcome is stronger teamwork, happier customers, more reliable outreach, and external relationships that become more profitable over time.",
  },
];

export const caseStudyAreas = [
  "Data Mining",
  "Public Relations",
  "Telemarketing",
  "Web Content",
  "Market Research",
  "General Offshoring",
  "Expert Negotiation",
  "Administrative Assistants",
  "Web Research",
  "Web Development",
];

export const deliverySignals = [
  {
    title: "Business relationship focus",
    body:
      "Built to improve how companies manage teams, customers, and partner relationships.",
  },
  {
    title: "Outsourcing and offshoring depth",
    body:
      "Sidago combines lower operating cost with scalable business support.",
  },
  {
    title: "Global operating footprint",
    body:
      "Operations span the United States, Bangladesh, India, Romania, and the Philippines.",
  },
];

export const defaultSalesPageContent = {
  hero: salesHero,
  trustChips,
  heroStats,
  serviceCards,
  featureHighlights,
  dashboardBars,
  benefitRows,
  workflowSteps,
  caseStudyAreas,
  deliverySignals,
};
