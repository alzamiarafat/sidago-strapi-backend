export const ARMITAGE_NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Docs", href: "https://docs.sidago.com", external: true },
  { label: "FAQ", href: "#faq" },
];

export const ARMITAGE_VAULTS = [
  {
    name: "Sidago USDC Prime",
    badge: "PRIME",
    badgeTone: "green-light",
    chain: "ETHEREUM",
    chainTone: "neuromancer",
    tvl: "$20.61M",
    apy: "3.75%",
    href: "https://app.morpho.org/ethereum/vault/0x5dc53a23AdC9f2Bed98de6F59F7F309a7c71FF2B",
  },
  {
    name: "Sidago USDC Select",
    badge: "SELECT",
    badgeTone: "green-light",
    chain: "ETHEREUM",
    chainTone: "neuromancer",
    tvl: "$32.39M",
    apy: "4.31%",
    href: "https://app.morpho.org/ethereum/vault/0xA2EAaD0D586cF9FD73bb2c09cF6A7E3e187D68cd",
  },
];

export const ARMITAGE_ABOUT_TABS = [
  {
    id: "risk",
    title: "End-to-end risk execution",
    body: "We can execute liquidations for every market we support. This lets us safely support collateral types that other curators cannot, expanding the yield opportunity set without compromising depositor protection.",
    video: "/media/active-risk-management.mp4",
  },
  {
    id: "trading",
    title: "Trading-informed risk management",
    body: "Risk parameters are informed by live trading data across venues and chains, so vault allocations respond to real liquidity and market stress—not static models alone.",
    video: "/media/trading-informed-risk-management-matrix.mp4",
  },
  {
    id: "institutional",
    title: "Institutional credibility with DeFi depth",
    body: "Sidago brings operational experience from global markets to onchain vault curation, combining institutional discipline with permissionless, non-custodial infrastructure.",
    video: "/media/rigorous-market-selection-matrix.mp4",
  },
  {
    id: "yield",
    title: "Yield across ecosystems",
    body: "Armitage is designed to scale across chains and protocols, following yield as it emerges across DeFi rather than remaining tied to a single ecosystem.",
    video: "/media/non-custodial-transparent-matrix.mp4",
  },
];

export const ARMITAGE_STATS = [
  { stat: "$10B", label: "Daily DeFi trading volume", activeDotColor: "#0dcfcf" },
  { stat: "70+", label: "DeFi venues integrated", activeDotColor: "#3c85dd" },
  { stat: "10+", label: "Chains covered", activeDotColor: "#7fb2f1" },
  { stat: "2017", label: "Established", activeDotColor: "#66ff9a" },
];

export const ARMITAGE_FAQ = [
  {
    question: "What is Armitage by Sidago?",
    answer:
      "Armitage is Sidago's vault curation business. We curate non-custodial vaults on DeFi lending protocols. We select which markets to allocate to, set risk parameters, and continuously monitor and rebalance positions on behalf of depositors.",
  },
  {
    question: "How do I deposit?",
    answer:
      "Vaults are permissionless and non-custodial. Select a vault and deposit directly on Morpho using the Deposit links on this page—no KYC required.",
  },
  {
    question: "What are the fees?",
    answer:
      "Fee structures are disclosed on each vault's Morpho page. Refer to the relevant vault documentation for the latest performance and management fee details.",
  },
];

export const ARMITAGE_FOOTER_LINKS = [
  { label: "Contact", href: "/contact", external: false },
  { label: "Privacy Policy", href: "/privacy", external: false },
  { label: "Terms of Use", href: "/legal", external: false },
  { label: "Cookies Policy", href: "/cookies", external: false },
  { label: "Events", href: "/events", external: false },
];

export const ARMITAGE_FOOTER_DISCLAIMERS = [
  'Armitage refers to the vault curation business, conducted by an affiliate entity of the Sidago Group, hereafter referred to as "Armitage". Armitage is not authorised or regulated by any regulatory authority. Any party interacting with Armitage may not benefit from the protections typically provided when trading with regulated entities, such as any compensation or ombudsman schemes.',
  "Armitage does not engage in the management, custody or holding of any assets, including cryptoassets or fiat currency, on behalf of investors or customers. The material is provided for information purposes only and does not constitute an offer or solicitation for the purchase of any cryptoassets or any form of financial instruments referencing cryptoassets.",
  "No communication, whether verbal or written, by Armitage or by any persons on behalf of Armitage or any of its affiliates or related corporations is intended to, or shall be construed as or deemed to, establish a customer relationship with or a provision of services by Armitage or any of its affiliates or related corporations. Any references to market making, market maker, liquidity provisioning or similar terms on this website or otherwise in connection with our activities do not refer to liquidity provisioning services, market making services or any other regulated activities which may be referred to using the same, or similar name, by any regulatory or self regulatory organizations.",
  "Information provided on this website is only directed at persons who have professional experience in matters relating to investments. No communications made by Armitage are intended for any persons residing in the United Kingdom or the United States, nor does Armitage curate vaults aimed at any persons residing in the United Kingdom or the United States. The information is not directed at nor intended for distribution to, or use by, any person resident in any country or jurisdiction where such distribution or use would be contrary to local law or regulation.",
  '"Sidago" is a marketing name for Sidago Trading Ltd and its affiliates. Different Sidago entities trade different products. Availability of products and offerings is subject to jurisdictional limitation and capabilities of each Sidago entity.',
];
