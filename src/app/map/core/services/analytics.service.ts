import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  pageView(url: string, title: string): void {
    if (typeof gtag === 'undefined') return;
    gtag('event', 'page_view', { page_title: title, page_location: url });
  }

  event(name: string, params: Record<string, any> = {}): void {
    if (typeof gtag === 'undefined') return;
    gtag('event', name, params);
  }
}
