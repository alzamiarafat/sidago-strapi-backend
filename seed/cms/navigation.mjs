import { defaultServicesPage } from "./defaults.mjs";
import * as strategyMenuModule from "../strategy-menu.js";
import { unwrapModule } from "./esm-compat.mjs";

const { strategyMenuItems } = unwrapModule(strategyMenuModule);

export const defaultIndustryMenuGroups = [
  {
    groupId: "b2b-commercial",
    title: "B2B / Commercial",
    href: "/industries/b2b-commercial",
    description: "Industry support for commercial teams and firms",
    children: [
      { title: "Law Firms", href: "/industries/law-firms" },
      {
        title: "Manufacturing Industrial Products",
        href: "/industries/manufacturing-industrial-products",
      },
    ],
  },
  {
    groupId: "financial",
    title: "Financial",
    href: "/industries/accounting-firms",
    description: "Financial sector support and operations",
    children: [
      { title: "Accounting Firms", href: "/industries/accounting-firms" },
      { title: "Banking", href: "/industries/banking" },
    ],
  },
  {
    groupId: "technology",
    title: "Technology",
    href: "/industries/ad-networks",
    description: "Technology and digital business support",
    children: [
      { title: "Ad Networks", href: "/industries/ad-networks" },
      {
        title: "Affiliate Networks",
        href: "/industries/affiliate-networks",
      },
      { title: "Affiliates", href: "/industries/affiliates" },
    ],
  },
  {
    groupId: "health-care",
    title: "Health Care",
    href: "/industries/healthcare",
    description: "Healthcare operations and admin support",
    children: [
      {
        title: "Practices and Doctors",
        href: "/industries/practices-and-doctors",
      },
    ],
  },
  {
    groupId: "aerospace-defense",
    title: "Aerospace / Defense",
    href: "/industries/aerospace-defense",
    description: "Aerospace and defense industry support",
    children: [],
  },
  {
    groupId: "automotive",
    title: "Automotive",
    href: "/industries/automotive",
    description: "Automotive industry operations support",
    children: [],
  },
  {
    groupId: "consumer-product-and-retail",
    title: "Consumer Product and Retail",
    href: "/industries/consumer-product-and-retail",
    description: "Retail and consumer product support",
    children: [],
  },
  {
    groupId: "distribution-and-transportation",
    title: "Distribution and Transportation",
    href: "/industries/distribution-and-transportation",
    description: "Logistics and distribution support",
    children: [],
  },
  {
    groupId: "insurance",
    title: "Insurance",
    href: "/industries/insurance",
    description: "Insurance industry operations support",
    children: [],
  },
  {
    groupId: "restaurants",
    title: "Restaurants",
    href: "/industries/restaurants",
    description: "Restaurant and hospitality support",
    children: [],
  },
  {
    groupId: "construction",
    title: "Construction",
    href: "/industries/construction",
    description: "Construction industry support",
    children: [],
  },
];

export const defaultUtilityLinks = [
  { label: "Sales", href: "/sales", srLabel: "Sales", sortOrder: 1 },
  { label: "Contact", href: "/contact", srLabel: "Contact", sortOrder: 2 },
];

const STRATEGY_ICON_KEYS = {
  capabilities: "capabilities",
  "employee-advantage": "employeeAdvantage",
  "our-benefits": "benefits",
  "our-process": "process",
};

function mapServiceItems(items = []) {
  return items.map((item) => ({
    title: item.title,
    href: item.href,
    ...(item.children?.length
      ? { children: mapServiceItems(item.children) }
      : {}),
  }));
}

export function mapServiceGroupsToProductSections(groups = []) {
  return groups.map((group) => ({
    title: group.title,
    items: mapServiceItems(group.children ?? []),
  }));
}

export function mapMenuGroupsToIndustryItems(groups = []) {
  return groups.map((group) => ({
    title: group.title,
    href: group.href,
    description: group.description || "",
    children: (group.children ?? []).map((child) => ({
      title: child.title,
      href: child.href,
    })),
  }));
}

export function mapMenuGroupsToStrategyItems(groups = []) {
  return groups.map((group) => ({
    key: group.groupId || group.key || group.title,
    title: group.title,
    href: group.href,
    description: group.description || "",
    iconKey:
      STRATEGY_ICON_KEYS[group.groupId] ||
      STRATEGY_ICON_KEYS[group.key] ||
      group.groupId ||
      group.key,
    children: (group.children ?? []).map((child) => ({
      key: child.href?.split("/").filter(Boolean).at(-1) || child.title,
      title: child.title,
      href: child.href,
      description: child.description || "",
    })),
  }));
}

export function strategyMenuItemsToGroups(items = strategyMenuItems) {
  return items.map((group) => ({
    groupId: group.key,
    title: group.title,
    href: group.href,
    description: group.description,
    children: (group.children ?? []).map((item) => ({
      title: item.title,
      href: item.href,
      description: item.description,
    })),
  }));
}

export function mainNavigationToStrapiSeed(
  utilityLinks = defaultUtilityLinks,
) {
  return {
    utilityLinks: utilityLinks.map((link, index) => ({
      label: link.label,
      href: link.href,
      srLabel: link.srLabel || link.label,
      sortOrder: link.sortOrder ?? index + 1,
    })),
  };
}

export function normalizeUtilityLinks(links = [], fallback = defaultUtilityLinks) {
  const sorted = links
    .slice()
    .sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0));

  if (!sorted.length) {
    return fallback.map((link) => ({
      title: link.label,
      href: link.href,
      srLabel: link.srLabel || link.label,
    }));
  }

  return sorted.map((link, index) => ({
    title: link.label || fallback[index]?.label,
    href: link.href || fallback[index]?.href,
    srLabel: link.srLabel || link.label || fallback[index]?.srLabel,
  }));
}

export const defaultMainNavigation = {
  services: mapServiceGroupsToProductSections(defaultServicesPage.serviceGroups),
  industries: mapMenuGroupsToIndustryItems(defaultIndustryMenuGroups),
  strategy: mapMenuGroupsToStrategyItems(strategyMenuItemsToGroups()),
  utilityLinks: normalizeUtilityLinks(defaultUtilityLinks),
};

export function buildMainNavigation({
  serviceGroups = defaultServicesPage.serviceGroups,
  industryGroups = defaultIndustryMenuGroups,
  strategyGroups = strategyMenuItemsToGroups(),
  utilityLinks = defaultUtilityLinks,
} = {}) {
  return {
    services: mapServiceGroupsToProductSections(serviceGroups),
    industries: mapMenuGroupsToIndustryItems(industryGroups),
    strategy: mapMenuGroupsToStrategyItems(strategyGroups),
    utilityLinks: normalizeUtilityLinks(utilityLinks),
  };
}
