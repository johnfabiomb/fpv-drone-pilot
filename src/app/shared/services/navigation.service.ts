import { Injectable, inject } from '@angular/core';
import { ParamMap, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly router = inject(Router);

  back(params: ParamMap): void {
    const backTo = params.get('backTo');
    if (backTo === '30-places-2026') {
      this.router.navigate(['/malta/30-places-2026']);
    } else if (backTo === 'list') {
      this.router.navigate(['/malta/list']);
    } else if (backTo === 'location') {
      const fromLocation = params.get('fromLocation');
      const locationBackTo = params.get('locationBackTo');
      this.router.navigate(
        fromLocation ? ['/malta/locations', fromLocation] : ['/malta'],
        locationBackTo ? { queryParams: { backTo: locationBackTo } } : {},
      );
    } else {
      this.router.navigate(['/malta']);
    }
  }
}
