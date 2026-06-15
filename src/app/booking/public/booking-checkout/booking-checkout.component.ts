import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientPortalService, BillingInput } from '@booking/core/services/client-portal.service';
import { AvailabilityService } from '@booking/core/services/availability.service';
import { BookingOrgService } from '@booking/core/services/booking-org.service';
import { servicePrice } from '@booking/core/interfaces/org.interface';
import { currencySymbol as toSymbol } from '@booking/core/utils/currency.util';

type Step = 'loading' | 'unavailable' | 'signin' | 'details' | 'paying' | 'done' | 'error';

// Same publishable key as the existing /book/:token pay page.
const STRIPE_PK = 'pk_live_51ShRJTAXI0tdCXi3HuEvh9PuIVMFTjqRlMQwsg8pqMlhACOXGKAiATxj9MzW268hs9RV6RvCb5FP1bIFHuNlZkBG007LHcSnOB';

@Component({
  selector: 'app-booking-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking-checkout.component.html',
  styleUrl: './booking-checkout.component.scss',
})
export class BookingCheckoutComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly portal = inject(ClientPortalService);
  private readonly availability = inject(AvailabilityService);
  private readonly bookingOrg = inject(BookingOrgService);

  readonly step = signal<Step>('loading');
  readonly errorMsg = signal<string | null>(null);

  // Context
  private orgId = '';
  private serviceId = '';
  private staffId = '';
  startIso = '';
  hours = 0;

  readonly price = signal<number | null>(null);
  readonly timezone = signal('Europe/Malta');
  readonly currencySymbol = signal('€');
  private depositPct = 30;

  // Sign-in
  email = '';
  readonly magicSent = signal(false);

  // Billing
  form: BillingInput = { name: '', email: '', company: '', vat: '', address: '' };
  readonly submitting = signal(false);
  readonly bookingRef = signal<string | null>(null);

  // Card payment (Stripe Elements)
  readonly deposit = computed(() => Math.round((this.price() ?? 0) * this.depositPct) / 100);
  readonly cardError = signal<string | null>(null);
  cardAmount = 0;
  private stripe: any = null;
  private elements: any = null;
  private paymentElement: any = null;

  readonly slotDay = computed(() => this.startIso
    ? new Date(this.startIso).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: this.timezone() }) : '');
  readonly slotTime = computed(() => this.startIso
    ? new Date(this.startIso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: this.timezone() }) : '');

  async ngOnInit(): Promise<void> {
    const qp = this.route.snapshot.queryParamMap;
    this.serviceId = qp.get('service') ?? '';
    this.staffId = qp.get('staff') ?? '';
    this.startIso = qp.get('start') ?? '';
    this.hours = Number(qp.get('hours') ?? 0);
    if (!this.serviceId || !this.staffId || !this.startIso || !this.hours) { this.router.navigate(['/book']); return; }

    await this.portal.init();
    const orgData = await this.bookingOrg.load();
    if (!orgData) { this.errorMsg.set('Could not load the booking page.'); this.step.set('error'); return; }
    this.orgId = orgData.org.id;
    this.currencySymbol.set(toSymbol(orgData.org.currency) ??'€');
    this.depositPct = orgData.org.booking_params.deposit_percent ?? 30;

    try {
      const date = new Date(this.startIso).toLocaleDateString('en-CA', { timeZone: orgData.org.timezone });
      const res = await this.availability.getAvailability(this.staffId, this.serviceId, date, date);
      this.timezone.set(res.timezone);
      this.price.set(servicePrice(res.pricing, this.hours));

      // Re-confirm the whole span is still free + contiguous
      const daySlots = res.days.find(d => d.date === date)?.slots ?? [];
      const startIdx = daySlots.findIndex(s => s.start === this.startIso);
      const span = startIdx >= 0 ? daySlots.slice(startIdx, startIdx + this.hours) : [];
      const stillFree = span.length === this.hours
        && span.every(s => s.available)
        && span.every((s, i) => i === 0 || s.hour === span[i - 1].hour + 1);
      if (!stillFree) { this.step.set('unavailable'); return; }
    } catch (err) {
      console.error('[Checkout] slot check failed:', err);
      this.errorMsg.set('Could not load this slot. Please try again.');
      this.step.set('error');
      return;
    }

    if (this.portal.signedIn()) await this.enterDetails();
    else this.step.set('signin');
  }

  private async enterDetails(): Promise<void> {
    const p = await this.portal.loadMyProfile(this.orgId);
    this.form = {
      name: p?.name ?? '',
      email: p?.email ?? this.portal.user()?.email ?? '',
      company: p?.company ?? '',
      vat: p?.vat_number ?? '',
      address: p?.billing_address ?? '',
    };
    this.step.set('details');
  }

  private redirectPath(): string { return window.location.pathname + window.location.search; }
  async signInGoogle(): Promise<void> { await this.portal.signInWithGoogle(this.redirectPath()); }
  async sendMagicLink(): Promise<void> {
    const e = this.email.trim();
    if (!e) return;
    await this.portal.signInWithEmail(e, this.redirectPath());
    this.magicSent.set(true);
  }

  canSubmit(): boolean {
    const f = this.form;
    return !!(f.name.trim() && f.email.trim()); // company / VAT / address optional
  }

  async submitCashRequest(): Promise<void> {
    if (!this.canSubmit() || this.submitting()) return;
    this.submitting.set(true);
    this.errorMsg.set(null);
    try {
      await this.portal.upsertProfile(this.orgId, this.form);
      const { booking_ref } = await this.portal.createBookingRequest(this.orgId, this.staffId, this.serviceId, this.startIso, this.hours);
      this.bookingRef.set(booking_ref);
      this.step.set('done');
    } catch (err) {
      console.error('[Checkout] request failed:', err);
      this.errorMsg.set((err as Error)?.message ?? 'Could not submit your request.');
      this.step.set('error');
    } finally {
      this.submitting.set(false);
    }
  }

  async startCard(type: 'deposit' | 'full'): Promise<void> {
    if (!this.canSubmit() || this.submitting()) return;
    this.submitting.set(true);
    this.errorMsg.set(null);
    this.cardError.set(null);
    try {
      await this.portal.upsertProfile(this.orgId, this.form);
      const res = await this.portal.startCardBooking(this.staffId, this.serviceId, this.startIso, this.hours, type);
      if (res.error === 'slot_taken') { this.step.set('unavailable'); return; }
      if (res.error || !res.clientSecret) throw new Error(res.error ?? 'Could not start payment.');

      this.cardAmount = type === 'deposit' ? this.deposit() : (this.price() ?? 0);
      this.bookingRef.set(res.bookingRef ?? null);

      await this.loadStripe();
      this.elements = this.stripe.elements({ clientSecret: res.clientSecret, appearance: { theme: 'stripe' } });
      this.paymentElement = this.elements.create('payment');
      this.step.set('paying');
      setTimeout(() => this.paymentElement.mount('#payment-element'), 50);
    } catch (err) {
      console.error('[Checkout] startCard failed:', err);
      this.errorMsg.set((err as Error)?.message ?? 'Could not start payment.');
      this.step.set('error');
    } finally {
      this.submitting.set(false);
    }
  }

  async payNow(): Promise<void> {
    if (!this.stripe || !this.elements) return;
    this.cardError.set(null);
    const params = new URLSearchParams({ ref: this.bookingRef() ?? '', amount: this.cardAmount.toFixed(2), type: 'self-serve' });
    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: { return_url: `${window.location.origin}/pay/success?${params.toString()}` },
    });
    if (error) this.cardError.set(error.message ?? 'Payment failed.');
  }

  private async loadStripe(): Promise<void> {
    if (!(window as any).Stripe) {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://js.stripe.com/v3/';
        s.onload = () => resolve();
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    if (!this.stripe) this.stripe = (window as any).Stripe(STRIPE_PK);
  }

  backToCalendar(): void {
    this.router.navigate(['/book/calendar'], { queryParams: { service: this.serviceId, staff: this.staffId } });
  }
}
