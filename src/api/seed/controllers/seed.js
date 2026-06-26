"use strict";

async function upsertSingleType(uid, data) {
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

async function upsertCollectionBySlug(uid, items = []) {
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

module.exports = {
  async create(ctx) {
    const payload = ctx.request.body?.data;

    if (
      !payload?.global ||
      !payload?.homepage ||
      !payload?.insight ||
      !payload?.businessProcess ||
      !payload?.operation ||
      !payload?.infrastructure ||
      !payload?.performance ||
      !payload?.execution ||
      !payload?.servicesPage ||
      !payload?.industriesPage ||
      !payload?.strategyPage ||
      !payload?.careersPage ||
      !payload?.contactPage ||
      !payload?.brandPage ||
      !payload?.eventsPage ||
      !payload?.privacyPolicy ||
      !payload?.cookiesPolicy ||
      !payload?.modernSlaveryPolicy ||
      !payload?.legalHub ||
      !payload?.serviceLandingPages?.length ||
      !payload?.mainNavigation ||
      !payload?.sitePages?.length
    ) {
      ctx.throw(400, "Missing required seed payload.");
    }

    await upsertSingleType("api::global.global", payload.global);
    await upsertSingleType("api::homepage.homepage", payload.homepage);
    await upsertSingleType("api::insight.insight", payload.insight);
    await upsertSingleType(
      "api::business-process.business-process",
      payload.businessProcess,
    );
    await upsertSingleType("api::operation.operation", payload.operation);
    await upsertSingleType(
      "api::infrastructure.infrastructure",
      payload.infrastructure,
    );
    await upsertSingleType("api::performance.performance", payload.performance);
    await upsertSingleType("api::execution.execution", payload.execution);
    await upsertSingleType(
      "api::services-page.services-page",
      payload.servicesPage,
    );
    await upsertSingleType(
      "api::industries-page.industries-page",
      payload.industriesPage,
    );
    await upsertSingleType(
      "api::strategy-page.strategy-page",
      payload.strategyPage,
    );
    await upsertSingleType(
      "api::careers-page.careers-page",
      payload.careersPage,
    );
    if (payload?.companyPage) {
      await upsertSingleType(
        "api::company-page.company-page",
        payload.companyPage,
      );
    }
    await upsertSingleType(
      "api::contact-page.contact-page",
      payload.contactPage,
    );
    await upsertSingleType("api::brand-page.brand-page", payload.brandPage);
    await upsertSingleType("api::events-page.events-page", payload.eventsPage);
    await upsertSingleType(
      "api::privacy-policy.privacy-policy",
      payload.privacyPolicy,
    );
    await upsertSingleType(
      "api::cookies-policy.cookies-policy",
      payload.cookiesPolicy,
    );
    await upsertSingleType(
      "api::modern-slavery-policy.modern-slavery-policy",
      payload.modernSlaveryPolicy,
    );
    await upsertSingleType("api::legal-hub.legal-hub", payload.legalHub);
    await upsertCollectionBySlug(
      "api::service-landing-page.service-landing-page",
      payload.serviceLandingPages,
    );
    await upsertSingleType(
      "api::main-navigation.main-navigation",
      payload.mainNavigation,
    );
    await upsertCollectionBySlug(
      "api::site-page.site-page",
      payload.sitePages,
    );

    ctx.body = {
      data: {
        seeded: [
          "global",
          "homepage",
          "insight",
          "businessProcess",
          "operation",
          "infrastructure",
          "performance",
          "execution",
          "servicesPage",
          "industriesPage",
          "strategyPage",
          "careersPage",
          "companyPage",
          "contactPage",
          "brandPage",
          "eventsPage",
          "privacyPolicy",
          "cookiesPolicy",
          "modernSlaveryPolicy",
          "legalHub",
          "serviceLandingPages",
          "mainNavigation",
          "sitePages",
        ],
      },
    };
  },
};
