const SECTION_ID = "how-we-scale-operations";

export const reportContentsContent = {
  tableOfContents: [
    {
      id: SECTION_ID,
      label: "How we scale operations",
      srText: "How we scale operations",
    },
    {
      id: "get-started",
      label: "Get started",
      srText: "Get started with Sidago operations",
    },
  ],
  mainSection: {
    id: SECTION_ID,
    title: "How we scale operations",
    paragraphs: [
      {
        text: "Scalable operations management means your business can absorb more volume—orders, tickets, reports, onboarding—without proportional hiring or chaos in handoffs. Sidago builds that capacity as a managed service.",
      },
      {
        strong: "Workflow-first delivery: ",
        text: "We document intake, triage, escalation, and completion paths so remote teams execute consistently inside your tools and tone guidelines.",
      },
      {
        strong: "Flexible capacity: ",
        text: "Ramp specialists for seasonal peaks, product launches, or new regions; right-size when priorities shift without long hiring cycles.",
      },
      {
        strong: "Visibility for leaders: ",
        text: "Weekly reporting on throughput, backlog, quality samples, and risks—so managers steer with data instead of ad-hoc status chasing.",
      },
    ],
    image: {
      src: "/images/group-content-12345.png",
      alt: "Cross-Asset Performance Week 20",
      previewTitle: "Cross-asset performance",
      previewWeek: "Week 20",
      previewSource: "SOURCE: SIDAGO OTC (DATA AS OF 18 MAY 2026)",
      previewTableOnly: true,
    },
  },
  ctaSection: {
    id: "get-started",
    title: "Get started",
    label: "Contact us",
    href: "/contact",
    srText: "Contact Sidago about scalable operations",
  },
  disclaimers: [
    {
      text: "Sidago provides business process, operational support, and digital services. Scope, SLAs, and tooling access are defined in each engagement statement of work.",
    },
    {
      text: "Information on this page is for general guidance. It does not constitute legal, investment, or regulatory advice.",
    },
    {
      href: "/legal",
      linkLabel: "legal policies",
      text: "Please refer to our ",
      textAfter: " for additional terms and disclaimers.",
    },
  ],
};
