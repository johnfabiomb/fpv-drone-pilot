import { Component, Input, Output, EventEmitter, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Provider } from '@map/core/models';
import { ImageGalleryComponent } from '@map/ui/image-gallery/image-gallery.component';
import { ShareButtonComponent } from '@map/ui/share-button/share-button.component';
import { ProviderAvatarComponent } from '@map/features/providers/provider-avatar/provider-avatar.component';
import { DealBoxComponent } from '@map/ui/deal-box/deal-box.component';
import { resolveProviderColor, getProviderCategoryLabel } from '@map/core/utils/provider.utils';
import { AuthService } from '@map/core/services/auth.service';

@Component({
  selector: 'app-provider-detail',
  standalone: true,
  imports: [CommonModule, ImageGalleryComponent, ShareButtonComponent, ProviderAvatarComponent, DealBoxComponent],
  templateUrl: './provider-detail.component.html',
  styleUrl: './provider-detail.component.scss',
})
export class ProviderDetailComponent {
  @Input() provider!: Provider;

  @Output() bookRequested  = new EventEmitter<Provider>();
  @Output() couponCopied   = new EventEmitter<void>();
  @Output() providerShared = new EventEmitter<void>();

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  readonly authService = inject(AuthService);

  get shareUrl(): string {
    if (!this.provider?.id) return '';
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : 'https://johnfabiomb.com';
    return `${origin}/malta?provider=${this.provider.id}`;
  }

  get accentColor(): string { return resolveProviderColor(this.provider); }
  get categoryLabel(): string { return getProviderCategoryLabel(this.provider?.category); }

  openWebsite(): void {
    if (!this.authService.isLoggedIn()) { this.authService.openLoginModal(); return; }
    if (this.provider?.website) this.bookRequested.emit(this.provider);
  }

  browseDeals(): void {
    this.router.navigate(['/malta/deals']);
  }
}
