import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { BookingAdminService } from '@booking/core/services/booking-admin.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { BookingSummary } from '@booking/core/interfaces/booking.interface';

type InvoiceTab = 'all' | 'unpaid' | 'partial' | 'paid';
const STATUS_LABEL: Record<Exclude<InvoiceTab, 'all'>, string> = {
  unpaid: 'Unpaid', partial: 'Partial', paid: 'Paid',
};

// Accounting view of bookings AS invoices — no separate invoice table: in this system
// every confirmed booking is an invoice (number derived from its ref). Reuses the data
// already loaded by BookingDataService (no extra query for the list); only the invoice
// prefix is fetched once.
@Component({
  selector: 'app-invoices-admin',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterLink, CdkMenuTrigger, CdkMenu, CdkMenuItem],
  templateUrl: './invoices-admin.component.html',
  styleUrl: './invoices-admin.component.scss',
})
export class InvoicesAdminComponent implements OnInit {
  readonly data = inject(BookingDataService);
  private readonly admin = inject(BookingAdminService);
  private readonly auth = inject(BookingsAuthService);
  private readonly toast = inject(ToastService);

  readonly prefix = signal('INV');
  readonly currency = signal('EUR');

  // Invoices = real jobs (a quote/hold/pending request isn't an issued invoice yet).
  private readonly INVOICED = ['booked', 'in_progress', 'done'];
  readonly invoices = computed(() =>
    this.data.bookings().filter(b => this.INVOICED.includes(b.status) && !b.is_external));

  // Year filter (for VAT periods). 'all' or a 4-digit year string.
  readonly year = signal<string>('all');
  readonly years = computed(() => {
    const ys = new Set<string>();
    for (const b of this.invoices()) ys.add(new Date(b.start_at).getFullYear().toString());
    return [...ys].sort((a, b) => b.localeCompare(a));
  });

  /** Invoices in the selected year (period scope — drives the summary + counts). */
  readonly yearScoped = computed(() => {
    const y = this.year();
    return y === 'all' ? this.invoices()
      : this.invoices().filter(b => new Date(b.start_at).getFullYear().toString() === y);
  });

  // Payment status tabs.
  readonly tabs: ReadonlyArray<{ key: InvoiceTab; label: string }> = [
    { key: 'all',     label: 'All' },
    { key: 'unpaid',  label: 'Unpaid' },
    { key: 'partial', label: 'Partially paid' },
    { key: 'paid',    label: 'Paid' },
  ];
  readonly tab = signal<InvoiceTab>('all');

  /** Paid / partial / unpaid for a single invoice. */
  invStatus(b: BookingSummary): Exclude<InvoiceTab, 'all'> {
    if (b.price_total > 0 && b.total_paid >= b.price_total - 0.005) return 'paid';
    if (b.total_paid > 0) return 'partial';
    return 'unpaid';
  }

  readonly counts = computed<Record<InvoiceTab, number>>(() => {
    const c: Record<InvoiceTab, number> = { all: 0, unpaid: 0, partial: 0, paid: 0 };
    for (const b of this.yearScoped()) { c.all++; c[this.invStatus(b)]++; }
    return c;
  });

  /** Visible rows: year + payment-status tab, newest invoice first. */
  readonly filtered = computed(() => {
    const t = this.tab();
    const list = t === 'all' ? this.yearScoped() : this.yearScoped().filter(b => this.invStatus(b) === t);
    return [...list].sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime());
  });

  // Summary reflects the whole period (year), independent of the active tab.
  readonly totalBilled = computed(() => this.yearScoped().reduce((s, b) => s + b.price_total, 0));
  readonly totalPaid = computed(() => this.yearScoped().reduce((s, b) => s + b.total_paid, 0));
  readonly outstanding = computed(() => Math.max(0, this.totalBilled() - this.totalPaid()));

  async ngOnInit(): Promise<void> {
    await this.auth.initialize();
    const org = this.auth.orgId();
    if (org) {
      const s = await this.admin.getOrgSettings(org);
      this.prefix.set((s?.invoice_details?.invoice_prefix || 'INV').toUpperCase());
      this.currency.set(s?.currency || 'EUR');
    }
    if (this.data.bookings().length === 0) this.data.load();
  }

  /** Invoice number = booking ref with the prefix swapped (BK-2026-007 → INV-2026-007). */
  invoiceNo(ref: string): string {
    const dash = ref.indexOf('-');
    return dash >= 0 ? `${this.prefix()}-${ref.slice(dash + 1)}` : `${this.prefix()}-${ref}`;
  }
  balance(b: BookingSummary): number { return Math.max(0, b.price_total - b.total_paid); }
  statusLabel(b: BookingSummary): string { return STATUS_LABEL[this.invStatus(b)]; }

  open(b: BookingSummary): void { window.open(`/book/invoice/${b.id}`, '_blank', 'noopener'); }

  /** Copy the client-shareable (no-login) invoice link. */
  async copyShareLink(b: BookingSummary): Promise<void> {
    const url = await this.data.invoiceShareLink(b.id);
    if (!url) { this.toast.error('Could not create the invoice link.'); return; }
    await navigator.clipboard.writeText(url);
    this.toast.success('Invoice link copied — share it with your client');
  }

  /** Download the visible list as CSV for the accountant. */
  exportCsv(): void {
    const rows = [['Invoice', 'Date', 'Client', 'Total', 'Paid', 'Balance', 'Status']];
    for (const b of this.filtered()) {
      rows.push([
        this.invoiceNo(b.booking_ref),
        new Date(b.start_at).toISOString().slice(0, 10),
        (b.client_name ?? '').replace(/"/g, '""'),
        b.price_total.toFixed(2), b.total_paid.toFixed(2), this.balance(b).toFixed(2),
        b.status,
      ]);
    }
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoices-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
