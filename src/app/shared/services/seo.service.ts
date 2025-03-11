import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root' // Makes the service available globally
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  /**
   * Updates the page title and metadata dynamically based on a given location object.
   * @param location - The location object from the JSON data.
   */
  updateMetaData(location?: any): void {
    if (location) {
      const title = location.title;
      const description = location.description.replace(/<b>|<\/b>/g, ''); // Remove HTML tags
      const keywords = location.keywords || 'Malta, travel, nature, sightseeing';
      const image = location.img;
      const url = window.location.href;

      // Set page title
      this.titleService.setTitle(`${title} - Explore Malta`);

      // Update meta tags
      this.metaService.updateTag({ name: 'description', content: description });
      this.metaService.updateTag({ name: 'keywords', content: keywords });

      // Open Graph (Facebook, LinkedIn) & Twitter Meta Tags
      this.metaService.updateTag({ property: 'og:title', content: title });
      this.metaService.updateTag({ property: 'og:description', content: description });
      this.metaService.updateTag({ property: 'og:image', content: image });
      this.metaService.updateTag({ property: 'og:url', content: url });
      this.metaService.updateTag({ name: 'twitter:title', content: title });
      this.metaService.updateTag({ name: 'twitter:description', content: description });
      this.metaService.updateTag({ name: 'twitter:image', content: image });
    } else {
      // Default SEO metadata if location is not found
      this.titleService.setTitle('Explore Malta - Your Guide to the Best Spots on the Island');
      this.metaService.updateTag({ name: 'description', content: 'Discover hidden gems, scenic landscapes, and top attractions in Malta. Use our interactive map to explore the island’s best beaches, historic sites, and natural wonders.' });
      this.metaService.updateTag({ name: 'keywords', content: 'Malta, travel, nature, sightseeing, Malta, Explore Malta, Malta map, travel, attractions, beaches, historic sites, local guide' });
    }
  }
}
