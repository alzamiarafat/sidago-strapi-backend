import * as digitalSupportDataModule from "../components/sections/v2/digital-support-services/data.js";
import * as globalWorkforceDataModule from "../components/sections/v2/global-workforce/data.js";
import * as globalReportContentsModule from "../components/sections/v2/global-workforce/reportContentsContent.js";
import * as scalableOperationsDataModule from "../components/sections/v2/scalable-operations/data.js";
import * as scalablePressReleaseModule from "../components/sections/v2/scalable-operations/pressReleaseContent.js";
import * as insightReportDataModule from "../components/sections/v2/insights/insightReportData.js";
import { unwrapModule } from "./esm-compat.mjs";

const {
  atAGlanceContent: digitalAtAGlance,
  reportContentsContent: digitalReportContents,
  similarInsightsContent: digitalSimilarInsights,
  subscribeContent: digitalSubscribe,
} = unwrapModule(digitalSupportDataModule);

const {
  atAGlanceContent: globalAtAGlance,
  reportInsightHero: globalHero,
  similarInsightsContent: globalSimilarInsights,
  subscribeContent: globalSubscribe,
} = unwrapModule(globalWorkforceDataModule);

const { reportContentsContent: globalReportContents } = unwrapModule(
  globalReportContentsModule,
);

const {
  atAGlanceContent: scalableAtAGlance,
  reportInsightHero: scalableHero,
  similarInsightsContent: scalableSimilarInsights,
  subscribeContent: scalableSubscribe,
} = unwrapModule(scalableOperationsDataModule);

const { pressReleaseContent: scalablePressRelease } = unwrapModule(
  scalablePressReleaseModule,
);

const {
  atAGlanceContent: insightAtAGlance,
  reportContentsContent: insightReportContents,
  reportInsightHero: insightHero,
  similarInsightsContent: insightSimilar,
  subscribeContent: insightSubscribe,
} = unwrapModule(insightReportDataModule);

const digitalSupportHero = {
  imageSrc: "/images/OTC-report-2025_svg.svg",
  imageAlt: "Digital Support Services",
  breadcrumbs: [
    {
      label: "Services",
      href: "/services",
      srText: "Services",
    },
    {
      label: "Digital Support",
      href: "/services/digital-support",
      srText: "Services › Digital Support",
    },
  ],
  title: "Digital Support Services",
  description:
    "Sidago delivers structured help desk, technical assistance, and customer operations so your organization stays responsive across channels—without overloading in-house staff.",
  date: "2026",
  category: "Support",
};

function sortByOrder(items = []) {
  return items.slice().sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0));
}

function mapBreadcrumbs(items = []) {
  return items.map((item, index) => ({
    label: item.label,
    href: item.href,
    srText: item.srText || item.label,
    sortOrder: index + 1,
  }));
}

function mapTags(items = []) {
  return (items || []).map((item, index) => ({
    label: item.label,
    href: item.href,
    srText: item.srText || item.label,
    sortOrder: index + 1,
  }));
}

function mapBullets(items = []) {
  return (items || []).map((item, index) => ({
    before: item.before || "",
    emphasis: item.emphasis || "",
    after: item.after || "",
    sortOrder: index + 1,
  }));
}

function mapInlineParts(parts = []) {
  return (parts || []).map((part, index) => ({
    partType: part.type || "text",
    value: part.value || "",
    href: part.href || "",
    strong: Boolean(part.strong),
    sortOrder: index + 1,
  }));
}

function mapParagraphToComponent(paragraph, index) {
  return {
    text: paragraph.text || "",
    strong: paragraph.strong || "",
    variant: paragraph.variant || "",
    parts: mapInlineParts(paragraph.parts),
    sortOrder: index + 1,
  };
}

function mapBlockToComponent(block, index) {
  if (block.type === "image") {
    return {
      __component: "shared.service-landing-report-image",
      src: block.src,
      alt: block.alt || "",
      previewSrc: block.previewSrc || "",
      previewTitle: block.previewTitle || "",
      previewWeek: block.previewWeek || "",
      previewSource: block.previewSource || "",
      previewTableOnly: Boolean(block.previewTableOnly),
      width: block.width,
      height: block.height,
      sortOrder: index + 1,
    };
  }

  return {
    __component: "shared.service-landing-report-paragraph",
    ...mapParagraphToComponent(block, index),
  };
}

function mapReportContents(content) {
  if (!content) return null;

  const mainSection = content.mainSection || {};
  const blocks = mainSection.blocks?.length
    ? mainSection.blocks.map(mapBlockToComponent)
    : [];
  const paragraphs = mainSection.paragraphs?.length
    ? mainSection.paragraphs.map(mapParagraphToComponent)
    : [];

  return {
    tableOfContents: (content.tableOfContents || []).map((item, index) => ({
      anchorId: item.id,
      label: item.label,
      srText: item.srText || item.label,
      sortOrder: index + 1,
    })),
    mainSectionId: mainSection.id || "",
    mainSectionTitle: mainSection.title || "",
    mainSectionParagraphs: paragraphs,
    mainSectionBlocks: blocks,
    mainSectionImage: mainSection.image
      ? {
          src: mainSection.image.src,
          alt: mainSection.image.alt || "",
          previewSrc: mainSection.image.previewSrc || "",
          previewTitle: mainSection.image.previewTitle || "",
          previewWeek: mainSection.image.previewWeek || "",
          previewSource: mainSection.image.previewSource || "",
          previewTableOnly: Boolean(mainSection.image.previewTableOnly),
          width: mainSection.image.width,
          height: mainSection.image.height,
        }
      : null,
    ctaSectionId: content.ctaSection?.id || "",
    ctaSectionTitle: content.ctaSection?.title || "",
    ctaSectionLabel: content.ctaSection?.label || "",
    ctaSectionHref: content.ctaSection?.href || "",
    ctaSectionSrText: content.ctaSection?.srText || "",
    disclaimers: (content.disclaimers || []).map((item, index) => ({
      text: item.text || "",
      href: item.href || "",
      linkLabel: item.linkLabel || "",
      textAfter: item.textAfter || "",
      sortOrder: index + 1,
    })),
  };
}

function mapSubscribe(content) {
  if (!content) return null;

  return {
    heading: content.heading,
    headingId: content.headingId,
    emailLabel: content.emailLabel,
    newslettersLabel: content.newslettersLabel,
    disclaimer: content.disclaimer,
    privacyPolicyHref: content.privacyPolicyHref,
    privacyPolicyLabel: content.privacyPolicyLabel,
    disclaimerSuffix: content.disclaimerSuffix,
    submitLabel: content.submitLabel,
    submitSrText: content.submitSrText,
    newsletterOptions: (content.newsletterOptions || []).map((item, index) => ({
      optionId: item.id,
      label: item.label,
      sortOrder: index + 1,
    })),
  };
}

function mapSimilarInsights(content, sectionBgColor = "") {
  if (!content) return null;

  return {
    heading: content.heading,
    headingId: content.headingId,
    desktopColumns: content.desktopColumns ?? 4,
    sectionBgColor: sectionBgColor || content.sectionBgColor || "",
    cards: (content.cards || []).map((card, index) => ({
      href: card.href,
      srText: card.srText,
      imageSrc: card.imageSrc,
      imageAlt: card.imageAlt,
      category: card.category,
      title: card.title,
      description: card.description,
      date: card.date,
      sortOrder: index + 1,
    })),
  };
}

function mapHero(hero) {
  if (!hero) return null;

  return {
    imageSrc: hero.imageSrc || "",
    imageAlt: hero.imageAlt || "",
    title: hero.title,
    description: hero.description || "",
    date: hero.date || "",
    category: hero.category || "",
    className: hero.className || "",
    metaTone: hero.metaTone || "",
    breadcrumbs: mapBreadcrumbs(hero.breadcrumbs || []),
    descriptionParts: mapInlineParts(hero.descriptionParts),
  };
}

function mapAtAGlance(content) {
  if (!content) return null;

  return {
    authorName: content.authorName || "",
    authorImageSrc: content.authorImageSrc || "",
    authorImageAlt: content.authorImageAlt || "",
    authorImageClassName: content.authorImageClassName || "",
    authorImageWrapperClassName: content.authorImageWrapperClassName || "",
    authorImageUnoptimized: Boolean(content.authorImageUnoptimized),
    heading: content.heading || "",
    headingId: content.headingId || "",
    body: content.body || "",
    sectionClassName: content.sectionClassName || "",
    tags: mapTags(content.tags),
    bullets: mapBullets(content.bullets),
  };
}

function mapPressRelease(content) {
  if (!content) return null;

  return {
    authorUseBrandLogo: Boolean(content.author?.useBrandLogo),
    blocks: (content.blocks || []).map(mapBlockToComponent),
  };
}

function buildPageSeed({ slug, title, hero, atAGlance, reportContents, pressRelease, subscribe, similarInsights, includePerformanceCarousel = false }) {
  return {
    slug,
    title,
    hero: mapHero(hero),
    atAGlance: mapAtAGlance(atAGlance),
    reportContents: mapReportContents(reportContents),
    pressRelease: mapPressRelease(pressRelease),
    subscribe: mapSubscribe(subscribe),
    similarInsights: mapSimilarInsights(similarInsights),
    includePerformanceCarousel,
  };
}

export const defaultDigitalSupportLandingPage = {
  slug: "digital-support",
  title: "Digital Support Services",
  hero: digitalSupportHero,
  atAGlance: digitalAtAGlance,
  reportContents: digitalReportContents,
  pressRelease: null,
  subscribe: digitalSubscribe,
  similarInsights: digitalSimilarInsights,
  includePerformanceCarousel: false,
};

export const defaultGlobalWorkforceLandingPage = {
  slug: "global-workforce-solutions",
  title: "Global Workforce Solutions",
  hero: globalHero,
  atAGlance: globalAtAGlance,
  reportContents: globalReportContents,
  pressRelease: null,
  subscribe: globalSubscribe,
  similarInsights: { ...globalSimilarInsights, sectionBgColor: "#FFFFFF" },
  includePerformanceCarousel: false,
};

export const defaultScalableOperationsLandingPage = {
  slug: "scalable-operations-management",
  title: "Scalable Operations Management",
  hero: scalableHero,
  atAGlance: scalableAtAGlance,
  reportContents: null,
  pressRelease: scalablePressRelease,
  subscribe: scalableSubscribe,
  similarInsights: { ...scalableSimilarInsights, sectionBgColor: "#070B09" },
  includePerformanceCarousel: true,
};

export const defaultInsightReportLandingPage = {
  slug: "insight-report",
  title: "Digital asset OTC market 2025",
  hero: insightHero,
  atAGlance: insightAtAGlance,
  reportContents: insightReportContents,
  pressRelease: null,
  subscribe: insightSubscribe,
  similarInsights: { ...insightSimilar, sectionBgColor: "#FFFFFF" },
  includePerformanceCarousel: false,
};

export const defaultServiceLandingPages = [
  defaultDigitalSupportLandingPage,
  defaultGlobalWorkforceLandingPage,
  defaultScalableOperationsLandingPage,
  defaultInsightReportLandingPage,
];

export function serviceLandingPageToStrapiSeed(page) {
  return buildPageSeed(page);
}

export function serviceLandingPagesToStrapiSeed(pages = defaultServiceLandingPages) {
  return pages.map(serviceLandingPageToStrapiSeed);
}

function normalizeInlineParts(parts = []) {
  return sortByOrder(parts)
    .map((part) => ({
      type: part.partType || "text",
      value: part.value,
      href: part.href || undefined,
      ...(part.partType === "link" && part.strong ? { strong: true } : {}),
    }))
    .filter((part) => part.value);
}

function normalizeParagraph(paragraph) {
  const parts = normalizeInlineParts(paragraph.parts);
  return {
    ...(paragraph.variant ? { variant: paragraph.variant } : {}),
    ...(paragraph.strong ? { strong: paragraph.strong } : {}),
    ...(paragraph.text ? { text: paragraph.text } : {}),
    ...(parts.length ? { parts } : {}),
  };
}

function normalizeBlock(component) {
  if (component.__component === "shared.service-landing-report-image") {
    return {
      type: "image",
      src: component.src,
      alt: component.alt,
      previewSrc: component.previewSrc || undefined,
      previewTitle: component.previewTitle || undefined,
      previewWeek: component.previewWeek || undefined,
      previewSource: component.previewSource || undefined,
      previewTableOnly: component.previewTableOnly || undefined,
      width: component.width || undefined,
      height: component.height || undefined,
    };
  }

  return {
    type: "paragraph",
    ...normalizeParagraph(component),
  };
}

function normalizeReportContents(content, fallback) {
  if (!content) return fallback;

  const blocks = (content.mainSectionBlocks || []).map(normalizeBlock);
  const paragraphs = sortByOrder(content.mainSectionParagraphs || []).map(
    normalizeParagraph,
  );

  return {
    tableOfContents: sortByOrder(content.tableOfContents || []).map((item) => ({
      id: item.anchorId,
      label: item.label,
      srText: item.srText || item.label,
    })),
    mainSection: {
      id: content.mainSectionId || fallback?.mainSection?.id || "",
      title: content.mainSectionTitle || fallback?.mainSection?.title || "",
      ...(blocks.length ? { blocks } : {}),
      ...(!blocks.length && paragraphs.length ? { paragraphs } : {}),
      ...(!blocks.length && content.mainSectionImage?.src
        ? {
            image: {
              src: content.mainSectionImage.src,
              alt: content.mainSectionImage.alt,
              previewSrc: content.mainSectionImage.previewSrc || undefined,
              previewTitle: content.mainSectionImage.previewTitle || undefined,
              previewWeek: content.mainSectionImage.previewWeek || undefined,
              previewSource: content.mainSectionImage.previewSource || undefined,
              previewTableOnly:
                content.mainSectionImage.previewTableOnly || undefined,
              width: content.mainSectionImage.width || undefined,
              height: content.mainSectionImage.height || undefined,
            },
          }
        : {}),
    },
    ...(content.ctaSectionTitle
      ? {
          ctaSection: {
            id: content.ctaSectionId,
            title: content.ctaSectionTitle,
            label: content.ctaSectionLabel,
            href: content.ctaSectionHref,
            srText: content.ctaSectionSrText,
          },
        }
      : {}),
    disclaimers: sortByOrder(content.disclaimers || []).map((item) => ({
      text: item.text || undefined,
      href: item.href || undefined,
      linkLabel: item.linkLabel || undefined,
      textAfter: item.textAfter || undefined,
    })),
  };
}

function normalizeSubscribe(content, fallback) {
  if (!content) return fallback;

  return {
    heading: content.heading || fallback?.heading,
    headingId: content.headingId || fallback?.headingId,
    emailLabel: content.emailLabel || fallback?.emailLabel,
    newslettersLabel: content.newslettersLabel || fallback?.newslettersLabel,
    disclaimer: content.disclaimer || fallback?.disclaimer,
    privacyPolicyHref: content.privacyPolicyHref || fallback?.privacyPolicyHref,
    privacyPolicyLabel:
      content.privacyPolicyLabel || fallback?.privacyPolicyLabel,
    disclaimerSuffix: content.disclaimerSuffix || fallback?.disclaimerSuffix,
    submitLabel: content.submitLabel || fallback?.submitLabel,
    submitSrText: content.submitSrText || fallback?.submitSrText,
    newsletterOptions: sortByOrder(content.newsletterOptions || []).map(
      (item, index) => ({
        id: item.optionId || fallback?.newsletterOptions?.[index]?.id,
        label: item.label || fallback?.newsletterOptions?.[index]?.label,
      }),
    ),
  };
}

function normalizeSimilarInsights(content, fallback) {
  if (!content) return fallback;

  return {
    heading: content.heading || fallback?.heading,
    headingId: content.headingId || fallback?.headingId,
    desktopColumns: content.desktopColumns ?? fallback?.desktopColumns ?? 4,
    sectionBgColor: content.sectionBgColor || fallback?.sectionBgColor || "",
    cards: sortByOrder(content.cards || []).map((card, index) => ({
      href: card.href || fallback?.cards?.[index]?.href,
      srText: card.srText || fallback?.cards?.[index]?.srText,
      imageSrc: card.imageSrc || fallback?.cards?.[index]?.imageSrc,
      imageAlt: card.imageAlt || fallback?.cards?.[index]?.imageAlt,
      category: card.category || fallback?.cards?.[index]?.category,
      title: card.title || fallback?.cards?.[index]?.title,
      description: card.description || fallback?.cards?.[index]?.description,
      date: card.date || fallback?.cards?.[index]?.date,
    })),
  };
}

function normalizeHero(content, fallback) {
  if (!content) return fallback;

  return {
    imageSrc: content.imageSrc || fallback?.imageSrc,
    imageAlt: content.imageAlt || fallback?.imageAlt,
    title: content.title || fallback?.title,
    description: content.description || fallback?.description,
    date: content.date || fallback?.date,
    category: content.category || fallback?.category,
    className: content.className || fallback?.className,
    metaTone: content.metaTone || fallback?.metaTone,
    descriptionParts: content.descriptionParts?.length
      ? normalizeInlineParts(content.descriptionParts)
      : fallback?.descriptionParts,
    breadcrumbs: sortByOrder(content.breadcrumbs || []).map((item, index) => ({
      label: item.label || fallback?.breadcrumbs?.[index]?.label,
      href: item.href || fallback?.breadcrumbs?.[index]?.href,
      srText: item.srText || fallback?.breadcrumbs?.[index]?.srText,
    })),
  };
}

function normalizeAtAGlance(content, fallback) {
  if (!content) return fallback;

  return {
    authorName: content.authorName || fallback?.authorName,
    authorImageSrc: content.authorImageSrc || fallback?.authorImageSrc,
    authorImageAlt: content.authorImageAlt || fallback?.authorImageAlt,
    authorImageClassName:
      content.authorImageClassName || fallback?.authorImageClassName,
    authorImageWrapperClassName:
      content.authorImageWrapperClassName ||
      fallback?.authorImageWrapperClassName,
    authorImageUnoptimized:
      content.authorImageUnoptimized ?? fallback?.authorImageUnoptimized,
    heading: content.heading || fallback?.heading,
    headingId: content.headingId || fallback?.headingId,
    body: content.body || fallback?.body,
    sectionClassName: content.sectionClassName || fallback?.sectionClassName,
    tags: sortByOrder(content.tags || []).map((tag, index) => ({
      label: tag.label || fallback?.tags?.[index]?.label,
      href: tag.href || fallback?.tags?.[index]?.href,
      srText: tag.srText || fallback?.tags?.[index]?.srText,
    })),
    bullets: sortByOrder(content.bullets || []).map((bullet, index) => ({
      before: bullet.before || fallback?.bullets?.[index]?.before,
      emphasis: bullet.emphasis || fallback?.bullets?.[index]?.emphasis,
      after: bullet.after || fallback?.bullets?.[index]?.after,
    })),
  };
}

function normalizePressRelease(content, fallback) {
  if (!content) return fallback;

  return {
    author: {
      useBrandLogo:
        content.authorUseBrandLogo ?? fallback?.author?.useBrandLogo ?? false,
    },
    blocks: (content.blocks || []).map(normalizeBlock),
  };
}

export function normalizeServiceLandingPageFromStrapi(item, fallback) {
  if (!item) return fallback;

  return {
    slug: item.slug || fallback.slug,
    title: item.title || fallback.title,
    hero: normalizeHero(item.hero, fallback.hero),
    atAGlance: normalizeAtAGlance(item.atAGlance, fallback.atAGlance),
    reportContents: normalizeReportContents(
      item.reportContents,
      fallback.reportContents,
    ),
    pressRelease: normalizePressRelease(item.pressRelease, fallback.pressRelease),
    subscribe: normalizeSubscribe(item.subscribe, fallback.subscribe),
    similarInsights: normalizeSimilarInsights(
      item.similarInsights,
      fallback.similarInsights,
    ),
    includePerformanceCarousel:
      item.includePerformanceCarousel ?? fallback.includePerformanceCarousel,
  };
}

export function getDefaultServiceLandingPage(slug) {
  return (
    defaultServiceLandingPages.find((page) => page.slug === slug) ||
    defaultDigitalSupportLandingPage
  );
}
