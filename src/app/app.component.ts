import { Component, DestroyRef, OnInit, PLATFORM_ID, computed, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PwaPromptComponent } from '@layout/pwa-prompt/pwa-prompt.component';
import { AuthModalComponent } from '@layout/auth-modal/auth-modal.component';
import { WelcomePopupComponent } from '@layout/welcome-popup/welcome-popup.component';
import { AppModalComponent } from '@ui/modal/app-modal.component';
import { UserProfileCardComponent } from '@layout/user-profile-card/user-profile-card.component';
import { LevelsModalComponent } from '@layout/levels-modal/levels-modal.component';
import { EditProfileModalComponent } from '@ui/edit-profile-modal/edit-profile-modal.component';
import { AuthService } from '@core/services/auth.service';
import { UserDataService } from '@core/services/user-data.service';
import { ProfileModalService } from '@core/services/profile-modal.service';
import { LevelsModalService } from '@core/services/levels-modal.service';
import { EditProfileModalService } from '@core/services/edit-profile-modal.service';
import { version } from '../../package.json';
import { filter } from 'rxjs/operators';

const MAP_ROUTES = ['/malta', '/'];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PwaPromptComponent, AuthModalComponent, WelcomePopupComponent, AppModalComponent, UserProfileCardComponent, LevelsModalComponent, EditProfileModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly version = version;
  isMapRoute = true;

  private readonly platformId   = inject(PLATFORM_ID);
  private readonly router       = inject(Router);
  private readonly destroyRef   = inject(DestroyRef);
  readonly authService          = inject(AuthService);
  readonly profileModal         = inject(ProfileModalService);
  readonly levelsModal          = inject(LevelsModalService);
  readonly editProfileModal     = inject(EditProfileModalService);
  readonly userData             = inject(UserDataService);
  readonly levelUpToast         = computed(() => this.userData.levelUpToast());

  constructor() {
    effect(() => {
      if (this.userData.needsDisplayName()) {
        this.editProfileModal.open('first-login');
      }
    });
  }

  private readonly HASH_RENAMES: Record<string, string> = {
    '/list':  '/malta/list',
    '/trend': '/malta/30-places-2026',
    '/plan':  '/malta/plan',
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.handleLegacyHashUrls();
      this.handleRedirectParam();
      this.handleAuthRedirect();
      this.captureReferralCode();
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

  private captureReferralCode(): void {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (!ref) return;
    sessionStorage.setItem('vm_ref', ref);
    params.delete('ref');
    const newSearch = params.toString();
    const newUrl = window.location.pathname + (newSearch ? '?' + newSearch : '') + window.location.hash;
    window.history.replaceState({}, '', newUrl);
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

  private handleAuthRedirect(): void {
    const hash   = window.location.hash;
    const search = window.location.search;
    if (hash.includes('access_token=') || new URLSearchParams(search).has('code')) {
      const returnPath = this.authService.consumeReturnPath();
      this.router.navigateByUrl(returnPath, { replaceUrl: true });
    }
  }
}
