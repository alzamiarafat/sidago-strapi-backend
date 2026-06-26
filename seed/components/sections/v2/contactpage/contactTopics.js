export const CONTACT_TOPICS = [
  {
    slug: "digital-support",
    label: "Digital Support Services",
    srLabel: "Contact › Digital Support Services",
    cardClassName: "bg-gray-tradfi-silver text-gray-night-green",
    spanClassName: "col-span-4 xl:col-span-3",
    showServicesField: true,
    description:
      "Get in touch with Sidago about Digital Support Services — help desk, triage, and operational digital support for your team.",
  },
  {
    slug: "global-workforce-solutions",
    label: "Global Workforce Solutions",
    srLabel: "Contact › Global Workforce Solutions",
    cardClassName: "bg-gray-night-green text-gray-off-white",
    spanClassName: "col-span-4 xl:col-span-3",
    description:
      "Contact Sidago about global workforce solutions — staffing, delivery teams, and scalable people operations.",
  },
  {
    slug: "scalable-operations",
    label: "Scalable Operations",
    srLabel: "Contact › Scalable Operations",
    cardClassName: "bg-blue-dark text-gray-night-green",
    spanClassName: "col-span-4 xl:col-span-3",
    description:
      "Reach Sidago about scalable operations — process design, delivery models, and operational scale-up support.",
  },
  {
    slug: "recruitment",
    label: "Recruitment",
    srLabel: "Contact › Recruiting",
    cardClassName: "bg-green-light text-gray-night-green",
    spanClassName: "col-span-6 xl:col-span-3",
    description:
      "Contact Sidago about recruitment — hiring support, talent pipelines, and workforce onboarding.",
  },
  {
    slug: "events",
    label: "Events",
    srLabel: "Contact › Events",
    cardClassName: "bg-pink-light text-gray-night-green",
    spanClassName: "col-span-6 xl:col-span-3",
    description:
      "Get in touch with Sidago about events — partnerships, speaking, and industry engagements.",
  },
  {
    slug: "media",
    label: "Media",
    srLabel: "Contact › Media",
    cardClassName: "bg-gray-defi-ash text-gray-off-white",
    spanClassName: "col-span-4 xl:col-span-3",
    description:
      "Contact Sidago media relations — press enquiries, interviews, and brand communications.",
  },
  {
    slug: "legal-and-compliance",
    label: "Legal and Compliance",
    srLabel: "Contact › Legal compliance",
    cardClassName: "bg-orange-light text-gray-night-green",
    spanClassName: "col-span-4 xl:col-span-3",
    description:
      "Reach Sidago legal and compliance — policy questions, regulatory matters, and formal enquiries.",
  },
  {
    slug: "other",
    label: "Other",
    srLabel: "Contact › Other",
    cardClassName: "bg-gray-defi-graphite text-gray-off-white",
    spanClassName: "col-span-4 xl:col-span-3",
    description:
      "Contact Sidago for general enquiries that do not fit another topic.",
  },
];

export function getContactTopic(slug) {
  return CONTACT_TOPICS.find((topic) => topic.slug === slug);
}

export function getContactTopicHref(slug) {
  return `/contact/${slug}`;
}

export function getContactInquiryTitle(label) {
  return `Get in touch about ${label}`;
}
