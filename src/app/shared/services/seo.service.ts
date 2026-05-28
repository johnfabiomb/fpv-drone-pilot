import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Location, Provider } from '../models';

const BASE_URL = 'https://johnfabiomb.com';
const DEFAULT_IMAGE = `${BASE_URL}/assets/map-min.png`;
const DEFAULT_TITLE = 'Explore Malta - Hidden Gems, Caves & Secret Spots | Interactive Map';
const DEFAULT_DESC = 'Discover Malta\'s best hidden gems, secret caves, beaches and historical sites with a free interactive map by John Montaño. 60+ curated locations with routes and photos.';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  setTrendPage(revealed: Array<{ num: number; name: string; id: number | null }>): void {
    const title = '30 Best Places to Visit in Malta (2026) · Explorer\'s Guide';
    const desc = "Explore 30 of Malta's most breathtaking hidden gems — sea caves, cliff trails, remote valleys and secret coastlines most tourists never find. A firsthand bucket-list by John Montaño.";
    const url = `${BASE_URL}/malta/30-places-2026`;
    const image = `${BASE_URL}/assets/images/places/ta-maria-cave/TaMarijaCave.png`;
    const keywords = 'places to visit in Malta, best places Malta 2026, Malta bucket list, Malta hidden gems, Malta travel guide, Malta sea caves, Malta cliff walks, Gozo hidden spots, Malta hiking trails, what to see in Malta, Malta must see, Malta off the beaten path';

    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: desc });
    this.metaService.updateTag({ name: 'keywords', content: keywords });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: desc });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:image', content: image });
    this.metaService.updateTag({ property: 'og:image:alt', content: "Ta' Marija Cave — Malta hidden gem" });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: desc });
    this.metaService.updateTag({ name: 'twitter:image', content: image });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large' });
    this.updateCanonical(url);

    const script = this.document.querySelector('script[type="application/ld+json"]');
    if (!script) return;
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          url: `${BASE_URL}/`,
          name: 'Explore Malta',
          author: { '@id': `${BASE_URL}/#person` },
        },
        {
          '@type': 'Person',
          '@id': `${BASE_URL}/#person`,
          name: 'John Montaño',
          jobTitle: 'Explorer & Content Creator',
          url: `${BASE_URL}/`,
          sameAs: ['https://www.instagram.com/johnfabiomb/'],
        },
        {
          '@type': 'ItemList',
          '@id': url,
          name: '30 Best Places to Visit in Malta',
          description: desc,
          url,
          numberOfItems: 30,
          itemListElement: revealed.map(loc => ({
            '@type': 'ListItem',
            position: loc.num,
            name: loc.name,
            url: loc.id !== null ? `${BASE_URL}/malta?locationId=${loc.id}` : url,
          })),
        },
      ],
    });
  }

  setPage(page: 'map' | 'list' | 'deals' | 'pay' | 'pay-success' | 'plan' | 'privacy' | 'cookies' | 'about' | 'contact' | 'groups'): void {
    const BASE = BASE_URL;
    const pages: Record<string, { title: string; desc: string; url: string; noindex?: boolean }> = {
      map: {
        title: DEFAULT_TITLE,
        desc: DEFAULT_DESC,
        url: `${BASE}/`,
      },
      list: {
        title: 'Browse All Locations · Explore Malta',
        desc: 'Browse 60+ hidden gems, caves, beaches and historical sites across Malta and Gozo. Filter by type, sort by rating or distance from you.',
        url: `${BASE}/malta/list`,
      },
      deals: {
        title: 'Malta Deals & Discount Coupons | Tours, Stays & Dining | Explore Malta',
        desc: 'Exclusive discount coupons for Malta tours, water sports, kayaking, boat trips, hotels and restaurants. Save on your Malta experience with partner offers from local businesses.',
        url: `${BASE}/malta/deals`,
      },
      plan: {
        title: 'Route Builder · Explore Malta',
        desc: 'Plan your perfect route across Malta\'s hidden gems. Build a custom route connecting caves, beaches and historical sites curated by John Montaño.',
        url: `${BASE}/plan`,
      },
      pay: {
        title: 'Payment · John Montaño',
        desc: 'Secure payment page for content creation services by John Montaño. Pay safely via Stripe.',
        url: `${BASE}/pay`,
      },
      'pay-success': {
        title: 'Payment Confirmed · John Montaño',
        desc: 'Your payment has been confirmed. Book your slot with John Montaño.',
        url: `${BASE}/pay/success`,
        noindex: true,
      },
      privacy: {
        title: 'Privacy Policy · Explore Malta',
        desc: 'Read the Privacy Policy for Explore Malta, including Google Analytics, AdSense, and GDPR compliance.',
        url: `${BASE}/privacy`,
      },
      cookies: {
        title: 'Cookie Policy · Explore Malta',
        desc: 'Read the Cookie Policy for Explore Malta, including how cookies are used for analytics and personalized ads.',
        url: `${BASE}/cookies`,
      },
      about: {
        title: 'About · Explore Malta',
        desc: 'Learn more about Explore Malta, its creator, and the original location content behind the site.',
        url: `${BASE}/about`,
      },
      contact: {
        title: 'Contact · Explore Malta',
        desc: 'Contact information for Explore Malta and site owner John Montaño.',
        url: `${BASE}/contact`,
      },
      groups: {
        title: 'Explore Together · Find Hiking Groups in Malta',
        desc: 'Join or create hiking groups for Malta\'s best spots. Find others to explore sea caves, cliffs, and hidden gems with — organised by real explorers.',
        url: `${BASE}/malta/groups`,
      },
    };

    const p = pages[page];
    if (!p) return;

    this.titleService.setTitle(p.title);
    this.metaService.updateTag({ name: 'description', content: p.desc });
    this.metaService.updateTag({ property: 'og:title', content: p.title });
    this.metaService.updateTag({ property: 'og:description', content: p.desc });
    this.metaService.updateTag({ property: 'og:url', content: p.url });
    this.metaService.updateTag({ property: 'og:image', content: DEFAULT_IMAGE });
    this.metaService.updateTag({ name: 'twitter:title', content: p.title });
    this.metaService.updateTag({ name: 'twitter:description', content: p.desc });
    this.metaService.updateTag({ name: 'twitter:image', content: DEFAULT_IMAGE });
    this.updateCanonical(p.url);

    if (p.noindex) {
      this.metaService.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    } else {
      this.metaService.updateTag({ name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large' });
    }
  }

  updateMetaData(location?: Location): void {
    if (location) {
      const title = `${location.title} - Malta Hidden Gem | Explore Malta`;
      const rawDesc = location.description.replace(/<[^>]+>/g, '').trim();
      const description = this.truncate(rawDesc, 155);
      const keywords = location.keywords || 'Malta, travel, nature, hidden gems, sightseeing';
      const image = location.img?.startsWith('http') ? location.img : `${BASE_URL}${location.img}`;
      const imageAlt = `${location.title} - Malta`;
      const url = `${BASE_URL}/malta/locations/${location.slug}`;

      this.titleService.setTitle(title);
      this.metaService.updateTag({ name: 'description', content: description });
      this.metaService.updateTag({ name: 'keywords', content: keywords });
      this.metaService.updateTag({ property: 'og:title', content: title });
      this.metaService.updateTag({ property: 'og:description', content: description });
      this.metaService.updateTag({ property: 'og:image', content: image });
      this.metaService.updateTag({ property: 'og:image:alt', content: imageAlt });
      this.metaService.updateTag({ property: 'og:url', content: url });
      this.metaService.updateTag({ property: 'og:locale', content: 'en_US' });
      this.metaService.updateTag({ name: 'twitter:title', content: title });
      this.metaService.updateTag({ name: 'twitter:description', content: description });
      this.metaService.updateTag({ name: 'twitter:image', content: image });
      this.metaService.updateTag({ name: 'twitter:image:alt', content: imageAlt });

      this.updateCanonical(url);
      this.updateJsonLd(location, url, description, image);
    } else {
      const url = `${BASE_URL}/`;
      this.titleService.setTitle(DEFAULT_TITLE);
      this.metaService.updateTag({ name: 'description', content: DEFAULT_DESC });
      this.metaService.updateTag({ name: 'keywords', content: 'Malta hidden gems, Malta caves, Malta beaches, Malta secret spots, Malta hiking, explore Malta, Malta interactive map, Gozo hidden spots, Malta travel guide' });
      this.metaService.updateTag({ property: 'og:title', content: 'Explore Malta - Hidden Gems, Caves & Secret Spots' });
      this.metaService.updateTag({ property: 'og:description', content: DEFAULT_DESC });
      this.metaService.updateTag({ property: 'og:image', content: DEFAULT_IMAGE });
      this.metaService.updateTag({ property: 'og:image:alt', content: 'Interactive map of Malta showing hidden gems and secret spots' });
      this.metaService.updateTag({ property: 'og:url', content: url });
      this.metaService.updateTag({ property: 'og:locale', content: 'en_US' });
      this.metaService.updateTag({ name: 'twitter:title', content: 'Explore Malta - Hidden Gems, Caves & Secret Spots' });
      this.metaService.updateTag({ name: 'twitter:description', content: DEFAULT_DESC });
      this.metaService.updateTag({ name: 'twitter:image', content: DEFAULT_IMAGE });
      this.metaService.updateTag({ name: 'twitter:image:alt', content: 'Interactive map of Malta showing hidden gems and secret spots' });
      this.updateCanonical(url);
      this.resetJsonLd();
    }
  }

  private updateCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private updateJsonLd(location: Location, url: string, description: string, image: string): void {
    const script = this.document.querySelector('script[type="application/ld+json"]');
    if (!script) return;

    const attraction: Record<string, unknown> = {
      '@type': 'TouristAttraction',
      '@id': url,
      name: location.title,
      description,
      url,
      image,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Malta',
        addressCountry: 'MT',
      },
      creator: { '@id': `${BASE_URL}/#person` },
    };

    if (location.lat && location.lon) {
      attraction['geo'] = {
        '@type': 'GeoCoordinates',
        latitude: location.lat,
        longitude: location.lon,
      };
    }

    if (location.tags?.length) {
      attraction['amenityFeature'] = location.tags.map((tag: string) => ({
        '@type': 'LocationFeatureSpecification',
        name: tag,
        value: true,
      }));
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          url: `${BASE_URL}/`,
          name: 'Explore Malta',
          author: { '@id': `${BASE_URL}/#person` },
        },
        {
          '@type': 'Person',
          '@id': `${BASE_URL}/#person`,
          name: 'John Montaño',
          url: `${BASE_URL}/`,
          sameAs: ['https://www.instagram.com/johnfabiomb/'],
        },
        attraction,
      ],
    });
  }

  private resetJsonLd(): void {
    const script = this.document.querySelector('script[type="application/ld+json"]');
    if (!script) return;
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          url: `${BASE_URL}/`,
          name: 'Explore Malta',
          description: 'Interactive map of Malta\'s best hidden gems, caves, beaches and historical sites curated by John Montaño.',
          inLanguage: 'en',
          image: DEFAULT_IMAGE,
          author: { '@id': `${BASE_URL}/#person` },
        },
        {
          '@type': 'Person',
          '@id': `${BASE_URL}/#person`,
          name: 'John Montaño',
          jobTitle: 'Explorer & Content Creator',
          url: `${BASE_URL}/`,
          sameAs: ['https://www.instagram.com/johnfabiomb/'],
        },
        {
          '@type': 'TouristInformationCenter',
          '@id': `${BASE_URL}/#map`,
          name: 'Explore Malta - Interactive Map',
          description: 'Free interactive map featuring 60+ hidden gems, caves, beaches and historical sites across Malta and Gozo.',
          url: `${BASE_URL}/`,
          image: DEFAULT_IMAGE,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Malta',
            addressCountry: 'MT',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 35.9375,
            longitude: 14.3754,
          },
          creator: { '@id': `${BASE_URL}/#person` },
        },
      ],
    });
  }

  setProviderPage(provider: Provider): void {
    const title = `${provider.name} · Malta ${this.categoryLabel(provider.category)} | Explore Malta`;
    const rawDesc = provider.description?.replace(/<[^>]+>/g, '').trim() ?? provider.tagline ?? '';
    const desc = this.truncate(rawDesc || `Book exclusive deals with ${provider.name} in Malta.`, 155);
    const url = `${BASE_URL}/malta/providers/${provider.id}`;
    const image = provider.coverImage
      ? (provider.coverImage.startsWith('http') ? provider.coverImage : `${BASE_URL}${provider.coverImage}`)
      : DEFAULT_IMAGE;

    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: desc });
    this.metaService.updateTag({ name: 'keywords', content: `${provider.name}, Malta ${provider.category}, Malta deals, Explore Malta` });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: desc });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:image', content: image });
    this.metaService.updateTag({ property: 'og:image:alt', content: `${provider.name} - Malta` });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: desc });
    this.metaService.updateTag({ name: 'twitter:image', content: image });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large' });
    this.updateCanonical(url);
  }

  private categoryLabel(category: string): string {
    const labels: Record<string, string> = {
      'water-sports': 'Water Sports', 'tour': 'Boat Tour', 'hotel': 'Hotel',
      'restaurant': 'Restaurant', 'experience': 'Experience',
    };
    return labels[category] ?? category;
  }

  private truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }
}
