import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ClientPortalService, ClientBooking } from '@booking/core/services/client-portal.service';
import { BookingOrgService } from '@booking/core/services/booking-org.service';
import { BookingInvoiceComponent, InvoiceData } from '@booking/ui/booking-invoice/booking-invoice.component';

type Step = 'loading' | 'signin' | 'list';

const STATUS_LABELS: Record<string, string> = {
  pending: 'Awaiting approval', hold: 'Reserving…', booked: 'Confirmed',
  in_progress: 'In progress', done: 'Completed', cancelled: 'Cancelled', expired: 'Expired',
};

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [FormsModule, DatePipe, BookingInvoiceComponent],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss',
})
export class MyBookingsComponent implements OnInit {
  private readonly portal = inject(ClientPortalService);
  private readonly bookingOrg = inject(BookingOrgService);

  readonly step = signal<Step>('loading');
  readonly bookings = signal<ClientBooking[]>([]);
  readonly invoice = signal<InvoiceData | null>(null);

  // sign-in
  email = '';
  readonly magicSent = signal(false);

  async ngOnInit(): Promise<void> {
    await this.portal.init();
    if (this.portal.signedIn()) await this.load();
    else this.step.set('signin');
  }

  private async load(): Promise<void> {
    const org = await this.bookingOrg.load();
    if (org) this.bookings.set(await this.portal.loadMyBookings(org.org.id));
    this.step.set('list');
  }

  private redirectPath(): string { return '/book/mine'; }
  async signInGoogle(): Promise<void> { await this.portal.signInWithGoogle(this.redirectPath()); }
  async sendMagicLink(): Promise<void> {
    const e = this.email.trim();
    if (!e) return;
    await this.portal.signInWithEmail(e, this.redirectPath());
    this.magicSent.set(true);
  }

  async signOut(): Promise<void> {
    await this.portal.signOut();
    this.bookings.set([]);
    this.step.set('signin');
  }

  statusLabel(s: string): string { return STATUS_LABELS[s] ?? s; }
  statusClass(s: string): string { return `pill--${s}`; }

  viewInvoice(b: ClientBooking): void {
    this.invoice.set({
      ref: b.booking_ref,
      title: b.title,
      description: b.description,
      location: b.location,
      startAt: b.start_at,
      endAt: b.end_at,
      priceTotal: b.price_total,
      priceExpenses: 0,
      amountPaid: b.total_paid,
      balanceDue: b.balance_due,
      paymentType: b.total_paid > 0 && b.total_paid < b.price_total ? 'deposit' : 'full',
      paidAt: null,
    });
  }

  closeInvoice(): void { this.invoice.set(null); }
}
