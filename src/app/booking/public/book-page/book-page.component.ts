import { Component, OnInit, signal, inject, PLATFORM_ID, computed } from '@angular/core';
import { isPlatformBrowser, CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { bookingsDb as supabase } from '@booking/core/db/supabase.bookings';
import { BookingInvoiceComponent, type InvoiceData } from '@booking/ui/booking-invoice/booking-invoice.component';

type PageState = 'loading' | 'invalid' | 'unavailable' | 'paid' | 'partial' | 'ready' | 'paying' | 'requested' | 'confirmed' | 'error';
type PaymentType = 'deposit' | 'full' | 'remainder';

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
}

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
  confirming = signal<boolean>(false);

  private token = '';
  private stripe: any = null;
  private elements: any = null;
  private paymentElement: any = null;

  get isPast(): boolean {
    const b = this.booking();
    return b ? new Date(b.start_at) <= new Date() : false;
  }

  get showCard(): boolean { return this.booking()?.allow_card ?? false; }
  get showInperson(): boolean { return this.booking()?.allow_inperson ?? false; }
  /** Pay-later is the only option → the in-person button confirms the booking directly. */
  get payLaterOnly(): boolean {
    const b = this.booking();
    return !!b && b.allow_inperson && !b.allow_card;
  }

  get depositAmount(): number {
    return Math.round((this.booking()?.price_total ?? 0) * 0.30 * 100) / 100;
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
        .select('is_active, expires_at, bookings(booking_ref, title, description, location, start_at, end_at, price_total, price_expenses, allow_card, allow_inperson)')
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

      if (paymentStatus === 'paid')    { this.totalPaid.set(totalPaid); this.state.set('paid');    return; }
      if (paymentStatus === 'partial') { this.totalPaid.set(totalPaid); this.state.set('partial'); return; }
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

  private initStripe(): void {
    this.stripe = (window as any).Stripe('pk_live_51ShRJTAXI0tdCXi3HuEvh9PuIVMFTjqRlMQwsg8pqMlhACOXGKAiATxj9MzW268hs9RV6RvCb5FP1bIFHuNlZkBG007LHcSnOB');
  }

  async selectPayment(type: PaymentType): Promise<void> {
    this.selectedType.set(type);
    this.state.set('paying');
    this.errorMessage.set('');

    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: { token: this.token, paymentType: type },
      });
      if (error) throw error;
      const { clientSecret } = data;

      this.elements = this.stripe.elements({ clientSecret, appearance: { theme: 'stripe' } });
      this.paymentElement = this.elements.create('payment');

      setTimeout(() => {
        this.paymentElement.mount('#payment-element');
      }, 50);
    } catch (err: any) {
      this.errorMessage.set(err.message ?? 'Something went wrong.');
      this.state.set('ready');
    }
  }

  async submitPayment(): Promise<void> {
    if (!this.stripe || !this.elements) return;
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
      this.errorMessage.set(error.message ?? 'Payment failed.');
    }
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
    this.state.set('ready');
    this.selectedType.set(null);
    if (this.paymentElement) { this.paymentElement.destroy(); this.paymentElement = null; }
  }
}
