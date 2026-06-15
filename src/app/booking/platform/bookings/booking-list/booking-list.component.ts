import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass, DatePipe, CurrencyPipe } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { BookingSummary, PaymentStatus } from '@booking/core/interfaces/booking.interface';

const PAYMENT_LABELS: Record<PaymentStatus, string> = {
  unpaid: 'Unpaid', partial: 'Deposit paid', paid: 'Paid', external: 'External',
};
const PAYMENT_CLASSES: Record<PaymentStatus, string> = {
  unpaid: 'badge--unpaid', partial: 'badge--partial', paid: 'badge--paid', external: 'badge--external',
};

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [RouterLink, NgClass, DatePipe, CurrencyPipe, CdkMenuTrigger, CdkMenu, CdkMenuItem],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss',
})
export class BookingListComponent {
  readonly data = inject(BookingDataService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  readonly copiedId = signal<string | null>(null);
  readonly busyId = signal<string | null>(null);

  goEdit(b: BookingSummary): void { this.router.navigate(['/bookings', b.id, 'edit']); }
  goDetail(b: BookingSummary): void { this.router.navigate(['/bookings', b.id]); }

  // Pending cash requests (client-created, awaiting approval) vs everything else
  readonly requests = computed(() => this.data.bookings().filter(b => b.status === 'pending'));
  readonly confirmed = computed(() => this.data.bookings().filter(b => b.status !== 'pending'));

  // Revenue/collected reflect only genuinely confirmed jobs — never pending,
  // hold, cancelled, expired or external blocks.
  private readonly CONFIRMED_STATES = ['booked', 'in_progress', 'done'];
  readonly confirmedJobs = computed(() =>
    this.data.bookings().filter(b => this.CONFIRMED_STATES.includes(b.status) && !b.is_external));
  /** What you expect to earn from confirmed jobs (total − expenses). */
  readonly expectedRevenue = computed(() => this.confirmedJobs().reduce((s, b) => s + b.price_revenue, 0));
  /** What's actually been received. */
  readonly collected = computed(() => this.confirmedJobs().reduce((s, b) => s + b.total_paid, 0));
  readonly unpaidCount = computed(() =>
    this.confirmedJobs().filter(b => b.payment_status === 'unpaid' || b.payment_status === 'partial').length);

  async copyLink(bookingId: string): Promise<void> {
    const url = await this.data.generateLink(bookingId);
    if (!url) { this.toast.error('Could not generate the payment link.'); return; }
    await navigator.clipboard.writeText(url);
    this.copiedId.set(bookingId);
    setTimeout(() => this.copiedId.set(null), 2000);
    this.toast.success('Payment link copied to clipboard');
  }

  async approve(b: BookingSummary): Promise<void> {
    this.busyId.set(b.id);
    try {
      const res = await this.data.approveRequest(b.id);
      if (res.error === 'slot_taken') this.toast.error(`${b.booking_ref}: that slot was just taken — decline this one.`);
      else if (res.error === 'not_pending') this.toast.error(`${b.booking_ref} is no longer pending.`);
      else if (res.error) this.toast.error(`Could not approve ${b.booking_ref}.`);
      else this.toast.success(`${b.booking_ref} approved — added to your calendar`);
    } catch {
      this.toast.error(`Could not approve ${b.booking_ref}. Please try again.`);
    } finally { this.busyId.set(null); }
  }

  async decline(b: BookingSummary): Promise<void> {
    if (!confirm(`Decline ${b.booking_ref}?`)) return;
    this.busyId.set(b.id);
    try {
      await this.data.declineRequest(b.id);
      this.toast.info(`${b.booking_ref} declined`);
    } catch {
      this.toast.error(`Could not decline ${b.booking_ref}.`);
    } finally { this.busyId.set(null); }
  }

  async cancel(b: BookingSummary): Promise<void> {
    if (!confirm(
      `Cancel ${b.booking_ref} (${b.client_name ?? 'no client'})?\n\n` +
      `This frees the slot and removes it from your calendar.\nThis cannot be undone.`,
    )) return;
    let refund = false;
    if (b.total_paid > 0) {
      refund = confirm(
        `€${b.total_paid} has been paid on this booking.\n\n` +
        `OK = refund any CARD payments via Stripe now.\n` +
        `Cancel = cancel without refunding.\n\n` +
        `(Cash / Revolut / bank payments are settled by you directly.)`,
      );
    }
    this.busyId.set(b.id);
    try {
      const res = await this.data.cancelBooking(b.id, refund);
      if (res.error) { this.toast.error(`Could not cancel ${b.booking_ref}.`); return; }
      if (res.calendar_cleared === false) {
        this.toast.error(`${b.booking_ref} cancelled, but its calendar event couldn't be removed — delete it manually.`);
      } else if (res.refunded) {
        this.toast.success(`${b.booking_ref} cancelled — €${res.refunded} refunded`);
      } else {
        this.toast.success(`${b.booking_ref} cancelled`);
      }
    } catch {
      this.toast.error(`Could not cancel ${b.booking_ref}. Please try again.`);
    } finally { this.busyId.set(null); }
  }

  paymentLabel(status: PaymentStatus): string { return PAYMENT_LABELS[status] ?? status; }
  paymentClass(status: PaymentStatus): string  { return PAYMENT_CLASSES[status] ?? ''; }
}
