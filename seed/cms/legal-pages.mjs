import * as cookiesBlocksModule from "../legal/cookiesBlocks.js";
import * as modernSlaveryBlocksModule from "../legal/modernSlaveryBlocks.js";
import * as privacyBlocksModule from "../legal/privacyBlocks.js";
import { unwrapModule } from "./esm-compat.mjs";

const { cookiesBlocks } = unwrapModule(cookiesBlocksModule);
const { modernSlaveryBlocks } = unwrapModule(modernSlaveryBlocksModule);
const { privacyBlocks } = unwrapModule(privacyBlocksModule);

export const defaultPrivacyPolicy = {
  title: "Privacy Policy",
  lastUpdated: "14 May 2026",
  activePolicy: "privacy",
  blocks: privacyBlocks,
};

export const defaultCookiesPolicy = {
  title: "Cookies Policy",
  lastUpdated: "14 May 2026",
  activePolicy: "cookies",
  blocks: cookiesBlocks,
};

export const defaultModernSlaveryPolicy = {
  title: "Modern Slavery Statement",
  lastUpdated: "14 May 2026",
  activePolicy: "modern-slavery",
  blocks: modernSlaveryBlocks,
};

export const defaultLegalHub = {
  hubTitle: "Legal & compliance center",
  hubDescription:
    "Website-ready policies for sidago.com. Last updated 14 May 2026.",
  lastUpdated: "14 May 2026",
  documents: [
    {
      href: "/privacy",
      title: "Privacy Policy",
      blurb:
        "Collection, use, sharing, international transfers, retention, security, and your choices.",
    },
    {
      href: "/cookies",
      title: "Cookies Policy",
      blurb:
        "Necessary, functional, analytics, and advertising technologies—and how to manage them.",
    },
    {
      href: "/modern-slavery",
      title: "Modern Slavery Statement",
      blurb:
        "Ethical conduct, supplier expectations, risk assessment, diligence, and reporting.",
    },
  ],
};

export function legalBlocksToStrapiSeed(blocks = []) {
  return blocks.map((block, index) => {
    const sortOrder = index + 1;

    switch (block.type) {
      case "h2":
        return {
          __component: "shared.legal-heading-h2",
          anchorId: block.id || "",
          text: block.text,
          sortOrder,
        };
      case "h3":
        return {
          __component: "shared.legal-heading-h3",
          text: block.text,
          sortOrder,
        };
      case "p":
        return {
          __component: "shared.legal-paragraph",
          text: block.text,
          sortOrder,
        };
      case "ul":
        return {
          __component: "shared.legal-bullet-list",
          items: (block.items || []).map((text, itemIndex) => ({
            text,
            sortOrder: itemIndex + 1,
          })),
          sortOrder,
        };
      case "plink":
        return {
          __component: "shared.legal-link-paragraph",
          before: block.before || "",
          linkText: block.linkText,
          href: block.href,
          after: block.after || "",
          sortOrder,
        };
      case "contact":
        return {
          __component: "shared.legal-contact-box",
          intro: block.intro || "",
          lines: (block.lines || []).map((line, lineIndex) => ({
            label: line.label,
            href: line.href,
            display: line.display,
            sortOrder: lineIndex + 1,
          })),
          sortOrder,
        };
      case "hr":
        return {
          __component: "shared.legal-divider",
          sortOrder,
        };
      default:
        return null;
    }
  }).filter(Boolean);
}

export function legalPolicyToStrapiSeed(policy) {
  return {
    title: policy.title,
    lastUpdated: policy.lastUpdated,
    activePolicy: policy.activePolicy,
    blocks: legalBlocksToStrapiSeed(policy.blocks),
  };
}

export function legalHubToStrapiSeed(hub = defaultLegalHub) {
  return {
    hubTitle: hub.hubTitle,
    hubDescription: hub.hubDescription,
    lastUpdated: hub.lastUpdated,
    documents: hub.documents.map((doc, index) => ({
      href: doc.href,
      title: doc.title,
      blurb: doc.blurb,
      sortOrder: index + 1,
    })),
  };
}

export function normalizeLegalBlocksFromStrapi(blocks = []) {
  return blocks
    .slice()
    .sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0))
    .map((block) => {
      switch (block.__component) {
        case "shared.legal-heading-h2":
          return {
            type: "h2",
            id: block.anchorId || undefined,
            text: block.text,
          };
        case "shared.legal-heading-h3":
          return { type: "h3", text: block.text };
        case "shared.legal-paragraph":
          return { type: "p", text: block.text };
        case "shared.legal-bullet-list":
          return {
            type: "ul",
            items: (block.items || [])
              .slice()
              .sort(
                (left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0),
              )
              .map((item) => item.text)
              .filter(Boolean),
          };
        case "shared.legal-link-paragraph":
          return {
            type: "plink",
            before: block.before || "",
            linkText: block.linkText,
            href: block.href,
            after: block.after || "",
          };
        case "shared.legal-contact-box":
          return {
            type: "contact",
            intro: block.intro || undefined,
            lines: (block.lines || [])
              .slice()
              .sort(
                (left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0),
              )
              .map((line) => ({
                label: line.label,
                href: line.href,
                display: line.display,
              })),
          };
        case "shared.legal-divider":
          return { type: "hr" };
        default:
          return null;
      }
    })
    .filter(Boolean);
}

export function normalizeLegalDocumentsFromStrapi(documents = []) {
  return documents
    .slice()
    .sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0))
    .map((doc) => ({
      href: doc.href,
      title: doc.title,
      blurb: doc.blurb,
    }));
}
