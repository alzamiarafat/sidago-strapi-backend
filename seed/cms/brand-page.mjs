export const defaultBrandPage = {
  pageContent: {
    intro: {
      titleBefore: "Sidago",
      titleHighlight: "brand",
      description: "Access brand resources and guidelines",
      imageSrc: "/images/navbar-logo-icon.png",
      imageAlt: "Sidago brand mark",
    },
    harnessing: {
      titleHighlight: "Harnessing",
      titleAfter: "chaos",
      body:
        "Sidago’s design system is inspired by technical systems and data flows. It shifts between chaos and harnessed states, embracing the complexity of the crypto landscape and visually harnessing it for our audiences. It creates moments of calm and sophistication, while also allowing for expression and drama.",
      images: [
        {
          src: "/images/Frame-1739328787.webp",
          alt: "Chaos — particle cluster",
        },
        {
          src: "/images/Frame-1739328788.webp",
          alt: "Harnessed — structured particle flow",
        },
        {
          src: "/images/Frame-1739328789-2.webp",
          alt: "Drama — layered dot frames",
        },
      ],
      download: {
        href: "https://docsend.com/view/hngjtz6f7rue4xxj",
        srLabel: "View › Hngjtz6f7rue4xxj",
        label: "Download brand kit",
      },
    },
    logo: {
      eyebrow: "Logo",
      description:
        "The Sidago mark and wordmark — built for clarity across digital and print",
      slides: [
        {
          id: "horizontal",
          label: "Horizontal",
          caption:
            "Use the horizontal lockup where space allows, keeping clear space equal to the height of the logo mark.",
        },
        {
          id: "vertical",
          label: "Vertical",
          caption:
            "Use the vertical lockup in tighter layouts, keeping clear space equal to the height of the logo mark.",
        },
        {
          id: "symbol",
          label: "Symbol",
          caption:
            "Use the symbol only when full lockups aren't viable, with equal clear space on all sides.",
        },
        {
          id: "color",
          label: "Color",
          caption:
            "A) Default brand orange. B) Brand orange on white. C/D) Use only as a last resort when A/B aren't viable.",
        },
      ],
      download: {
        href: "https://docsend.com/view/vpn4kstcxxbj7tyt",
        srLabel: "View › Vpn4kstcxxbj7tyt",
        label: "Download logos",
      },
    },
    colorIntro: {
      title: "Color system",
    },
    media: {
      eyebrow: "Media resources",
      description:
        "Download headshots and use these backdrops when you need something that looks like Sidago",
      headshots: [
        {
          src: "/images/brand-headshot-evgeny.png",
          alt: "Evgeny — headshot backdrop",
        },
        {
          src: "/images/brand-headshot-marina.png",
          alt: "Marina — headshot backdrop",
        },
        {
          src: "/images/brand-headshot-yoann.png",
          alt: "Yoann — headshot backdrop",
        },
      ],
      backdrops: [
        {
          src: "/images/brand-backdrop-1.png",
          alt: "Media backdrop — network pattern",
        },
        {
          src: "/images/brand-backdrop-2.png",
          alt: "Media backdrop — 2024",
        },
        {
          src: "/images/brand-backdrop-3.png",
          alt: "Media backdrop — 1H25",
        },
        {
          src: "/images/brand-backdrop-4.png",
          alt: "Media backdrop — 2025",
        },
      ],
      headshotsDownload: {
        href: "https://docsend.com/view/iibf68mib7htjh5q",
        srLabel: "View › Iibf68mib7htjh5q",
        label: "Download all",
      },
      backdropsDownload: {
        href: "https://docsend.com/view/qvfbtisjy5uzkpzd",
        srLabel: "View › Qvfbtisjy5uzkpzd",
        label: "Download all",
      },
    },
    subBrands: {
      eyebrow: "Sub-brands",
    },
  },
};

function mapBrandImages(images = []) {
  return images.map((image, index) => ({
    src: image.src,
    alt: image.alt,
    sortOrder: index + 1,
  }));
}

export function brandPageToStrapiSeed(page = defaultBrandPage) {
  const { intro, harnessing, logo, colorIntro, media, subBrands } =
    page.pageContent;

  return {
    introTitleBefore: intro.titleBefore,
    introTitleHighlight: intro.titleHighlight,
    introDescription: intro.description,
    introImageSrc: intro.imageSrc,
    introImageAlt: intro.imageAlt,
    harnessingTitleHighlight: harnessing.titleHighlight,
    harnessingTitleAfter: harnessing.titleAfter,
    harnessingBody: harnessing.body,
    harnessingImages: mapBrandImages(harnessing.images),
    harnessingDownloadHref: harnessing.download.href,
    harnessingDownloadSrLabel: harnessing.download.srLabel,
    harnessingDownloadLabel: harnessing.download.label,
    logoEyebrow: logo.eyebrow,
    logoDescription: logo.description,
    logoSlides: logo.slides.map((slide, index) => ({
      slideId: slide.id,
      label: slide.label,
      caption: slide.caption,
      sortOrder: index + 1,
    })),
    logoDownloadHref: logo.download.href,
    logoDownloadSrLabel: logo.download.srLabel,
    logoDownloadLabel: logo.download.label,
    colorIntroTitle: colorIntro.title,
    mediaEyebrow: media.eyebrow,
    mediaDescription: media.description,
    mediaHeadshots: mapBrandImages(media.headshots),
    mediaBackdrops: mapBrandImages(media.backdrops),
    mediaHeadshotsDownloadHref: media.headshotsDownload.href,
    mediaHeadshotsDownloadSrLabel: media.headshotsDownload.srLabel,
    mediaHeadshotsDownloadLabel: media.headshotsDownload.label,
    mediaBackdropsDownloadHref: media.backdropsDownload.href,
    mediaBackdropsDownloadSrLabel: media.backdropsDownload.srLabel,
    mediaBackdropsDownloadLabel: media.backdropsDownload.label,
    subBrandsEyebrow: subBrands.eyebrow,
  };
}

export function normalizeBrandPageFromStrapi(item) {
  if (!item) {
    return defaultBrandPage;
  }

  const mapImages = (images = [], fallback = []) =>
    images.length > 0
      ? images
          .slice()
          .sort(
            (left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0),
          )
          .map((image, index) => ({
            src: image.src || fallback[index]?.src || "",
            alt: image.alt || fallback[index]?.alt || "",
          }))
      : fallback;

  const fallback = defaultBrandPage.pageContent;

  return {
    pageContent: {
      intro: {
        titleBefore: item.introTitleBefore || fallback.intro.titleBefore,
        titleHighlight:
          item.introTitleHighlight || fallback.intro.titleHighlight,
        description: item.introDescription || fallback.intro.description,
        imageSrc: item.introImageSrc || fallback.intro.imageSrc,
        imageAlt: item.introImageAlt || fallback.intro.imageAlt,
      },
      harnessing: {
        titleHighlight:
          item.harnessingTitleHighlight || fallback.harnessing.titleHighlight,
        titleAfter:
          item.harnessingTitleAfter || fallback.harnessing.titleAfter,
        body: item.harnessingBody || fallback.harnessing.body,
        images: mapImages(item.harnessingImages, fallback.harnessing.images),
        download: {
          href:
            item.harnessingDownloadHref || fallback.harnessing.download.href,
          srLabel:
            item.harnessingDownloadSrLabel ||
            fallback.harnessing.download.srLabel,
          label:
            item.harnessingDownloadLabel ||
            fallback.harnessing.download.label,
        },
      },
      logo: {
        eyebrow: item.logoEyebrow || fallback.logo.eyebrow,
        description: item.logoDescription || fallback.logo.description,
        slides:
          item.logoSlides?.length > 0
            ? item.logoSlides
                .slice()
                .sort(
                  (left, right) =>
                    (left.sortOrder ?? 0) - (right.sortOrder ?? 0),
                )
                .map((slide, index) => ({
                  id: slide.slideId || fallback.logo.slides[index]?.id || "",
                  label: slide.label || fallback.logo.slides[index]?.label || "",
                  caption:
                    slide.caption || fallback.logo.slides[index]?.caption || "",
                }))
            : fallback.logo.slides,
        download: {
          href: item.logoDownloadHref || fallback.logo.download.href,
          srLabel: item.logoDownloadSrLabel || fallback.logo.download.srLabel,
          label: item.logoDownloadLabel || fallback.logo.download.label,
        },
      },
      colorIntro: {
        title: item.colorIntroTitle || fallback.colorIntro.title,
      },
      media: {
        eyebrow: item.mediaEyebrow || fallback.media.eyebrow,
        description: item.mediaDescription || fallback.media.description,
        headshots: mapImages(item.mediaHeadshots, fallback.media.headshots),
        backdrops: mapImages(item.mediaBackdrops, fallback.media.backdrops),
        headshotsDownload: {
          href:
            item.mediaHeadshotsDownloadHref ||
            fallback.media.headshotsDownload.href,
          srLabel:
            item.mediaHeadshotsDownloadSrLabel ||
            fallback.media.headshotsDownload.srLabel,
          label:
            item.mediaHeadshotsDownloadLabel ||
            fallback.media.headshotsDownload.label,
        },
        backdropsDownload: {
          href:
            item.mediaBackdropsDownloadHref ||
            fallback.media.backdropsDownload.href,
          srLabel:
            item.mediaBackdropsDownloadSrLabel ||
            fallback.media.backdropsDownload.srLabel,
          label:
            item.mediaBackdropsDownloadLabel ||
            fallback.media.backdropsDownload.label,
        },
      },
      subBrands: {
        eyebrow: item.subBrandsEyebrow || fallback.subBrands.eyebrow,
      },
    },
  };
}
