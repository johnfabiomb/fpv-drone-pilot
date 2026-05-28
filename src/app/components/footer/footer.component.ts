import { Component, HostListener, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FEATURES } from '../../feature-flags';
import { version } from '../../../../package.json';
import { AuthService } from '../../shared/services/auth.service';
import { UserDataService } from '../../shared/services/user-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly features = FEATURES;
  readonly version = version;
  readonly authService = inject(AuthService);
  readonly userDataService = inject(UserDataService);
  showProfile  = false;
  showNavMenu  = false;
  signingOut   = false;

  get levelLabel(): string {
    return `Explorer · Level ${this.userDataService.level()}`;
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
