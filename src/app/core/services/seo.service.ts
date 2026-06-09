import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Location, Provider } from '@core/models';
import {
  SeoConfig, SeoPage, BASE_URL, DEFAULT_IMAGE,
  DEFAULT_SEO, TREND_SEO, PAGE_SEO,
} from './seo.config';

export type { SeoPage } from './seo.config';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  setPage(page: SeoPage): void {
    this.apply(PAGE_SEO[page]);
  }

  setTrendPage(revealed: Array<{ num: number; name: string; id: number | null }>): void {
    this.apply(TREND_SEO);
    this.setTrendJsonLd(revealed);
  }

  updateMetaData(location?: Location): void {
    if (!location) {
      this.apply(DEFAULT_SEO);
      this.resetJsonLd();
      return;
    }

    const rawDesc = location.description.replace(/<[^>]+>/g, '').trim();
    const image = location.img?.startsWith('http') ? location.img : `${BASE_URL}${location.img}`;
    const url = `${BASE_URL}/malta/locations/${location.slug}/`;

    const config: SeoConfig = {
      title: `${location.title} - Malta Hidden Gem | Explore Malta`,
      desc: this.truncate(rawDesc, 155),
      url,
      image,
      imageAlt: `${location.title} - Malta`,
      keywords: location.keywords ?? 'Malta, travel, nature, hidden gems, sightseeing',
    };

    this.apply(config);
    this.updateJsonLd(location, config);
  }

  setProviderPage(provider: Provider): void {
    const rawDesc = provider.description?.replace(/<[^>]+>/g, '').trim() ?? provider.tagline ?? '';
    const image = provider.coverImage
      ? (provider.coverImage.startsWith('http') ? provider.coverImage : `${BASE_URL}${provider.coverImage}`)
      : DEFAULT_IMAGE;

    this.apply({
      title: `${provider.name} · Malta ${this.categoryLabel(provider.category)} | Explore Malta`,
      desc: this.truncate(rawDesc || `Book exclusive deals with ${provider.name} in Malta.`, 155),
      url: `${BASE_URL}/malta/providers/${provider.id}/`,
      image,
      imageAlt: `${provider.name} - Malta`,
      keywords: `${provider.name}, Malta ${provider.category}, Malta deals, Explore Malta`,
    });
  }

  private apply(config: SeoConfig): void {
    const image = config.image ?? DEFAULT_IMAGE;
    const imageAlt = config.imageAlt ?? '';
    const robots = config.noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-snippet:-1, max-image-preview:large';

    this.titleService.setTitle(config.title);
    this.metaService.updateTag({ name: 'description', content: config.desc });
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.desc });
    this.metaService.updateTag({ property: 'og:url', content: config.url });
    this.metaService.updateTag({ property: 'og:image', content: image });
    this.metaService.updateTag({ property: 'og:image:alt', content: imageAlt });
    this.metaService.updateTag({ property: 'og:locale', content: 'en_US' });
    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.desc });
    this.metaService.updateTag({ name: 'twitter:image', content: image });
    this.metaService.updateTag({ name: 'twitter:image:alt', content: imageAlt });
    this.metaService.updateTag({ name: 'robots', content: robots });
    this.updateCanonical(config.url);
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

  private updateJsonLd(location: Location, config: SeoConfig): void {
    const script = this.document.querySelector('script[type="application/ld+json"]');
    if (!script) return;

    const attraction: Record<string, unknown> = {
      '@type': 'TouristAttraction',
      '@id': config.url,
      name: location.title,
      description: config.desc,
      url: config.url,
      image: config.image,
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.locality ?? 'Malta',
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
      '@graph': [this.websiteNode(), this.personNode(), attraction],
    });
  }

  private setTrendJsonLd(revealed: Array<{ num: number; name: string; id: number | null }>): void {
    const script = this.document.querySelector('script[type="application/ld+json"]');
    if (!script) return;

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        this.websiteNode(),
        this.personNode(),
        {
          '@type': 'ItemList',
          '@id': TREND_SEO.url,
          name: '30 Best Places to Visit in Malta',
          description: TREND_SEO.desc,
          url: TREND_SEO.url,
          numberOfItems: 30,
          itemListElement: revealed.map(loc => ({
            '@type': 'ListItem',
            position: loc.num,
            name: loc.name,
            url: loc.id !== null ? `${BASE_URL}/malta?locationId=${loc.id}` : TREND_SEO.url,
          })),
        },
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
          ...this.websiteNode(),
          description: "Interactive map of Malta's best hidden gems, caves, beaches and historical sites curated by John Montaño.",
          inLanguage: 'en',
          image: DEFAULT_IMAGE,
        },
        this.personNode(),
        {
          '@type': 'TouristInformationCenter',
          '@id': `${BASE_URL}/#map`,
          name: 'Explore Malta - Interactive Map',
          description: 'Free interactive map featuring 70+ hidden gems, caves, beaches and historical sites across Malta and Gozo.',
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

  private websiteNode(): Record<string, unknown> {
    return {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: 'Explore Malta',
      author: { '@id': `${BASE_URL}/#person` },
    };
  }

  private personNode(): Record<string, unknown> {
    return {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: 'John Montaño',
      jobTitle: 'Explorer & Content Creator',
      url: `${BASE_URL}/`,
      sameAs: ['https://www.instagram.com/johnfabiomb/'],
    };
  }

  private categoryLabel(category: string): string {
    const labels: Record<string, string> = {
      'water-sports': 'Water Sports', 'tour': 'Boat Tour', 'hotel': 'Hotel',
      'restaurant': 'Restaurant', 'experience': 'Experience', 'tours': 'Tours',
    };
    return labels[category] ?? category;
  }

  private truncate(text: string, maxLength: number): string {
    return text.length <= maxLength ? text : `${text.substring(0, maxLength - 3)}...`;
  }
}
