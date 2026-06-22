import { Component, ElementRef, OnInit, inject, signal, viewChild, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { bookingsDb } from '@booking/core/db/supabase.bookings';
import { InvoiceDetails } from '@booking/core/services/booking-admin.service';
import { downloadElementAsPdf } from '@booking/core/utils/pdf.util';

export interface InvoiceLineItem { description: string; amount: number; }

interface InvoiceBundle {
  org: { name: string; currency: string; invoice_details: InvoiceDetails };
  client: { name: string; company: string | null; vat_number: string | null; billing_address: string | null; email: string | null; phone: string | null } | null;
  booking: { id: string; booking_ref: string; location: string | null; start_at: string; end_at: string; status: string; price_total: number };
  invoice: { line_items: InvoiceLineItem[]; notes: string | null; issue_date: string | null; customized: boolean; total: number };
  total_paid: number;
  payments: { amount: number; method: string; paid_at: string | null }[];
}

// Standalone, printable A4 invoice for ONE booking. Two ways in:
//   /book/invoice/:id        → get_invoice (org admin OR the booking's own client)
//   /book/invoice?token=…    → get_invoice_by_token (anon-safe: a valid pay link)
// so admins, signed-in clients AND token-link payers can all view/print it.
@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss',
})
export class InvoiceComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);

  readonly state = signal<'loading' | 'ready' | 'error'>('loading');
  readonly data = signal<InvoiceBundle | null>(null);
  readonly downloading = signal(false);
  // The A4 sheet element — captured as-is into the PDF.
  private readonly sheet = viewChild<ElementRef<HTMLElement>>('sheet');

  async ngOnInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!id && !token) { this.state.set('error'); return; }
    const { data, error } = token
      ? await bookingsDb.rpc('get_invoice_by_token', { p_token: token })
      : await bookingsDb.rpc('get_invoice', { p_booking: id });
    if (error || !data) { this.state.set('error'); return; }
    this.data.set(data as InvoiceBundle);
    this.state.set('ready');

    // Allow other pages to deep-link an action: …?auto=download | ?auto=print
    const auto = this.route.snapshot.queryParamMap.get('auto');
    if (auto === 'print') setTimeout(() => this.print(), 300);
    else if (auto === 'download') setTimeout(() => this.download(), 300);
  }

  // ── Derived invoice values ──────────────────────────────────────────
  get inv(): InvoiceDetails { return this.data()?.org.invoice_details ?? {}; }
  get currency(): string { return this.data()?.org.currency ?? 'EUR'; }
  get supplierName(): string { return this.inv.legal_name?.trim() || this.data()?.org.name || ''; }
  get vatRegistered(): boolean { return !!this.inv.vat_registered; }
  get vatRate(): number { return this.inv.vat_rate ?? 18; }

  /** Invoice number = booking ref with the prefix swapped (BK-2026-007 → INV-2026-007). */
  get invoiceNumber(): string {
    const ref = this.data()?.booking.booking_ref ?? '';
    const prefix = (this.inv.invoice_prefix || 'INV').toUpperCase();
    const dash = ref.indexOf('-');
    return dash >= 0 ? `${prefix}-${ref.slice(dash + 1)}` : `${prefix}-${ref}`;
  }

  get lineItems(): InvoiceLineItem[] { return this.data()?.invoice.line_items ?? []; }
  get notes(): string | null { return this.data()?.invoice.notes ?? null; }
  /** Issue date: the saved invoice date if customised, otherwise today. */
  get issueDate(): string | Date { return this.data()?.invoice.issue_date ?? new Date(); }
  get total(): number { return this.data()?.invoice.total ?? 0; }
  /** With VAT prices are treated as inclusive: back out the net and VAT from the gross total. */
  get net(): number { return this.vatRegistered ? this.total / (1 + this.vatRate / 100) : this.total; }
  get vat(): number { return this.vatRegistered ? this.total - this.net : 0; }
  get paid(): number { return this.data()?.total_paid ?? 0; }
  get balance(): number { return Math.max(0, this.total - this.paid); }
  /** Settled: no balance left. The invoice then reads as a receipt (PAID, no pay instructions). */
  get fullyPaid(): boolean { return this.total > 0 && this.paid >= this.total - 0.005; }
  /** Distinct payment methods used (for the PAID receipt line). */
  get paidMethods(): string {
    const pays = this.data()?.payments ?? [];
    return [...new Set(pays.map(p => p.method))].join(', ');
  }
  /** Date of the most recent completed payment. */
  get lastPaidAt(): string | null {
    const pays = this.data()?.payments ?? [];
    return pays.length ? pays[pays.length - 1].paid_at : null;
  }

  /** Send the invoice to the printer (browser print dialog) — unchanged behaviour. */
  print(): void { if (isPlatformBrowser(this.platformId)) window.print(); }

  /** Download the invoice as a PDF file, exactly as shown (no margins / browser chrome). */
  async download(): Promise<void> {
    const el = this.sheet()?.nativeElement;
    if (!el || this.downloading()) return;
    this.downloading.set(true);
    try {
      await downloadElementAsPdf(el, `${this.invoiceNumber}.pdf`);
    } finally {
      this.downloading.set(false);
    }
  }
}
