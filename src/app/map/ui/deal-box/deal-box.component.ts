import { Component, EventEmitter, Input, OnDestroy, Output, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProviderDiscount } from '@map/core/models';
import { isDiscountValid } from '@map/core/utils/provider.utils';
import { AuthService } from '@map/core/services/auth.service';

/**
 * Shared discount/coupon box — the amber "tap to copy" deal card used by both
 * provider-detail and experience-detail. Renders nothing for an expired/absent
 * discount, and gates the coupon behind sign-in.
 */
@Component({
  selector: 'app-deal-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deal-box.component.html',
  styleUrl: './deal-box.component.scss',
})
export class DealBoxComponent implements OnDestroy {
  @Input() discount!: ProviderDiscount;
  @Output() couponCopied = new EventEmitter<void>();

  private readonly platformId = inject(PLATFORM_ID);
  readonly authService = inject(AuthService);

  isCouponCopied = false;
  private copyTimer?: ReturnType<typeof setTimeout>;

  get isValid(): boolean { return !!this.discount && isDiscountValid(this.discount); }

  get expiry(): string | null {
    const v = this.discount?.validUntil;
    return v ? new Date(v).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : null;
  }

  copyCoupon(): void {
    const code = this.discount?.coupon;
    if (!code || !isPlatformBrowser(this.platformId)) return;
    navigator.clipboard?.writeText(code).catch(() => {});
    clearTimeout(this.copyTimer);
    this.isCouponCopied = true;
    this.copyTimer = setTimeout(() => { this.isCouponCopied = false; }, 2500);
    this.couponCopied.emit();
  }

  ngOnDestroy(): void {
    clearTimeout(this.copyTimer);
  }
}
