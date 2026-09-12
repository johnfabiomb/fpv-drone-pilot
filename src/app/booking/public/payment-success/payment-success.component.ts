import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { bookingsDb } from '@booking/core/db/supabase.bookings';
import { InvoiceDetails } from '@booking/core/services/booking-admin.service';

interface InvoiceBundle {
  org: { name: string; currency: string; invoice_details: InvoiceDetails };
  client: { name: string; company: string | null } | null;
  booking: { id: string; booking_ref: string; start_at: string; end_at: string; status: string; price_total: number };
  invoice: { line_items: { description: string; amount: number }[]; total: number };
  total_paid: number;
}

// Post-payment confirmation + receipt. Pulls the SAME invoice bundle the formal
// invoice uses (company details, line items, JFMB number) — by token for anon
// pay-link customers, or via the payment intent for signed-in self-serve clients.
@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
})
export class PaymentSuccessComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);

  readonly loading = signal(true);
  readonly bundle = signal<InvoiceBundle | null>(null);
  readonly issueDate = new Date();
  private tok = '';
  private bookingId = '';

  async ngOnInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    document.title = 'Payment Confirmed | JM Bookings';

    const p = this.route.snapshot.queryParamMap;
    this.tok = p.get('tok') ?? '';
    const intent = p.get('payment_intent') ?? '';

    // Record the payment deterministically on return (idempotent) BEFORE reading the
    // receipt, so the totals are correct even if Stripe's async webhook hasn't fired.
    if (this.tok && intent) {
      try {
        await bookingsDb.functions.invoke('confirm-payment', { body: { token: this.tok, paymentIntentId: intent } });
      } catch { /* receipt still renders from whatever is already recorded */ }
    }

    let data: unknown = null;
    if (this.tok) {
      ({ data } = await bookingsDb.rpc('get_invoice_by_token', { p_token: this.tok }));
    } else if (intent) {
      // Self-serve: the signed-in client can read their own payment → booking → invoice.
      const { data: pay } = await bookingsDb.from('payments')
        .select('booking_id').eq('stripe_payment_intent_id', intent).maybeSingle();
      const bid = (pay as { booking_id: string } | null)?.booking_id;
      if (bid) ({ data } = await bookingsDb.rpc('get_invoice', { p_booking: bid }));
    }

    if (data) {
      this.bundle.set(data as InvoiceBundle);
      this.bookingId = (data as InvoiceBundle).booking.id;
    }
    this.loading.set(false);
  }

  // ── Derived ─────────────────────────────────────────────────────────
  get inv(): InvoiceDetails { return this.bundle()?.org.invoice_details ?? {}; }
  get currency(): string { return this.bundle()?.org.currency ?? 'EUR'; }
  get supplierName(): string { return this.inv.legal_name?.trim() || this.bundle()?.org.name || ''; }
  get lineItems() { return this.bundle()?.invoice.line_items ?? []; }
  get total(): number { return this.bundle()?.invoice.total ?? 0; }
  get paid(): number { return this.bundle()?.total_paid ?? 0; }
  get balance(): number { return Math.max(0, this.total - this.paid); }
  get fullyPaid(): boolean { return this.total > 0 && this.paid >= this.total - 0.005; }

  /** Invoice number = booking ref with the org's prefix swapped (BK-2026-007 → JFMB-2026-007). */
  get invoiceNumber(): string {
    const ref = this.bundle()?.booking.booking_ref ?? '';
    const prefix = (this.inv.invoice_prefix || 'INV').toUpperCase();
    const dash = ref.indexOf('-');
    return dash >= 0 ? `${prefix}-${ref.slice(dash + 1)}` : `${prefix}-${ref}`;
  }

  /** Back to the client's OWN booking page — where their receipt, invoice and (once paid
   *  in full) their delivery live. Previously this pointed at the public Malta map, which
   *  is nothing to do with someone who just paid for a shoot. */
  get backLink(): string { return this.tok ? `/book/${this.tok}` : '/book/mine'; }

  /** Full printable invoice — by token for anon customers, by id for signed-in. */
  get invoiceLink(): string {
    return this.tok ? `/book/invoice?token=${this.tok}` : `/book/invoice/${this.bookingId}`;
  }

  get headline(): string {
    return this.fullyPaid
      ? "Full payment confirmed. You're all set — see you soon!"
      : `Deposit received. The remaining balance of ${this.fmt(this.balance)} is due on the day.`;
  }
  private fmt(n: number): string { return `${this.currency === 'EUR' ? '€' : ''}${n.toFixed(2)}`; }
}
