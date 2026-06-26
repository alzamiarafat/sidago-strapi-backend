"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NEWSLETTER_IDS = new Set(["market-updates", "research-insights"]);
const UID = "api::newsletter-subscription.newsletter-subscription";

function normalizePayload(body) {
  const raw = body?.data ?? body ?? {};
  const email = String(raw.email ?? "")
    .trim()
    .toLowerCase();
  const newsletters = Array.isArray(raw.newsletters) ? raw.newsletters : [];
  const sourcePage = String(raw.sourcePage ?? "").trim();

  return { email, newsletters, sourcePage };
}

function mapNewsletters(newsletters) {
  return {
    marketUpdates: newsletters.includes("market-updates"),
    researchInsights: newsletters.includes("research-insights"),
  };
}

function mergeNewsletters(existing, incoming) {
  return {
    marketUpdates: existing.marketUpdates || incoming.marketUpdates,
    researchInsights: existing.researchInsights || incoming.researchInsights,
  };
}

function validatePayload({ email, newsletters }) {
  if (!email) {
    return "Email is required.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    return "Please enter a valid email address.";
  }

  const validNewsletters = newsletters.filter((id) => NEWSLETTER_IDS.has(id));

  if (!validNewsletters.length) {
    return "Please select at least one newsletter.";
  }

  return null;
}

module.exports = createCoreController(UID, ({ strapi }) => ({
  async subscribe(ctx) {
    const payload = normalizePayload(ctx.request.body);
    const validationError = validatePayload(payload);

    if (validationError) {
      return ctx.badRequest(validationError);
    }

    const newsletterFlags = mapNewsletters(payload.newsletters);
    const existing = await strapi.documents(UID).findFirst({
      filters: { email: payload.email },
    });

    let entry;

    if (existing?.documentId) {
      entry = await strapi.documents(UID).update({
        documentId: existing.documentId,
        data: {
          ...mergeNewsletters(existing, newsletterFlags),
          ...(payload.sourcePage ? { sourcePage: payload.sourcePage } : {}),
        },
      });
    } else {
      entry = await strapi.documents(UID).create({
        data: {
          email: payload.email,
          ...newsletterFlags,
          ...(payload.sourcePage ? { sourcePage: payload.sourcePage } : {}),
        },
      });
    }

    ctx.body = {
      data: {
        id: entry.documentId ?? entry.id,
        email: payload.email,
        marketUpdates: entry.marketUpdates,
        researchInsights: entry.researchInsights,
      },
    };
  },
}));
