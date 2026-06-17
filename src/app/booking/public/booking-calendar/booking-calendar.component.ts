import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailabilityService } from '@booking/core/services/availability.service';
import { BookingOrgService } from '@booking/core/services/booking-org.service';
import { AvailabilityResponse, HourSlot, CalendarDayCell, CalendarSlotView } from '@booking/core/interfaces/availability.interface';
import { AvailabilityCalendarComponent } from '@booking/ui/availability-calendar/availability-calendar.component';
import { servicePrice } from '@booking/core/interfaces/org.interface';
import { currencySymbol as toSymbol } from '@booking/core/utils/currency.util';
import { nextRange } from '@booking/core/utils/range-select.util';

@Component({
  selector: 'app-booking-calendar',
  standalone: true,
  imports: [AvailabilityCalendarComponent],
  templateUrl: './booking-calendar.component.html',
  styleUrl: './booking-calendar.component.scss',
})
export class BookingCalendarComponent implements OnInit {
  private readonly availability = inject(AvailabilityService);
  private readonly bookingOrg = inject(BookingOrgService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private serviceId = '';
  private staffId = '';
  private orgSlug = '';

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly response = signal<AvailabilityResponse | null>(null);
  readonly selectedDate = signal<string | null>(null);
  readonly rangeStart = signal<number | null>(null);
  readonly rangeEnd = signal<number | null>(null);

  private readonly today = new Date();
  readonly viewYear = signal(this.today.getFullYear());
  readonly viewMonth = signal(this.today.getMonth());

  readonly serviceName = computed(() => this.response()?.serviceName ?? '');
  readonly currencySymbol = computed(() => toSymbol(this.bookingOrg.org()?.currency));
  readonly minHours = computed(() => this.response()?.minHours ?? 1);
  readonly maxHours = computed(() => this.response()?.maxHours ?? 8);

  readonly monthLabel = computed(() =>
    new Date(this.viewYear(), this.viewMonth(), 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }));
  readonly canGoPrev = computed(() => new Date(this.viewYear(), this.viewMonth(), 1) > new Date(this.today.getFullYear(), this.today.getMonth(), 1));

  readonly cells = computed<CalendarDayCell[]>(() => {
    const y = this.viewYear(), m = this.viewMonth();
    const avail = new Set((this.response()?.days ?? []).filter(d => d.slots.some(s => s.available)).map(d => d.date));
    const firstDow = new Date(y, m, 1).getDay();
    const dim = new Date(y, m + 1, 0).getDate();
    const todayStr = toDateStr(this.today);
    const cells: CalendarDayCell[] = [];
    for (let i = 0; i < firstDow; i++) cells.push({ date: null, day: 0, available: false, isPast: false });
    for (let d = 1; d <= dim; d++) {
      const date = toDateStr(new Date(y, m, d));
      cells.push({ date, day: d, available: avail.has(date), isPast: date < todayStr });
    }
    return cells;
  });

  readonly slots = computed<CalendarSlotView[]>(() => {
    const day = this.response()?.days.find(d => d.date === this.selectedDate());
    if (!day) return [];
    const a = this.rangeStart(), b = this.rangeEnd();
    return day.slots.map(s => ({
      ...s,
      inRange: a !== null && (b !== null ? s.hour >= a && s.hour <= b : s.hour === a),
      isStart: s.hour === a, isEnd: s.hour === (b ?? a),
    }));
  });

  readonly selection = computed(() => {
    const a = this.rangeStart(), b = this.rangeEnd(), res = this.response();
    const day = res?.days.find(d => d.date === this.selectedDate());
    if (a === null || b === null || !day || !res) return null;
    const startSlot = day.slots.find(s => s.hour === a);
    if (!startSlot) return null;
    const hours = b - a + 1;
    return {
      startIso: startSlot.start, hours,
      from: `${String(a).padStart(2, '0')}:00`, to: `${String(b + 1).padStart(2, '0')}:00`,
      price: servicePrice(res.pricing, hours),
      valid: hours >= res.minHours,
    };
  });

  ngOnInit(): void {
    const qp = this.route.snapshot.queryParamMap;
    this.orgSlug = this.route.snapshot.paramMap.get('org') ?? '';
    this.serviceId = qp.get('service') ?? '';
    this.staffId = qp.get('staff') ?? '';
    if (!this.serviceId || !this.staffId) { this.router.navigate(this.bookPath()); return; }
    this.bookingOrg.load(this.orgSlug || undefined);
    this.load();
  }

  /** Build a path into the booking flow, prefixed with the org slug when present. */
  private bookPath(...rest: string[]): unknown[] {
    return this.orgSlug ? ['/', this.orgSlug, 'book', ...rest] : ['/book', ...rest];
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    const y = this.viewYear(), m = this.viewMonth();
    const isCur = y === this.today.getFullYear() && m === this.today.getMonth();
    const from = toDateStr(isCur ? this.today : new Date(y, m, 1));
    const to = toDateStr(new Date(y, m + 1, 0));
    try {
      this.response.set(await this.availability.getAvailability(this.staffId, this.serviceId, from, to));
    } catch (err) {
      this.error.set('Could not load availability. Please try again.');
      console.error('[BookingCalendar] availability failed:', err);
    } finally {
      this.loading.set(false);
    }
  }

  changeMonth(delta: number): void {
    if (delta < 0 && !this.canGoPrev()) return;
    let m = this.viewMonth() + delta, y = this.viewYear();
    if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
    this.viewMonth.set(m); this.viewYear.set(y);
    this.selectedDate.set(null); this.rangeStart.set(null); this.rangeEnd.set(null);
    this.load();
  }

  selectDay(cell: CalendarDayCell): void {
    if (!cell.date || !cell.available) return;
    this.selectedDate.set(cell.date); this.rangeStart.set(null); this.rangeEnd.set(null);
  }

  selectHour(slot: HourSlot): void {
    if (!slot.available) return;
    const daySlots = this.response()?.days.find(d => d.date === this.selectedDate())?.slots ?? [];
    const free = (h: number) => daySlots.some(s => s.hour === h && s.available);
    const r = nextRange({ start: this.rangeStart(), end: this.rangeEnd() }, slot.hour, free, this.maxHours());
    this.rangeStart.set(r.start); this.rangeEnd.set(r.end);
  }

  clearRange(): void { this.rangeStart.set(null); this.rangeEnd.set(null); }

  continueToBook(): void {
    const sel = this.selection();
    if (!sel || !sel.valid) return;
    this.router.navigate(this.bookPath('checkout'), {
      queryParams: { service: this.serviceId, staff: this.staffId, start: sel.startIso, hours: sel.hours },
    });
  }

  backToServices(): void { this.router.navigate(this.bookPath()); }
}

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
