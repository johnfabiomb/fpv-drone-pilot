import { Component, DestroyRef, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PwaPromptComponent } from './components/pwa-prompt/pwa-prompt.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { WelcomePopupComponent } from './components/welcome-popup/welcome-popup.component';
import { AuthService } from './shared/services/auth.service';
import { UserDataService } from './shared/services/user-data.service';
import { version } from '../../package.json';
import { filter } from 'rxjs/operators';

const MAP_ROUTES = ['/malta', '/'];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PwaPromptComponent, AuthModalComponent, WelcomePopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly version = version;
  isMapRoute = true;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly authService = inject(AuthService);
  // Eagerly instantiate so its effect() runs from app startup
  private readonly _userData = inject(UserDataService);

  private readonly HASH_RENAMES: Record<string, string> = {
    '/list':  '/malta/list',
    '/trend': '/malta/30-places-2026',
    '/plan':  '/malta/plan',
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.handleLegacyHashUrls();
      this.handleRedirectParam();
      this.handleEmailSignInLink();
    }

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((e: NavigationEnd) => {
        const url = e.urlAfterRedirects;
        this.isMapRoute = MAP_ROUTES.some(r =>
          url === r || url.startsWith(r + '?') || url.startsWith('/malta/'),
        );
      });
  }

  private handleLegacyHashUrls(): void {
    const hash = window.location.hash;
    if (!hash.startsWith('#/')) return;
    const hashContent = hash.slice(1);
    const qIdx = hashContent.indexOf('?');
    const oldPath = qIdx === -1 ? hashContent : hashContent.slice(0, qIdx);
    const query   = qIdx === -1 ? '' : hashContent.slice(qIdx);
    const newUrl  = (this.HASH_RENAMES[oldPath] ?? oldPath) + query;
    this.router.navigateByUrl(newUrl, { replaceUrl: true });
  }

  private handleRedirectParam(): void {
    const redirect = new URLSearchParams(window.location.search).get('redirect');
    if (redirect) {
      this.router.navigateByUrl(decodeURIComponent(redirect), { replaceUrl: true });
    }
  }

  private handleEmailSignInLink(): void {
    if (!this.authService.isEmailSignInLink(window.location.href)) return;
    this.authService.completeEmailSignIn(window.location.href).then(completed => {
      if (completed) {
        // Strip auth params from the URL after sign-in
        this.router.navigateByUrl('/malta', { replaceUrl: true });
      }
    });
  }
}
