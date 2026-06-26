import * as contactTopicsModule from "../components/sections/v2/contactpage/contactTopics.js";
import { defaultHomepage } from "./defaults.mjs";
import { unwrapModule } from "./esm-compat.mjs";

const { CONTACT_TOPICS } = unwrapModule(contactTopicsModule);

export const defaultContactPage = {
  eyebrow: "Contact us",
  heading: "Get in touch with Sidago",
  subheading: "What topic would you like to contact Sidago about?",
  sidebarImageSrc:
    "https://wp-corp-site.s3.eu-central-1.amazonaws.com/wp-content/uploads/2025/03/26202946/Contact-graphic.svg",
  topics: CONTACT_TOPICS.map((topic, index) => ({
    ...topic,
    sortOrder: index + 1,
  })),
  cta: [
    {
      ...defaultHomepage.cta[0],
      title: "Explore",
      description: "To find tailored liquidity solutions",
      href: "/who-we-serve",
      srLabel: "Explore tailored liquidity solutions",
      sortOrder: 1,
    },
    ...defaultHomepage.cta.slice(1).map((item, index) => ({
      ...item,
      sortOrder: index + 2,
    })),
  ],
};

export function contactPageToStrapiSeed(page = defaultContactPage) {
  return {
    eyebrow: page.eyebrow,
    heading: page.heading,
    subheading: page.subheading,
    sidebarImageSrc: page.sidebarImageSrc,
    topics: page.topics.map((topic, index) => ({
      slug: topic.slug,
      label: topic.label,
      srLabel: topic.srLabel,
      cardClassName: topic.cardClassName,
      spanClassName: topic.spanClassName,
      showServicesField: Boolean(topic.showServicesField),
      description: topic.description,
      sortOrder: topic.sortOrder ?? index + 1,
    })),
    cta: page.cta.map((item, index) => ({
      title: item.title,
      description: item.description,
      href: item.href,
      srLabel: item.srLabel,
      backgroundColor: item.backgroundColor || "",
      sortOrder: item.sortOrder ?? index + 1,
    })),
  };
}
