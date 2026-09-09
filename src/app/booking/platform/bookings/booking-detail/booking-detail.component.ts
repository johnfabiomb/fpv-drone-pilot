import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { ConfirmService } from '@booking/ui/confirm/confirm.service';
import { LinksEditorComponent } from '@booking/ui/links-editor/links-editor.component';
import { Payment, PaymentMethod, BookingSlot } from '@booking/core/interfaces/booking.interface';
import { LineItem } from '@booking/core/interfaces/invoice.interface';
import { Delivery, DeliveryLink, isDeliveryUrl } from '@booking/core/interfaces/delivery.interface';

const METHOD_LABEL: Record<PaymentMethod, string> = {
  card: 'Card', cash: 'Cash', revolut: 'Revolut', bank: 'Bank transfer', other: 'Other',
};

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [RouterLink, FormsModule, DatePipe, CurrencyPipe, LinksEditorComponent],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);
  private readonly auth = inject(BookingsAuthService);   // deliveries are org-scoped → need orgId()
  readonly data = inject(BookingDataService);

  id = '';  // booking id (used by the template for the Invoice link)
  readonly payments = signal<Payment[]>([]);
  readonly slots = signal<BookingSlot[]>([]);    // the booking's time blocks (one or more)
  readonly lineItems = signal<LineItem[]>([]);   // invoice breakdown (source of truth for the total)
  readonly copied = signal(false);
  readonly adding = signal(false);

  // Delivery (what the client receives once paid)
  readonly delivery = signal<Delivery | null>(null);
  readonly savingDelivery = signal(false);
  readonly releasing = signal(false);
  deliveryMessage = '';
  deliveryLinks: DeliveryLink[] = [];

  // Add-payment form
  payAmount: number | null = null;
  payMethod: PaymentMethod = 'cash';
  payNote = '';
  payDate = new Date().toISOString().slice(0, 10);
  readonly methods: PaymentMethod[] = ['cash', 'revolut', 'bank', 'card', 'other'];

  readonly booking = computed(() => this.data.bookings().find(b => b.id === this.id));
  readonly balance = computed(() => {
    const b = this.booking();
    return b ? Math.max(0, Math.round((b.price_total - b.total_paid) * 100) / 100) : 0;
  });

  // ── Delivery state ───────────────────────────────────────────────────────
  /** Something is actually attached (an empty row reads as nothing, like the client sees). */
  readonly hasDelivery = computed(() => {
    const d = this.delivery();
    return !!d && (!!d.message?.trim() || d.links.length > 0);
  });
  readonly released = computed(() => !!this.delivery()?.released_at);
  readonly paidInFull = computed(() => this.booking()?.payment_status === 'paid');
  /** Mirrors the server's rule in get_delivery_by_token, for the admin's status badge only. */
  readonly clientCanSee = computed(() => this.hasDelivery() && (this.released() || this.paidInFull()));
  get deliveryValid(): boolean { return this.deliveryLinks.every(l => !l.url.trim() || isDeliveryUrl(l.url)); }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.id) {
      await this.auth.initialize();   // idempotent; needed for orgId() when saving a delivery
      const [payments, slots, items, delivery] = await Promise.all([
        this.data.getPayments(this.id),
        this.data.getBookingSlots(this.id),
        this.data.getInvoiceItems(this.id),
        this.data.getDelivery(this.id),
      ]);
      this.payments.set(payments);
      this.slots.set(slots);
      this.lineItems.set(items);
      this.applyDelivery(delivery);
    }
  }

  // ── Delivery actions ─────────────────────────────────────────────────────
  private applyDelivery(d: Delivery | null): void {
    this.delivery.set(d);
    this.deliveryMessage = d?.message ?? '';
    this.deliveryLinks = (d?.links ?? []).map(l => ({ ...l }));   // copy: the editor writes immutably
  }

  async saveDelivery(): Promise<void> {
    const org = this.auth.orgId();
    if (!org) { this.toast.error('No organization context.'); return; }
    if (!this.deliveryValid) { this.toast.error('Every link must start with http:// or https://'); return; }
    this.savingDelivery.set(true);
    try {
      // Drop blank rows so a half-typed line never reaches the client.
      const links = this.deliveryLinks
        .map(l => ({ label: l.label.trim(), url: l.url.trim() }))
        .filter(l => l.url);
      const res = await this.data.saveDelivery(org, this.id, {
        message: this.deliveryMessage.trim() || null, links,
      });
      if (res.error) { this.toast.error('Could not save the delivery.'); return; }
      this.applyDelivery(await this.data.getDelivery(this.id));
      this.toast.success('Delivery saved');
    } finally { this.savingDelivery.set(false); }
  }

  async toggleRelease(): Promise<void> {
    const org = this.auth.orgId();
    if (!org) { this.toast.error('No organization context.'); return; }
    const releasing = !this.released();
    const ok = await this.confirm.ask(releasing
      ? { title: 'Release delivery now', message: 'The client will be able to open this immediately, before the booking is paid in full. Continue?', confirmLabel: 'Release' }
      : { title: 'Lock delivery', message: 'The client will lose access until the booking is paid in full.', confirmLabel: 'Lock', danger: true });
    if (!ok) return;
    this.releasing.set(true);
    try {
      const res = await this.data.setDeliveryReleased(org, this.id, releasing);
      if (res.error) { this.toast.error('Could not update the delivery.'); return; }
      this.applyDelivery(await this.data.getDelivery(this.id));
      this.toast.success(releasing ? 'Delivery released to the client' : 'Delivery locked again');
    } finally { this.releasing.set(false); }
  }

  async clearDelivery(): Promise<void> {
    const org = this.auth.orgId();
    if (!org) { this.toast.error('No organization context.'); return; }
    if (!(await this.confirm.ask({
      title: 'Remove delivery', message: 'Clear the message and links? The client will no longer see a delivery.',
      confirmLabel: 'Remove', danger: true,
    }))) return;
    const res = await this.data.clearDelivery(org, this.id);
    if (res.error) { this.toast.error('Could not remove the delivery.'); return; }
    this.applyDelivery(await this.data.getDelivery(this.id));
    this.toast.info('Delivery removed');
  }

  methodLabel(m: string): string { return METHOD_LABEL[m as PaymentMethod] ?? m; }

  prefillBalance(): void { this.payAmount = this.balance(); }

  async addPayment(): Promise<void> {
    const amount = Number(this.payAmount);
    if (!isFinite(amount) || amount <= 0) { this.toast.error('Enter a valid amount.'); return; }
    this.adding.set(true);
    try {
      const paidAt = this.payDate ? new Date(`${this.payDate}T12:00:00`).toISOString() : null;
      const res = await this.data.addPayment(this.id, {
        amount, method: this.payMethod, note: this.payNote.trim() || null, paidAt,
      });
      if (res.error) { this.toast.error('Could not record the payment.'); return; }
      this.payments.set(await this.data.getPayments(this.id));
      const ref = this.booking()?.booking_ref ?? '';
      this.toast.success(`€${amount} payment recorded${ref ? ` for ${ref}` : ''}`);
      this.payAmount = null; this.payNote = '';
    } finally {
      this.adding.set(false);
    }
  }

  async deletePayment(p: Payment): Promise<void> {
    if (p.stripe_payment_intent_id) {
      this.toast.error('Card payments are managed in Stripe and can’t be removed here.');
      return;
    }
    const ok = await this.confirm.ask({
      title: 'Remove payment',
      message: `Remove this €${p.amount} payment? This only fixes the record — it does not refund anyone.`,
      confirmLabel: 'Remove', danger: true,
    });
    if (!ok) return;
    await this.data.deletePayment(p.id, this.id);
    this.payments.set(await this.data.getPayments(this.id));
    this.toast.info('Payment removed');
  }

  async copyLink(): Promise<void> {
    const url = await this.data.generateLink(this.id);
    if (!url) { this.toast.error('Could not generate the payment link.'); return; }
    await navigator.clipboard.writeText(url);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
    this.toast.success('Payment link copied to clipboard');
  }

  /** Copy the client-shareable (no-login) invoice link. */
  async copyInvoiceLink(): Promise<void> {
    const url = await this.data.invoiceShareLink(this.id);
    if (!url) { this.toast.error('Could not create the invoice link.'); return; }
    await navigator.clipboard.writeText(url);
    this.toast.success('Invoice link copied — share it with your client');
  }

  goEdit(): void { this.router.navigate(['/bookings', this.id, 'edit']); }
}
