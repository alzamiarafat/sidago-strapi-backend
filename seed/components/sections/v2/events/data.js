/** Events page hero accent (pink highlight). */
export const EVENTS_HERO_ACCENT = "#F075E4";

/**
 * Build HeroBanner `titles` from line-based copy.
 * Each inner array is one visual line; parts render left-to-right with a space between.
 */
export function buildHeroTitlesFromLines(
  lines,
  accentColor = EVENTS_HERO_ACCENT,
) {
  let sortOrder = 1;

  return lines.flatMap((parts, lineIndex) =>
    parts.map((part) => {
      const item = {
        title: part.text,
        line: lineIndex + 1,
        sortOrder: sortOrder++,
      };

      if (part.accent) {
        item.color = accentColor;
      }

      if (part.className) {
        item.className = part.className;
      }

      return item;
    }),
  );
}

export const eventsHero = {
  useVideo: true,
  lighterTheme: false,
  videoSrc: "/media/events.mp4",
  imageSrc: "",
  fontWeight: 400,
  loop: true,
  lighterBgColor: "bg-[#f0f1f1]",
  backgroundClassName: "bg-[#070807]",
  videoOverlay: false,
  syncBackgroundColor: true,
  videoSectionClass: "",
  videoClass: "events-hero-video",
  accentColor: EVENTS_HERO_ACCENT,
  subtitle: "Find out where to meet, talk, and build with us next",
  titleLines: [
    [{ text: "Igniting" }, { text: "meaningful", accent: true }],
    [{ text: "conversations", accent: true }, { text: "to spark" }],
    [{ text: "great ideas" }],
  ],
};

export function getEventsHeroProps(overrides = {}) {
  const {
    titleLines = eventsHero.titleLines,
    accentColor = eventsHero.accentColor,
    subtitle = eventsHero.subtitle,
    ...rest
  } = { ...eventsHero, ...overrides };

  return {
    ...rest,
    subtitle,
    titles: buildHeroTitlesFromLines(titleLines, accentColor),
  };
}

/** @typedef {'mid' | 'dark' | 'light'} EventCardTheme */

/**
 * @typedef {Object} UpcomingEvent
 * @property {string} id
 * @property {string} href
 * @property {string} srText
 * @property {string} imageSrc
 * @property {string} imageAlt
 * @property {string} role
 * @property {string} location
 * @property {string} title
 * @property {string} dateStart
 * @property {string} [dateEnd]
 * @property {EventCardTheme} theme
 */

/** @type {UpcomingEvent[]} */
export const upcomingEvents = [
  {
    id: "proof-of-talk",
    href: "https://proofoftalk.io/",
    srText: "Proof of Talk",
    imageSrc: "/images/Proof-of-Talk-Mid.svg",
    imageAlt: "Meet us at Proof of Talk",
    role: "Attending",
    location: "Paris | FR",
    title: "Meet us at Proof of Talk",
    dateStart: "2 Jun 2026",
    dateEnd: "3 Jun 2026",
    theme: "mid",
  },
  {
    id: "vault-summit",
    href: "https://vaultsummit.xyz/",
    srText: "Vault Summit",
    imageSrc: "/images/Vault-Summit-Dark.svg",
    imageAlt: "We'll be speaking at Vault Summit",
    role: "Speaking",
    location: "NYC | USA",
    title: "We'll be speaking at Vault Summit",
    dateStart: "5 Jun 2026",
    dateEnd: "5 Jun 2026",
    theme: "dark",
  },
  {
    id: "webx",
    href: "https://webx-asia.com/",
    srText: "WebX Asia",
    imageSrc: "/images/WebX-Mid.svg",
    imageAlt: "Catch our panel at WebX",
    role: "Speaking",
    location: "Tokyo | JP",
    title: "Catch our panel at WebX",
    dateStart: "13 Jul 2026",
    dateEnd: "14 Jul 2026",
    theme: "mid",
  },
  {
    id: "malaysia-blockchain-week",
    href: "https://myblockchainweek.com/",
    srText: "Malaysia Blockchain Week",
    imageSrc: "/images/Malaysia-Blockchain-Week-Light.svg",
    imageAlt: "We're speaking at Malaysia Blockchain Week",
    role: "Speaking",
    location: "Kuala Lumpur | MY",
    title: "We're speaking at Malaysia Blockchain Week",
    dateStart: "29 Jul 2026",
    dateEnd: "30 Jul 2026",
    theme: "light",
  },
  {
    id: "coinfest-asia",
    href: "https://coinfest.asia/",
    srText: "Coinfest Asia",
    imageSrc: "/images/Coinfest-Asia-2026-MId.svg",
    imageAlt: "Meet us at Coinfest Asia",
    role: "Attending",
    location: "Melasti Beach | BA",
    title: "Meet us at Coinfest Asia",
    dateStart: "20 Aug 2026",
    dateEnd: "21 Aug 2026",
    theme: "mid",
  },
  {
    id: "bitcoin-asia",
    href: "https://asia.b.tc/",
    srText: "Bitcoin Asia",
    imageSrc: "/images/Bitcoin-Asia-2026-Dark.svg",
    imageAlt: "We'll be at Bitcoin Asia",
    role: "Attending",
    location: "Hong Kong",
    title: "We'll be at Bitcoin Asia",
    dateStart: "27 Aug 2026",
    dateEnd: "28 Aug 2026",
    theme: "dark",
  },
];

/** Homepage feed — “What’s happening” carousel (matches reference layout). */
export const feedWhatsHappeningEvents = upcomingEvents.filter((event) =>
  ["webx", "malaysia-blockchain-week", "coinfest-asia", "bitcoin-asia"].includes(
    event.id,
  ),
);

export const upcomingEventsSection = {
  headingId: "meet-us-at-whats-next",
  heading: "Meet us at what's next",
  headingClassName: "font-blender text-xl uppercase text-green-dark",
  dividerClassName: "border-[#006623]",
  desktopColumns: 3,
  mobileInitialCount: 3,
};
