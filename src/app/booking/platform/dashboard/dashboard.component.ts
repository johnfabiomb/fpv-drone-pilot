import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { BookingAdminService, WorkJob, TaskRow } from '@booking/core/services/booking-admin.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { BookingSummary } from '@booking/core/interfaces/booking.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  readonly data = inject(BookingDataService);
  private readonly admin = inject(BookingAdminService);
  private readonly auth = inject(BookingsAuthService);
  private readonly toast = inject(ToastService);

  readonly jobs = signal<WorkJob[]>([]);
  readonly tasks = signal<TaskRow[]>([]);
  readonly busyId = signal<string | null>(null);

  private readonly CONFIRMED = ['booked', 'in_progress', 'done'];
  private readonly confirmed = computed(() =>
    this.data.bookings().filter(b => this.CONFIRMED.includes(b.status) && !b.is_external));

  readonly now = new Date();
  readonly greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  })();

  // ── Bookings metrics ──────────────────────────────────────────────
  readonly requests = computed(() => this.data.bookings().filter(b => b.status === 'pending'));
  readonly upcoming = computed(() => {
    const now = Date.now();
    return this.confirmed()
      .filter(b => new Date(b.start_at).getTime() >= now)
      .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());
  });
  readonly upcoming30 = computed(() => {
    const limit = Date.now() + 30 * 86_400_000;
    return this.upcoming().filter(b => new Date(b.start_at).getTime() <= limit).length;
  });
  readonly collected = computed(() => this.confirmed().reduce((s, b) => s + b.total_paid, 0));
  readonly outstanding = computed(() => this.confirmed().reduce((s, b) => s + Math.max(0, b.price_total - b.total_paid), 0));

  readonly revenueByMonth = computed(() => {
    const ref = new Date();
    const buckets = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(ref.getFullYear(), ref.getMonth() - (5 - i), 1);
      return { label: d.toLocaleDateString('en', { month: 'short' }), y: d.getFullYear(), m: d.getMonth(), total: 0 };
    });
    for (const b of this.confirmed()) {
      const d = new Date(b.start_at);
      const bucket = buckets.find(x => x.y === d.getFullYear() && x.m === d.getMonth());
      if (bucket) bucket.total += b.total_paid;
    }
    return buckets;
  });
  readonly maxMonth = computed(() => Math.max(1, ...this.revenueByMonth().map(m => m.total)));

  // ── Production metrics ────────────────────────────────────────────
  readonly inProduction = computed(() => this.jobs().filter(j => j.production_status !== 'delivered').length);
  readonly openTasks = computed(() => this.tasks().filter(t => !t.is_done).length);
  readonly stageCount = computed(() => {
    const m = { to_edit: 0, editing: 0, to_deliver: 0, delivered: 0 };
    for (const j of this.jobs()) m[j.production_status]++;
    return m;
  });
  readonly workEnabled = computed(() => !!this.auth.features().work_board);

  async ngOnInit(): Promise<void> {
    await this.auth.initialize();
    await this.loadProduction();
  }
  private async loadProduction(): Promise<void> {
    const org = this.auth.orgId();
    if (!org) return;
    const [jobs, tasks] = await Promise.all([this.admin.loadJobs(org), this.admin.loadTasks(org)]);
    this.jobs.set(jobs); this.tasks.set(tasks);
  }

  barHeight(total: number): string { return `${Math.round((total / this.maxMonth()) * 100)}%`; }

  async approve(b: BookingSummary): Promise<void> {
    this.busyId.set(b.id);
    try {
      const res = await this.data.approveRequest(b.id);
      if (res.error === 'slot_taken') this.toast.error(`${b.booking_ref}: that slot was just taken — decline this one.`);
      else if (res.error) this.toast.error(`Could not approve ${b.booking_ref}.`);
      else { this.toast.success(`${b.booking_ref} approved — added to your calendar`); await this.loadProduction(); }
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
}
