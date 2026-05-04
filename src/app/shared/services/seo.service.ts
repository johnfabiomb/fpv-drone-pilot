import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

const BASE_URL = 'https://johnfabiomb.com';
const DEFAULT_IMAGE = `${BASE_URL}/assets/map-min.png`;
const DEFAULT_TITLE = 'Explore Malta - Hidden Gems, Caves & Secret Spots | Interactive Map';
const DEFAULT_DESC = 'Discover Malta\'s best hidden gems, secret caves, beaches and historical sites with a free interactive map by FPV drone pilot John Montaño. 60+ curated locations with routes and photos.';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  updateMetaData(location?: any): void {
    if (location) {
      const title = `${location.title} - Malta Hidden Gem | Explore Malta`;
      const rawDesc = location.description.replace(/<[^>]+>/g, '').trim();
      const description = this.truncate(rawDesc, 155);
      const keywords = location.keywords || 'Malta, travel, nature, hidden gems, sightseeing';
      const image = location.img?.startsWith('http') ? location.img : `${BASE_URL}${location.img}`;
      const imageAlt = `${location.title} - Malta`;
      const slug = encodeURIComponent(location.title.replace(' ', '-'));
      const url = `${BASE_URL}/#/malta?title=${slug}`;

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
      this.metaService.updateTag({ name: 'keywords', content: 'Malta hidden gems, Malta caves, Malta beaches, Malta secret spots, Malta hiking, Malta FPV, explore Malta, Malta interactive map, Gozo hidden spots, Malta travel guide' });
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

  private updateJsonLd(location: any, url: string, description: string, image: string): void {
    const script = this.document.querySelector('script[type="application/ld+json"]');
    if (!script) return;

    const attraction: any = {
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
      attraction.geo = {
        '@type': 'GeoCoordinates',
        latitude: location.lat,
        longitude: location.lon,
      };
    }

    if (location.rating) {
      attraction.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: location.rating,
        bestRating: 5,
        worstRating: 1,
      };
    }

    if (location.tags?.length) {
      attraction.amenityFeature = location.tags.map((tag: string) => ({
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
          description: 'Interactive map of Malta\'s best hidden gems, caves, beaches and historical sites curated by FPV drone pilot John Montaño.',
          inLanguage: 'en',
          image: DEFAULT_IMAGE,
          author: { '@id': `${BASE_URL}/#person` },
        },
        {
          '@type': 'Person',
          '@id': `${BASE_URL}/#person`,
          name: 'John Montaño',
          jobTitle: 'FPV Drone Pilot & Content Creator',
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

  private truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }
}
