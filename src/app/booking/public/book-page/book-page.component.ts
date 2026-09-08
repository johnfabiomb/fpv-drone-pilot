import { Component, OnInit, signal, inject, PLATFORM_ID, computed } from '@angular/core';
import { isPlatformBrowser, CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { bookingsDb as supabase } from '@booking/core/db/supabase.bookings';
import { BookingInvoiceComponent, type InvoiceData } from '@booking/ui/booking-invoice/booking-invoice.component';

// 'choose' = the card amount chooser reached from an already-CONFIRMED booking: same
// options as 'ready' but without the pay-later action (there's nothing left to confirm).
type PageState = 'loading' | 'invalid' | 'unavailable' | 'paid' | 'partial' | 'ready' | 'choose' | 'paying' | 'requested' | 'confirmed' | 'error';
type PaymentType = 'deposit' | 'full' | 'remainder';

const STRIPE_PK = 'pk_live_51ShRJTAXI0tdCXi3HuEvh9PuIVMFTjqRlMQwsg8pqMlhACOXGKAiATxj9MzW268hs9RV6RvCb5FP1bIFHuNlZkBG007LHcSnOB';

interface BookingDetails {
  title: string;
  description: string | null;
  location: string | null;
  start_at: string;
  end_at: string;
  price_total: number;
  price_expenses: number;
  booking_ref: string;
  allow_card: boolean;
  allow_inperson: boolean;
  deposit_percent: number | null;
  deposit_allowed: boolean | null;
  status: string;                    // 'booked'/'in_progress'/'done' ⇒ already confirmed
  google_event_id: string | null;   // present ⇒ already confirmed / on the calendar
}

// Statuses that mean the booking is already confirmed (nothing left to accept).
const CONFIRMED_STATUSES = ['booked', 'in_progress', 'done'];

/** One completed payment as shown to the client (from check-availability). */
interface PaidRecord {
  amount: number;
  type: string;
  method: string;
  paid_at: string | null;
}

const METHOD_LABELS: Record<string, string> = {
  card: 'Card', cash: 'Cash', revolut: 'Revolut', bank: 'Bank transfer', other: 'Other',
};

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, BookingInvoiceComponent],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.scss',
})
export class BookPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  state = signal<PageState>('loading');
  booking = signal<BookingDetails | null>(null);
  selectedType = signal<PaymentType | null>(null);
  errorMessage = signal<string>('');
  totalPaid = signal<number>(0);
  payments = signal<PaidRecord[]>([]);   // itemised receipts behind totalPaid
  confirming = signal<boolean>(false);
  cardLoading = signal<boolean>(false);   // creating intent + Stripe form rendering
  processing = signal<boolean>(false);    // final "Pay now" confirm in flight

  private token = '';
  private stripe: any = null;
  private elements: any = null;
  private paymentElement: any = null;

  get isPast(): boolean {
    const b = this.booking();
    return b ? new Date(b.start_at) <= new Date() : false;
  }

  /** Printable invoice, accessible without login via the booking-link token. */
  get invoiceUrl(): string { return `/book/invoice?token=${this.token}`; }

  get showCard(): boolean { return this.booking()?.allow_card ?? false; }
  get showInperson(): boolean { return this.booking()?.allow_inperson ?? false; }
  /** Pay-later is the only option → the in-person button confirms the booking directly. */
  get payLaterOnly(): boolean {
    const b = this.booking();
    return !!b && b.allow_inperson && !b.allow_card;
  }

  /** Effective deposit % for this booking (legacy rows with no value fall back to 30). */
  get depositPercent(): number { return this.booking()?.deposit_percent ?? 30; }

  /** Whether a deposit may be offered (per-booking; legacy rows default to allowed). */
  get depositAllowed(): boolean { return this.booking()?.deposit_allowed ?? true; }

  /** Show the deposit option only when card is on, a deposit is allowed, and the date is future. */
  get showDeposit(): boolean { return this.showCard && this.depositAllowed && !this.isPast; }

  /** Already confirmed (agreed / on the calendar) — paying online is optional, so the
   *  chooser and any back-navigation return to 'choose', never the pay-later 'ready' view. */
  get isConfirmedBooking(): boolean {
    const b = this.booking();
    return !!b && (CONFIRMED_STATUSES.includes(b.status) || !!b.google_event_id);
  }

  /** Human label for a payment method ('card' → 'Card', 'bank' → 'Bank transfer'). */
  methodLabel(method: string): string { return METHOD_LABELS[method] ?? 'Payment'; }

  /** Confirmed booking → "Pay by card" opens the amount chooser instead of charging in full. */
  openCardChooser(): void {
    this.errorMessage.set('');
    this.state.set('choose');
  }

  get depositAmount(): number {
    return Math.round((this.booking()?.price_total ?? 0) * this.depositPercent) / 100;
  }

  get remainingAmount(): number {
    return Math.round(((this.booking()?.price_total ?? 0) - this.totalPaid()) * 100) / 100;
  }

  paidInvoice = computed<InvoiceData | null>(() => {
    const b = this.booking();
    if (!b) return null;
    const paid = this.totalPaid();
    return {
      ref: b.booking_ref,
      title: b.title,
      description: b.description,
      location: b.location,
      startAt: b.start_at,
      endAt: b.end_at,
      priceTotal: b.price_total,
      priceExpenses: b.price_expenses,
      amountPaid: paid,
      balanceDue: Math.max(0, b.price_total - paid),
      paymentType: 'full',
      paidAt: null,
    };
  });

  async ngOnInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    if (!this.token) { this.state.set('invalid'); return; }

    await this.loadBooking();
  }

  private async loadBooking(): Promise<void> {
    try {
      const { data: link, error } = await supabase
        .from('booking_links')
        .select('is_active, expires_at, bookings(booking_ref, title, description, location, start_at, end_at, price_total, price_expenses, allow_card, allow_inperson, deposit_percent, deposit_allowed, status, google_event_id)')
        .eq('token', this.token)
        .single();

      if (error || !link || !link.is_active) { this.state.set('invalid'); return; }
      if (link.expires_at && new Date(link.expires_at) < new Date()) { this.state.set('invalid'); return; }

      const b = link.bookings as unknown as BookingDetails;
      this.booking.set(b);

      const { data: availData, error: availError } = await supabase.functions.invoke('check-availability', {
        body: { token: this.token },
      });
      if (availError) throw availError;
      const { available, paymentStatus, totalPaid } = availData;

      this.totalPaid.set(totalPaid);
      this.payments.set((availData.payments ?? []) as PaidRecord[]);
      if (paymentStatus === 'paid')    { this.state.set('paid');    return; }
      if (paymentStatus === 'partial') { this.state.set('partial'); return; }

      // A CONFIRMED booking is already agreed → show the invoice. If card is enabled and a
      // balance remains, also load Stripe so the client can optionally pay online. (Status
      // is the source of truth; google_event_id is a secondary signal — the calendar push
      // can be off/fail.) A TENTATIVE booking (pending) shows the pay / "pay later" options
      // so the client can confirm — unless its slot was taken meanwhile.
      const confirmed = CONFIRMED_STATUSES.includes(b.status) || !!b.google_event_id;
      if (confirmed) {
        if (b.allow_card && this.remainingAmount > 0) await this.loadStripeJs();
        this.state.set('confirmed');
        return;
      }
      if (!available) { this.state.set('unavailable'); return; }

      await this.loadStripeJs();
      this.state.set('ready');
    } catch {
      this.state.set('error');
    }
  }

  private loadStripeJs(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).Stripe) { this.initStripe(); resolve(); return; }
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => { this.initStripe(); resolve(); };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // For a direct charge on the org's connected account, Stripe.js must be initialized
  // with { stripeAccount } (known only after the intent is created). The platform
  // fallback (no connected account) uses the plain instance.
  private initStripe(stripeAccount?: string | null): void {
    this.stripe = stripeAccount
      ? (window as any).Stripe(STRIPE_PK, { stripeAccount })
      : (window as any).Stripe(STRIPE_PK);
  }

  async selectPayment(type: PaymentType): Promise<void> {
    this.selectedType.set(type);
    this.state.set('paying');
    this.cardLoading.set(true);   // show a spinner until the secure form is ready
    this.errorMessage.set('');

    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: { token: this.token, paymentType: type },
      });
      if (error) throw error;
      const { clientSecret, stripeAccount } = data ?? {};
      if (!clientSecret) throw new Error('Could not start the payment. Please try again.');

      // Make sure Stripe.js is initialized before we use it (idempotent). On the
      // platform-account path `stripeAccount` is null, so nothing re-inits it — load the
      // base instance now so `this.stripe` is never null. For a connected account, rebind
      // Stripe.js to it so the direct charge renders on the right account.
      await this.loadStripeJs();
      if (stripeAccount) this.initStripe(stripeAccount);
      if (!this.stripe) throw new Error('Payment could not load. Please refresh and try again.');

      this.elements = this.stripe.elements({ clientSecret, appearance: { theme: 'stripe' } });
      this.paymentElement = this.elements.create('payment');
      // Hide the spinner only once Stripe's form has actually rendered.
      this.paymentElement.on('ready', () => this.cardLoading.set(false));

      setTimeout(() => {
        this.paymentElement.mount('#payment-element');
      }, 50);
    } catch (err: any) {
      this.errorMessage.set(err.message ?? 'Something went wrong.');
      this.cardLoading.set(false);
      this.state.set(this.isConfirmedBooking ? 'choose' : 'ready');
    }
  }

  async submitPayment(): Promise<void> {
    if (!this.stripe || !this.elements || this.processing()) return;
    this.processing.set(true);
    this.errorMessage.set('');

    const b = this.booking()!;
    const type = this.selectedType()!;
    const amount = type === 'deposit' ? this.depositAmount
                 : type === 'remainder' ? this.remainingAmount
                 : b.price_total;
    const params = new URLSearchParams({
      ref: b.booking_ref,
      title: b.title,
      amount: amount.toFixed(2),
      type,
      tok: this.token,
    });

    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: `${window.location.origin}/pay/success?${params.toString()}`,
      },
    });

    if (error) {
      // Stayed on the page (declined / validation / 3-D Secure cancelled) — let them retry.
      this.errorMessage.set(error.message ?? 'Payment failed.');
      this.processing.set(false);
    }
    // On success Stripe redirects to return_url, so we leave `processing` on (page unloads).
  }

  /** Client chooses to settle in person (cash / Revolut / bank). If pay-later is the only
   *  option this confirms the booking directly; otherwise it raises a request John approves. */
  async acceptInPerson(): Promise<void> {
    this.confirming.set(true);
    this.errorMessage.set('');
    try {
      const { data, error } = await supabase.functions.invoke('accept-inperson', { body: { token: this.token } });
      if (error) throw error;
      const res = (data ?? {}) as { error?: string; confirmed?: boolean };
      if (res.error) {
        this.errorMessage.set('Could not send your request. Please contact John.');
        return;
      }
      this.state.set(res.confirmed ? 'confirmed' : 'requested');
    } catch {
      this.errorMessage.set('Could not send your request. Please try again or contact John.');
    } finally {
      this.confirming.set(false);
    }
  }

  goBack(): void {
    this.state.set(this.isConfirmedBooking ? 'choose' : 'ready');
    this.selectedType.set(null);
    if (this.paymentElement) { this.paymentElement.destroy(); this.paymentElement = null; }
  }
}
