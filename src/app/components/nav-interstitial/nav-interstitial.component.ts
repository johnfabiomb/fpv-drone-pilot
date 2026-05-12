import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AdBannerComponent } from '../ad-banner/ad-banner.component';

const DURATION = 7;
const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

@Component({
  selector: 'app-nav-interstitial',
  standalone: true,
  imports: [CommonModule, AdBannerComponent],
  templateUrl: './nav-interstitial.component.html',
  styleUrl: './nav-interstitial.component.scss',
})
export class NavInterstitialComponent implements OnInit, OnDestroy {
  @Input() url!: string;
  @Output() closed = new EventEmitter<void>();

  private platformId = inject(PLATFORM_ID);
  private timer?: ReturnType<typeof setInterval>;

  seconds = DURATION;
  readonly circumference = CIRCUMFERENCE;

  get dashOffset(): number {
    return CIRCUMFERENCE * (this.seconds / DURATION);
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.timer = setInterval(() => {
      this.seconds--;
      if (this.seconds <= 0) {
        this.seconds = 0;
        clearInterval(this.timer);
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  open() {
    if (this.seconds > 0) return;
    window.open(this.url, '_blank');
    this.closed.emit();
  }

  dismiss() {
    this.closed.emit();
  }
}
