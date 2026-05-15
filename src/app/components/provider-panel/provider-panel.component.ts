import { Component, Input, Output, EventEmitter, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { ShareButtonComponent } from '../share-button/share-button.component';

@Component({
  selector: 'app-provider-detail',
  standalone: true,
  imports: [CommonModule, ImageGalleryComponent, ShareButtonComponent],
  templateUrl: './provider-panel.component.html',
  styleUrl: './provider-panel.component.scss',
})
export class ProviderDetailComponent implements OnDestroy {
  @Input() provider!: any;

  @Output() navRequested = new EventEmitter<string>();

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  couponCopied = false;
  private copyTimer: any;

  get shareUrl(): string {
    if (!this.provider?.id) return '';
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : 'https://johnfabiomb.com';
    return `${origin}/malta?provider=${this.provider.id}`;
  }

  get accentColor(): string {
    const map: Record<string, string> = {
      'water-sports': '#0ea5e9',
      'tour':         '#8b5cf6',
      'hotel':        '#f59e0b',
      'restaurant':   '#ef4444',
      'experience':   '#10b981',
    };
    return map[this.provider?.category] ?? '#F4A922';
  }

  get categoryLabel(): string {
    const map: Record<string, string> = {
      'water-sports': 'Water Sports',
      'tour':         'Boat Tour',
      'hotel':        'Hotel',
      'restaurant':   'Restaurant',
      'experience':   'Experience',
    };
    return map[this.provider?.category] ?? this.provider?.category;
  }

  copyCoupon(): void {
    const code = this.provider?.discount?.coupon;
    if (!code || !isPlatformBrowser(this.platformId)) return;
    navigator.clipboard?.writeText(code).catch(() => {});
    clearTimeout(this.copyTimer);
    this.couponCopied = true;
    this.copyTimer = setTimeout(() => { this.couponCopied = false; }, 2500);
  }

  openWebsite(): void {
    if (this.provider?.website) this.navRequested.emit(this.provider.website);
  }

  browseDeals(): void {
    this.router.navigate(['/malta/deals']);
  }

  ngOnDestroy(): void {
    clearTimeout(this.copyTimer);
  }
}
