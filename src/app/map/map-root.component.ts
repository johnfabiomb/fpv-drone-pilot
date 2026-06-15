import { Component, DestroyRef, OnInit, PLATFORM_ID, computed, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PwaPromptComponent } from '@map/layout/pwa-prompt/pwa-prompt.component';
import { AuthModalComponent } from '@map/layout/auth-modal/auth-modal.component';
import { WelcomePopupComponent } from '@map/layout/welcome-popup/welcome-popup.component';
import { AppModalComponent } from '@map/ui/modal/app-modal.component';
import { UserProfileCardComponent } from '@map/layout/user-profile-card/user-profile-card.component';
import { LevelsModalComponent } from '@map/layout/levels-modal/levels-modal.component';
import { EditProfileModalComponent } from '@map/ui/edit-profile-modal/edit-profile-modal.component';
import { AuthService } from '@map/core/services/auth.service';
import { UserDataService } from '@map/core/services/user-data.service';
import { ProfileModalService } from '@map/core/services/profile-modal.service';
import { LevelsModalService } from '@map/core/services/levels-modal.service';
import { EditProfileModalService } from '@map/core/services/edit-profile-modal.service';
import { version } from '../../../package.json';

@Component({
  selector: 'app-map-root',
  standalone: true,
  imports: [
    RouterOutlet, CommonModule,
    PwaPromptComponent, AuthModalComponent, WelcomePopupComponent,
    AppModalComponent, UserProfileCardComponent, LevelsModalComponent,
    EditProfileModalComponent,
  ],
  template: `
    <router-outlet></router-outlet>

    <app-pwa-prompt></app-pwa-prompt>
    <span class="app-version">v{{ version }}</span>
    <app-auth-modal *ngIf="authService.showLoginModal()"></app-auth-modal>
    <app-welcome-popup></app-welcome-popup>

    <div class="level-up-toast" *ngIf="levelUpToast() as toast">
      🎉 Level up! {{ toast.emoji }} {{ toast.name }}
    </div>

    @if (profileModal.current(); as profile) {
      <app-modal maxWidth="280px" (closeRequested)="profileModal.hide()">
        <app-user-profile-card
          [photoURL]="profile.photoURL"
          [displayName]="profile.displayName"
          [levelId]="profile.levelId"
          [levelLabel]="profile.levelLabel"
          [isAdmin]="profile.isAdmin"
          [roleLabel]="profile.roleLabel"
          [activeLabel]="profile.activeLabel"
          [levelClickable]="authService.isLoggedIn()"
          (levelClicked)="levelsModal.open()">
        </app-user-profile-card>
      </app-modal>
    }

    <app-levels-modal *ngIf="levelsModal.isOpen()" (closeRequested)="levelsModal.close()"></app-levels-modal>

    <app-edit-profile-modal
      *ngIf="editProfileModal.isOpen()"
      [isFirstLogin]="editProfileModal.mode() === 'first-login'"
      (saved)="editProfileModal.close()"
      (dismissed)="editProfileModal.close()">
    </app-edit-profile-modal>
  `,
  styles: [`
    .level-up-toast {
      position: fixed;
      bottom: 84px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-primary);
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      padding: 10px 20px;
      border-radius: 24px;
      box-shadow: 0 4px 16px rgba(244, 169, 34, 0.45);
      white-space: nowrap;
      z-index: 9000;
      pointer-events: none;
      animation: toastPop 0.2s ease;
    }
    @keyframes toastPop {
      from { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.95); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
    }
    .app-version {
      position: fixed;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 6px;
      color: var(--color-text-base);
      opacity: 0.4;
      pointer-events: none;
      z-index: 9999;
      letter-spacing: 0.3px;
      font-family: monospace;
      text-shadow: 0 1px 2px rgba(255,255,255,0.6);
    }
  `],
})
export class MapRootComponent implements OnInit {
  readonly version = version;

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
