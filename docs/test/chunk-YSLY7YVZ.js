import {
  Meta,
  Title
} from "./chunk-WKMKAAWK.js";
import {
  DOCUMENT,
  inject,
  ɵɵdefineInjectable
} from "./chunk-YX7TN7IZ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-TWWAJFRB.js";

// src/app/map/core/services/seo.config.ts
var BASE_URL = "https://johnfabiomb.com";
var DEFAULT_IMAGE = `${BASE_URL}/assets/og-malta.jpg`;
var DEFAULT_SEO = {
  title: "Explore Malta - Hidden Gems, Caves & Secret Spots | Interactive Map",
  desc: "Discover Malta's best hidden gems, secret caves, beaches and historical sites with a free interactive map by John Monta\xF1o. 70+ curated locations with routes, photos and partner deals.",
  url: `${BASE_URL}/`,
  image: DEFAULT_IMAGE,
  imageAlt: "Interactive map of Malta showing hidden gems and secret spots",
  keywords: "Malta hidden gems, Malta caves, Malta beaches, Malta secret spots, Malta hiking, explore Malta, Malta interactive map, Gozo hidden spots, Malta travel guide, Malta deals, Malta water sports"
};
var TREND_SEO = {
  title: "30 Best Places to Visit in Malta (2026) \xB7 Explorer's Guide",
  desc: "Explore 30 of Malta's most breathtaking hidden gems \u2014 sea caves, cliff trails, remote valleys and secret coastlines most tourists never find. A firsthand bucket-list by John Monta\xF1o.",
  url: `${BASE_URL}/malta/30-places-2026/`,
  image: `${BASE_URL}/assets/images/places/ta-maria-cave/TaMarijaCave.png`,
  imageAlt: "Ta' Marija Cave \u2014 Malta hidden gem",
  keywords: "places to visit in Malta, best places Malta 2026, Malta bucket list, Malta hidden gems, Malta travel guide, Malta sea caves, Malta cliff walks, Gozo hidden spots, Malta hiking trails, what to see in Malta, Malta must see, Malta off the beaten path"
};
var PAGE_SEO = {
  map: {
    title: "Explore Malta - Hidden Gems, Caves & Secret Spots | Interactive Map",
    desc: "Discover Malta's best hidden gems, secret caves, beaches and historical sites with a free interactive map by John Monta\xF1o. 70+ curated locations with routes, photos and partner deals.",
    url: `${BASE_URL}/malta/`
  },
  list: {
    title: "Browse All Locations \xB7 Explore Malta",
    desc: "Browse 70+ hidden gems, caves, beaches and historical sites across Malta and Gozo. Filter by type, sort by rating or distance from you.",
    url: `${BASE_URL}/malta/list/`
  },
  deals: {
    title: "Malta Local Deals | Tours, Stays & Water Sports | Explore Malta",
    desc: "Real discounts from local Malta businesses \u2014 water sports, kayaking, boat trips, hotels and restaurants. Partner deals personally recommended by John Monta\xF1o.",
    url: `${BASE_URL}/malta/deals/`
  },
  plan: {
    title: "Route Builder \xB7 Explore Malta",
    desc: "Plan your perfect route across Malta's hidden gems. Build a custom route connecting caves, beaches and historical sites curated by John Monta\xF1o.",
    url: `${BASE_URL}/plan/`
  },
  pay: {
    title: "Payment \xB7 John Monta\xF1o",
    desc: "Secure payment page for content creation services by John Monta\xF1o. Pay safely via Stripe.",
    url: `${BASE_URL}/pay/`
  },
  "pay-success": {
    title: "Payment Confirmed \xB7 John Monta\xF1o",
    desc: "Your payment has been confirmed. Book your slot with John Monta\xF1o.",
    url: `${BASE_URL}/pay/success/`,
    noindex: true
  },
  privacy: {
    title: "Privacy Policy \xB7 Explore Malta",
    desc: "Read the Privacy Policy for Explore Malta \u2014 covering account data, XP and level system, group membership, Google Analytics, AdSense, and GDPR rights.",
    url: `${BASE_URL}/privacy/`
  },
  cookies: {
    title: "Cookie Policy \xB7 Explore Malta",
    desc: "Read the Cookie Policy for Explore Malta, including cookies and localStorage used for authentication, analytics, and personalised ads.",
    url: `${BASE_URL}/cookies/`
  },
  about: {
    title: "About \xB7 Explore Malta",
    desc: "Explore Malta is an original travel guide by John Monta\xF1o \u2014 70+ hidden gems, sea caves, trails and partner deals across Malta and Gozo.",
    url: `${BASE_URL}/about/`
  },
  contact: {
    title: "Contact \xB7 Explore Malta",
    desc: "Contact information for Explore Malta and site owner John Monta\xF1o.",
    url: `${BASE_URL}/contact/`
  },
  groups: {
    title: "Explore Together \xB7 Find Hiking Groups in Malta",
    desc: "Join or create hiking groups for Malta's best spots. Find others to explore sea caves, cliffs, and hidden gems with \u2014 organised by real explorers.",
    url: `${BASE_URL}/malta/groups/`
  },
  leaderboard: {
    title: "Malta Explorers Rankings | Explore Malta",
    desc: "See the top Malta explorers ranked by level and XP. Explore hidden gems, earn points and climb the leaderboard.",
    url: `${BASE_URL}/malta/leaderboard/`
  },
  notifications: {
    title: "Notifications | Explore Malta",
    desc: "Your updates, level-ups and announcements from Explore Malta.",
    url: `${BASE_URL}/malta/notifications/`,
    noindex: true
  }
};

// src/app/map/core/services/seo.service.ts
var SeoService = class _SeoService {
  constructor() {
    this.titleService = inject(Title);
    this.metaService = inject(Meta);
    this.document = inject(DOCUMENT);
  }
  setPage(page) {
    this.apply(PAGE_SEO[page]);
  }
  setTrendPage(revealed) {
    this.apply(TREND_SEO);
    this.setTrendJsonLd(revealed);
  }
  updateMetaData(location) {
    if (!location) {
      this.apply(DEFAULT_SEO);
      this.resetJsonLd();
      return;
    }
    const rawDesc = location.description.replace(/<[^>]+>/g, "").trim();
    const image = location.img?.startsWith("http") ? location.img : `${BASE_URL}${location.img}`;
    const url = `${BASE_URL}/malta/locations/${location.slug}/`;
    const config = {
      title: `${location.title} - Malta Hidden Gem | Explore Malta`,
      desc: this.truncate(rawDesc, 155),
      url,
      image,
      imageAlt: `${location.title} - Malta`,
      keywords: location.keywords ?? "Malta, travel, nature, hidden gems, sightseeing"
    };
    this.apply(config);
    this.updateJsonLd(location, config);
  }
  setProviderPage(provider) {
    const rawDesc = provider.description?.replace(/<[^>]+>/g, "").trim() ?? provider.tagline ?? "";
    const image = provider.coverImage ? provider.coverImage.startsWith("http") ? provider.coverImage : `${BASE_URL}${provider.coverImage}` : DEFAULT_IMAGE;
    this.apply({
      title: `${provider.name} \xB7 Malta ${this.categoryLabel(provider.category)} | Explore Malta`,
      desc: this.truncate(rawDesc || `Book exclusive deals with ${provider.name} in Malta.`, 155),
      url: `${BASE_URL}/malta/providers/${provider.id}/`,
      image,
      imageAlt: `${provider.name} - Malta`,
      keywords: `${provider.name}, Malta ${provider.category}, Malta deals, Explore Malta`
    });
  }
  setExperiencePage(experience, provider) {
    const rawDesc = experience.description?.replace(/<[^>]+>/g, "").trim() || experience.tagline;
    const cover = experience.coverImage ?? provider.coverImage ?? null;
    const image = cover ? cover.startsWith("http") ? cover : `${BASE_URL}${cover}` : DEFAULT_IMAGE;
    this.apply({
      title: `${experience.title} in Malta \xB7 with ${provider.name} | Explore Malta`,
      desc: this.truncate(rawDesc || `${experience.title} in Malta with ${provider.name}.`, 155),
      url: `${BASE_URL}/malta/experiences/${experience.id}/`,
      image,
      imageAlt: `${experience.title} - Malta`,
      keywords: `${experience.title}, Malta, ${provider.name}, things to do in Malta, Explore Malta`
    });
  }
  apply(config) {
    const image = config.image ?? DEFAULT_IMAGE;
    const imageAlt = config.imageAlt ?? "";
    const robots = config.noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large";
    this.titleService.setTitle(config.title);
    this.metaService.updateTag({ name: "description", content: config.desc });
    if (config.keywords) {
      this.metaService.updateTag({ name: "keywords", content: config.keywords });
    }
    this.metaService.updateTag({ property: "og:title", content: config.title });
    this.metaService.updateTag({ property: "og:description", content: config.desc });
    this.metaService.updateTag({ property: "og:url", content: config.url });
    this.metaService.updateTag({ property: "og:image", content: image });
    this.metaService.updateTag({ property: "og:image:alt", content: imageAlt });
    this.metaService.updateTag({ property: "og:locale", content: "en_US" });
    this.metaService.updateTag({ name: "twitter:title", content: config.title });
    this.metaService.updateTag({ name: "twitter:description", content: config.desc });
    this.metaService.updateTag({ name: "twitter:image", content: image });
    this.metaService.updateTag({ name: "twitter:image:alt", content: imageAlt });
    this.metaService.updateTag({ name: "robots", content: robots });
    this.updateCanonical(config.url);
  }
  updateCanonical(url) {
    let link = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement("link");
      link.setAttribute("rel", "canonical");
      this.document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }
  updateJsonLd(location, config) {
    const script = this.document.querySelector('script[type="application/ld+json"]');
    if (!script)
      return;
    const attraction = {
      "@type": "TouristAttraction",
      "@id": config.url,
      name: location.title,
      description: config.desc,
      url: config.url,
      image: config.image,
      address: {
        "@type": "PostalAddress",
        addressLocality: location.locality ?? "Malta",
        addressCountry: "MT"
      },
      creator: { "@id": `${BASE_URL}/#person` }
    };
    if (location.lat && location.lon) {
      attraction["geo"] = {
        "@type": "GeoCoordinates",
        latitude: location.lat,
        longitude: location.lon
      };
    }
    if (location.tags?.length) {
      attraction["amenityFeature"] = location.tags.map((tag) => ({
        "@type": "LocationFeatureSpecification",
        name: tag,
        value: true
      }));
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [this.websiteNode(), this.personNode(), attraction]
    });
  }
  setTrendJsonLd(revealed) {
    const script = this.document.querySelector('script[type="application/ld+json"]');
    if (!script)
      return;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        this.websiteNode(),
        this.personNode(),
        {
          "@type": "ItemList",
          "@id": TREND_SEO.url,
          name: "30 Best Places to Visit in Malta",
          description: TREND_SEO.desc,
          url: TREND_SEO.url,
          numberOfItems: 30,
          itemListElement: revealed.map((loc) => ({
            "@type": "ListItem",
            position: loc.num,
            name: loc.name,
            url: loc.id !== null ? `${BASE_URL}/malta?locationId=${loc.id}` : TREND_SEO.url
          }))
        }
      ]
    });
  }
  resetJsonLd() {
    const script = this.document.querySelector('script[type="application/ld+json"]');
    if (!script)
      return;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        __spreadProps(__spreadValues({}, this.websiteNode()), {
          description: "Interactive map of Malta's best hidden gems, caves, beaches and historical sites curated by John Monta\xF1o.",
          inLanguage: "en",
          image: DEFAULT_IMAGE
        }),
        this.personNode(),
        {
          "@type": "TouristInformationCenter",
          "@id": `${BASE_URL}/#map`,
          name: "Explore Malta - Interactive Map",
          description: "Free interactive map featuring 70+ hidden gems, caves, beaches and historical sites across Malta and Gozo.",
          url: `${BASE_URL}/`,
          image: DEFAULT_IMAGE,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Malta",
            addressCountry: "MT"
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 35.9375,
            longitude: 14.3754
          },
          creator: { "@id": `${BASE_URL}/#person` }
        }
      ]
    });
  }
  websiteNode() {
    return {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: "Explore Malta",
      author: { "@id": `${BASE_URL}/#person` }
    };
  }
  personNode() {
    return {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "John Monta\xF1o",
      jobTitle: "Explorer & Content Creator",
      url: `${BASE_URL}/`,
      sameAs: ["https://www.instagram.com/johnfabiomb/"]
    };
  }
  categoryLabel(category) {
    const labels = {
      "water-sports": "Water Sports",
      "tour": "Boat Tour",
      "hotel": "Hotel",
      "restaurant": "Restaurant",
      "experience": "Experience",
      "tours": "Tours"
    };
    return labels[category] ?? category;
  }
  truncate(text, maxLength) {
    return text.length <= maxLength ? text : `${text.substring(0, maxLength - 3)}...`;
  }
  static {
    this.\u0275fac = function SeoService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SeoService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SeoService, factory: _SeoService.\u0275fac, providedIn: "root" });
  }
};

export {
  SeoService
};
//# sourceMappingURL=chunk-YSLY7YVZ.js.map
