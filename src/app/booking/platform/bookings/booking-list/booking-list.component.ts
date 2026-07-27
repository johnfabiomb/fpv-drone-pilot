import { Component, inject, signal, computed, effect } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass, DatePipe, CurrencyPipe } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { FormsModule } from '@angular/forms';
import { map, debounceTime } from 'rxjs';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { ConfirmService } from '@booking/ui/confirm/confirm.service';
import { ModalComponent } from '@booking/ui/modal/modal.component';
import { BookingSummary, BookingTab, PaymentStatus } from '@booking/core/interfaces/booking.interface';

const PAYMENT_LABELS: Record<PaymentStatus, string> = {
  unpaid: 'Unpaid', partial: 'Deposit paid', paid: 'Paid', external: 'External',
};
const PAYMENT_CLASSES: Record<PaymentStatus, string> = {
  unpaid: 'badge--unpaid', partial: 'badge--partial', paid: 'badge--paid', external: 'badge--external',
};

// 'external' is intentionally not a selectable tab — those bookings still show under Upcoming/Past/All.
const TAB_KEYS: BookingTab[] = ['upcoming', 'pending', 'unpaid', 'paid', 'past', 'cancelled', 'all'];
const EMPTY_COUNTS: Record<BookingTab, number> =
  { upcoming: 0, pending: 0, unpaid: 0, paid: 0, past: 0, external: 0, cancelled: 0, all: 0 };

const EMPTY_TEXT: Record<BookingTab, string> = {
  upcoming: 'No upcoming bookings. Your schedule is clear.',
  pending: 'No bookings waiting to be confirmed.',
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
  imports: [RouterLink, NgClass, DatePipe, CurrencyPipe, CdkMenuTrigger, CdkMenu, CdkMenuItem, FormsModule, ModalComponent],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss',
})
export class BookingListComponent {
  readonly data = inject(BookingDataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);
  readonly copiedId = signal<string | null>(null);
  readonly busyId = signal<string | null>(null);

  goEdit(b: BookingSummary): void { this.router.navigate(['/bookings', b.id, 'edit']); }
  goDetail(b: BookingSummary): void { this.router.navigate(['/bookings', b.id]); }

  // ── Tabs (URL-driven) + per-tab server queries ───────────────────────
  // Grouped by intent so the row reads logically: when → money/workflow → other → all.
  readonly tabGroups: ReadonlyArray<ReadonlyArray<{ key: BookingTab; label: string }>> = [
    [{ key: 'upcoming',  label: 'Upcoming' }, { key: 'past', label: 'Past' }],
    [{ key: 'pending',   label: 'To confirm' }, { key: 'unpaid', label: 'Unpaid' }, { key: 'paid', label: 'Paid' }],
    [{ key: 'cancelled', label: 'Cancelled' }, { key: 'all', label: 'All' }],
  ];

  /** Remember the last tab so returning from edit/detail lands you back where you were. */
  private readonly TAB_STORE = 'jm.bookings.tab';
  private readPersistedTab(): BookingTab {
    try {
      const t = localStorage.getItem(this.TAB_STORE) as BookingTab | null;
      if (t && TAB_KEYS.includes(t)) return t;
    } catch { /* SSR / storage blocked */ }
    return 'upcoming';
  }

  /** The active tab lives in the URL (?tab=…) so it's shareable + survives reload/back;
   *  with no param we fall back to the last tab the user was on (not always "Upcoming"). */
  readonly tab = toSignal(
    this.route.queryParamMap.pipe(map(p => {
      const t = p.get('tab') as BookingTab | null;
      return t && TAB_KEYS.includes(t) ? t : this.readPersistedTab();
    })),
    { initialValue: this.readPersistedTab() });

  readonly search = signal('');
  private readonly debouncedSearch = toSignal(
    toObservable(this.search).pipe(debounceTime(250)), { initialValue: '' });

  // Rows + counts come fresh from the server — never filtered locally.
  readonly rows = signal<BookingSummary[]>([]);
  readonly rowsLoading = signal(true);
  readonly counts = signal<Record<BookingTab, number>>(EMPTY_COUNTS);

  constructor() {
    // Arrived without an explicit tab (e.g. back from an edit)? Restore the last one into the URL.
    if (!this.route.snapshot.queryParamMap.get('tab')) {
      const restored = this.readPersistedTab();
      if (restored !== 'upcoming') {
        void this.router.navigate([], { queryParams: { tab: restored }, queryParamsHandling: 'merge', replaceUrl: true });
      }
    }
    // Re-query whenever the tab (URL) or the debounced search changes.
    effect(() => {
      const tab = this.tab();
      const q = this.debouncedSearch();
      void this.loadRows(tab, q);
    });
    void this.refreshCounts();
  }

  /** Navigate to a tab — pushes ?tab=… so it's a real, linkable URL, and remembers it. */
  setTab(tab: BookingTab): void {
    try { localStorage.setItem(this.TAB_STORE, tab); } catch { /* storage blocked */ }
    this.router.navigate([], { queryParams: { tab }, queryParamsHandling: 'merge' });
  }

  private async loadRows(tab: BookingTab, search: string): Promise<void> {
    this.rowsLoading.set(true);
    this.rows.set(await this.data.queryBookings(tab, search));
    this.rowsLoading.set(false);
  }
  private async refreshCounts(): Promise<void> { this.counts.set(await this.data.bookingTabCounts()); }
  /** After a mutation, re-pull the current tab's rows + the counts (stay fresh, no local edits). */
  private async refresh(): Promise<void> {
    await Promise.all([this.loadRows(this.tab(), this.debouncedSearch()), this.refreshCounts()]);
  }

  private startMs(b: BookingSummary): number { return new Date(b.start_at).getTime(); }
  private endMs(b: BookingSummary): number { return new Date(b.end_at).getTime(); }

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
      else { this.toast.success(`${b.booking_ref} approved — added to your calendar`); await this.refresh(); }
    } catch {
      this.toast.error(`Could not approve ${b.booking_ref}. Please try again.`);
    } finally { this.busyId.set(null); }
  }

  async decline(b: BookingSummary): Promise<void> {
    if (!(await this.confirm.ask({ title: 'Decline request', message: `Decline ${b.booking_ref}?`, confirmLabel: 'Decline', danger: true }))) return;
    this.busyId.set(b.id);
    try {
      await this.data.declineRequest(b.id);
      this.toast.info(`${b.booking_ref} declined`);
      await this.refresh();
    } catch {
      this.toast.error(`Could not decline ${b.booking_ref}.`);
    } finally { this.busyId.set(null); }
  }

  async cancel(b: BookingSummary): Promise<void> {
    if (!(await this.confirm.ask({
      title: 'Cancel booking',
      message: `Cancel ${b.booking_ref} (${b.client_name ?? 'no client'})? This frees the slot and removes it from your calendar. This cannot be undone.`,
      confirmLabel: 'Cancel booking', cancelLabel: 'Keep it', danger: true,
    }))) return;
    let refund = false;
    if (b.total_paid > 0) {
      refund = await this.confirm.ask({
        title: 'Refund card payments?',
        message: `€${b.total_paid} has been paid on this booking. Refund any CARD payments via Stripe now? (Cash / Revolut / bank payments are settled by you directly.)`,
        confirmLabel: 'Refund now', cancelLabel: 'Don’t refund',
      });
    }
    this.busyId.set(b.id);
    try {
      const res = await this.data.cancelBooking(b.id, refund);
      if (res.error) { this.toast.error(`Could not cancel ${b.booking_ref}.`); return; }
      await this.refresh();
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

  // ── Delete an imported/external booking (single modal, with calendar choice) ──
  readonly deleteOpen = signal(false);
  readonly deleteTarget = signal<BookingSummary | null>(null);
  readonly removeEvent = signal(true);
  readonly deleting = signal(false);

  askDelete(b: BookingSummary): void {
    this.deleteTarget.set(b);
    this.removeEvent.set(true);   // default ON — deleting a booking should clear its calendar event
    this.deleteOpen.set(true);
  }
  closeDelete(): void { this.deleteOpen.set(false); this.deleteTarget.set(null); }

  async confirmDelete(): Promise<void> {
    const b = this.deleteTarget();
    if (!b) return;
    this.deleting.set(true);
    try {
      // Gate only on the checkbox — cancel-booking finds the events (booking row + every
      // slot) server-side, so we must NOT also require the list row to carry google_event_id.
      const remove = this.removeEvent();
      const res = await this.data.deleteBooking(b.id, remove);
      if (res.error) { this.toast.error(`Could not delete ${b.booking_ref}.`); return; }
      // Only claim "removed from Google Calendar" when Google actually accepted it — a
      // failed removal (e.g. expired calendar connection) must not read as success.
      if (remove && res.calendarCleared === false) {
        this.toast.error(`${b.booking_ref} deleted, but its Google Calendar event could NOT be removed — check the calendar connection.`);
      } else {
        this.toast.success(`${b.booking_ref} deleted${remove ? ' · removed from Google Calendar' : ''}`);
      }
      await this.refresh();
      this.closeDelete();
    } catch {
      this.toast.error(`Could not delete ${b.booking_ref}. Please try again.`);
    } finally {
      this.deleting.set(false);
    }
  }

  paymentLabel(status: PaymentStatus): string { return PAYMENT_LABELS[status] ?? status; }
  paymentClass(status: PaymentStatus): string  { return PAYMENT_CLASSES[status] ?? ''; }
}
