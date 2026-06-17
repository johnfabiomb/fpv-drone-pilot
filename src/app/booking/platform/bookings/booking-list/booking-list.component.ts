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

type BookingTab = 'upcoming' | 'pending' | 'unpaid' | 'paid' | 'past' | 'external' | 'cancelled' | 'all';

const EMPTY_TEXT: Record<BookingTab, string> = {
  upcoming: 'No upcoming bookings. Your schedule is clear.',
  pending: 'No requests waiting for approval.',
  unpaid: 'Nothing outstanding — every job is paid. 🎉',
  paid: 'No fully-paid bookings yet.',
  past: 'No past bookings.',
  external: 'No imported calendar events. Use “Sync Calendar” to pull them in.',
  cancelled: 'No cancelled bookings.',
  all: 'No bookings match your search.',
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

  // ── Tabs / filtering ─────────────────────────────────────────────────
  readonly tabs: ReadonlyArray<{ key: BookingTab; label: string }> = [
    { key: 'upcoming',  label: 'Upcoming' },
    { key: 'pending',   label: 'Pending' },
    { key: 'unpaid',    label: 'Unpaid' },
    { key: 'paid',      label: 'Paid' },
    { key: 'past',      label: 'Past' },
    { key: 'external',  label: 'External' },
    { key: 'cancelled', label: 'Cancelled' },
    { key: 'all',       label: 'All' },
  ];
  readonly tab = signal<BookingTab>('upcoming');
  readonly search = signal('');

  private static readonly ACTIVE = ['booked', 'in_progress', 'done'];
  private startMs(b: BookingSummary): number { return new Date(b.start_at).getTime(); }
  private endMs(b: BookingSummary): number { return new Date(b.end_at).getTime(); }
  /** Local midnight today — "upcoming" includes everything from today onward. */
  private todayStartMs(): number { const d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); }

  /** Whether a booking belongs in a given tab. */
  private inTab(b: BookingSummary, tab: BookingTab, now: number): boolean {
    const active = BookingListComponent.ACTIVE.includes(b.status);
    switch (tab) {
      // Upcoming = anything happening today or later — real OR imported (external) events.
      case 'upcoming':  return (b.status === 'booked' || b.status === 'in_progress') && this.endMs(b) >= this.todayStartMs();
      case 'past':      return !b.is_external && active && this.endMs(b) < this.todayStartMs();
      case 'pending':   return b.status === 'pending';
      case 'unpaid':    return active && !b.is_external && (b.payment_status === 'unpaid' || b.payment_status === 'partial');
      case 'paid':      return active && !b.is_external && b.payment_status === 'paid';
      case 'external':  return b.is_external;
      case 'cancelled': return b.status === 'cancelled' || b.status === 'expired';
      case 'all':       return true;
    }
  }

  /** Every tab is strictly chronological. Forward-looking tabs run soonest→latest; history runs most-recent→oldest. */
  private comparatorFor(tab: BookingTab): (a: BookingSummary, b: BookingSummary) => number {
    const asc = (a: BookingSummary, b: BookingSummary) => this.startMs(a) - this.startMs(b);
    const desc = (a: BookingSummary, b: BookingSummary) => this.startMs(b) - this.startMs(a);
    switch (tab) {
      case 'upcoming': case 'pending': case 'unpaid': case 'external': return asc;
      default:         return desc; // past, paid, cancelled, all → most recent first
    }
  }

  readonly counts = computed<Record<BookingTab, number>>(() => {
    const now = Date.now();
    const c: Record<BookingTab, number> = { upcoming: 0, pending: 0, unpaid: 0, paid: 0, past: 0, external: 0, cancelled: 0, all: 0 };
    for (const b of this.data.bookings())
      for (const t of this.tabs) if (this.inTab(b, t.key, now)) c[t.key]++;
    return c;
  });

  /** The rows for the active tab, filtered by the search box and sorted. */
  readonly rows = computed<BookingSummary[]>(() => {
    const tab = this.tab(), now = Date.now();
    const q = this.search().trim().toLowerCase();
    let list = this.data.bookings().filter(b => this.inTab(b, tab, now));
    if (q) list = list.filter(b =>
      !!b.booking_ref?.toLowerCase().includes(q) ||
      !!b.client_name?.toLowerCase().includes(q) ||
      !!b.title?.toLowerCase().includes(q));
    return list.sort(this.comparatorFor(tab));
  });

  /** The soonest still-to-come booking (real or external) — highlighted as "NEXT". */
  readonly nextId = computed<string | null>(() => {
    const now = Date.now();
    const up = this.data.bookings()
      .filter(b => (b.status === 'booked' || b.status === 'in_progress') && this.endMs(b) >= now)
      .sort((a, b) => this.startMs(a) - this.startMs(b));
    return up.length ? up[0].id : null;
  });

  emptyText(): string { return EMPTY_TEXT[this.tab()]; }

  /** Friendly relative day for the schedule ("Today", "Tomorrow", "in 3 days"). */
  relative(b: BookingSummary): string {
    const days = Math.round((this.startMs(b) - Date.now()) / 86_400_000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days === -1) return 'Yesterday';
    if (days > 1 && days <= 14) return `in ${days} days`;
    if (days < -1 && days >= -14) return `${-days} days ago`;
    return '';
  }

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
