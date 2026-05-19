import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

@Component({
  selector: 'app-nav-interstitial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-interstitial.component.html',
  styleUrl: './nav-interstitial.component.scss',
})
export class NavInterstitialComponent implements OnInit, OnDestroy {
  @Input() url!: string;
  @Input() duration = 7;
  @Input() buttonLabel = 'Open website';
  @Input() openNewTab = false;
  @Output() closed = new EventEmitter<void>();

  private readonly platformId = inject(PLATFORM_ID);
  private timer?: ReturnType<typeof setInterval>;

  seconds = 0;
  readonly circumference = CIRCUMFERENCE;

  get dashOffset(): number {
    if (this.duration === 0) return 0;
    return CIRCUMFERENCE * (this.seconds / this.duration);
  }

  ngOnInit(): void {
    this.seconds = this.duration;
    if (!isPlatformBrowser(this.platformId) || this.duration === 0) return;
    this.timer = setInterval(() => {
      this.seconds--;
      if (this.seconds <= 0) {
        this.seconds = 0;
        clearInterval(this.timer);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  open(): void {
    if (this.seconds > 0) return;
    if (this.openNewTab) {
      window.open(this.url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = this.url;
    }
    this.closed.emit();
  }

  dismiss(): void {
    this.closed.emit();
  }
}
