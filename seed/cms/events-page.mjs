import * as eventsDataModule from "../components/sections/v2/events/data.js";
import {
  bootcampSection,
  endpointSection,
  pastConversationsSection,
  pastSpeakers,
} from "../components/sections/v2/events/content.mjs";
import { defaultHomepage } from "./defaults.mjs";
import { unwrapModule } from "./esm-compat.mjs";

const {
  buildHeroTitlesFromLines,
  eventsHero,
  upcomingEvents,
  upcomingEventsSection,
} = unwrapModule(eventsDataModule);

export const defaultEventsPage = {
  hero: {
    subtitle: eventsHero.subtitle,
    videoSrc: eventsHero.videoSrc,
    imageSrc: eventsHero.imageSrc || "",
    useVideo: eventsHero.useVideo,
    videoSectionClass: eventsHero.videoSectionClass || "",
    videoClass: eventsHero.videoClass || "",
    fontWeight: eventsHero.fontWeight ?? 400,
    lighterTheme: eventsHero.lighterTheme ?? false,
    loop: eventsHero.loop ?? true,
    lighterBgColor: eventsHero.lighterBgColor || "bg-[#f0f1f1]",
    syncBackgroundColor: eventsHero.syncBackgroundColor ?? false,
    titles: buildHeroTitlesFromLines(
      eventsHero.titleLines,
      eventsHero.accentColor,
    ),
  },
  accentColor: eventsHero.accentColor,
  backgroundClassName: eventsHero.backgroundClassName,
  videoClass: eventsHero.videoClass,
  pageContent: {
    upcomingEvents,
    upcomingEventsSection,
    endpointSection,
    pastSpeakers,
    pastConversationsSection,
    bootcampSection,
    cta: defaultHomepage.cta,
  },
};

function mapEventCards(events = []) {
  return events.map((event, index) => ({
    externalId: event.id,
    href: event.href,
    srText: event.srText,
    imageSrc: event.imageSrc,
    imageAlt: event.imageAlt,
    role: event.role,
    location: event.location,
    title: event.title,
    dateStart: event.dateStart,
    dateEnd: event.dateEnd || "",
    theme: event.theme,
    sortOrder: index + 1,
  }));
}

function mapSpeakers(speakers = []) {
  return speakers.map((speaker, index) => ({
    externalId: speaker.id,
    name: speaker.name,
    company: speaker.company,
    imageAlt: speaker.imageAlt,
    imageSrc: speaker.imageSrc,
    sortOrder: index + 1,
  }));
}

function mapMediaItems(items = []) {
  return items.map((item, index) => ({
    externalId: item.id,
    href: item.href,
    imageAlt: item.imageAlt,
    imageSrc: item.imageSrc,
    category: item.category,
    title: item.title,
    date: item.date,
    sortOrder: index + 1,
  }));
}

function mapStats(stats = []) {
  return stats.map((stat, index) => ({
    externalId: stat.id,
    label: stat.label,
    value: stat.value,
    width: stat.width,
    activeDotColor: stat.activeDotColor,
    sortOrder: index + 1,
  }));
}

function mapShowcasePanels(panels = []) {
  return panels.map((panel, index) => ({
    externalId: panel.id,
    title: panel.title,
    headline: panel.headline,
    description: panel.description,
    accent: panel.accent,
    highlightValue: panel.highlight?.value || "",
    highlightLabel: panel.highlight?.label || "",
    sortOrder: index + 1,
  }));
}

function mapCtaItems(items = []) {
  return items.map((item, index) => ({
    title: item.title,
    description: item.description,
    href: item.href,
    srLabel: item.srLabel,
    backgroundColor: item.backgroundColor || "",
    sortOrder: index + 1,
  }));
}

export function eventsPageToStrapiSeed(page = defaultEventsPage) {
  const { pageContent } = page;
  const { upcomingEventsSection: upcoming, endpointSection, pastConversationsSection, bootcampSection: bootcamp } = pageContent;

  return {
    hero: page.hero,
    accentColor: page.accentColor,
    backgroundClassName: page.backgroundClassName,
    videoClass: page.videoClass,
    upcomingHeadingId: upcoming.headingId,
    upcomingHeading: upcoming.heading,
    upcomingHeadingClassName: upcoming.headingClassName,
    upcomingDividerClassName: upcoming.dividerClassName,
    upcomingDesktopColumns: upcoming.desktopColumns,
    upcomingMobileInitialCount: upcoming.mobileInitialCount,
    upcomingEvents: mapEventCards(pageContent.upcomingEvents),
    endpointIntroHeadingId: endpointSection.intro.headingId,
    endpointIntroTitleBefore: endpointSection.intro.titleBefore,
    endpointIntroTitleHighlight: endpointSection.intro.titleHighlight,
    endpointIntroDescription: endpointSection.intro.description,
    endpointIntroLogoSrc: endpointSection.intro.logoSrc,
    endpointIntroLogoAlt: endpointSection.intro.logoAlt,
    endpointStats: mapStats(endpointSection.stats),
    endpointShowcaseHeadingId: endpointSection.showcase.headingId,
    endpointShowcaseTitleBefore: endpointSection.showcase.titleBefore,
    endpointShowcaseTitleHighlight: endpointSection.showcase.titleHighlight,
    endpointShowcaseEyebrow: endpointSection.showcase.eyebrow,
    endpointShowcaseSubtitle: endpointSection.showcase.subtitle,
    endpointShowcasePanels: mapShowcasePanels(endpointSection.showcase.panels),
    endpointCoHostTitle: endpointSection.coHost.title,
    endpointCoHostDescription: endpointSection.coHost.description,
    endpointCoHostCtaLabel: endpointSection.coHost.ctaLabel,
    endpointCoHostCtaHref: endpointSection.coHost.ctaHref,
    pastSpeakers: mapSpeakers(pageContent.pastSpeakers),
    pastConversationsHeadingId: pastConversationsSection.headingId,
    pastConversationsTitleHighlight: pastConversationsSection.titleHighlight,
    pastConversationsTitleAfter: pastConversationsSection.titleAfter,
    pastConversationsDescription: pastConversationsSection.description,
    pastConversationsMobileInitialCount:
      pastConversationsSection.mobileInitialCount,
    pastConversationsItems: mapMediaItems(pastConversationsSection.items),
    bootcampHeadingId: bootcamp.headingId,
    bootcampHeading: bootcamp.heading,
    bootcampTitle: bootcamp.title,
    bootcampDescription: bootcamp.description,
    bootcampCtaLabel: bootcamp.ctaLabel,
    bootcampCtaHref: bootcamp.ctaHref,
    bootcampImageSrc: bootcamp.imageSrc,
    bootcampImageAlt: bootcamp.imageAlt,
    cta: mapCtaItems(pageContent.cta),
  };
}

function sortByOrder(items = []) {
  return items.slice().sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0));
}

export function normalizeEventsPageFromStrapi(item) {
  if (!item) {
    return defaultEventsPage;
  }

  const fallback = defaultEventsPage.pageContent;

  const pageContent = {
    upcomingEventsSection: {
      headingId: item.upcomingHeadingId || fallback.upcomingEventsSection.headingId,
      heading: item.upcomingHeading || fallback.upcomingEventsSection.heading,
      headingClassName:
        item.upcomingHeadingClassName ||
        fallback.upcomingEventsSection.headingClassName,
      dividerClassName:
        item.upcomingDividerClassName ||
        fallback.upcomingEventsSection.dividerClassName,
      desktopColumns:
        item.upcomingDesktopColumns ??
        fallback.upcomingEventsSection.desktopColumns,
      mobileInitialCount:
        item.upcomingMobileInitialCount ??
        fallback.upcomingEventsSection.mobileInitialCount,
    },
    upcomingEvents:
      item.upcomingEvents?.length > 0
        ? sortByOrder(item.upcomingEvents).map((event, index) => ({
            id: event.externalId || fallback.upcomingEvents[index]?.id || "",
            href: event.href || fallback.upcomingEvents[index]?.href || "",
            srText: event.srText || fallback.upcomingEvents[index]?.srText || "",
            imageSrc:
              event.imageSrc || fallback.upcomingEvents[index]?.imageSrc || "",
            imageAlt:
              event.imageAlt || fallback.upcomingEvents[index]?.imageAlt || "",
            role: event.role || fallback.upcomingEvents[index]?.role || "",
            location:
              event.location || fallback.upcomingEvents[index]?.location || "",
            title: event.title || fallback.upcomingEvents[index]?.title || "",
            dateStart:
              event.dateStart || fallback.upcomingEvents[index]?.dateStart || "",
            dateEnd: event.dateEnd || fallback.upcomingEvents[index]?.dateEnd,
            theme: event.theme || fallback.upcomingEvents[index]?.theme || "mid",
          }))
        : fallback.upcomingEvents,
    endpointSection: {
      intro: {
        headingId:
          item.endpointIntroHeadingId || fallback.endpointSection.intro.headingId,
        titleBefore:
          item.endpointIntroTitleBefore ||
          fallback.endpointSection.intro.titleBefore,
        titleHighlight:
          item.endpointIntroTitleHighlight ||
          fallback.endpointSection.intro.titleHighlight,
        description:
          item.endpointIntroDescription ||
          fallback.endpointSection.intro.description,
        logoSrc:
          item.endpointIntroLogoSrc || fallback.endpointSection.intro.logoSrc,
        logoAlt:
          item.endpointIntroLogoAlt || fallback.endpointSection.intro.logoAlt,
      },
      stats:
        item.endpointStats?.length > 0
          ? sortByOrder(item.endpointStats).map((stat, index) => ({
              id: stat.externalId || fallback.endpointSection.stats[index]?.id || "",
              label: stat.label || fallback.endpointSection.stats[index]?.label || "",
              value: stat.value || fallback.endpointSection.stats[index]?.value || "",
              width: stat.width ?? fallback.endpointSection.stats[index]?.width,
              activeDotColor:
                stat.activeDotColor ||
                fallback.endpointSection.stats[index]?.activeDotColor,
            }))
          : fallback.endpointSection.stats,
      showcase: {
        headingId:
          item.endpointShowcaseHeadingId ||
          fallback.endpointSection.showcase.headingId,
        titleBefore:
          item.endpointShowcaseTitleBefore ||
          fallback.endpointSection.showcase.titleBefore,
        titleHighlight:
          item.endpointShowcaseTitleHighlight ||
          fallback.endpointSection.showcase.titleHighlight,
        eyebrow:
          item.endpointShowcaseEyebrow ||
          fallback.endpointSection.showcase.eyebrow,
        subtitle:
          item.endpointShowcaseSubtitle ||
          fallback.endpointSection.showcase.subtitle,
        panels:
          item.endpointShowcasePanels?.length > 0
            ? sortByOrder(item.endpointShowcasePanels).map((panel, index) => ({
                id:
                  panel.externalId ||
                  fallback.endpointSection.showcase.panels[index]?.id ||
                  "",
                title:
                  panel.title ||
                  fallback.endpointSection.showcase.panels[index]?.title ||
                  "",
                headline:
                  panel.headline ||
                  fallback.endpointSection.showcase.panels[index]?.headline ||
                  "",
                description:
                  panel.description ||
                  fallback.endpointSection.showcase.panels[index]?.description ||
                  "",
                accent:
                  panel.accent ||
                  fallback.endpointSection.showcase.panels[index]?.accent ||
                  "",
                highlight: {
                  value:
                    panel.highlightValue ||
                    fallback.endpointSection.showcase.panels[index]?.highlight
                      ?.value ||
                    "",
                  label:
                    panel.highlightLabel ||
                    fallback.endpointSection.showcase.panels[index]?.highlight
                      ?.label ||
                    "",
                },
              }))
            : fallback.endpointSection.showcase.panels,
      },
      coHost: {
        title:
          item.endpointCoHostTitle || fallback.endpointSection.coHost.title,
        description:
          item.endpointCoHostDescription ||
          fallback.endpointSection.coHost.description,
        ctaLabel:
          item.endpointCoHostCtaLabel ||
          fallback.endpointSection.coHost.ctaLabel,
        ctaHref:
          item.endpointCoHostCtaHref || fallback.endpointSection.coHost.ctaHref,
      },
    },
    pastSpeakers:
      item.pastSpeakers?.length > 0
        ? sortByOrder(item.pastSpeakers).map((speaker, index) => ({
            id: speaker.externalId || fallback.pastSpeakers[index]?.id || "",
            name: speaker.name || fallback.pastSpeakers[index]?.name || "",
            company:
              speaker.company || fallback.pastSpeakers[index]?.company || "",
            imageAlt:
              speaker.imageAlt || fallback.pastSpeakers[index]?.imageAlt || "",
            imageSrc:
              speaker.imageSrc || fallback.pastSpeakers[index]?.imageSrc || "",
          }))
        : fallback.pastSpeakers,
    pastConversationsSection: {
      headingId:
        item.pastConversationsHeadingId ||
        fallback.pastConversationsSection.headingId,
      titleHighlight:
        item.pastConversationsTitleHighlight ||
        fallback.pastConversationsSection.titleHighlight,
      titleAfter:
        item.pastConversationsTitleAfter ||
        fallback.pastConversationsSection.titleAfter,
      description:
        item.pastConversationsDescription ||
        fallback.pastConversationsSection.description,
      mobileInitialCount:
        item.pastConversationsMobileInitialCount ??
        fallback.pastConversationsSection.mobileInitialCount,
      items:
        item.pastConversationsItems?.length > 0
          ? sortByOrder(item.pastConversationsItems).map((media, index) => ({
              id:
                media.externalId ||
                fallback.pastConversationsSection.items[index]?.id ||
                "",
              href:
                media.href ||
                fallback.pastConversationsSection.items[index]?.href ||
                "",
              imageAlt:
                media.imageAlt ||
                fallback.pastConversationsSection.items[index]?.imageAlt ||
                "",
              imageSrc:
                media.imageSrc ||
                fallback.pastConversationsSection.items[index]?.imageSrc ||
                "",
              category:
                media.category ||
                fallback.pastConversationsSection.items[index]?.category ||
                "",
              title:
                media.title ||
                fallback.pastConversationsSection.items[index]?.title ||
                "",
              date:
                media.date ||
                fallback.pastConversationsSection.items[index]?.date ||
                "",
            }))
          : fallback.pastConversationsSection.items,
    },
    bootcampSection: {
      headingId: item.bootcampHeadingId || fallback.bootcampSection.headingId,
      heading: item.bootcampHeading || fallback.bootcampSection.heading,
      title: item.bootcampTitle || fallback.bootcampSection.title,
      description:
        item.bootcampDescription || fallback.bootcampSection.description,
      ctaLabel: item.bootcampCtaLabel || fallback.bootcampSection.ctaLabel,
      ctaHref: item.bootcampCtaHref || fallback.bootcampSection.ctaHref,
      imageSrc: item.bootcampImageSrc || fallback.bootcampSection.imageSrc,
      imageAlt: item.bootcampImageAlt || fallback.bootcampSection.imageAlt,
    },
    cta:
      item.cta?.length > 0
        ? sortByOrder(item.cta).map((ctaItem, index) => ({
            title: ctaItem.title,
            description: ctaItem.description,
            href: ctaItem.href,
            srLabel: ctaItem.srLabel,
            backgroundColor: ctaItem.backgroundColor,
          }))
        : fallback.cta,
  };

  return {
    accentColor: item.accentColor || defaultEventsPage.accentColor,
    backgroundClassName:
      item.backgroundClassName || defaultEventsPage.backgroundClassName,
    videoClass: item.videoClass || defaultEventsPage.videoClass,
    pageContent,
  };
}
