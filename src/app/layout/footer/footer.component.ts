import { Component, DestroyRef, HostListener, PLATFORM_ID, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { NgIf } from '@angular/common';
import { Router, RouterLink, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FEATURES } from '../../feature-flags';
import { version } from '../../../../package.json';
import { AuthService } from '@core/services/auth.service';
import { UserDataService } from '@core/services/user-data.service';
import { ProfileModalService } from '@core/services/profile-modal.service';
import { LevelsModalService } from '@core/services/levels-modal.service';
import { EditProfileModalService } from '@core/services/edit-profile-modal.service';
import { UserAvatarComponent } from '@ui/user-avatar/user-avatar.component';
import { UserProfileCardComponent } from '@layout/user-profile-card/user-profile-card.component';
import { AppModalComponent } from '@ui/modal/app-modal.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf, RouterLink, UserAvatarComponent, UserProfileCardComponent, AppModalComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly features       = FEATURES;
  readonly version        = version;
  readonly authService    = inject(AuthService);
  readonly userDataService = inject(UserDataService);
  readonly levelsModal    = inject(LevelsModalService);
  private readonly profileModal     = inject(ProfileModalService);
  readonly editProfileModal         = inject(EditProfileModalService);
  private readonly router           = inject(Router);
  private readonly destroyRef    = inject(DestroyRef);
  private readonly platformId    = inject(PLATFORM_ID);
  showProfile      = false;
  showNavMenu      = false;
  signingOut       = false;
  showSignOutModal = false;
  signOutDone      = false;
  copyLinkState: 'idle' | 'copied' = 'idle';
  private _navInProgress = false;

  constructor() {
    effect(() => {
      if (this.profileModal.selfOpen()) {
        this.showNavMenu = false;
        this.showProfile = true;
        this.profileModal.closeSelf();
      }
    });

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationStart),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this._navInProgress = true;
        this.showProfile = false;
        this.showNavMenu = false;
        setTimeout(() => this._navInProgress = false, 200);
      });
  }

  openExternal(url: string): void {
    this.showNavMenu = false;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  get levelLabel(): string {
    const info = this.userDataService.levelInfo();
    if (info.id === 0) return '✨ New';
    return `${info.name} · Level ${info.id}`;
  }

  openLevels(e?: Event): void {
    e?.stopPropagation();
    this.showProfile = false;
    this.levelsModal.open();
  }

  toggleProfile(e: Event): void {
    e.stopPropagation();
    if (this._navInProgress) return;
    this.showNavMenu = false;
    this.showProfile = !this.showProfile;

    if (this.showProfile && isPlatformBrowser(this.platformId)) {
      const seen = localStorage.getItem('vm_levels_seen');
      if (!seen) {
        localStorage.setItem('vm_levels_seen', '1');
        setTimeout(() => this.levelsModal.open(), 250);
      }
    }
  }

  toggleNavMenu(e: Event): void {
    e.stopPropagation();
    this.showProfile = false;
    this.showNavMenu = !this.showNavMenu;
  }

  toggleUpdates(e: Event): void {
    e.stopPropagation();
    this.userDataService.setReceiveUpdates(!this.userDataService.receiveUpdates());
  }

  copyReferralLink(e: Event): void {
    e.stopPropagation();
    if (!isPlatformBrowser(this.platformId)) return;
    const link = this.userDataService.referralLink();
    if (!link) return;
    navigator.clipboard.writeText(link).then(() => {
      this.copyLinkState = 'copied';
      setTimeout(() => { this.copyLinkState = 'idle'; }, 2000);
    }).catch(() => {});
  }

  async signOut(): Promise<void> {
    if (this.signingOut) return;
    this.signingOut      = true;
    this.signOutDone     = false;
    this.showProfile     = false;
    this.showSignOutModal = true;
    try {
      await this.authService.signOut();
      this.signOutDone = true;
      setTimeout(() => {
        this.showSignOutModal = false;
        this.signingOut      = false;
        this.signOutDone     = false;
      }, 1400);
    } catch {
      this.showSignOutModal = false;
      this.signingOut      = false;
    }
  }

  @HostListener('document:click')
  closePopups(): void {
    this.showProfile = false;
    this.showNavMenu = false;
  }
}
