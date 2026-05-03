import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

const BASE_URL = 'https://johnfabiomb.com';
const DEFAULT_IMAGE = `${BASE_URL}/assets/map-min.png`;

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  updateMetaData(location?: any): void {
    if (location) {
      const title = `${location.title} - Explore Malta`;
      const description = location.description.replace(/<[^>]+>/g, '');
      const keywords = location.keywords || 'Malta, travel, nature, sightseeing';
      const image = location.img?.startsWith('http') ? location.img : `${BASE_URL}${location.img}`;
      const slug = encodeURIComponent(location.title.replace(' ', '-'));
      const url = `${BASE_URL}/#/malta?title=${slug}`;

      this.titleService.setTitle(title);
      this.metaService.updateTag({ name: 'description', content: description });
      this.metaService.updateTag({ name: 'keywords', content: keywords });
      this.metaService.updateTag({ property: 'og:title', content: title });
      this.metaService.updateTag({ property: 'og:description', content: description });
      this.metaService.updateTag({ property: 'og:image', content: image });
      this.metaService.updateTag({ property: 'og:url', content: url });
      this.metaService.updateTag({ name: 'twitter:title', content: title });
      this.metaService.updateTag({ name: 'twitter:description', content: description });
      this.metaService.updateTag({ name: 'twitter:image', content: image });

      this.updateCanonical(url);
      this.updateJsonLd(location, url, description, image);
    } else {
      const url = `${BASE_URL}/`;
      this.titleService.setTitle('Explore Malta - Your Guide to the Best Spots on the Island');
      this.metaService.updateTag({ name: 'description', content: 'Discover hidden gems, scenic landscapes, and top attractions in Malta. Use our interactive map to explore the island\'s best beaches, historic sites, and natural wonders.' });
      this.metaService.updateTag({ name: 'keywords', content: 'Malta, travel, nature, sightseeing, Explore Malta, Malta map, attractions, beaches, historic sites, local guide' });
      this.metaService.updateTag({ property: 'og:title', content: 'Explore Malta - Your Guide to the Best Spots on the Island' });
      this.metaService.updateTag({ property: 'og:description', content: 'Discover Malta like never before with my FREE custom map.' });
      this.metaService.updateTag({ property: 'og:image', content: DEFAULT_IMAGE });
      this.metaService.updateTag({ property: 'og:url', content: url });
      this.metaService.updateTag({ name: 'twitter:title', content: 'Explore Malta - Your Guide to the Best Spots on the Island' });
      this.metaService.updateTag({ name: 'twitter:description', content: 'Discover Malta like never before with my FREE custom map.' });
      this.metaService.updateTag({ name: 'twitter:image', content: DEFAULT_IMAGE });
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

  private updateJsonLd(location: any, url: string, description: string, image: string): void {
    const script = this.document.querySelector('script[type="application/ld+json"]');
    if (!script) return;
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      name: location.title,
      description,
      url,
      image,
      address: { '@type': 'PostalAddress', addressLocality: 'Malta', addressCountry: 'MT' },
    };
    if (location.lat && location.lon) {
      schema.geo = { '@type': 'GeoCoordinates', latitude: location.lat, longitude: location.lon };
    }
    if (location.rating) {
      schema.aggregateRating = { '@type': 'AggregateRating', ratingValue: location.rating, bestRating: 5 };
    }
    script.textContent = JSON.stringify(schema);
  }

  private resetJsonLd(): void {
    const script = this.document.querySelector('script[type="application/ld+json"]');
    if (!script) return;
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      name: 'Explore Malta - Your Guide to the Best Spots on the Island',
      description: 'Discover Malta like never before with my FREE custom map.',
      url: `${BASE_URL}/`,
      image: DEFAULT_IMAGE,
      address: { '@type': 'PostalAddress', addressLocality: 'Malta', addressCountry: 'MT' },
    });
  }
}
