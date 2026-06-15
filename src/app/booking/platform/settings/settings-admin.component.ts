import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingAdminService, ConnectStatus, OrgMember } from '@booking/core/services/booking-admin.service';
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
  readonly auth = inject(BookingsAuthService);
  private readonly toast = inject(ToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly saved = signal(false);

  // Which section is shown.
  readonly tabs = ['general', 'booking', 'company', 'team', 'payments', 'integrations'] as const;
  readonly tab = signal<typeof this.tabs[number]>('general');
  setTab(t: typeof this.tabs[number]): void { this.tab.set(t); }

  // Team (members of the active org) + platform-admin org creation
  readonly members = signal<OrgMember[]>([]);
  readonly membersLoading = signal(false);
  newMemberEmail = '';
  newMemberRole = 'admin';
  readonly addingMember = signal(false);

  // Company & invoicing identity (for invoices)
  legalName = '';
  companyAddress = '';
  companyPhone = '';
  companyEmail = '';
  vatNumber = '';
  vatRegistered = false;
  vatRate = 18;
  vatNote = '';
  invoicePrefix = 'INV';
  invoiceFooter = '';

  // Stripe Connect (per-org payouts)
  readonly connect = signal<ConnectStatus | null>(null);
  readonly connectLoading = signal(false);
  readonly connecting = signal(false);

  // Org settings form
  timezone = 'Europe/Malta';
  currency = 'EUR';
  readonly timezones = supportedList('timeZone', ['UTC', 'Europe/Malta', 'Europe/London', 'Europe/Madrid', 'America/New_York']);
  readonly currencies = supportedList('currency', ['EUR', 'USD', 'GBP', 'CHF', 'AUD', 'CAD']);
  depositPercent = 30;
  depositAllowed = true;
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
        this.depositAllowed = p.deposit_allowed ?? true;
        this.holdMinutes = p.hold_minutes ?? 15;
        this.minLeadMinutes = p.min_lead_minutes ?? 120;
        this.cashAllowed = p.cash_allowed ?? true;
        this.workBoard = s.features?.work_board ?? false;

        const inv = s.invoice_details ?? {};
        this.legalName = inv.legal_name ?? '';
        this.companyAddress = inv.address ?? '';
        this.companyPhone = inv.phone ?? '';
        this.companyEmail = inv.email ?? '';
        this.vatNumber = inv.vat_number ?? '';
        this.vatRegistered = inv.vat_registered ?? false;
        this.vatRate = inv.vat_rate ?? 18;
        this.vatNote = inv.vat_note ?? '';
        this.invoicePrefix = (inv.invoice_prefix ?? 'INV').toUpperCase();
        this.invoiceFooter = inv.invoice_footer ?? '';
      }
    }
    this.loading.set(false);
    this.checkIntegrations();
    this.loadMembers();

    // Returning from Stripe's hosted onboarding (?stripe=return|refresh) → re-check + clean the URL.
    const stripeParam = this.route.snapshot.queryParamMap.get('stripe');
    if (stripeParam) {
      this.router.navigate([], { queryParams: { stripe: null }, queryParamsHandling: 'merge', replaceUrl: true });
      if (stripeParam === 'return') this.toast.info('Checking your Stripe connection…');
    }
    this.loadConnect();
  }

  async loadConnect(): Promise<void> {
    const org = this.auth.orgId();
    if (!org) return;
    this.connectLoading.set(true);
    try {
      this.connect.set(await this.admin.connectStripeStatus(org));
    } finally { this.connectLoading.set(false); }
  }

  /** Begin (or resume) onboarding — redirects to Stripe's hosted flow. */
  async connectStripe(): Promise<void> {
    const org = this.auth.orgId();
    if (!org || this.connecting()) return;
    this.connecting.set(true);
    try {
      const res = await this.admin.connectStripeStart(org);
      if (res.url) { window.location.href = res.url; return; }
      this.toast.error(res.error ?? 'Could not start Stripe onboarding.');
    } catch {
      this.toast.error('Could not start Stripe onboarding. Please try again.');
    } finally { this.connecting.set(false); }
  }

  async save(): Promise<void> {
    const org = this.auth.orgId();
    if (!org || this.saving()) return;
    this.saving.set(true); this.saved.set(false);
    try {
      await this.admin.updateOrgSettings(org, {
        timezone: this.timezone.trim(), currency: this.currency.trim().toUpperCase(),
        booking_params: {
          deposit_percent: Number(this.depositPercent), deposit_allowed: this.depositAllowed,
          hold_minutes: Number(this.holdMinutes),
          min_lead_minutes: Number(this.minLeadMinutes), cash_allowed: this.cashAllowed,
        },
        features: { work_board: this.workBoard },
        invoice_details: {
          legal_name: this.legalName.trim(),
          address: this.companyAddress.trim(),
          phone: this.companyPhone.trim(),
          email: this.companyEmail.trim(),
          vat_number: this.vatNumber.trim(),
          vat_registered: this.vatRegistered,
          vat_rate: Number(this.vatRate) || 18,
          vat_note: this.vatNote.trim(),
          invoice_prefix: (this.invoicePrefix.trim() || 'INV').toUpperCase(),
          invoice_footer: this.invoiceFooter.trim(),
        },
      });
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2500);
      this.toast.success('Settings saved');
    } catch {
      this.toast.error('Could not save settings. Please try again.');
    } finally { this.saving.set(false); }
  }

  async loadMembers(): Promise<void> {
    const org = this.auth.orgId();
    if (!org) return;
    this.membersLoading.set(true);
    try { this.members.set(await this.admin.listMembers(org)); }
    finally { this.membersLoading.set(false); }
  }

  async addMember(): Promise<void> {
    const org = this.auth.orgId();
    const email = this.newMemberEmail.trim();
    if (!org || !email || this.addingMember()) return;
    this.addingMember.set(true);
    try {
      const res = await this.admin.addMember(org, email, this.newMemberRole);
      if (res === 'ok') {
        this.toast.success('Member added');
        this.newMemberEmail = '';
        this.loadMembers();
        this.auth.refresh();
      } else if (res === 'no_user') {
        this.toast.error('That person must sign in to the booking app once before you can add them.');
      } else {
        this.toast.error('Could not add member.');
      }
    } finally { this.addingMember.set(false); }
  }

  async removeMember(m: OrgMember): Promise<void> {
    const org = this.auth.orgId();
    if (!org || !confirm(`Remove ${m.email} from this organization?`)) return;
    const res = await this.admin.removeMember(org, m.user_id);
    if (res.error) {
      this.toast.error(res.error.includes('last_owner') ? "You can't remove the only owner." : 'Could not remove member.');
    } else {
      this.toast.success('Member removed');
      this.loadMembers();
    }
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
