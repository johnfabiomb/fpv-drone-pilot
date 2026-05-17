import {
  Meta,
  Title
} from "./chunk-WZUM6HQY.js";
import {
  DOCUMENT
} from "./chunk-FPOQEQN6.js";
import {
  inject,
  ɵɵdefineInjectable
} from "./chunk-K5PYHWDH.js";

// src/app/shared/services/seo.service.ts
var BASE_URL = "https://johnfabiomb.com";
var DEFAULT_IMAGE = `${BASE_URL}/assets/map-min.png`;
var DEFAULT_TITLE = "Explore Malta - Hidden Gems, Caves & Secret Spots | Interactive Map";
var DEFAULT_DESC = "Discover Malta's best hidden gems, secret caves, beaches and historical sites with a free interactive map by FPV drone pilot John Monta\xF1o. 60+ curated locations with routes and photos.";
var SeoService = class _SeoService {
  constructor() {
    this.titleService = inject(Title);
    this.metaService = inject(Meta);
    this.document = inject(DOCUMENT);
  }
  setTrendPage(revealed) {
    const title = "30 Best Places to Visit in Malta (2026) \xB7 FPV Drone Guide";
    const desc = "Explore 30 of Malta's most breathtaking hidden gems \u2014 sea caves, cliff trails, remote valleys and secret coastlines most tourists never find. A firsthand bucket-list by John Monta\xF1o.";
    const url = `${BASE_URL}/malta/30-places-2026`;
    const image = `${BASE_URL}/assets/images/places/ta-maria-cave/TaMarijaCave.png`;
    const keywords = "places to visit in Malta, best places Malta 2026, Malta bucket list, Malta hidden gems, Malta travel guide, Malta sea caves, Malta cliff walks, Gozo hidden spots, Malta hiking trails, what to see in Malta, Malta must see, Malta off the beaten path";
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: "description", content: desc });
    this.metaService.updateTag({ name: "keywords", content: keywords });
    this.metaService.updateTag({ property: "og:title", content: title });
    this.metaService.updateTag({ property: "og:description", content: desc });
    this.metaService.updateTag({ property: "og:url", content: url });
    this.metaService.updateTag({ property: "og:image", content: image });
    this.metaService.updateTag({ property: "og:image:alt", content: "Ta' Marija Cave \u2014 Malta hidden gem" });
    this.metaService.updateTag({ name: "twitter:title", content: title });
    this.metaService.updateTag({ name: "twitter:description", content: desc });
    this.metaService.updateTag({ name: "twitter:image", content: image });
    this.metaService.updateTag({ name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" });
    this.updateCanonical(url);
    const script = this.document.querySelector('script[type="application/ld+json"]');
    if (!script)
      return;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${BASE_URL}/#website`,
          url: `${BASE_URL}/`,
          name: "Explore Malta",
          author: { "@id": `${BASE_URL}/#person` }
        },
        {
          "@type": "Person",
          "@id": `${BASE_URL}/#person`,
          name: "John Monta\xF1o",
          jobTitle: "FPV Drone Pilot & Content Creator",
          url: `${BASE_URL}/`,
          sameAs: ["https://www.instagram.com/johnfabiomb/"]
        },
        {
          "@type": "ItemList",
          "@id": url,
          name: "30 Best Places to Visit in Malta",
          description: desc,
          url,
          numberOfItems: 30,
          itemListElement: revealed.map((loc) => ({
            "@type": "ListItem",
            position: loc.num,
            name: loc.name,
            url: loc.id !== null ? `${BASE_URL}/malta?locationId=${loc.id}` : url
          }))
        }
      ]
    });
  }
  setPage(page) {
    const BASE = BASE_URL;
    const pages = {
      map: {
        title: DEFAULT_TITLE,
        desc: DEFAULT_DESC,
        url: `${BASE}/`
      },
      list: {
        title: "Browse All Locations \xB7 Explore Malta",
        desc: "Browse 60+ hidden gems, caves, beaches and historical sites across Malta and Gozo. Filter by type, sort by rating or distance from you.",
        url: `${BASE}/malta/list`
      },
      deals: {
        title: "Malta Deals & Discount Coupons | Tours, Stays & Dining | Explore Malta",
        desc: "Exclusive discount coupons for Malta tours, water sports, kayaking, boat trips, hotels and restaurants. Save on your Malta experience with partner offers from local businesses.",
        url: `${BASE}/malta/deals`
      },
      plan: {
        title: "Route Builder \xB7 Explore Malta",
        desc: "Plan your perfect route across Malta's hidden gems. Build a custom route connecting caves, beaches and historical sites curated by John Monta\xF1o.",
        url: `${BASE}/plan`
      },
      pay: {
        title: "Payment \xB7 John Monta\xF1o \u2013 FPV Drone Pilot",
        desc: "Secure payment page for FPV drone and content creation services by John Monta\xF1o. Pay safely via Stripe.",
        url: `${BASE}/pay`
      },
      "pay-success": {
        title: "Payment Confirmed \xB7 John Monta\xF1o",
        desc: "Your payment has been confirmed. Book your slot with John Monta\xF1o \u2013 FPV drone pilot and content creator.",
        url: `${BASE}/pay/success`,
        noindex: true
      },
      privacy: {
        title: "Privacy Policy \xB7 Explore Malta",
        desc: "Read the Privacy Policy for Explore Malta, including Google Analytics, AdSense, and GDPR compliance.",
        url: `${BASE}/privacy`
      },
      cookies: {
        title: "Cookie Policy \xB7 Explore Malta",
        desc: "Read the Cookie Policy for Explore Malta, including how cookies are used for analytics and personalized ads.",
        url: `${BASE}/cookies`
      },
      about: {
        title: "About \xB7 Explore Malta",
        desc: "Learn more about Explore Malta, its creator, and the original location content behind the site.",
        url: `${BASE}/about`
      },
      contact: {
        title: "Contact \xB7 Explore Malta",
        desc: "Contact information for Explore Malta and site owner John Monta\xF1o.",
        url: `${BASE}/contact`
      }
    };
    const p = pages[page];
    if (!p)
      return;
    this.titleService.setTitle(p.title);
    this.metaService.updateTag({ name: "description", content: p.desc });
    this.metaService.updateTag({ property: "og:title", content: p.title });
    this.metaService.updateTag({ property: "og:description", content: p.desc });
    this.metaService.updateTag({ property: "og:url", content: p.url });
    this.metaService.updateTag({ property: "og:image", content: DEFAULT_IMAGE });
    this.metaService.updateTag({ name: "twitter:title", content: p.title });
    this.metaService.updateTag({ name: "twitter:description", content: p.desc });
    this.metaService.updateTag({ name: "twitter:image", content: DEFAULT_IMAGE });
    this.updateCanonical(p.url);
    if (p.noindex) {
      this.metaService.updateTag({ name: "robots", content: "noindex, nofollow" });
    } else {
      this.metaService.updateTag({ name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" });
    }
  }
  updateMetaData(location) {
    if (location) {
      const title = `${location.title} - Malta Hidden Gem | Explore Malta`;
      const rawDesc = location.description.replace(/<[^>]+>/g, "").trim();
      const description = this.truncate(rawDesc, 155);
      const keywords = location.keywords || "Malta, travel, nature, hidden gems, sightseeing";
      const image = location.img?.startsWith("http") ? location.img : `${BASE_URL}${location.img}`;
      const imageAlt = `${location.title} - Malta`;
      const slug = encodeURIComponent(location.title.replace(" ", "-"));
      const url = `${BASE_URL}/malta?title=${slug}`;
      this.titleService.setTitle(title);
      this.metaService.updateTag({ name: "description", content: description });
      this.metaService.updateTag({ name: "keywords", content: keywords });
      this.metaService.updateTag({ property: "og:title", content: title });
      this.metaService.updateTag({ property: "og:description", content: description });
      this.metaService.updateTag({ property: "og:image", content: image });
      this.metaService.updateTag({ property: "og:image:alt", content: imageAlt });
      this.metaService.updateTag({ property: "og:url", content: url });
      this.metaService.updateTag({ property: "og:locale", content: "en_US" });
      this.metaService.updateTag({ name: "twitter:title", content: title });
      this.metaService.updateTag({ name: "twitter:description", content: description });
      this.metaService.updateTag({ name: "twitter:image", content: image });
      this.metaService.updateTag({ name: "twitter:image:alt", content: imageAlt });
      this.updateCanonical(url);
      this.updateJsonLd(location, url, description, image);
    } else {
      const url = `${BASE_URL}/`;
      this.titleService.setTitle(DEFAULT_TITLE);
      this.metaService.updateTag({ name: "description", content: DEFAULT_DESC });
      this.metaService.updateTag({ name: "keywords", content: "Malta hidden gems, Malta caves, Malta beaches, Malta secret spots, Malta hiking, Malta FPV, explore Malta, Malta interactive map, Gozo hidden spots, Malta travel guide" });
      this.metaService.updateTag({ property: "og:title", content: "Explore Malta - Hidden Gems, Caves & Secret Spots" });
      this.metaService.updateTag({ property: "og:description", content: DEFAULT_DESC });
      this.metaService.updateTag({ property: "og:image", content: DEFAULT_IMAGE });
      this.metaService.updateTag({ property: "og:image:alt", content: "Interactive map of Malta showing hidden gems and secret spots" });
      this.metaService.updateTag({ property: "og:url", content: url });
      this.metaService.updateTag({ property: "og:locale", content: "en_US" });
      this.metaService.updateTag({ name: "twitter:title", content: "Explore Malta - Hidden Gems, Caves & Secret Spots" });
      this.metaService.updateTag({ name: "twitter:description", content: DEFAULT_DESC });
      this.metaService.updateTag({ name: "twitter:image", content: DEFAULT_IMAGE });
      this.metaService.updateTag({ name: "twitter:image:alt", content: "Interactive map of Malta showing hidden gems and secret spots" });
      this.updateCanonical(url);
      this.resetJsonLd();
    }
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
  updateJsonLd(location, url, description, image) {
    const script = this.document.querySelector('script[type="application/ld+json"]');
    if (!script)
      return;
    const attraction = {
      "@type": "TouristAttraction",
      "@id": url,
      name: location.title,
      description,
      url,
      image,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Malta",
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
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${BASE_URL}/#website`,
          url: `${BASE_URL}/`,
          name: "Explore Malta",
          author: { "@id": `${BASE_URL}/#person` }
        },
        {
          "@type": "Person",
          "@id": `${BASE_URL}/#person`,
          name: "John Monta\xF1o",
          url: `${BASE_URL}/`,
          sameAs: ["https://www.instagram.com/johnfabiomb/"]
        },
        attraction
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
        {
          "@type": "WebSite",
          "@id": `${BASE_URL}/#website`,
          url: `${BASE_URL}/`,
          name: "Explore Malta",
          description: "Interactive map of Malta's best hidden gems, caves, beaches and historical sites curated by FPV drone pilot John Monta\xF1o.",
          inLanguage: "en",
          image: DEFAULT_IMAGE,
          author: { "@id": `${BASE_URL}/#person` }
        },
        {
          "@type": "Person",
          "@id": `${BASE_URL}/#person`,
          name: "John Monta\xF1o",
          jobTitle: "FPV Drone Pilot & Content Creator",
          url: `${BASE_URL}/`,
          sameAs: ["https://www.instagram.com/johnfabiomb/"]
        },
        {
          "@type": "TouristInformationCenter",
          "@id": `${BASE_URL}/#map`,
          name: "Explore Malta - Interactive Map",
          description: "Free interactive map featuring 60+ hidden gems, caves, beaches and historical sites across Malta and Gozo.",
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
  truncate(text, maxLength) {
    if (text.length <= maxLength)
      return text;
    return text.substring(0, maxLength - 3) + "...";
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
//# sourceMappingURL=chunk-XBIMPO5F.js.map
