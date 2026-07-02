import type { Schema, Struct } from '@strapi/strapi';

export interface SharedBrandImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_brand_images';
  info: {
    description: 'Brand page image asset';
    displayName: 'Brand Image';
  };
  attributes: {
    alt: Schema.Attribute.String;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    src: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedBrandLogoSlide extends Struct.ComponentSchema {
  collectionName: 'components_shared_brand_logo_slides';
  info: {
    description: 'Logo carousel slide';
    displayName: 'Brand Logo Slide';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    slideId: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedCapabilityItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_capability_items';
  info: {
    description: 'Homepage capabilities accordion item';
    displayName: 'Capability Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    rotate: Schema.Attribute.String;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    sr: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    video: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCardsGridItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards_grid_items';
  info: {
    description: 'Homepage cards grid item';
    displayName: 'Cards Grid Item';
  };
  attributes: {
    bgClass: Schema.Attribute.String & Schema.Attribute.Required;
    cardId: Schema.Attribute.String & Schema.Attribute.Required;
    colSpan: Schema.Attribute.String & Schema.Attribute.Required;
    decorationType: Schema.Attribute.Enumeration<
      ['none', 'node', 'events', 'market']
    > &
      Schema.Attribute.DefaultTo<'none'>;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    srLabel: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.String;
    textClass: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topType: Schema.Attribute.Enumeration<['none', 'research']> &
      Schema.Attribute.DefaultTo<'none'>;
  };
}

export interface SharedCareersQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_careers_quotes';
  info: {
    description: 'Careers page quote block';
    displayName: 'Careers Quote';
  };
  attributes: {
    attribution: Schema.Attribute.String & Schema.Attribute.Required;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedCareersStatisticItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_careers_statistic_items';
  info: {
    description: 'Careers page statistic with multi-line label';
    displayName: 'Careers Statistic Item';
  };
  attributes: {
    activeDotColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#E7512F'>;
    labelLines: Schema.Attribute.JSON & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    stat: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface SharedCareersTeamItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_careers_team_items';
  info: {
    description: 'Careers teams accordion item';
    displayName: 'Careers Team Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    hoverColor: Schema.Attribute.String;
    imageHeight: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1182>;
    imageSrc: Schema.Attribute.String & Schema.Attribute.Required;
    imageWidth: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1152>;
    links: Schema.Attribute.Component<'shared.careers-team-link', true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCareersTeamLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_careers_team_links';
  info: {
    description: 'CTA link for a careers team accordion item';
    displayName: 'Careers Team Link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    srText: Schema.Attribute.String;
  };
}

export interface SharedCareersTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_careers_testimonial_items';
  info: {
    description: 'Careers team testimonial carousel item';
    displayName: 'Careers Testimonial Item';
  };
  attributes: {
    imageAlt: Schema.Attribute.String;
    imageHeight: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<880>;
    imageSrc: Schema.Attribute.String & Schema.Attribute.Required;
    imageWidth: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1100>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    titleParts: Schema.Attribute.JSON & Schema.Attribute.Required;
  };
}

export interface SharedCareersValuesItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_careers_values_items';
  info: {
    description: 'Careers values flip-card item';
    displayName: 'Careers Values Item';
  };
  attributes: {
    bullets: Schema.Attribute.JSON & Schema.Attribute.Required;
    iconType: Schema.Attribute.Enumeration<
      ['ambitious', 'collaborative', 'entrepreneurial', 'meritocratic']
    > &
      Schema.Attribute.DefaultTo<'ambitious'>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCompanyBusinessLineItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_company_business_line_items';
  info: {
    description: 'Business line card for the company page';
    displayName: 'Company Business Line Item';
  };
  attributes: {
    cardClassName: Schema.Attribute.String & Schema.Attribute.Required;
    colSpan: Schema.Attribute.String & Schema.Attribute.Required;
    decoration: Schema.Attribute.Enumeration<['algorithmic', 'otc', 'none']> &
      Schema.Attribute.DefaultTo<'none'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    lineId: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    srOnly: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCompanyCareersLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_company_careers_links';
  info: {
    description: 'Careers promo link for the company page';
    displayName: 'Company Careers Link';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    srText: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCompanyExecutiveMember extends Struct.ComponentSchema {
  collectionName: 'components_shared_company_executive_members';
  info: {
    description: 'Executive team member for the company page carousel';
    displayName: 'Company Executive Member';
  };
  attributes: {
    bio: Schema.Attribute.JSON;
    imageHeight: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1152>;
    imageSrc: Schema.Attribute.String & Schema.Attribute.Required;
    imageWidth: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<775>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    socialLinks: Schema.Attribute.Component<
      'shared.company-executive-social-link',
      true
    >;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedCompanyExecutiveSocialLink
  extends Struct.ComponentSchema {
  collectionName: 'components_shared_company_executive_social_links';
  info: {
    description: 'Social profile link for an executive team member';
    displayName: 'Company Executive Social Link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    type: Schema.Attribute.Enumeration<['x', 'linkedin']> &
      Schema.Attribute.Required;
  };
}

export interface SharedCompanyGalleryImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_company_gallery_images';
  info: {
    description: 'Gallery image for the company careers section';
    displayName: 'Company Gallery Image';
  };
  attributes: {
    height: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1182>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    src: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1152>;
  };
}

export interface SharedCompanyNewsCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_company_news_cards';
  info: {
    description: 'News card for the company page carousel';
    displayName: 'Company News Card';
  };
  attributes: {
    category: Schema.Attribute.String & Schema.Attribute.Required;
    date: Schema.Attribute.String & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String & Schema.Attribute.Required;
    imageSrc: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedContactTopicItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_topic_items';
  info: {
    description: 'Contact topic card on the contact page';
    displayName: 'Contact Topic Item';
  };
  attributes: {
    cardClassName: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    showServicesField: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spanClassName: Schema.Attribute.String;
    srLabel: Schema.Attribute.String;
  };
}

export interface SharedCtaItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_items';
  info: {
    description: 'Homepage CTA item';
    displayName: 'CTA Item';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    srLabel: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedEventCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_event_cards';
  info: {
    description: 'Upcoming event card';
    displayName: 'Event Card';
  };
  attributes: {
    dateEnd: Schema.Attribute.String;
    dateStart: Schema.Attribute.String;
    externalId: Schema.Attribute.String & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
    imageSrc: Schema.Attribute.String & Schema.Attribute.Required;
    location: Schema.Attribute.String;
    role: Schema.Attribute.String;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    srText: Schema.Attribute.String;
    theme: Schema.Attribute.Enumeration<['mid', 'dark', 'light']> &
      Schema.Attribute.DefaultTo<'mid'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedEventsMediaItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_events_media_items';
  info: {
    description: 'Past conversation media item';
    displayName: 'Events Media Item';
  };
  attributes: {
    category: Schema.Attribute.String;
    date: Schema.Attribute.String;
    externalId: Schema.Attribute.String & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
    imageSrc: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedEventsShowcasePanel extends Struct.ComponentSchema {
  collectionName: 'components_shared_events_showcase_panels';
  info: {
    description: 'Endpoint showcase panel';
    displayName: 'Events Showcase Panel';
  };
  attributes: {
    accent: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    externalId: Schema.Attribute.String & Schema.Attribute.Required;
    headline: Schema.Attribute.String;
    highlightLabel: Schema.Attribute.String;
    highlightValue: Schema.Attribute.String;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedEventsSpeaker extends Struct.ComponentSchema {
  collectionName: 'components_shared_events_speakers';
  info: {
    description: 'Past event speaker';
    displayName: 'Events Speaker';
  };
  attributes: {
    company: Schema.Attribute.String;
    externalId: Schema.Attribute.String & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
    imageSrc: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedEventsStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_events_stat_items';
  info: {
    description: 'Endpoint stats item';
    displayName: 'Events Stat Item';
  };
  attributes: {
    activeDotColor: Schema.Attribute.String;
    externalId: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    description: 'Global footer content';
    displayName: 'Footer';
  };
  attributes: {
    contactAlign: Schema.Attribute.Enumeration<['start', 'center', 'end']> &
      Schema.Attribute.DefaultTo<'start'>;
    copyrightAlign: Schema.Attribute.Enumeration<['start', 'center', 'end']> &
      Schema.Attribute.DefaultTo<'center'>;
    legalBlocks: Schema.Attribute.Component<'shared.footer-legal-block', true>;
    navLinks: Schema.Attribute.Component<'shared.footer-link', true>;
    policyLinks: Schema.Attribute.Component<'shared.footer-link', true>;
    policyLinksAlign: Schema.Attribute.Enumeration<['start', 'center', 'end']> &
      Schema.Attribute.DefaultTo<'end'>;
    socialLinks: Schema.Attribute.Component<'shared.footer-social-link', true>;
  };
}

export interface SharedFooterLegalBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_legal_blocks';
  info: {
    description: 'Footer legal paragraph';
    displayName: 'Footer Legal Block';
  };
  attributes: {
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_links';
  info: {
    description: 'Footer navigation or policy link';
    displayName: 'Footer Link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    srLabel: Schema.Attribute.String;
  };
}

export interface SharedFooterSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_social_links';
  info: {
    description: 'Footer social link with icon type';
    displayName: 'Footer Social Link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    platform: Schema.Attribute.Enumeration<['youtube', 'x', 'linkedin']> &
      Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    description: 'Homepage hero section configuration';
    displayName: 'Hero';
  };
  attributes: {
    fontWeight: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<400>;
    imageSrc: Schema.Attribute.String;
    lighterBgColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'bg-[#f0f1f1]'>;
    lighterTheme: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    loop: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    titles: Schema.Attribute.Component<'shared.hero-title', true>;
    useVideo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    videoClass: Schema.Attribute.String;
    videoSectionClass: Schema.Attribute.String;
    videoSrc: Schema.Attribute.String;
  };
}

export interface SharedHeroTitle extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_titles';
  info: {
    description: 'A styled title fragment for the homepage hero';
    displayName: 'Hero Title';
  };
  attributes: {
    className: Schema.Attribute.String;
    color: Schema.Attribute.String;
    line: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 1;
        },
        number
      >;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedInfrastructureProfileItem
  extends Struct.ComponentSchema {
  collectionName: 'components_shared_infrastructure_profile_items';
  info: {
    description: 'Infrastructure profile card and partnership content';
    displayName: 'Infrastructure Profile Item';
  };
  attributes: {
    cta: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    srText: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    visualType: Schema.Attribute.Enumeration<
      ['dashboard', 'brief', 'partnership']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'dashboard'>;
  };
}

export interface SharedInfrastructureSupportItem
  extends Struct.ComponentSchema {
  collectionName: 'components_shared_infrastructure_support_items';
  info: {
    description: 'Infrastructure support accordion item';
    displayName: 'Infrastructure Support Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    expandedClassName: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'bg-green-light'>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedInfrastructureVisionItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_infrastructure_vision_items';
  info: {
    description: 'Infrastructure vision flip-card item';
    displayName: 'Infrastructure Vision Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    iconType: Schema.Attribute.Enumeration<
      ['uptime', 'security', 'architecture', 'visibility']
    > &
      Schema.Attribute.DefaultTo<'uptime'>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedInsightNewsItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_insight_news_items';
  info: {
    description: 'Homepage insight news link item';
    displayName: 'Insight News Item';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    srText: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLegalBulletList extends Struct.ComponentSchema {
  collectionName: 'components_shared_legal_bullet_lists';
  info: {
    description: 'Policy bullet list';
    displayName: 'Legal Bullet List';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.legal-list-item', true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedLegalContactBox extends Struct.ComponentSchema {
  collectionName: 'components_shared_legal_contact_boxes';
  info: {
    description: 'Policy contact box';
    displayName: 'Legal Contact Box';
  };
  attributes: {
    intro: Schema.Attribute.Text;
    lines: Schema.Attribute.Component<'shared.legal-contact-line', true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedLegalContactLine extends Struct.ComponentSchema {
  collectionName: 'components_shared_legal_contact_lines';
  info: {
    description: 'Contact box line';
    displayName: 'Legal Contact Line';
  };
  attributes: {
    display: Schema.Attribute.String & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedLegalDivider extends Struct.ComponentSchema {
  collectionName: 'components_shared_legal_dividers';
  info: {
    description: 'Horizontal rule marker';
    displayName: 'Legal Divider';
  };
  attributes: {
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedLegalHeadingH2 extends Struct.ComponentSchema {
  collectionName: 'components_shared_legal_heading_h2s';
  info: {
    description: 'Section heading with anchor id';
    displayName: 'Legal Heading H2';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLegalHeadingH3 extends Struct.ComponentSchema {
  collectionName: 'components_shared_legal_heading_h3s';
  info: {
    description: 'Subsection heading';
    displayName: 'Legal Heading H3';
  };
  attributes: {
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLegalHubDocument extends Struct.ComponentSchema {
  collectionName: 'components_shared_legal_hub_documents';
  info: {
    description: 'Legal hub card';
    displayName: 'Legal Hub Document';
  };
  attributes: {
    blurb: Schema.Attribute.Text;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLegalLinkParagraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_legal_link_paragraphs';
  info: {
    description: 'Paragraph with inline link';
    displayName: 'Legal Link Paragraph';
  };
  attributes: {
    after: Schema.Attribute.Text;
    before: Schema.Attribute.Text;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    linkText: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedLegalListItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_legal_list_items';
  info: {
    description: 'Bullet list item';
    displayName: 'Legal List Item';
  };
  attributes: {
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedLegalParagraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_legal_paragraphs';
  info: {
    description: 'Policy paragraph';
    displayName: 'Legal Paragraph';
  };
  attributes: {
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedMarketTickerItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_market_ticker_items';
  info: {
    description: 'Homepage market ticker item';
    displayName: 'Market Ticker Item';
  };
  attributes: {
    avg: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedServiceGroup extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_groups';
  info: {
    description: 'Services page group';
    displayName: 'Service Group';
  };
  attributes: {
    children: Schema.Attribute.Component<'shared.service-item', true>;
    description: Schema.Attribute.Text;
    groupId: Schema.Attribute.String & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    paragraphs: Schema.Attribute.Component<'shared.service-paragraph', true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedServiceItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_items';
  info: {
    description: 'Service list item';
    displayName: 'Service Item';
  };
  attributes: {
    children: Schema.Attribute.Component<'shared.service-sub-item', true>;
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    paragraphs: Schema.Attribute.Component<'shared.service-paragraph', true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedServiceLandingAtAGlance extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_at_a_glances';
  info: {
    displayName: 'Service Landing At A Glance';
  };
  attributes: {
    authorImageAlt: Schema.Attribute.String;
    authorImageClassName: Schema.Attribute.String;
    authorImageSrc: Schema.Attribute.String;
    authorImageUnoptimized: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    authorImageWrapperClassName: Schema.Attribute.String;
    authorName: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    bullets: Schema.Attribute.Component<'shared.service-landing-bullet', true>;
    heading: Schema.Attribute.String;
    headingId: Schema.Attribute.String;
    sectionClassName: Schema.Attribute.String;
    tags: Schema.Attribute.Component<'shared.service-landing-tag', true>;
  };
}

export interface SharedServiceLandingBreadcrumb extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_breadcrumbs';
  info: {
    displayName: 'Service Landing Breadcrumb';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    srText: Schema.Attribute.String;
  };
}

export interface SharedServiceLandingBullet extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_bullets';
  info: {
    displayName: 'Service Landing Bullet';
  };
  attributes: {
    after: Schema.Attribute.Text;
    before: Schema.Attribute.Text;
    emphasis: Schema.Attribute.Text;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedServiceLandingDisclaimer extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_disclaimers';
  info: {
    displayName: 'Service Landing Disclaimer';
  };
  attributes: {
    href: Schema.Attribute.String;
    linkLabel: Schema.Attribute.String;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.Text;
    textAfter: Schema.Attribute.Text;
  };
}

export interface SharedServiceLandingHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_heroes';
  info: {
    displayName: 'Service Landing Hero';
  };
  attributes: {
    breadcrumbs: Schema.Attribute.Component<
      'shared.service-landing-breadcrumb',
      true
    >;
    category: Schema.Attribute.String;
    className: Schema.Attribute.String;
    date: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    descriptionParts: Schema.Attribute.Component<
      'shared.service-landing-inline-part',
      true
    >;
    imageAlt: Schema.Attribute.String;
    imageSrc: Schema.Attribute.String;
    metaTone: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedServiceLandingInlinePart extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_inline_parts';
  info: {
    displayName: 'Service Landing Inline Part';
  };
  attributes: {
    href: Schema.Attribute.String;
    partType: Schema.Attribute.Enumeration<['text', 'strong', 'link']> &
      Schema.Attribute.DefaultTo<'text'>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    strong: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    value: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedServiceLandingInsightCard
  extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_insight_cards';
  info: {
    displayName: 'Service Landing Insight Card';
  };
  attributes: {
    category: Schema.Attribute.String;
    date: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
    imageSrc: Schema.Attribute.String;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    srText: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedServiceLandingNewsletterOption
  extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_newsletter_options';
  info: {
    displayName: 'Service Landing Newsletter Option';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    optionId: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedServiceLandingPressRelease
  extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_press_releases';
  info: {
    displayName: 'Service Landing Press Release';
  };
  attributes: {
    authorUseBrandLogo: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    blocks: Schema.Attribute.DynamicZone<
      [
        'shared.service-landing-report-paragraph',
        'shared.service-landing-report-image',
      ]
    >;
  };
}

export interface SharedServiceLandingReportContents
  extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_report_contents';
  info: {
    displayName: 'Service Landing Report Contents';
  };
  attributes: {
    ctaSectionHref: Schema.Attribute.String;
    ctaSectionId: Schema.Attribute.String;
    ctaSectionLabel: Schema.Attribute.String;
    ctaSectionSrText: Schema.Attribute.String;
    ctaSectionTitle: Schema.Attribute.String;
    disclaimers: Schema.Attribute.Component<
      'shared.service-landing-disclaimer',
      true
    >;
    mainSectionBlocks: Schema.Attribute.DynamicZone<
      [
        'shared.service-landing-report-paragraph',
        'shared.service-landing-report-image',
      ]
    >;
    mainSectionId: Schema.Attribute.String;
    mainSectionImage: Schema.Attribute.Component<
      'shared.service-landing-report-image',
      false
    >;
    mainSectionParagraphs: Schema.Attribute.Component<
      'shared.service-landing-report-paragraph',
      true
    >;
    mainSectionTitle: Schema.Attribute.String;
    tableOfContents: Schema.Attribute.Component<
      'shared.service-landing-toc-item',
      true
    >;
  };
}

export interface SharedServiceLandingReportImage
  extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_report_images';
  info: {
    displayName: 'Service Landing Report Image';
  };
  attributes: {
    alt: Schema.Attribute.String;
    height: Schema.Attribute.Integer;
    previewSource: Schema.Attribute.String;
    previewSrc: Schema.Attribute.String;
    previewTableOnly: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    previewTitle: Schema.Attribute.String;
    previewWeek: Schema.Attribute.String;
    src: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface SharedServiceLandingReportParagraph
  extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_report_paragraphs';
  info: {
    displayName: 'Service Landing Report Paragraph';
  };
  attributes: {
    parts: Schema.Attribute.Component<
      'shared.service-landing-inline-part',
      true
    >;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    strong: Schema.Attribute.String;
    text: Schema.Attribute.Text;
    variant: Schema.Attribute.String;
  };
}

export interface SharedServiceLandingSimilarInsights
  extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_similar_insights';
  info: {
    displayName: 'Service Landing Similar Insights';
  };
  attributes: {
    cards: Schema.Attribute.Component<
      'shared.service-landing-insight-card',
      true
    >;
    desktopColumns: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<4>;
    heading: Schema.Attribute.String;
    headingId: Schema.Attribute.String;
    sectionBgColor: Schema.Attribute.String;
  };
}

export interface SharedServiceLandingSubscribe extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_subscribes';
  info: {
    displayName: 'Service Landing Subscribe';
  };
  attributes: {
    disclaimer: Schema.Attribute.Text;
    disclaimerSuffix: Schema.Attribute.String;
    emailLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    headingId: Schema.Attribute.String;
    newsletterOptions: Schema.Attribute.Component<
      'shared.service-landing-newsletter-option',
      true
    >;
    newslettersLabel: Schema.Attribute.String;
    privacyPolicyHref: Schema.Attribute.String;
    privacyPolicyLabel: Schema.Attribute.String;
    submitLabel: Schema.Attribute.String;
    submitSrText: Schema.Attribute.String;
  };
}

export interface SharedServiceLandingTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_tags';
  info: {
    displayName: 'Service Landing Tag';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    srText: Schema.Attribute.String;
  };
}

export interface SharedServiceLandingTocItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_landing_toc_items';
  info: {
    displayName: 'Service Landing TOC Item';
  };
  attributes: {
    anchorId: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    srText: Schema.Attribute.String;
  };
}

export interface SharedServiceParagraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_paragraphs';
  info: {
    description: 'Service detail paragraph';
    displayName: 'Service Paragraph';
  };
  attributes: {
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedServiceSubItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_sub_items';
  info: {
    description: 'Nested service list item';
    displayName: 'Service Sub Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    paragraphs: Schema.Attribute.Component<'shared.service-paragraph', true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSiteVersion extends Struct.ComponentSchema {
  collectionName: 'components_shared_site_versions';
  info: {
    description: 'Frontend layout version selector';
    displayName: 'Site Version';
  };
  attributes: {
    label: Schema.Attribute.Enumeration<['v1', 'v2']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'v2'>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Global social link settings';
    displayName: 'Social Link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStatisticItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_statistic_items';
  info: {
    description: 'Homepage statistics item';
    displayName: 'Statistic Item';
  };
  attributes: {
    activeDotColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#E7512F'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    stat: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.brand-image': SharedBrandImage;
      'shared.brand-logo-slide': SharedBrandLogoSlide;
      'shared.capability-item': SharedCapabilityItem;
      'shared.cards-grid-item': SharedCardsGridItem;
      'shared.careers-quote': SharedCareersQuote;
      'shared.careers-statistic-item': SharedCareersStatisticItem;
      'shared.careers-team-item': SharedCareersTeamItem;
      'shared.careers-team-link': SharedCareersTeamLink;
      'shared.careers-testimonial-item': SharedCareersTestimonialItem;
      'shared.careers-values-item': SharedCareersValuesItem;
      'shared.company-business-line-item': SharedCompanyBusinessLineItem;
      'shared.company-careers-link': SharedCompanyCareersLink;
      'shared.company-executive-member': SharedCompanyExecutiveMember;
      'shared.company-executive-social-link': SharedCompanyExecutiveSocialLink;
      'shared.company-gallery-image': SharedCompanyGalleryImage;
      'shared.company-news-card': SharedCompanyNewsCard;
      'shared.contact-topic-item': SharedContactTopicItem;
      'shared.cta-item': SharedCtaItem;
      'shared.event-card': SharedEventCard;
      'shared.events-media-item': SharedEventsMediaItem;
      'shared.events-showcase-panel': SharedEventsShowcasePanel;
      'shared.events-speaker': SharedEventsSpeaker;
      'shared.events-stat-item': SharedEventsStatItem;
      'shared.footer': SharedFooter;
      'shared.footer-legal-block': SharedFooterLegalBlock;
      'shared.footer-link': SharedFooterLink;
      'shared.footer-social-link': SharedFooterSocialLink;
      'shared.hero': SharedHero;
      'shared.hero-title': SharedHeroTitle;
      'shared.infrastructure-profile-item': SharedInfrastructureProfileItem;
      'shared.infrastructure-support-item': SharedInfrastructureSupportItem;
      'shared.infrastructure-vision-item': SharedInfrastructureVisionItem;
      'shared.insight-news-item': SharedInsightNewsItem;
      'shared.legal-bullet-list': SharedLegalBulletList;
      'shared.legal-contact-box': SharedLegalContactBox;
      'shared.legal-contact-line': SharedLegalContactLine;
      'shared.legal-divider': SharedLegalDivider;
      'shared.legal-heading-h2': SharedLegalHeadingH2;
      'shared.legal-heading-h3': SharedLegalHeadingH3;
      'shared.legal-hub-document': SharedLegalHubDocument;
      'shared.legal-link-paragraph': SharedLegalLinkParagraph;
      'shared.legal-list-item': SharedLegalListItem;
      'shared.legal-paragraph': SharedLegalParagraph;
      'shared.market-ticker-item': SharedMarketTickerItem;
      'shared.service-group': SharedServiceGroup;
      'shared.service-item': SharedServiceItem;
      'shared.service-landing-at-a-glance': SharedServiceLandingAtAGlance;
      'shared.service-landing-breadcrumb': SharedServiceLandingBreadcrumb;
      'shared.service-landing-bullet': SharedServiceLandingBullet;
      'shared.service-landing-disclaimer': SharedServiceLandingDisclaimer;
      'shared.service-landing-hero': SharedServiceLandingHero;
      'shared.service-landing-inline-part': SharedServiceLandingInlinePart;
      'shared.service-landing-insight-card': SharedServiceLandingInsightCard;
      'shared.service-landing-newsletter-option': SharedServiceLandingNewsletterOption;
      'shared.service-landing-press-release': SharedServiceLandingPressRelease;
      'shared.service-landing-report-contents': SharedServiceLandingReportContents;
      'shared.service-landing-report-image': SharedServiceLandingReportImage;
      'shared.service-landing-report-paragraph': SharedServiceLandingReportParagraph;
      'shared.service-landing-similar-insights': SharedServiceLandingSimilarInsights;
      'shared.service-landing-subscribe': SharedServiceLandingSubscribe;
      'shared.service-landing-tag': SharedServiceLandingTag;
      'shared.service-landing-toc-item': SharedServiceLandingTocItem;
      'shared.service-paragraph': SharedServiceParagraph;
      'shared.service-sub-item': SharedServiceSubItem;
      'shared.site-version': SharedSiteVersion;
      'shared.social-link': SharedSocialLink;
      'shared.statistic-item': SharedStatisticItem;
    }
  }
}
