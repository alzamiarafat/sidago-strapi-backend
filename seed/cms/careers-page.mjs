import * as careersDataModule from "../components/sections/v2/careers/data.js";
import { unwrapModule } from "./esm-compat.mjs";

const {
  careersCta,
  heroBanner,
  lifeSection,
  lifeStatsSection,
  quoteSection,
  statistics,
  teamTestimonialsSection,
  teamsSection,
  valuesFlipSection,
} = unwrapModule(careersDataModule);

export const defaultCareersPage = {
  hero: heroBanner,
  statistics,
  quoteSection,
  valuesFlipSection,
  teamsSection,
  teamTestimonialsSection,
  lifeSection,
  lifeStatsSection,
  cta: careersCta,
};

function sortByOrder(items) {
  return [...(items ?? [])].sort(
    (left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0),
  );
}

export function careersPageToStrapiSeed(page = defaultCareersPage) {
  const hero = page.hero ?? heroBanner;

  return {
    hero: {
      useVideo: hero.useVideo ?? false,
      imageSrc: hero.imageSrc ?? "",
      subtitle: hero.subtitle ?? "",
      videoSectionClass: hero.videoSectionClass ?? "",
      videoClass: hero.videoClass ?? "",
      fontWeight: hero.fontWeight ?? 400,
      lighterTheme: hero.lighterTheme ?? false,
      loop: hero.loop ?? false,
      lighterBgColor: hero.lighterBgColor ?? "bg-[#f0f1f1]",
      titles: sortByOrder(hero.titles),
    },
    heroCtaLabel: hero.ctaLabel ?? "",
    heroCtaHref: hero.ctaHref ?? "",
    heroCtaSrText: hero.ctaSrText ?? "",
    heroCtaButtonClass: hero.ctaButtonClass ?? "",
    statistics: sortByOrder(page.statistics).map((item) => ({
      stat: item.stat,
      labelLines: item.labelLines ?? [],
      width: item.width,
      activeDotColor: item.activeDotColor,
      sortOrder: item.sortOrder ?? 0,
    })),
    quoteSection: {
      quote: page.quoteSection?.quote ?? "",
      attribution: page.quoteSection?.attribution ?? "",
    },
    valuesTitle: page.valuesFlipSection?.title ?? "",
    valuesHeadingId: page.valuesFlipSection?.headingId ?? "",
    valuesItems: sortByOrder(page.valuesFlipSection?.items).map((item) => ({
      title: item.title,
      iconType: item.iconType,
      bullets: item.bullets ?? [],
      sortOrder: item.sortOrder ?? 0,
    })),
    teamsLead: page.teamsSection?.lead ?? "",
    teamsHighlight: page.teamsSection?.highlight ?? "",
    teamsHeadingId: page.teamsSection?.headingId ?? "",
    teamsItems: sortByOrder(page.teamsSection?.items).map((item) => ({
      title: item.title,
      description: item.description,
      hoverColor: item.hoverColor ?? "",
      imageSrc: item.image?.src ?? "",
      imageWidth: item.image?.width ?? 1152,
      imageHeight: item.image?.height ?? 1182,
      links: sortByOrder(item.links).map((link, index) => ({
        href: link.href,
        label: link.label,
        srText: link.srText ?? link.label,
        sortOrder: link.sortOrder ?? index + 1,
      })),
      sortOrder: item.sortOrder ?? 0,
    })),
    testimonialsTitle: page.teamTestimonialsSection?.title ?? "",
    testimonialsHeadingId: page.teamTestimonialsSection?.headingId ?? "",
    testimonialsClassName: page.teamTestimonialsSection?.className ?? "",
    testimonialsItems: sortByOrder(page.teamTestimonialsSection?.items).map(
      (item) => ({
        name: item.name,
        role: item.role,
        quote: item.quote,
        titleParts: item.titleParts ?? [],
        imageSrc: item.image?.src ?? "",
        imageWidth: item.image?.width ?? 1100,
        imageHeight: item.image?.height ?? 880,
        imageAlt: item.image?.alt ?? "",
        sortOrder: item.sortOrder ?? 0,
      }),
    ),
    lifeLead: page.lifeSection?.lead ?? "",
    lifeHighlight: page.lifeSection?.highlight ?? "",
    lifeHeadingId: page.lifeSection?.headingId ?? "",
    lifeDescription: page.lifeSection?.description ?? "",
    lifeStageLabel: page.lifeSection?.stage?.label ?? "",
    lifeStageFootTitle: page.lifeSection?.stage?.footTitle ?? "",
    lifeStageFootDescription: page.lifeSection?.stage?.footDescription ?? "",
    lifeStageStats: (page.lifeSection?.stage?.stats ?? []).map((item, index) => ({
      value: item.value ?? 0,
      suffix: item.suffix ?? "",
      label: item.label ?? "",
      sortOrder: index + 1,
    })),
    lifeStatsFontSizeMobile: page.lifeStatsSection?.fontSizeMobile ?? 28,
    lifeStatsFontSizeDesktop: page.lifeStatsSection?.fontSizeDesktop ?? 40,
    lifeStatsItems: sortByOrder(page.lifeStatsSection?.items).map((item) => ({
      stat: item.stat,
      label: item.label,
      width: item.width,
      activeDotColor: item.activeDotColor,
      sortOrder: item.sortOrder ?? 0,
    })),
    cta: sortByOrder(page.cta ?? careersCta).map((item, index) => ({
      title: item.title,
      description: item.description,
      href: item.href,
      srLabel: item.srLabel,
      backgroundColor: item.backgroundColor,
      sortOrder: item.sortOrder ?? index + 1,
    })),
  };
}
