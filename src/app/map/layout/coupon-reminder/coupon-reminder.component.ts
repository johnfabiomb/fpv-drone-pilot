import { Component, Input, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Provider } from '@map/core/models';
import { resolveProviderColor } from '@map/core/utils/provider.utils';

@Component({
  selector: 'app-coupon-reminder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="coupon-reminder">

      <div class="coupon-reminder__header" [style.color]="accentColor">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
          <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
        <span>{{ provider.discount!.label }}</span>
      </div>

      <p class="coupon-reminder__prompt">
        Copy your code before booking — you'll need it at checkout.
      </p>

      <button class="coupon-reminder__box" (click)="copy()" [style.borderColor]="accentColor">
        <span class="coupon-code">{{ provider.discount!.coupon }}</span>
        <span class="copy-hint" [class.copied]="copied">
          <svg *ngIf="!copied" width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          {{ copied ? '✓ Copied!' : 'Tap to copy' }}
        </span>
      </button>

    </div>
  `,
  styles: [`
    .coupon-reminder {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .coupon-reminder__header {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 13px;
      font-weight: 700;
    }

    .coupon-reminder__prompt {
      margin: 0;
      font-size: 12px;
      color: var(--color-text-muted);
      line-height: 1.4;
    }

    .coupon-reminder__box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      background: var(--color-bg);
      border: 1.5px dashed;
      border-radius: var(--radius-lg);
      padding: 11px 14px;
      cursor: pointer;
      text-align: left;
      transition: background var(--transition);
      &:active { background: var(--color-bg-light); }
    }

    .coupon-code {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 2.5px;
      color: var(--color-text-base);
      font-family: 'Courier New', monospace;
    }

    .copy-hint {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11.5px;
      color: var(--color-text-light);
      font-weight: 500;
      white-space: nowrap;
      &.copied { color: #22c55e; font-weight: 600; }
    }
  `],
})
export class CouponReminderComponent implements OnDestroy {
  @Input() provider!: Provider;

  private readonly platformId = inject(PLATFORM_ID);
  private copyTimer?: ReturnType<typeof setTimeout>;

  copied = false;

  get accentColor(): string { return resolveProviderColor(this.provider); }

  copy(): void {
    const code = this.provider?.discount?.coupon;
    if (!code || !isPlatformBrowser(this.platformId)) return;
    navigator.clipboard?.writeText(code).catch(() => {});
    clearTimeout(this.copyTimer);
    this.copied = true;
    this.copyTimer = setTimeout(() => { this.copied = false; }, 2500);
  }

  ngOnDestroy(): void {
    clearTimeout(this.copyTimer);
  }
}
