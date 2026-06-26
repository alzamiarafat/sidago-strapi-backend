import { COMPANY_BUSINESS_LINES } from "../components/sections/v2/company/companyBusinessLines.js";
import { COMPANY_EXECUTIVE_TEAM } from "../components/sections/v2/company/companyExecutiveTeam.js";
import {
  COMPANY_CAREERS_GALLERY,
  COMPANY_CAREERS_LINKS,
} from "../components/sections/v2/company/companyExploreCareers.js";
import { companyLatestNewsContent } from "../components/sections/v2/company/companyLatestNews.js";

function sortByOrder(items) {
  return [...(items ?? [])].sort(
    (left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0),
  );
}

export const defaultCompanyPage = {
  hero: {
    useVideo: true,
    videoSrc: "/media/company-1280w.mp4",
    videoClass: "company-hero-video",
    loop: true,
    titles: [
      { title: "Building the future of ", sortOrder: 0 },
      {
        title: "decentralized finance",
        className: "text-[#00F554]",
        sortOrder: 1,
      },
    ],
    subtitle:
      "Learn about a leading algorithmic trading firm and builder advancing the decentralized world",
  },
  whatWeDo: {
    headingBefore: "What ",
    headingHighlight: "Sidago",
    headingAfter: " does",
    headingId: "what-sidago-does",
    intro:
      "Sidago delivers integrated operational, strategic, and digital support that helps organizations scale with more control and consistency. Our core capabilities include:",
    businessLines: COMPANY_BUSINESS_LINES,
  },
  quoteSection: {
    quote:
      "All of our businesses are built around our core expertise - trading technology and liquidity provision. All of our businesses are designed to be highly complementary and enhance each other and it is our objective to be the market leader in every business we operate.",
    attribution: "Evgeny Gaevoy, founder and CEO of Sidago Group",
  },
  executiveTeam: {
    title: "Meet the executive team",
    headingId: "meet-the-executive-team",
    items: COMPANY_EXECUTIVE_TEAM,
  },
  exploreCareers: {
    title: "Explore Sidago careers",
    headingId: "explore-sidago-careers",
    images: COMPANY_CAREERS_GALLERY,
    links: COMPANY_CAREERS_LINKS,
  },
  latestNews: companyLatestNewsContent,
  eventsPromo: {
    title: "Meet the Sidago team",
    description:
      "Join us at industry conferences and Sidago's exclusive events near you.",
    ctaHref: "/events",
    ctaLabel: "Explore events",
    ctaSrText: "Events",
  },
  cta: [
    {
      title: "Contact",
      description: "To access top crypto liquidity",
      href: "/contact",
      srLabel: "Contact",
      backgroundColor: "#FF5D3C",
      sortOrder: 1,
    },
    {
      title: "Subscribe",
      description: "To get the latest insights",
      href: "/insights/subscribe",
      srLabel: "Insights › Subscribe",
      backgroundColor: "#FA7248",
      sortOrder: 2,
    },
    {
      title: "Apply",
      description: "To join the Sidago team",
      href: "/company/opportunities",
      srLabel: "Company › Opportunities",
      backgroundColor: "#FF8C69",
      sortOrder: 3,
    },
  ],
};

export function companyPageToStrapiSeed(page = defaultCompanyPage) {
  const hero = page.hero ?? defaultCompanyPage.hero;
  const whatWeDo = page.whatWeDo ?? defaultCompanyPage.whatWeDo;
  const quoteSection = page.quoteSection ?? defaultCompanyPage.quoteSection;
  const executiveTeam = page.executiveTeam ?? defaultCompanyPage.executiveTeam;
  const exploreCareers = page.exploreCareers ?? defaultCompanyPage.exploreCareers;
  const latestNews = page.latestNews ?? defaultCompanyPage.latestNews;
  const eventsPromo = page.eventsPromo ?? defaultCompanyPage.eventsPromo;

  return {
    hero: {
      useVideo: hero.useVideo ?? true,
      imageSrc: hero.imageSrc ?? "",
      subtitle: hero.subtitle ?? "",
      videoSectionClass: hero.videoSectionClass ?? "",
      videoClass: hero.videoClass ?? "",
      fontWeight: hero.fontWeight ?? 400,
      lighterTheme: hero.lighterTheme ?? false,
      loop: hero.loop ?? true,
      lighterBgColor: hero.lighterBgColor ?? "bg-[#f0f1f1]",
      videoSrc: hero.videoSrc ?? "",
      titles: sortByOrder(hero.titles),
    },
    whatWeDoHeadingBefore: whatWeDo.headingBefore ?? "",
    whatWeDoHeadingHighlight: whatWeDo.headingHighlight ?? "",
    whatWeDoHeadingAfter: whatWeDo.headingAfter ?? "",
    whatWeDoHeadingId: whatWeDo.headingId ?? "",
    whatWeDoIntro: whatWeDo.intro ?? "",
    businessLines: sortByOrder(whatWeDo.businessLines).map((line, index) => ({
      lineId: line.id ?? `line-${index + 1}`,
      srOnly: line.srOnly ?? line.title ?? "",
      href: line.href ?? "",
      colSpan: line.colSpan ?? "col-span-6",
      cardClassName: line.cardClassName ?? "bg-gray-defi-ash text-gray-off-white",
      title: line.title ?? "",
      description: line.description ?? "",
      decoration:
        line.decoration === "algorithmic" || line.decoration === "otc"
          ? line.decoration
          : "none",
      sortOrder: line.sortOrder ?? index + 1,
    })),
    quoteSection: {
      quote: quoteSection.quote ?? "",
      attribution: quoteSection.attribution ?? "",
    },
    executiveTeamTitle: executiveTeam.title ?? "",
    executiveTeamHeadingId: executiveTeam.headingId ?? "",
    executiveTeamItems: sortByOrder(executiveTeam.items).map((member, index) => ({
      name: member.name ?? "",
      role: member.role ?? "",
      imageSrc: member.image?.src ?? "",
      imageWidth: member.image?.width ?? 775,
      imageHeight: member.image?.height ?? 1152,
      bio: member.bio ?? [],
      socialLinks: sortByOrder(member.social).map((link, linkIndex) => ({
        type: link.type === "linkedin" ? "linkedin" : "x",
        href: link.href ?? "",
        label: link.label ?? "",
        sortOrder: link.sortOrder ?? linkIndex + 1,
      })),
      sortOrder: member.sortOrder ?? index + 1,
    })),
    exploreCareersTitle: exploreCareers.title ?? "",
    exploreCareersHeadingId: exploreCareers.headingId ?? "",
    exploreCareersGallery: sortByOrder(exploreCareers.images).map(
      (image, index) => ({
        src: image.src ?? "",
        width: image.width ?? 1152,
        height: image.height ?? 1182,
        sortOrder: image.sortOrder ?? index + 1,
      }),
    ),
    exploreCareersLinks: sortByOrder(exploreCareers.links).map((link, index) => ({
      title: link.title ?? "",
      description: link.description ?? "",
      href: link.href ?? "",
      srText: link.srText ?? link.title ?? "",
      external: link.external ?? false,
      sortOrder: link.sortOrder ?? index + 1,
    })),
    latestNewsHeading: latestNews.heading ?? "",
    latestNewsHeadingId: latestNews.headingId ?? "",
    latestNewsHeadingClassName: latestNews.headingClassName ?? "",
    latestNewsDividerClassName: latestNews.dividerClassName ?? "",
    latestNewsDesktopColumns: latestNews.desktopColumns ?? 4,
    latestNewsCards: sortByOrder(latestNews.cards).map((card, index) => ({
      imageSrc: card.imageSrc ?? "",
      imageAlt: card.imageAlt ?? "",
      category: card.category ?? "",
      title: card.title ?? "",
      date: card.date ?? "",
      sortOrder: card.sortOrder ?? index + 1,
    })),
    eventsPromoTitle: eventsPromo.title ?? "",
    eventsPromoDescription: eventsPromo.description ?? "",
    eventsPromoCtaHref: eventsPromo.ctaHref ?? "",
    eventsPromoCtaLabel: eventsPromo.ctaLabel ?? "",
    eventsPromoCtaSrText: eventsPromo.ctaSrText ?? "",
    cta: sortByOrder(page.cta ?? defaultCompanyPage.cta).map((item, index) => ({
      title: item.title ?? "",
      description: item.description ?? "",
      href: item.href ?? "",
      srLabel: item.srLabel ?? item.title ?? "",
      backgroundColor: item.backgroundColor ?? "",
      sortOrder: item.sortOrder ?? index + 1,
    })),
  };
}
