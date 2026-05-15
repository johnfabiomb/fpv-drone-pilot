import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ProviderCardComponent } from '../provider-card/provider-card.component';

const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

@Component({
  selector: 'app-nav-interstitial',
  standalone: true,
  imports: [CommonModule, ProviderCardComponent],
  templateUrl: './nav-interstitial.component.html',
  styleUrl: './nav-interstitial.component.scss',
})
export class NavInterstitialComponent implements OnInit, OnDestroy {
  @Input() url!: string;
  @Input() duration = 7;
  @Input() providers: any[] = [];
  @Output() closed = new EventEmitter<void>();
  @Output() providerSelected = new EventEmitter<any>();

  private platformId = inject(PLATFORM_ID);
  private timer?: ReturnType<typeof setInterval>;

  seconds = 0;
  readonly circumference = CIRCUMFERENCE;

  get dashOffset(): number {
    return CIRCUMFERENCE * (this.seconds / this.duration);
  }

  ngOnInit() {
    this.seconds = this.duration;
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
    window.location.href = this.url;
    this.closed.emit();
  }

  onProviderSelected(provider: any): void {
    this.providerSelected.emit(provider);
    this.closed.emit();
  }

  dismiss() {
    this.closed.emit();
  }
}
