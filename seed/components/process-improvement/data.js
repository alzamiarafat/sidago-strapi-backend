/** Serializable process improvement page content for Strapi */

export const processImprovementHero = {
  eyebrow: "Process improvement · AI-native",
  title: "Orchestrate sharper decisions across every operational lane.",
  subtitle:
    "Sidago fuses human expertise with intelligent systems to redesign how work moves—measured, humane, and built for enterprises that cannot afford guesswork.",
};

export const logos = [
  "Axiom North",
  "Velora Labs",
  "Kiteframe",
  "Helix Meridian",
  "Northwind Ops",
  "Cinder & Co",
];

export const features = [
  {
    title: "Adaptive workflow automation",
    body: "Sidago maps decision paths, handoffs, and exceptions so repetitive cycles compress without losing human judgment at the edge.",
  },
  {
    title: "Signal-rich process analysis",
    body: "We fuse operational telemetry with qualitative context to expose bottlenecks that spreadsheets and static maps routinely miss.",
  },
  {
    title: "Efficiency without fragility",
    body: "Tighter throughput is staged with rollback lanes, observability hooks, and change windows that keep production calm.",
  },
  {
    title: "Narrative-grade reporting",
    body: "Leaders receive living briefs—trendlines, variance drivers, and next actions—instead of flat monthly reconciliations.",
  },
  {
    title: "Collaboration in one plane",
    body: "Design, risk, and delivery share a single source of intent with versioned rationale so alignment survives turnover.",
  },
  {
    title: "Predictive optimization loops",
    body: "Forecast-informed capacity and backlog shaping reduce fire drills while keeping service promises defensible.",
  },
];

export const workflowSteps = [
  {
    title: "Sense",
    detail: "Ingest live signals from systems, tickets, and stakeholder touchpoints.",
  },
  {
    title: "Diagnose",
    detail: "Isolate root friction with traceable evidence—not anecdotal heat maps alone.",
  },
  {
    title: "Design",
    detail: "Co-author target flows with guardrails, SLAs, and measurable exit criteria.",
  },
  {
    title: "Deploy",
    detail: "Roll out in waves with automated checks and human checkpoints at critical seams.",
  },
  {
    title: "Evolve",
    detail: "Close the loop with retrospectives that feed the next optimization sprint.",
  },
];

export const dashboardSlides = [
  {
    title: "Latency-aware throughput",
    caption: "Live corridor view of queue depth, aging risk, and predicted breach windows.",
  },
  {
    title: "Decision confidence index",
    caption: "Blended model of data completeness, policy fit, and historical resolution quality.",
  },
  {
    title: "Automation coverage map",
    caption: "Where machines assist, where humans decide, and where hybrid review is mandatory.",
  },
];

export const whyMetrics = [
  { label: "Faster cycle completion", value: "38%", hint: "median uplift across pilot programs" },
  { label: "Manual touch reduction", value: "52%", hint: "on audited high-volume paths" },
  { label: "Decision latency drop", value: "41%", hint: "executive review windows compressed" },
  { label: "Live health coverage", value: "24/7", hint: "always-on observability surfaces" },
];

export const defaultProcessImprovementPageContent = {
  hero: processImprovementHero,
  logos,
  features,
  workflowSteps,
  dashboardSlides,
  whyMetrics,
};
