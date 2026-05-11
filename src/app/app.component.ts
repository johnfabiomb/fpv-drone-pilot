import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { PwaPromptComponent } from './components/pwa-prompt/pwa-prompt.component';
import { version } from '../../package.json';
import { filter } from 'rxjs/operators';

const MAP_ROUTES = ['/malta', '/'];

@Component({
    selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, CommonModule, ComponentsModule, PwaPromptComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fpv-pilot';
  readonly version = version;
  map = false;
  isMapRoute = true;

  ngAfterViewInit() {
    this.map = true;
  }

  private platformId = inject(PLATFORM_ID);
  constructor(private router: Router) {}

  // Renamed routes that need explicit mapping from old hash paths
  private readonly HASH_RENAMES: Record<string, string> = {
    '/list':  '/malta/list',
    '/trend': '/malta/30-places-2026',
    '/plan':  '/malta/plan',
  };

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Handle legacy hash URLs (e.g. /#/malta → /malta, /#/list → /malta/list)
      const hash = window.location.hash;
      if (hash.startsWith('#/')) {
        const hashContent = hash.slice(1); // drop '#', keep leading '/'
        const qIdx = hashContent.indexOf('?');
        const oldPath = qIdx === -1 ? hashContent : hashContent.slice(0, qIdx);
        const query   = qIdx === -1 ? '' : hashContent.slice(qIdx);
        const newUrl  = (this.HASH_RENAMES[oldPath] ?? oldPath) + query;
        this.router.navigateByUrl(newUrl, { replaceUrl: true });
      }

      // Handle 404.html redirect param for non-prerendered paths
      const redirect = new URLSearchParams(window.location.search).get('redirect');
      if (redirect) {
        this.router.navigateByUrl(decodeURIComponent(redirect), { replaceUrl: true });
      }
    }

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.isMapRoute = MAP_ROUTES.some(r => e.urlAfterRedirects === r || e.urlAfterRedirects.startsWith(r + '?') || e.urlAfterRedirects.startsWith('/malta/'));
    });
  }
  
}
