import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingAdminService } from '@booking/core/services/booking-admin.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { ToastService } from '@booking/ui/toast/toast.service';

function supportedList(key: 'timeZone' | 'currency', fallback: string[]): string[] {
  try {
    const fn = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf;
    if (typeof fn === 'function') return fn(key);
  } catch { /* not supported */ }
  return fallback;
}

// Cross-org management: list the orgs you belong to, switch the active one, and
// (platform admins only) create new organizations. Reached from the org name in
// the sidebar — kept OUT of Settings, which configures the active org itself.
@Component({
  selector: 'app-organizations',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss',
})
export class OrganizationsComponent {
  readonly auth = inject(BookingsAuthService);
  private readonly admin = inject(BookingAdminService);
  private readonly data = inject(BookingDataService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  readonly origin = typeof window !== 'undefined' ? window.location.origin : '';

  // Create-org form (platform admin)
  readonly showCreate = signal(false);
  readonly creating = signal(false);
  readonly timezones = supportedList('timeZone', ['UTC', 'Europe/Malta', 'Europe/London', 'Europe/Madrid', 'America/New_York']);
  readonly currencies = supportedList('currency', ['EUR', 'USD', 'GBP', 'CHF', 'AUD', 'CAD']);
  name = '';
  slug = '';
  timezone = 'Europe/Malta';
  currency = 'EUR';

  switchTo(orgId: string): void {
    if (orgId === this.auth.orgId()) return;
    this.auth.setActiveOrg(orgId);
    this.data.load();
    this.router.navigate(['/bookings', 'dashboard']);
  }

  get canCreate(): boolean {
    return !this.creating() && this.name.trim().length > 0 && /^[a-z0-9-]+$/.test(this.slug.trim());
  }

  async create(): Promise<void> {
    if (!this.canCreate) return;
    this.creating.set(true);
    try {
      const res = await this.admin.createOrg(this.name.trim(), this.slug.trim().toLowerCase(), this.timezone, this.currency.toUpperCase());
      if (res.error) { this.toast.error('Could not create — the slug may already be taken.'); return; }
      this.toast.success('Organization created');
      this.name = ''; this.slug = '';
      this.showCreate.set(false);
      await this.auth.refresh();
      if (res.id) this.switchTo(res.id);
    } finally { this.creating.set(false); }
  }
}
