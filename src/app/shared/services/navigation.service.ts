import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { ParamMap, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly router   = inject(Router);
  private readonly location = inject(Location);

  /**
   * Resolves the correct back destination from query params, falling back to
   * browser history when available, or /malta when the page was opened directly.
   */
  back(params: ParamMap): void {
    const backTo = params.get('backTo');

    if (backTo === '30-places-2026') {
      this.router.navigate(['/malta/30-places-2026']);
    } else if (backTo === 'list') {
      this.router.navigate(['/malta/list']);
    } else if ((window.history.state?.navigationId ?? 1) > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/malta']);
    }
  }
}
