import { Component, HostListener, effect, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FEATURES } from '../../feature-flags';
import { version } from '../../../../package.json';
import { AuthService } from '../../shared/services/auth.service';
import { UserDataService } from '../../shared/services/user-data.service';
import { ProfileModalService } from '../../shared/services/profile-modal.service';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { LevelsModalComponent } from '../levels-modal/levels-modal.component';
import { UserProfileCardComponent } from '../user-profile-card/user-profile-card.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf, RouterLink, UserAvatarComponent, LevelsModalComponent, UserProfileCardComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly features = FEATURES;
  readonly version = version;
  readonly authService = inject(AuthService);
  readonly userDataService = inject(UserDataService);
  private readonly profileModal = inject(ProfileModalService);
  showProfile  = false;
  showNavMenu  = false;
  showLevels   = false;
  signingOut   = false;

  constructor() {
    effect(() => {
      if (this.profileModal.selfOpen()) {
        this.showNavMenu = false;
        this.showProfile = true;
        this.profileModal.closeSelf();
      }
    });
  }

  get levelLabel(): string {
    const info = this.userDataService.levelInfo();
    if (info.id === 0) return '✨ New';
    return `${info.name} · Level ${info.id}`;
  }

  openLevels(e?: Event): void {
    e?.stopPropagation();
    this.showProfile = false;
    this.showLevels  = true;
  }

  toggleProfile(e: Event): void {
    e.stopPropagation();
    this.showNavMenu = false;
    this.showProfile = !this.showProfile;
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

  async signOut(): Promise<void> {
    if (this.signingOut) return;
    this.signingOut = true;
    try {
      await this.authService.signOut();
      this.showProfile = false;
    } finally {
      this.signingOut = false;
    }
  }

  @HostListener('document:click')
  closePopups(): void {
    this.showProfile = false;
    this.showNavMenu = false;
  }
}
