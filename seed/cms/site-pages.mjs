import * as marketingGrowthDataModule from "../components/sections/v2/marketing-growth/data.js";
import * as supportComplianceDataModule from "../components/sections/v2/support-compliance/data.js";
import * as salesDataModule from "../components/sections/v2/salespage/data.js";
import * as whoWeServeDataModule from "../components/sections/v2/whoweserve/data.js";
import * as researchDataModule from "../components/sections/v2/research-data/data.js";
import * as processImprovementDataModule from "../components/process-improvement/data.js";
import * as insightsDataModule from "../components/sections/v2/insights/data.js";
import * as careersDataModule from "../components/sections/v2/careers/data.js";
import * as armitageDataModule from "../components/sections/v2/armitage/data.js";
import { unwrapModule } from "./esm-compat.mjs";

const marketingGrowthData = unwrapModule(marketingGrowthDataModule);
const supportComplianceData = unwrapModule(supportComplianceDataModule);
const salesData = unwrapModule(salesDataModule);

const {
  audienceSegments,
  whoWeServeIntro,
} = unwrapModule(whoWeServeDataModule);

const { defaultResearchDataPageContent } = unwrapModule(researchDataModule);
const { defaultProcessImprovementPageContent } = unwrapModule(
  processImprovementDataModule,
);

const {
  insightsDiscoverCards,
  insightsFilterGroups,
  insightsSeriesContent,
  latestInsightsContent,
  recommendedInsightsContent,
  subscribeHero,
  subscribePageContent,
} = unwrapModule(insightsDataModule);

const {
  openRoles,
  openRolesPage,
  openRolesPageCta,
} = unwrapModule(careersDataModule);

const {
  ARMITAGE_ABOUT_TABS,
  ARMITAGE_FAQ,
  ARMITAGE_FOOTER_DISCLAIMERS,
  ARMITAGE_FOOTER_LINKS,
  ARMITAGE_NAV_LINKS,
  ARMITAGE_STATS,
  ARMITAGE_VAULTS,
} = unwrapModule(armitageDataModule);

const supportComplianceHero = {
  useVideo: true,
  videoSrc:
    "https://wp-corp-site.s3.eu-central-1.amazonaws.com/wp-content/uploads/2025/05/23163720/Accordion-Forwards.mp4#t=2",
  titles: [
    { title: "Operating with", color: "", className: "", line: 1 },
    { title: "support & compliance", color: "#E7512F", className: "", line: 2 },
    { title: "at enterprise scale", color: "", className: "", line: 3 },
  ],
  subtitle:
    "Structured assistance, documentation, and controls so your organization can serve customers, satisfy oversight, and keep delivery moving.",
  lighterTheme: true,
  lighterBgColor: "bg-[#f1f3f1]",
  videoClass: "left-[500px] !w-3/4 support-compliance-hero-video",
  videoSectionClass: "bg-[#f1f3f1] text-black",
};

export const defaultMarketingGrowthPage = {
  slug: "marketing-growth",
  title: "Marketing Growth",
  content: {
    strategyPillars: marketingGrowthData.strategyPillars,
    coreServices: marketingGrowthData.coreServices,
    insightBlocks: marketingGrowthData.insightBlocks,
    conversionItems: marketingGrowthData.conversionItems,
    progressMetrics: marketingGrowthData.progressMetrics,
    campaignBars: marketingGrowthData.campaignBars,
    performanceStats: marketingGrowthData.performanceStats,
    caseStudies: marketingGrowthData.caseStudies,
    processSteps: marketingGrowthData.processSteps,
    faqItems: marketingGrowthData.faqItems,
  },
};

export const defaultSupportCompliancePage = {
  slug: "support-compliance",
  title: "Support & Compliance",
  content: {
    hero: supportComplianceHero,
    helpCategories: supportComplianceData.helpCategories,
    legalTabs: supportComplianceData.legalTabs,
    supportPillars: supportComplianceData.supportPillars,
    complianceCards: supportComplianceData.complianceCards,
    securityItems: supportComplianceData.securityItems,
    riskPoints: supportComplianceData.riskPoints,
    regulatoryTopics: supportComplianceData.regulatoryTopics,
    docLinks: supportComplianceData.docLinks,
    workflowSteps: supportComplianceData.workflowSteps,
    metricStats: supportComplianceData.metricStats,
    faqItems: supportComplianceData.faqItems,
  },
};

export const defaultSalesPage = {
  slug: "sales",
  title: "Sales",
  content: salesData.defaultSalesPageContent,
};

export const defaultWhoWeServePage = {
  slug: "who-we-serve",
  title: "Who We Serve",
  content: {
    intro: whoWeServeIntro,
    audienceSegments,
    latestInsights: latestInsightsContent,
  },
};

export const defaultResearchDataPage = {
  slug: "research-data",
  title: "Research & Data",
  content: defaultResearchDataPageContent,
};

export const defaultProcessImprovementPage = {
  slug: "process-improvement",
  title: "Process Improvement",
  content: defaultProcessImprovementPageContent,
};

export const defaultInsightsSubscribePage = {
  slug: "insights-subscribe",
  title: "Insights Subscribe",
  content: {
    subscribeHero,
    subscribePageContent,
    recommendedInsightsContent,
    insightsSeriesContent,
    insightsDiscoverCards,
    insightsFilterGroups,
  },
};

export const defaultCareersOpportunitiesPage = {
  slug: "careers-opportunities",
  title: "Careers Opportunities",
  content: {
    openRolesPage,
    openRoles,
    openRolesPageCta,
  },
};

export const defaultArmitagePage = {
  slug: "armitage",
  title: "Armitage",
  content: {
    navLinks: ARMITAGE_NAV_LINKS,
    hero: {
      titleLead: "A new standard",
      titleAccent: "vault curation",
      subtitle:
        "Armitage curates onchain vaults, managing risk and earning yield for depositors backed by 9 years of active trading.",
      videoSrc: "/media/hero-matrix.mp4",
    },
    vaults: ARMITAGE_VAULTS,
    aboutTabs: ARMITAGE_ABOUT_TABS,
    stats: ARMITAGE_STATS,
    faq: ARMITAGE_FAQ,
    footerLinks: ARMITAGE_FOOTER_LINKS,
    footerDisclaimers: ARMITAGE_FOOTER_DISCLAIMERS,
  },
};

export const defaultSitePages = [
  defaultMarketingGrowthPage,
  defaultSupportCompliancePage,
  defaultSalesPage,
  defaultWhoWeServePage,
  defaultResearchDataPage,
  defaultProcessImprovementPage,
  defaultInsightsSubscribePage,
  defaultCareersOpportunitiesPage,
  defaultArmitagePage,
];

export function sitePageToStrapiSeed(page) {
  return {
    slug: page.slug,
    title: page.title,
    content: page.content,
  };
}

export function sitePagesToStrapiSeed(pages = defaultSitePages) {
  return pages.map(sitePageToStrapiSeed);
}

export function getDefaultSitePage(slug) {
  return (
    defaultSitePages.find((page) => page.slug === slug) ||
    defaultMarketingGrowthPage
  );
}

export function normalizeSitePageFromStrapi(item, fallback) {
  if (!item?.content || typeof item.content !== "object") {
    return fallback.content;
  }

  return {
    ...fallback.content,
    ...item.content,
  };
}
