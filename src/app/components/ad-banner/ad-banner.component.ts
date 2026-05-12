import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  template: `
    <ins #ins class="adsbygoogle"
      style="display:block"
      data-ad-format="fluid"
      data-ad-layout-key="-fb+5w+4e-db+86"
      data-ad-client="ca-pub-9568287834157004"
      data-ad-slot="5885022738">
    </ins>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    :host.hidden { display: none; }
  `]
})
export class AdBannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ins') private ins!: ElementRef<HTMLElement>;

  private platformId = inject(PLATFORM_ID);
  private host = inject(ElementRef);
  private observer?: MutationObserver;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new MutationObserver(() => {
      if (this.ins.nativeElement.getAttribute('data-ad-status') === 'unfilled') {
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
