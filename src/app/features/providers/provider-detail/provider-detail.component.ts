import { Component, Input, Output, EventEmitter, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Provider } from '@core/models';
import { ImageGalleryComponent } from '@ui/image-gallery/image-gallery.component';
import { ShareButtonComponent } from '@ui/share-button/share-button.component';
import { ProviderAvatarComponent } from '@features/providers/provider-avatar/provider-avatar.component';
import { resolveProviderColor, getProviderCategoryLabel, isDiscountValid } from '@core/utils/provider.utils';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-provider-detail',
  standalone: true,
  imports: [CommonModule, ImageGalleryComponent, ShareButtonComponent, ProviderAvatarComponent],
  templateUrl: './provider-detail.component.html',
  styleUrl: './provider-detail.component.scss',
})
export class ProviderDetailComponent implements OnDestroy {
  @Input() provider!: Provider;

  @Output() bookRequested  = new EventEmitter<Provider>();
  @Output() couponCopied   = new EventEmitter<void>();
  @Output() providerShared = new EventEmitter<void>();

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  readonly authService = inject(AuthService);
  isCouponCopied = false;
  private copyTimer?: ReturnType<typeof setTimeout>;

  get shareUrl(): string {
    if (!this.provider?.id) return '';
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : 'https://johnfabiomb.com';
    return `${origin}/malta?provider=${this.provider.id}`;
  }

  get accentColor(): string { return resolveProviderColor(this.provider); }
  get categoryLabel(): string { return getProviderCategoryLabel(this.provider?.category); }
  get hasValidDiscount(): boolean {
    return !!this.provider.discount && isDiscountValid(this.provider.discount);
  }
  get discountExpiry(): string | null {
    const v = this.provider.discount?.validUntil;
    if (!v) return null;
    return new Date(v).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  }

  copyCoupon(): void {
    const code = this.provider?.discount?.coupon;
    if (!code || !isPlatformBrowser(this.platformId)) return;
    navigator.clipboard?.writeText(code).catch(() => {});
    clearTimeout(this.copyTimer);
    this.isCouponCopied = true;
    this.copyTimer = setTimeout(() => { this.isCouponCopied = false; }, 2500);
    this.couponCopied.emit();
  }

  openWebsite(): void {
    if (!this.authService.isLoggedIn()) { this.authService.openLoginModal(); return; }
    if (this.provider?.website) this.bookRequested.emit(this.provider);
  }

  browseDeals(): void {
    this.router.navigate(['/malta/deals']);
  }

  ngOnDestroy(): void {
    clearTimeout(this.copyTimer);
  }
}
