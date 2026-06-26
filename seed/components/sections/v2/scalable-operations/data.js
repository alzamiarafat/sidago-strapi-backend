/** Static copy for Scalable Operations Management */

export { pressReleaseContent } from "./pressReleaseContent.js";
export { reportContentsContent } from "./reportContentsContent.js";
export {
  subscribeContent,
  similarInsightsContent,
} from "./pageCopy.js";

export const reportInsightHero = {
  imageSrc: "/images/Armitage.svg",
  imageAlt:
    "Sidago launches Armitage, bringing its DeFi and trading expertise to vault curation",
  breadcrumbs: [
    {
      label: "Insights",
      href: "/insights/subscribe",
      srText: "Insights › Subscribe",
    },
    {
      label: "News",
      href: "/insights/subscribe",
      srText: "Insights › News",
    },
  ],
  title:
    "Sidago launches Armitage, bringing its DeFi and trading expertise to vault curation",
  descriptionParts: [
    { type: "text", value: "Sidago today announced " },
    {
      type: "link",
      value: "Armitage",
      href: "/armitage",
      strong: true,
    },
    {
      type: "text",
      value:
        ", a new DeFi vault curation business. The first two Armitage vaults will be deployed on Morpho in May, both denominated in USDC.",
    },
  ],
  date: "19 May 2026",
  category: "News",
  className: "bg-[#151916] text-gray-off-white",
  metaTone: "brand",
};

export const atAGlanceContent = {
  authorName: "Sidago Operations",
  authorImageSrc: "/images/image_1.jpg",
  tags: [
    {
      label: "Operations",
      href: "/operations",
      srText: "Our Operations",
    },
    {
      label: "Processes",
      href: "/business-processes",
      srText: "Business Processes",
    },
  ],
  heading: "At a glance",
  headingId: "operations-at-a-glance",
  body:
    "Sidago scales operational capacity through workflow design, back-office delivery, customer operations, and flexible team scaling. Engagements start with a focused scope, clear SLAs, and reporting cadences—then expand across functions and time zones without losing quality or accountability.",
};
