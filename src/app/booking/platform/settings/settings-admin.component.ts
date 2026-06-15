import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingAdminService } from '@booking/core/services/booking-admin.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { ToastService } from '@booking/ui/toast/toast.service';

interface IntStatus { ok: boolean; detail: string; }

// Full IANA timezone + ISO currency lists from the platform (Intl), with a
// sensible fallback for environments that don't support supportedValuesOf.
function supportedList(key: 'timeZone' | 'currency', fallback: string[]): string[] {
  try {
    const fn = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf;
    if (typeof fn === 'function') return fn(key);
  } catch { /* not supported */ }
  return fallback;
}

@Component({
  selector: 'app-settings-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings-admin.component.html',
  styleUrl: './settings-admin.component.scss',
})
export class SettingsAdminComponent implements OnInit {
  private readonly admin = inject(BookingAdminService);
  private readonly auth = inject(BookingsAuthService);
  private readonly toast = inject(ToastService);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly saved = signal(false);

  // Org settings form
  timezone = 'Europe/Malta';
  currency = 'EUR';
  readonly timezones = supportedList('timeZone', ['UTC', 'Europe/Malta', 'Europe/London', 'Europe/Madrid', 'America/New_York']);
  readonly currencies = supportedList('currency', ['EUR', 'USD', 'GBP', 'CHF', 'AUD', 'CAD']);
  depositPercent = 30;
  holdMinutes = 15;
  minLeadMinutes = 120;
  cashAllowed = true;
  workBoard = false;

  // Integrations
  readonly checking = signal(false);
  readonly stripe = signal<IntStatus | null>(null);
  readonly google = signal<IntStatus | null>(null);
  readonly intError = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    await this.auth.initialize();
    const org = this.auth.orgId();
    if (org) {
      const s = await this.admin.getOrgSettings(org);
      if (s) {
        this.timezone = s.timezone; this.currency = s.currency;
        const p = s.booking_params ?? {};
        this.depositPercent = p.deposit_percent ?? 30;
        this.holdMinutes = p.hold_minutes ?? 15;
        this.minLeadMinutes = p.min_lead_minutes ?? 120;
        this.cashAllowed = p.cash_allowed ?? true;
        this.workBoard = s.features?.work_board ?? false;
      }
    }
    this.loading.set(false);
    this.checkIntegrations();
  }

  async save(): Promise<void> {
    const org = this.auth.orgId();
    if (!org || this.saving()) return;
    this.saving.set(true); this.saved.set(false);
    try {
      await this.admin.updateOrgSettings(org, {
        timezone: this.timezone.trim(), currency: this.currency.trim().toUpperCase(),
        booking_params: {
          deposit_percent: Number(this.depositPercent), hold_minutes: Number(this.holdMinutes),
          min_lead_minutes: Number(this.minLeadMinutes), cash_allowed: this.cashAllowed,
        },
        features: { work_board: this.workBoard },
      });
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2500);
      this.toast.success('Settings saved');
    } catch {
      this.toast.error('Could not save settings. Please try again.');
    } finally { this.saving.set(false); }
  }

  async checkIntegrations(): Promise<void> {
    this.checking.set(true); this.intError.set(null);
    try {
      const res = await this.admin.checkIntegrations();
      if (res.error) { this.intError.set(res.error); }
      else { this.stripe.set(res.stripe ?? null); this.google.set(res.google ?? null); }
    } catch (e) {
      this.intError.set((e as Error).message);
    } finally { this.checking.set(false); }
  }
}
