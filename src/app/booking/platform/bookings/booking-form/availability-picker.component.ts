import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal, untracked } from '@angular/core';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { WorkerBusy, BookingSlot } from '@booking/core/interfaces/booking.interface';
import { CalendarDayCell, CalendarSlotView } from '@booking/core/interfaces/availability.interface';
import { AvailabilityCalendarComponent } from '@booking/ui/availability-calendar/availability-calendar.component';
import { zonedClockToUtc, utcToZoned } from '@booking/core/utils/timezone.util';
import { nextRange } from '@booking/core/utils/range-select.util';

export interface PickedSlot { iso: string; endIso: string; hours: number; date: string; label: string; }

const SLOTS = 48;          // 30-minute granularity
const SLOT_MIN = 30;
const pad = (n: number) => String(n).padStart(2, '0');
const hm = (i: number) => `${pad(Math.floor(i / 2))}:${pad((i % 2) * SLOT_MIN)}`;

/**
 * Admin availability picker — worker-based. A booking can have several time blocks
 * across different days: tap start + end to add a block, change the day and add more.
 * Added blocks stay in the list (shown above the calendar) and are removable; they
 * highlight on their own day's grid. Emits the full block list via `slotsChange`.
 */
@Component({
  selector: 'app-availability-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvailabilityCalendarComponent],
  template: `
    @if (slots().length) {
      <div class="blocks">
        <div class="blocks__head">Time blocks <span class="blocks__count">{{ slots().length }}</span></div>
        @for (s of slots(); track s.iso) {
          <div class="block">
            <span class="block__label">{{ s.label }}</span>
            <button type="button" class="block__x" (click)="removeSlot(s)" aria-label="Remove block">×</button>
          </div>
        }
      </div>
    }
    <app-availability-calendar
      dayLabel="Choose a day"
      [timeLabel]="slots().length ? 'Add another block' : 'Choose a time'"
      timeHint="tap start, then end · adds a block · pick other days too"
      emptyText="No times on this day."
      [showBusyReason]="true"
      [monthLabel]="monthLabel()"
      [canGoPrev]="canGoPrev()"
      [cells]="cells()"
      [selectedDate]="selectedDate()"
      [loading]="loading()"
      [slots]="gridSlots()"
      [allowPast]="true"
      [hasSelection]="rangeStart() !== null"
      (prevMonth)="changeMonth(-1)"
      (nextMonth)="changeMonth(1)"
      (daySelected)="onDay($event)"
      (slotSelected)="onSlot($event)"
      (clearSelection)="clearInProgress()">
    </app-availability-calendar>
  `,
  styles: [`
    :host { display: block; }
    .blocks { margin-bottom: 16px; }
    .blocks__head {
      font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
      color: #6b7280; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;
    }
    .blocks__count {
      background: #F4A922; color: #000; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9px;
      display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;
    }
    .block {
      display: flex; align-items: center; justify-content: space-between; gap: 10px;
      padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 6px; background: #fff;
    }
    .block__label { font-size: 13.5px; font-weight: 600; color: #111827; }
    .block__x { background: none; border: none; cursor: pointer; font-size: 18px; line-height: 1; color: #9ca3af; padding: 0 2px; }
    .block__x:hover { color: #dc2626; }
  `],
})
export class AvailabilityPickerComponent {
  private readonly data = inject(BookingDataService);

  readonly staffId = input.required<string>();
  readonly timezone = input<string>('Europe/Malta');
  readonly initialSlots = input<BookingSlot[]>([]);   // edit prefill
  readonly excludeBookingId = input<string>('');
  readonly slotsChange = output<PickedSlot[]>();

  private readonly today = new Date();
  readonly viewYear = signal(this.today.getFullYear());
  readonly viewMonth = signal(this.today.getMonth());
  readonly selectedDate = signal<string | null>(null);
  readonly rangeStart = signal<number | null>(null);   // in-progress block (start slot index)
  readonly rangeEnd = signal<number | null>(null);
  readonly slots = signal<PickedSlot[]>([]);           // the chosen blocks (across days)
  readonly busy = signal<WorkerBusy[]>([]);
  readonly loading = signal(false);
  private loadedStaff = '';
  private seeded = false;

  constructor() {
    // Reload the worker's busy ranges on worker/month change; clear blocks when the worker changes.
    effect(() => {
      const staff = this.staffId();
      const y = this.viewYear(), m = this.viewMonth();
      untracked(() => {
        if (this.loadedStaff && this.loadedStaff !== staff) {
          this.slots.set([]); this.rangeStart.set(null); this.rangeEnd.set(null); this.emit();
        }
        this.loadedStaff = staff;
        void this.loadBusy(staff, y, m);
      });
    });

    // Seed from an existing booking's slots (edit), once.
    effect(() => {
      const init = this.initialSlots();
      if (this.seeded || !init.length) return;
      this.seeded = true;
      const tz = this.timezone();
      untracked(() => {
        const ps = init.map(s => this.toPicked(s.start, s.end)).sort((a, b) => a.iso.localeCompare(b.iso));
        this.slots.set(ps);
        const first = utcToZoned(new Date(ps[0].iso), tz);
        const [yy, mm] = first.dateStr.split('-').map(Number);
        this.viewYear.set(yy); this.viewMonth.set(mm - 1); this.selectedDate.set(first.dateStr);
        this.emit();
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

  // ── Helpers ─────────────────────────────────────────────────────────
  private slotStart(date: string, i: number): Date {
    return zonedClockToUtc(date, Math.floor(i / 2), (i % 2) * SLOT_MIN, this.timezone());
  }
  private toPicked(startIso: string, endIso: string): PickedSlot {
    const z = utcToZoned(new Date(startIso), this.timezone());
    const hours = (new Date(endIso).getTime() - new Date(startIso).getTime()) / 3_600_000;
    return { iso: startIso, endIso, hours, date: z.dateStr, label: this.label(startIso, endIso) };
  }
  private label(startIso: string, endIso: string): string {
    const tz = this.timezone();
    const day = new Date(startIso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: tz });
    const t = (iso: string) => new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz });
    return `${day} · ${t(startIso)}–${t(endIso)}`;
  }
  private bookingAt(start: Date): WorkerBusy | undefined {
    const end = new Date(start.getTime() + SLOT_MIN * 60_000);
    const exclude = this.excludeBookingId();
    return this.busy().find(x => x.id !== exclude && new Date(x.start_at) < end && new Date(x.end_at) > start);
  }
  private emit(): void { this.slotsChange.emit(this.slots()); }

  // ── Month grid ──────────────────────────────────────────────────────
  readonly monthLabel = computed(() =>
    new Date(this.viewYear(), this.viewMonth(), 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }));
  readonly canGoPrev = computed(() => true);

  readonly cells = computed<CalendarDayCell[]>(() => {
    const y = this.viewYear(), m = this.viewMonth();
    const firstDow = (new Date(y, m, 1).getDay() + 6) % 7;
    const dim = new Date(y, m + 1, 0).getDate();
    const todayStr = toDateStr(this.today);
    const cells: CalendarDayCell[] = [];
    for (let i = 0; i < firstDow; i++) cells.push({ date: null, day: 0, available: false, isPast: false });
    for (let d = 1; d <= dim; d++) {
      const date = toDateStr(new Date(y, m, d));
      cells.push({ date, day: d, available: true, isPast: date < todayStr });
    }
    return cells;
  });

  // ── Half-hour grid for the selected day ─────────────────────────────
  readonly gridSlots = computed<CalendarSlotView[]>(() => {
    const date = this.selectedDate();
    if (!date) return [];
    const a = this.rangeStart(), b = this.rangeEnd();
    const mine = this.slots().filter(s => s.date === date).map(s => {
      const z = utcToZoned(new Date(s.iso), this.timezone());
      const from = z.hour * 2 + (z.minute >= SLOT_MIN ? 1 : 0);
      return { from, to: from + Math.round(s.hours / 0.5) - 1 };
    });
    return Array.from({ length: SLOTS }, (_, i) => {
      const start = this.slotStart(date, i);
      const occupying = this.bookingAt(start);
      const isMine = mine.some(r => i >= r.from && i <= r.to);
      const inRange = a !== null && (b !== null ? i >= a && i <= b : i === a);
      return {
        start: start.toISOString(), hour: i, label: hm(i),
        available: !occupying && !isMine,
        mine: isMine,
        busyReason: occupying ? reason(occupying) : null,
        inRange, isStart: i === a, isEnd: i === (b ?? a),
      } satisfies CalendarSlotView;
    });
  });

  // ── Events ──────────────────────────────────────────────────────────
  changeMonth(delta: number): void {
    let m = this.viewMonth() + delta, y = this.viewYear();
    if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
    this.viewMonth.set(m); this.viewYear.set(y);
    this.selectedDate.set(null); this.rangeStart.set(null); this.rangeEnd.set(null);
    // Blocks already chosen are kept.
  }

  onDay(cell: CalendarDayCell): void {
    if (!cell.date) return;
    this.selectedDate.set(cell.date);
    this.rangeStart.set(null); this.rangeEnd.set(null);
  }

  /** Tap a start slot, then an end slot → adds that block to the list (then pick more). */
  onSlot(slot: CalendarSlotView): void {
    if (!slot.available) return;
    const free = (i: number) => this.gridSlots().some(s => s.hour === i && s.available);
    const r = nextRange({ start: this.rangeStart(), end: this.rangeEnd() }, slot.hour, free, SLOTS);
    if (r.start !== null && r.end !== null) {
      this.addBlock(r.start, r.end);
      this.rangeStart.set(null); this.rangeEnd.set(null);
    } else {
      this.rangeStart.set(r.start); this.rangeEnd.set(r.end);
    }
  }

  private addBlock(a: number, b: number): void {
    const date = this.selectedDate();
    if (!date) return;
    const hours = (b - a + 1) * (SLOT_MIN / 60);
    const start = this.slotStart(date, a);
    const end = new Date(start.getTime() + hours * 3_600_000);
    const ps = this.toPicked(start.toISOString(), end.toISOString());
    this.slots.update(list => [...list, ps].sort((x, y) => x.iso.localeCompare(y.iso)));
    this.emit();
  }

  removeSlot(s: PickedSlot): void {
    this.slots.update(list => list.filter(x => x.iso !== s.iso));
    this.emit();
  }
  clearInProgress(): void { this.rangeStart.set(null); this.rangeEnd.set(null); }
}

function reason(b: WorkerBusy): string {
  return b.clientName ? `${b.clientName} · ${b.title}` : b.title;
}
function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
