import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FEATURES } from '../../feature-flags';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  template: `
    <ng-container *ngIf="adsEnabled">
      <ins #ins class="adsbygoogle"
        style="display:block"
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
        data-ad-client="ca-pub-9568287834157004"
        data-ad-slot="5885022738">
      </ins>
    </ng-container>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    :host.hidden { display: none; }
    :host.disabled { display: none; }
  `],
  imports: [CommonModule],
})
export class AdBannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ins') private ins?: ElementRef<HTMLElement>;

  protected readonly adsEnabled = FEATURES.ADS;
  private platformId = inject(PLATFORM_ID);
  private host = inject(ElementRef);
  private observer?: MutationObserver;

  ngAfterViewInit() {
    if (!FEATURES.ADS) {
      this.host.nativeElement.classList.add('disabled');
      return;
    }
    if (!isPlatformBrowser(this.platformId)) return;

    if (!this.ins) return;

    this.observer = new MutationObserver(() => {
      if (this.ins?.nativeElement.getAttribute('data-ad-status') === 'unfilled') {
        this.host.nativeElement.classList.add('hidden');
        this.observer?.disconnect();
      }
    });

    this.observer.observe(this.ins.nativeElement, {
      attributes: true,
      attributeFilter: ['data-ad-status'],
    });

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
