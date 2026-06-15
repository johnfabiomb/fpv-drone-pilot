import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { Payment, PaymentMethod } from '@booking/core/interfaces/booking.interface';

const METHOD_LABEL: Record<PaymentMethod, string> = {
  card: 'Card', cash: 'Cash', revolut: 'Revolut', bank: 'Bank transfer', other: 'Other',
};

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [RouterLink, FormsModule, DatePipe, CurrencyPipe],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  readonly data = inject(BookingDataService);

  private id = '';
  readonly payments = signal<Payment[]>([]);
  readonly copied = signal(false);
  readonly adding = signal(false);

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

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.id) this.payments.set(await this.data.getPayments(this.id));
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
    if (!confirm(`Remove this €${p.amount} payment? This only fixes the record — it does not refund anyone.`)) return;
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

  goEdit(): void { this.router.navigate(['/bookings', this.id, 'edit']); }
}
