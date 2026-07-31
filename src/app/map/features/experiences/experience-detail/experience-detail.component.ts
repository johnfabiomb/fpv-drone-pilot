import { Component, EventEmitter, Input, Output, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Experience, Provider } from '@map/core/models';
import { ImageGalleryComponent } from '@map/ui/image-gallery/image-gallery.component';
import { ShareButtonComponent } from '@map/ui/share-button/share-button.component';
import { ProviderAvatarComponent } from '@map/features/providers/provider-avatar/provider-avatar.component';
import { DealBoxComponent } from '@map/ui/deal-box/deal-box.component';
import { experienceColor, experienceIcon, resolveExperienceBookUrl, resolveExperienceDiscount } from '@map/core/utils/experience.utils';
import { getProviderCategoryLabel } from '@map/core/utils/provider.utils';
import { AuthService } from '@map/core/services/auth.service';

@Component({
  selector: 'app-experience-detail',
  standalone: true,
  imports: [CommonModule, ImageGalleryComponent, ShareButtonComponent, ProviderAvatarComponent, DealBoxComponent],
  templateUrl: './experience-detail.component.html',
  styleUrl: './experience-detail.component.scss',
})
export class ExperienceDetailComponent {
  @Input() experience!: Experience;
  @Input() provider!: Provider;

  @Output() bookRequested    = new EventEmitter<Provider>();
  @Output() couponCopied     = new EventEmitter<void>();
  @Output() experienceShared = new EventEmitter<void>();

  private readonly platformId = inject(PLATFORM_ID);
  private readonly document   = inject(DOCUMENT);
  private readonly router     = inject(Router);
  readonly authService        = inject(AuthService);

  get accentColor(): string { return experienceColor(this.provider); }
  get icon(): string { return experienceIcon(this.experience); }
  get categoryLabel(): string { return getProviderCategoryLabel(this.provider?.category); }
  get discount() { return resolveExperienceDiscount(this.experience, this.provider); }

  get shareUrl(): string {
    if (!this.experience?.id) return '';
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : 'https://johnfabiomb.com';
    return `${origin}/malta/experiences/${this.experience.id}`;
  }

  openProvider(): void {
    this.router.navigate(['/malta/providers', this.provider.id]);
  }

  book(): void {
    // No coupon (e.g. an affiliate link like Viator): send the visitor straight to
    // the booking URL — no login gate and no coupon-reminder interstitial to sit
    // through. Providers WITH a discount keep the reminder flow so the code is copied.
    if (!this.discount) {
      const url = resolveExperienceBookUrl(this.experience, this.provider);
      if (url && isPlatformBrowser(this.platformId)) window.open(url, '_blank', 'noopener');
      return;
    }
    if (!this.authService.isLoggedIn()) { this.authService.openLoginModal(); return; }
    this.bookRequested.emit(this.provider);
  }
}
