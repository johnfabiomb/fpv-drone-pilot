import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal, untracked } from '@angular/core';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { WorkerBusy } from '@booking/core/interfaces/booking.interface';
import { CalendarDayCell, CalendarSlotView } from '@booking/core/interfaces/availability.interface';
import { AvailabilityCalendarComponent } from '@booking/ui/availability-calendar/availability-calendar.component';
import { zonedHourToUtc, utcToZoned } from '@booking/core/utils/timezone.util';
import { nextRange } from '@booking/core/utils/range-select.util';

export interface PickedSlot { iso: string; endIso: string; hours: number; label: string; }

/**
 * Admin availability picker — worker-based, not service-based. Pick a day, then
 * tap a start hour and an end hour to set the time span (the booking's duration);
 * there is no separate Hours field. Busy slots reveal who/what occupies them
 * (admin-only). `value`/`durationValue` prefill the span when editing a booking.
 */
@Component({
  selector: 'app-availability-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvailabilityCalendarComponent],
  template: `
    <app-availability-calendar
      dayLabel="Choose a day"
      [timeLabel]="'Choose a start time'"
      timeHint="tap start, then end · busy slots show who booked them"
      emptyText="No times on this day."
      [showBusyReason]="true"
      [monthLabel]="monthLabel()"
      [canGoPrev]="canGoPrev()"
      [cells]="cells()"
      [selectedDate]="selectedDate()"
      [loading]="loading()"
      [slots]="slots()"
      [hasSelection]="rangeStart() !== null"
      (prevMonth)="changeMonth(-1)"
      (nextMonth)="changeMonth(1)"
      (daySelected)="onDay($event)"
      (slotSelected)="onSlot($event)"
      (clearSelection)="clear()">
    </app-availability-calendar>
  `,
})
export class AvailabilityPickerComponent {
  private readonly data = inject(BookingDataService);

  readonly staffId = input.required<string>();
  readonly timezone = input<string>('Europe/Malta');
  /** Prefill (editing): the booking's current start (UTC ISO) + duration in hours. */
  readonly value = input<string>('');
  readonly durationValue = input<number>(0);
  /** When editing, this booking shouldn't count as busy against itself. */
  readonly excludeBookingId = input<string>('');

  readonly picked = output<PickedSlot>();

  private readonly MAX_HOURS = 24;
  private readonly today = new Date();
  readonly viewYear = signal(this.today.getFullYear());
  readonly viewMonth = signal(this.today.getMonth());
  readonly selectedDate = signal<string | null>(null);
  readonly rangeStart = signal<number | null>(null);   // start hour-of-day
  readonly rangeEnd = signal<number | null>(null);     // end hour-of-day (inclusive)
  readonly busy = signal<WorkerBusy[]>([]);
  readonly loading = signal(false);
  private loadedStaff = '';

  constructor() {
    // Reload the worker's busy ranges on worker / month change; clear the range when the worker changes.
    effect(() => {
      const staff = this.staffId();
      const y = this.viewYear(), m = this.viewMonth();
      untracked(() => {
        if (this.loadedStaff && this.loadedStaff !== staff) {
          this.rangeStart.set(null); this.rangeEnd.set(null);
        }
        this.loadedStaff = staff;
        void this.loadBusy(staff, y, m);
      });
    });

    // Prefill the span from an existing booking (runs once per distinct value).
    effect(() => {
      const v = this.value();
      if (!v) return;
      const dur = Math.max(1, this.durationValue() || 1);
      const z = utcToZoned(new Date(v), this.timezone());
      untracked(() => {
        const [yy, mm] = z.dateStr.split('-').map(Number);
        this.viewYear.set(yy); this.viewMonth.set(mm - 1);
        this.selectedDate.set(z.dateStr);
        this.rangeStart.set(z.hour); this.rangeEnd.set(z.hour + dur - 1);
      });
    });
  }

  private async loadBusy(staffId: string, year: number, month: number): Promise<void> {
    if (!staffId) { this.busy.set([]); return; }
    this.loading.set(true);
    const from = new Date(Date.UTC(year, month, 1) - 86_400_000).toISOString();
    const to = new Date(Date.UTC(year, month + 1, 1) + 86_400_000).toISOString();
    this.busy.set(await this.data.getWorkerBusy(staffId, from, to));
    this.loading.set(false);
  }

  // ── Month grid ──────────────────────────────────────────────────────
  readonly monthLabel = computed(() =>
    new Date(this.viewYear(), this.viewMonth(), 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }));
  readonly canGoPrev = computed(() =>
    new Date(this.viewYear(), this.viewMonth(), 1) > new Date(this.today.getFullYear(), this.today.getMonth(), 1));

  readonly cells = computed<CalendarDayCell[]>(() => {
    const y = this.viewYear(), m = this.viewMonth();
    const firstDow = new Date(y, m, 1).getDay();
    const dim = new Date(y, m + 1, 0).getDate();
    const todayStr = toDateStr(this.today);
    const cells: CalendarDayCell[] = [];
    for (let i = 0; i < firstDow; i++) cells.push({ date: null, day: 0, available: false, isPast: false });
    for (let d = 1; d <= dim; d++) {
      const date = toDateStr(new Date(y, m, d));
      cells.push({ date, day: d, available: date >= todayStr, isPast: date < todayStr });
    }
    return cells;
  });

  // ── Hour slots ──────────────────────────────────────────────────────
  readonly slots = computed<CalendarSlotView[]>(() => {
    const date = this.selectedDate();
    if (!date) return [];
    const tz = this.timezone(), now = Date.now();
    const a = this.rangeStart(), b = this.rangeEnd();
    return Array.from({ length: 24 }, (_, hr) => {
      const start = zonedHourToUtc(date, hr, tz);
      const occupying = this.bookingAt(start);
      // While awaiting the end (b === null) the lone start cell still shows selected.
      const inRange = a !== null && (b !== null ? hr >= a && hr <= b : hr === a);
      return {
        start: start.toISOString(),
        hour: hr,
        label: `${String(hr).padStart(2, '0')}:00`,
        available: !occupying && start.getTime() >= now,
        busyReason: occupying ? reason(occupying) : null,
        inRange,
        isStart: hr === a,
        isEnd: hr === (b ?? a),
      } satisfies CalendarSlotView;
    });
  });

  private bookingAt(start: Date): WorkerBusy | undefined {
    const end = new Date(start.getTime() + 3_600_000);
    const exclude = this.excludeBookingId();
    return this.busy().find(x =>
      x.id !== exclude && new Date(x.start_at) < end && new Date(x.end_at) > start);
  }

  // ── Events ──────────────────────────────────────────────────────────
  changeMonth(delta: number): void {
    if (delta < 0 && !this.canGoPrev()) return;
    let m = this.viewMonth() + delta, y = this.viewYear();
    if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
    this.viewMonth.set(m); this.viewYear.set(y);
    this.selectedDate.set(null); this.rangeStart.set(null); this.rangeEnd.set(null);
    this.emitSelection();
  }

  onDay(cell: CalendarDayCell): void {
    if (!cell.date) return;
    this.selectedDate.set(cell.date);
    this.rangeStart.set(null); this.rangeEnd.set(null);
    this.emitSelection();
  }

  /** Tap a start hour, then an end hour. Once complete, the next tap starts over. */
  onSlot(slot: CalendarSlotView): void {
    if (!slot.available) return;
    const free = (h: number) => this.slots().some(s => s.hour === h && s.available);
    const r = nextRange({ start: this.rangeStart(), end: this.rangeEnd() }, slot.hour, free, this.MAX_HOURS);
    this.rangeStart.set(r.start); this.rangeEnd.set(r.end);
    this.emitSelection();
  }

  clear(): void {
    this.rangeStart.set(null); this.rangeEnd.set(null);
    this.emitSelection();
  }

  private emitSelection(): void {
    const date = this.selectedDate(), a = this.rangeStart(), b = this.rangeEnd(), tz = this.timezone();
    if (date && a !== null && b !== null) {
      const hours = b - a + 1;
      const start = zonedHourToUtc(date, a, tz);
      const end = zonedHourToUtc(date, a + hours, tz);
      const label = `${date} · ${String(a).padStart(2, '0')}:00–${String(a + hours).padStart(2, '0')}:00`;
      this.picked.emit({ iso: start.toISOString(), endIso: end.toISOString(), hours, label });
    } else {
      this.picked.emit({ iso: '', endIso: '', hours: 0, label: '' });
    }
  }
}

function reason(b: WorkerBusy): string {
  return b.clientName ? `${b.clientName} · ${b.title}` : b.title;
}
function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
