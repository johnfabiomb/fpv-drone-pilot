import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { BookingAdminService } from '@booking/core/services/booking-admin.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { BookingSummary } from '@booking/core/interfaces/booking.interface';

// Accounting view of bookings AS invoices — no separate invoice table: in this system
// every confirmed booking is an invoice (number derived from its ref). Reuses the data
// already loaded by BookingDataService (no extra query for the list); only the invoice
// prefix is fetched once.
@Component({
  selector: 'app-invoices-admin',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './invoices-admin.component.html',
  styleUrl: './invoices-admin.component.scss',
})
export class InvoicesAdminComponent implements OnInit {
  readonly data = inject(BookingDataService);
  private readonly admin = inject(BookingAdminService);
  private readonly auth = inject(BookingsAuthService);

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
  readonly filtered = computed(() => {
    const y = this.year();
    return y === 'all' ? this.invoices()
      : this.invoices().filter(b => new Date(b.start_at).getFullYear().toString() === y);
  });

  readonly totalBilled = computed(() => this.filtered().reduce((s, b) => s + b.price_total, 0));
  readonly totalPaid = computed(() => this.filtered().reduce((s, b) => s + b.total_paid, 0));
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

  open(b: BookingSummary): void { window.open(`/book/invoice/${b.id}`, '_blank', 'noopener'); }

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
