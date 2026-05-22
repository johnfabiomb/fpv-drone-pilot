import { Component, Input, Output, EventEmitter, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Provider } from '../../shared/models';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { ShareButtonComponent } from '../share-button/share-button.component';
import { ProviderAvatarComponent } from '../provider-avatar/provider-avatar.component';
import { resolveProviderColor, getProviderCategoryLabel } from '../../shared/utils/provider.utils';

@Component({
  selector: 'app-provider-detail',
  standalone: true,
  imports: [CommonModule, ImageGalleryComponent, ShareButtonComponent, ProviderAvatarComponent],
  templateUrl: './provider-detail.component.html',
  styleUrl: './provider-detail.component.scss',
})
export class ProviderDetailComponent implements OnDestroy {
  @Input() provider!: Provider;

  @Output() bookRequested = new EventEmitter<Provider>();

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  couponCopied = false;
  private copyTimer?: ReturnType<typeof setTimeout>;

  get shareUrl(): string {
    if (!this.provider?.id) return '';
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : 'https://johnfabiomb.com';
    return `${origin}/malta?provider=${this.provider.id}`;
  }

  get accentColor(): string { return resolveProviderColor(this.provider); }
  get categoryLabel(): string { return getProviderCategoryLabel(this.provider?.category); }

  copyCoupon(): void {
    const code = this.provider?.discount?.coupon;
    if (!code || !isPlatformBrowser(this.platformId)) return;
    navigator.clipboard?.writeText(code).catch(() => {});
    clearTimeout(this.copyTimer);
    this.couponCopied = true;
    this.copyTimer = setTimeout(() => { this.couponCopied = false; }, 2500);
  }

  openWebsite(): void {
    if (this.provider?.website) this.bookRequested.emit(this.provider);
  }

  browseDeals(): void {
    this.router.navigate(['/malta/deals']);
  }

  ngOnDestroy(): void {
    clearTimeout(this.copyTimer);
  }
}
