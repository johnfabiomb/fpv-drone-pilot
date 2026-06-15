export const BASE_URL = 'https://johnfabiomb.com';
export const DEFAULT_IMAGE = `${BASE_URL}/assets/og-malta.jpg`;

export interface SeoConfig {
  title: string;
  desc: string;
  url: string;
  image?: string;
  imageAlt?: string;
  keywords?: string;
  noindex?: boolean;
}

export type SeoPage =
  | 'map' | 'list' | 'deals' | 'pay' | 'pay-success' | 'plan'
  | 'privacy' | 'cookies' | 'about' | 'contact' | 'groups' | 'leaderboard' | 'notifications';

export const DEFAULT_SEO: SeoConfig = {
  title: 'Explore Malta - Hidden Gems, Caves & Secret Spots | Interactive Map',
  desc: "Discover Malta's best hidden gems, secret caves, beaches and historical sites with a free interactive map by John Montaño. 70+ curated locations with routes, photos and partner deals.",
  url: `${BASE_URL}/`,
  image: DEFAULT_IMAGE,
  imageAlt: 'Interactive map of Malta showing hidden gems and secret spots',
  keywords: 'Malta hidden gems, Malta caves, Malta beaches, Malta secret spots, Malta hiking, explore Malta, Malta interactive map, Gozo hidden spots, Malta travel guide, Malta deals, Malta water sports',
};

export const TREND_SEO: SeoConfig = {
  title: "30 Best Places to Visit in Malta (2026) · Explorer's Guide",
  desc: "Explore 30 of Malta's most breathtaking hidden gems — sea caves, cliff trails, remote valleys and secret coastlines most tourists never find. A firsthand bucket-list by John Montaño.",
  url: `${BASE_URL}/malta/30-places-2026/`,
  image: `${BASE_URL}/assets/images/places/ta-maria-cave/TaMarijaCave.png`,
  imageAlt: "Ta' Marija Cave — Malta hidden gem",
  keywords: 'places to visit in Malta, best places Malta 2026, Malta bucket list, Malta hidden gems, Malta travel guide, Malta sea caves, Malta cliff walks, Gozo hidden spots, Malta hiking trails, what to see in Malta, Malta must see, Malta off the beaten path',
};

export const PAGE_SEO: Record<SeoPage, SeoConfig> = {
  map: {
    title: 'Explore Malta - Hidden Gems, Caves & Secret Spots | Interactive Map',
    desc: "Discover Malta's best hidden gems, secret caves, beaches and historical sites with a free interactive map by John Montaño. 70+ curated locations with routes, photos and partner deals.",
    url: `${BASE_URL}/malta/`,
  },
  list: {
    title: 'Browse All Locations · Explore Malta',
    desc: 'Browse 70+ hidden gems, caves, beaches and historical sites across Malta and Gozo. Filter by type, sort by rating or distance from you.',
    url: `${BASE_URL}/malta/list/`,
  },
  deals: {
    title: 'Malta Local Deals | Tours, Stays & Water Sports | Explore Malta',
    desc: 'Real discounts from local Malta businesses — water sports, kayaking, boat trips, hotels and restaurants. Partner deals personally recommended by John Montaño.',
    url: `${BASE_URL}/malta/deals/`,
  },
  plan: {
    title: 'Route Builder · Explore Malta',
    desc: "Plan your perfect route across Malta's hidden gems. Build a custom route connecting caves, beaches and historical sites curated by John Montaño.",
    url: `${BASE_URL}/plan/`,
  },
  pay: {
    title: 'Payment · John Montaño',
    desc: 'Secure payment page for content creation services by John Montaño. Pay safely via Stripe.',
    url: `${BASE_URL}/pay/`,
  },
  'pay-success': {
    title: 'Payment Confirmed · John Montaño',
    desc: 'Your payment has been confirmed. Book your slot with John Montaño.',
    url: `${BASE_URL}/pay/success/`,
    noindex: true,
  },
  privacy: {
    title: 'Privacy Policy · Explore Malta',
    desc: 'Read the Privacy Policy for Explore Malta — covering account data, XP and level system, group membership, Google Analytics, AdSense, and GDPR rights.',
    url: `${BASE_URL}/privacy/`,
  },
  cookies: {
    title: 'Cookie Policy · Explore Malta',
    desc: 'Read the Cookie Policy for Explore Malta, including cookies and localStorage used for authentication, analytics, and personalised ads.',
    url: `${BASE_URL}/cookies/`,
  },
  about: {
    title: 'About · Explore Malta',
    desc: 'Explore Malta is an original travel guide by John Montaño — 70+ hidden gems, sea caves, trails and partner deals across Malta and Gozo.',
    url: `${BASE_URL}/about/`,
  },
  contact: {
    title: 'Contact · Explore Malta',
    desc: 'Contact information for Explore Malta and site owner John Montaño.',
    url: `${BASE_URL}/contact/`,
  },
  groups: {
    title: 'Explore Together · Find Hiking Groups in Malta',
    desc: "Join or create hiking groups for Malta's best spots. Find others to explore sea caves, cliffs, and hidden gems with — organised by real explorers.",
    url: `${BASE_URL}/malta/groups/`,
  },
  leaderboard: {
    title: 'Malta Explorers Rankings | Explore Malta',
    desc: 'See the top Malta explorers ranked by level and XP. Explore hidden gems, earn points and climb the leaderboard.',
    url: `${BASE_URL}/malta/leaderboard/`,
  },
  notifications: {
    title: 'Notifications | Explore Malta',
    desc: 'Your updates, level-ups and announcements from Explore Malta.',
    url: `${BASE_URL}/malta/notifications/`,
    noindex: true,
  },
};
