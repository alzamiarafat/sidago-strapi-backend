import "./load-env.mjs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const outputPath = path.resolve(process.cwd(), "scripts", "seed-data.json");
const shouldPush = process.argv.includes("--push");
const baseUrl = process.env.STRAPI_SEED_URL || "http://localhost:9012";
const token = process.env.STRAPI_SEED_TOKEN;
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultIndustryMenuGroups = [
  {
    groupId: "b2b-commercial",
    title: "B2B / Commercial",
    href: "/industries/b2b-commercial",
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
    children: [
      { title: "Accounting Firms", href: "/industries/accounting-firms" },
      { title: "Banking", href: "/industries/banking" },
    ],
  },
  {
    groupId: "technology",
    title: "Technology",
    href: "/industries/ad-networks",
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
    children: [],
  },
  {
    groupId: "automotive",
    title: "Automotive",
    href: "/industries/automotive",
    children: [],
  },
  {
    groupId: "consumer-product-and-retail",
    title: "Consumer Product and Retail",
    href: "/industries/consumer-product-and-retail",
    children: [],
  },
  {
    groupId: "distribution-and-transportation",
    title: "Distribution and Transportation",
    href: "/industries/distribution-and-transportation",
    children: [],
  },
  {
    groupId: "insurance",
    title: "Insurance",
    href: "/industries/insurance",
    children: [],
  },
  {
    groupId: "restaurants",
    title: "Restaurants",
    href: "/industries/restaurants",
    children: [],
  },
  {
    groupId: "construction",
    title: "Construction",
    href: "/industries/construction",
    children: [],
  },
];

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function loadPayloadFromSeedDefaults() {
  const candidatePaths = [
    path.resolve(scriptDir, "../seed/cms/defaults.mjs"),
    path.resolve(scriptDir, "../seed/cms/defaults.mjs"),
  ];

  for (const candidatePath of candidatePaths) {
    if (!(await fileExists(candidatePath))) {
      continue;
    }

    const defaultsModule = await import(pathToFileURL(candidatePath).href);
    const {
      defaultBusinessProcessesPage,
      defaultCareersPage,
      defaultExecutionPage,
      defaultGlobalSettings,
      defaultHomepage,
      defaultInfrastructurePage,
      defaultInsightsPage,
      defaultOperationsPage,
      defaultPerformancePage,
      defaultServicesPage,
    } = defaultsModule;

    const careersPageModule = await import(
      pathToFileURL(
        path.resolve(path.dirname(candidatePath), "careers-page.mjs"),
      ).href
    );
    const contactPageModule = await import(
      pathToFileURL(
        path.resolve(path.dirname(candidatePath), "contact-page.mjs"),
      ).href
    );
    const brandPageModule = await import(
      pathToFileURL(
        path.resolve(path.dirname(candidatePath), "brand-page.mjs"),
      ).href
    );
    const eventsPageModule = await import(
      pathToFileURL(
        path.resolve(path.dirname(candidatePath), "events-page.mjs"),
      ).href
    );
    const legalPagesModule = await import(
      pathToFileURL(
        path.resolve(path.dirname(candidatePath), "legal-pages.mjs"),
      ).href
    );
    const serviceLandingPagesModule = await import(
      pathToFileURL(
        path.resolve(path.dirname(candidatePath), "service-landing-pages.mjs"),
      ).href
    );
    const navigationModule = await import(
      pathToFileURL(
        path.resolve(path.dirname(candidatePath), "navigation.mjs"),
      ).href
    );
    const sitePagesModule = await import(
      pathToFileURL(
        path.resolve(path.dirname(candidatePath), "site-pages.mjs"),
      ).href
    );

    const companyPageModule = await import(
      pathToFileURL(
        path.resolve(path.dirname(candidatePath), "company-page.mjs"),
      ).href
    );

    return {
      generatedAt: new Date().toISOString(),
      global: {
        siteName: defaultGlobalSettings.siteName,
        siteContactEmail: defaultGlobalSettings.siteContactEmail.replace(
          /^mailto:/,
          "",
        ),
        version: defaultGlobalSettings.version,
        socialLinks: defaultGlobalSettings.socialLinks,
        footer: defaultGlobalSettings.footer,
      },
      homepage: defaultHomepage,
      insight: defaultInsightsPage,
      businessProcess: defaultBusinessProcessesPage,
      operation: defaultOperationsPage,
      infrastructure: defaultInfrastructurePage,
      performance: defaultPerformancePage,
      execution: defaultExecutionPage,
      servicesPage: defaultServicesPage,
      careersPage: careersPageModule.careersPageToStrapiSeed(
        defaultCareersPage,
      ),
      companyPage: companyPageModule.companyPageToStrapiSeed(
        companyPageModule.defaultCompanyPage,
      ),
      contactPage: contactPageModule.contactPageToStrapiSeed(),
      brandPage: brandPageModule.brandPageToStrapiSeed(),
      eventsPage: eventsPageModule.eventsPageToStrapiSeed(),
      privacyPolicy: legalPagesModule.legalPolicyToStrapiSeed(
        legalPagesModule.defaultPrivacyPolicy,
      ),
      cookiesPolicy: legalPagesModule.legalPolicyToStrapiSeed(
        legalPagesModule.defaultCookiesPolicy,
      ),
      modernSlaveryPolicy: legalPagesModule.legalPolicyToStrapiSeed(
        legalPagesModule.defaultModernSlaveryPolicy,
      ),
      legalHub: legalPagesModule.legalHubToStrapiSeed(),
      serviceLandingPages:
        serviceLandingPagesModule.serviceLandingPagesToStrapiSeed(),
      mainNavigation: navigationModule.mainNavigationToStrapiSeed(),
      sitePages: sitePagesModule.sitePagesToStrapiSeed(),
    };
  }

  return null;
}

async function loadPayloadFromSeedFile() {
  const seedFilePath = path.resolve(process.cwd(), "scripts", "seed-data.json");

  if (!(await fileExists(seedFilePath))) {
    throw new Error(
      "Unable to locate seed defaults or scripts/seed-data.json for seeding.",
    );
  }

  const raw = await fs.readFile(seedFilePath, "utf8");
  return JSON.parse(raw);
}

async function loadStrategyMenuGroups() {
  const candidatePaths = [
    path.resolve(scriptDir, "../seed/strategy-menu.js"),
    path.resolve(scriptDir, "../seed/strategy-menu.js"),
  ];

  for (const candidatePath of candidatePaths) {
    if (!(await fileExists(candidatePath))) {
      continue;
    }

    const strategyModule = await import(pathToFileURL(candidatePath).href);

    return strategyModule.strategyMenuItems.map((group) => ({
      groupId: group.key,
      title: group.title,
      href: group.href,
      description: group.description,
      children: (group.children || []).map((item) => ({
        title: item.title,
        href: item.href,
        description: item.description,
      })),
    }));
  }

  return [];
}

async function loadDetailMap(prefix) {
  const candidatePaths = [
    path.resolve(scriptDir, "../seed/components/sections/v2/servicepage/ContentTab.js"),
    path.resolve(scriptDir, "../seed/components/sections/v2/servicepage/ContentTab.js"),
  ];

  for (const candidatePath of candidatePaths) {
    if (!(await fileExists(candidatePath))) {
      continue;
    }

    const source = await fs.readFile(candidatePath, "utf8");
    const details = {};
    const entryPattern =
      new RegExp(
        `"(?<href>\\/${prefix}\\/[^"]+)":\\s*{(?<body>[\\s\\S]*?)(?=\\n    "\\/${prefix}\\/|\\n  };\\n)`,
        "g",
      );
    const returnPattern =
      new RegExp(
        `if \\(href === "(?<href>\\/${prefix}\\/[^"]+)"\\) \\{\\s*return \\{(?<body>[\\s\\S]*?)\\n    };\\n  }`,
        "g",
      );

    for (const match of [
      ...source.matchAll(entryPattern),
      ...source.matchAll(returnPattern),
    ]) {
      const body = match.groups.body;
      const summaryMatch = body.match(/summary:\s*"((?:\\.|[^"\\])*)"/);
      const paragraphsMatch = body.match(/paragraphs:\s*\[([\s\S]*?)\]/);

      details[match.groups.href] = {
        description: summaryMatch?.[1]?.replace(/\\"/g, '"') || "",
        paragraphs: paragraphsMatch
          ? Array.from(
              paragraphsMatch[1].matchAll(/"((?:\\.|[^"\\])*)"/g),
              (paragraphMatch, index) => ({
                text: paragraphMatch[1].replace(/\\"/g, '"'),
                sortOrder: index + 1,
              }),
            )
          : [],
      };
    }

    return details;
  }

  return {};
}

function normalizeServiceHref(href = "") {
  return href.endsWith("/") ? href : `${href}/`;
}

function getDetailForHref(details, href = "") {
  return (
    details[href] ||
    details[href.replace(/\/$/, "")] ||
    details[normalizeServiceHref(href)] ||
    {}
  );
}

function enrichServiceItemDetails(item, details, groupTitle) {
  const href = normalizeServiceHref(item.href || "");
  const title = item.title || item.label || "This service";
  const detail = getDetailForHref(details, href);

  return {
    ...item,
    description:
      item.description ||
      detail.description ||
      `${title} support under ${groupTitle} helps teams improve delivery quality, day-to-day execution, and operational consistency.`,
    paragraphs:
      item.paragraphs?.length > 0
        ? item.paragraphs
        : detail.paragraphs?.length > 0
          ? detail.paragraphs
          : [
              {
                text:
                  detail.description ||
                  `${title} support under ${groupTitle} helps teams improve delivery quality, day-to-day execution, and operational consistency.`,
                sortOrder: 1,
              },
            ],
    children: (item.children || []).map((child) =>
      enrichServiceItemDetails(child, details, groupTitle),
    ),
  };
}

function enrichServicesPage(payload, details) {
  if (!payload?.servicesPage?.serviceGroups?.length) {
    return payload;
  }

  return {
    ...payload,
    servicesPage: {
      ...payload.servicesPage,
      serviceGroups: payload.servicesPage.serviceGroups.map(
        (group, groupIndex) => ({
          ...group,
          sortOrder: group.sortOrder ?? groupIndex + 1,
          children: (group.children || []).map((item, itemIndex) => ({
            ...enrichServiceItemDetails(item, details, group.title),
            sortOrder: item.sortOrder ?? itemIndex + 1,
            children: (item.children || []).map((child, childIndex) => ({
              ...enrichServiceItemDetails(
                child,
                details,
                group.title,
              ),
              sortOrder: child.sortOrder ?? childIndex + 1,
            })),
          })),
        }),
      ),
    },
  };
}

function enrichMenuGroups(menuGroups, details) {
  return menuGroups.map((group, groupIndex) => ({
    ...enrichServiceItemDetails(group, details, group.title),
    groupId: group.groupId || group.key || group.title,
    sortOrder: group.sortOrder ?? groupIndex + 1,
    children: (group.children || []).map((item, itemIndex) => ({
      ...enrichServiceItemDetails(item, details, group.title),
      sortOrder: item.sortOrder ?? itemIndex + 1,
    })),
  }));
}

async function enrichIndustriesAndStrategyPages(payload) {
  const [industryDetails, strategyDetails, strategyMenuGroups] =
    await Promise.all([
      loadDetailMap("industries"),
      loadDetailMap("strategy"),
      loadStrategyMenuGroups(),
    ]);

  return {
    ...payload,
    industriesPage: {
      menuGroups: enrichMenuGroups(defaultIndustryMenuGroups, industryDetails),
    },
    strategyPage: {
      menuGroups: enrichMenuGroups(strategyMenuGroups, strategyDetails),
    },
  };
}

async function writeSeedFile(payload) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
}

async function pushSeedPayload(payload) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}/api/seed`, {
    method: "POST",
    headers,
    body: JSON.stringify({ data: payload }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to push seed payload: ${response.status} ${body}`);
  }
}

async function upsertSingleType(strapi, uid, data) {
  const existing = await strapi.documents(uid).findFirst();

  if (existing?.documentId) {
    return strapi.documents(uid).update({
      documentId: existing.documentId,
      data,
      status: "published",
    });
  }

  return strapi.documents(uid).create({
    data,
    status: "published",
  });
}

async function upsertCollectionBySlug(strapi, uid, items = []) {
  for (const item of items) {
    const slug = item?.slug;

    if (!slug) {
      continue;
    }

    const existing = await strapi.documents(uid).findFirst({
      filters: { slug },
    });

    if (existing?.documentId) {
      await strapi.documents(uid).update({
        documentId: existing.documentId,
        data: item,
        status: "published",
      });
      continue;
    }

    await strapi.documents(uid).create({
      data: item,
      status: "published",
    });
  }
}

async function pushViaLocalStrapi(payload) {
  const { createRequire } = await import("node:module");
  const require = createRequire(import.meta.url);
  const { createStrapi } = require("@strapi/strapi");

  if (process.env.DATABASE_HOST === "sidago-postgres") {
    process.env.DATABASE_HOST =
      process.env.STRAPI_LOCAL_DATABASE_HOST || "127.0.0.1";
    process.env.DATABASE_PORT =
      process.env.STRAPI_LOCAL_DATABASE_PORT || "5343";
  }

  const strapi = createStrapi();

  await strapi.load();
  await upsertSingleType(strapi, "api::global.global", payload.global);
  await upsertSingleType(strapi, "api::homepage.homepage", payload.homepage);
  await upsertSingleType(strapi, "api::insight.insight", payload.insight);
  await upsertSingleType(
    strapi,
    "api::business-process.business-process",
    payload.businessProcess,
  );
  await upsertSingleType(
    strapi,
    "api::operation.operation",
    payload.operation,
  );
  await upsertSingleType(
    strapi,
    "api::infrastructure.infrastructure",
    payload.infrastructure,
  );
  await upsertSingleType(
    strapi,
    "api::performance.performance",
    payload.performance,
  );
  await upsertSingleType(
    strapi,
    "api::execution.execution",
    payload.execution,
  );
  await upsertSingleType(
    strapi,
    "api::services-page.services-page",
    payload.servicesPage,
  );
  await upsertSingleType(
    strapi,
    "api::industries-page.industries-page",
    payload.industriesPage,
  );
  await upsertSingleType(
    strapi,
    "api::strategy-page.strategy-page",
    payload.strategyPage,
  );
  await upsertSingleType(
    strapi,
    "api::careers-page.careers-page",
    payload.careersPage,
  );
  await upsertSingleType(
    strapi,
    "api::company-page.company-page",
    payload.companyPage,
  );
  await upsertSingleType(
    strapi,
    "api::contact-page.contact-page",
    payload.contactPage,
  );
  await upsertSingleType(strapi, "api::brand-page.brand-page", payload.brandPage);
  await upsertSingleType(
    strapi,
    "api::events-page.events-page",
    payload.eventsPage,
  );
  await upsertSingleType(
    strapi,
    "api::privacy-policy.privacy-policy",
    payload.privacyPolicy,
  );
  await upsertSingleType(
    strapi,
    "api::cookies-policy.cookies-policy",
    payload.cookiesPolicy,
  );
  await upsertSingleType(
    strapi,
    "api::modern-slavery-policy.modern-slavery-policy",
    payload.modernSlaveryPolicy,
  );
  await upsertSingleType(strapi, "api::legal-hub.legal-hub", payload.legalHub);
  await upsertCollectionBySlug(
    strapi,
    "api::service-landing-page.service-landing-page",
    payload.serviceLandingPages,
  );
  await upsertSingleType(
    strapi,
    "api::main-navigation.main-navigation",
    payload.mainNavigation,
  );
  await upsertCollectionBySlug(
    strapi,
    "api::site-page.site-page",
    payload.sitePages,
  );
}

async function loadBasePayload() {
  try {
    const fromDefaults = await loadPayloadFromSeedDefaults();
    if (fromDefaults) {
      return fromDefaults;
    }
  } catch (error) {
    process.stdout.write(
      `Warning: could not load seed defaults (${error.message}); falling back to scripts/seed-data.json.\n`,
    );
  }

  return loadPayloadFromSeedFile();
}

async function main() {
  const basePayload = await loadBasePayload();
  const servicesPayload = enrichServicesPage(
    basePayload,
    await loadDetailMap("services"),
  );
  const payload = await enrichIndustriesAndStrategyPages(servicesPayload);

  await writeSeedFile(payload);
  process.stdout.write(
    `Seed data exported to ${path.relative(process.cwd(), outputPath)}\n`,
  );

  if (!shouldPush) {
    return;
  }

  if (!token) {
    process.stdout.write(
      "STRAPI_SEED_TOKEN not set; pushing via public /api/seed endpoint.\n",
    );
  }

  let usedLocalFallback = false;

  try {
    await pushSeedPayload(payload);
  } catch (error) {
    const shouldUseLocalFallback =
      error instanceof Error &&
      (error.message.includes("404") ||
        error.message.includes("405") ||
        error.message.includes("500") ||
        error.message.includes("fetch failed"));

    if (!shouldUseLocalFallback) {
      throw error;
    }

    process.stdout.write(
      "Custom /api/seed endpoint unavailable; falling back to direct local Strapi upserts.\n",
    );
    await pushViaLocalStrapi(payload);
    usedLocalFallback = true;
  }

  process.stdout.write(
    `Seed data pushed and published at ${baseUrl}/api\n`,
  );

  if (usedLocalFallback) {
    process.exit(0);
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack}\n`);
  process.exit(1);
});
