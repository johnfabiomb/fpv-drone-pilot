import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { bookingsDb } from '@booking/core/db/supabase.bookings';
import { BookingInvoiceComponent, type InvoiceData } from '@booking/ui/booking-invoice/booking-invoice.component';

interface BookingSnippet {
  booking_ref: string;
  title: string;
  description: string | null;
  location: string | null;
  start_at: string;
  end_at: string;
  price_total: number;
  price_expenses: number;
}

function toSingle<T>(val: T | T[] | null | undefined): T | null {
  if (!val) return null;
  return Array.isArray(val) ? (val[0] ?? null) : val;
}

function toInvoice(b: BookingSnippet, amountPaid: number, paymentType: 'deposit' | 'full'): InvoiceData {
  return {
    ref: b.booking_ref,
    title: b.title,
    description: b.description,
    location: b.location,
    startAt: b.start_at,
    endAt: b.end_at,
    priceTotal: b.price_total,
    priceExpenses: b.price_expenses,
    amountPaid,
    balanceDue: Math.max(0, b.price_total - amountPaid),
    paymentType,
    paidAt: new Date(),
  };
}

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, BookingInvoiceComponent],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
})
export class PaymentSuccessComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);

  invoice = signal<InvoiceData | null>(null);
  loading = signal(true);

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      document.title = 'Payment Confirmed | JM Bookings';
    }
    if (!isPlatformBrowser(this.platformId)) return;

    const params      = this.route.snapshot.queryParamMap;
    const tok         = params.get('tok');
    const amountPaid  = parseFloat(params.get('amount') ?? '0');
    const paymentType = (params.get('type') ?? 'full') as 'deposit' | 'full';

    if (tok) {
      await this.loadFromToken(tok, amountPaid, paymentType);
    } else {
      const intentId = params.get('payment_intent');
      if (intentId) await this.loadFromPaymentIntent(intentId);
      else this.loading.set(false);
    }
  }

  private async loadFromToken(tok: string, amountPaid: number, paymentType: 'deposit' | 'full'): Promise<void> {
    const { data } = await bookingsDb
      .from('booking_links')
      .select('bookings(booking_ref, title, description, location, start_at, end_at, price_total, price_expenses)')
      .eq('token', tok)
      .single();

    const b = toSingle(data?.bookings as BookingSnippet | BookingSnippet[] | null);
    if (b) this.invoice.set(toInvoice(b, amountPaid, paymentType));
    this.loading.set(false);
  }

  private async loadFromPaymentIntent(intentId: string): Promise<void> {
    const { data } = await bookingsDb
      .from('payments')
      .select('amount, type, bookings(booking_ref, title, description, location, start_at, end_at, price_total, price_expenses)')
      .eq('stripe_payment_intent_id', intentId)
      .single();

    const b = toSingle(data?.bookings as BookingSnippet | BookingSnippet[] | null);
    if (b && data) {
      this.invoice.set(toInvoice(b, data.amount as number, data.type as 'deposit' | 'full'));
    }
    this.loading.set(false);
  }

  get depositMessage(): string {
    const inv = this.invoice();
    if (!inv) return '';
    return inv.paymentType === 'deposit'
      ? `Your 30% deposit has been received. The remaining balance of €${inv.balanceDue.toFixed(2)} is due on the day.`
      : `Full payment confirmed. You're all set — see you soon!`;
  }
}
