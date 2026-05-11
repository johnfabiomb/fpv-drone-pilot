import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { CommonModule, Location } from '@angular/common';
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

  constructor(private location: Location, private router: Router) {}

  ngOnInit() {
    this.ensureHashInUrl();
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.isMapRoute = MAP_ROUTES.some(r => e.urlAfterRedirects === r || e.urlAfterRedirects.startsWith(r + '?') || e.urlAfterRedirects.startsWith('/malta/'));
    });
  }
  
  ensureHashInUrl() {
    const currentUrl = window.location.href;
  
    // Check if the current URL does not already have a hash
    if (!currentUrl.includes('#')) {
      // Get the current path (without the hash) and ensure no duplicate slashes
      const currentPath = window.location.pathname;
  
      // Remove the leading slash if it's already there to prevent double slashes
      const cleanPath = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
      
      // Construct the new URL with the hash and path
      const newUrl = `${cleanPath}${window.location.search}`;
  
      // Replace the current state with the new URL, without reloading the page
      this.location.replaceState(newUrl);
    }
  }
}
