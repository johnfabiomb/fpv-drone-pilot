import { Component, computed, output, input, signal, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WorkingHoursService } from '@booking/core/services/working-hours.service';

interface CalendarDay {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

interface SlotItem {
  hour: number;
  label: string;
  busy: boolean;
  inRange: boolean;
}

const WEEK_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function isSameDay(a: Date, b: Date): boolean {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

@Component({
  selector: 'app-slot-picker',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './slot-picker.component.html',
  styleUrl: './slot-picker.component.scss',
})
export class SlotPickerComponent {
  busyBookings = input<{ start_at: string; end_at: string }[]>([]);
  rangeSelected = output<{ startAt: Date; endAt: Date }>();

  readonly weekLabels = WEEK_LABELS;

  private workingHours = inject(WorkingHoursService);

  currentMonth = signal(new Date());
  selectedDate = signal<Date | null>(null);
  rangeStart = signal<number | null>(null);
  rangeEnd = signal<number | null>(null);

  get monthLabel(): string {
    return this.currentMonth().toLocaleString('en', { month: 'long', year: 'numeric' });
  }

  calendarDays = computed<CalendarDay[]>(() => {
    const month = this.currentMonth();
    const year = month.getFullYear();
    const m = month.getMonth();
    const today = new Date();
    const selected = this.selectedDate();

    const firstDay = new Date(year, m, 1);
    const lastDay = new Date(year, m + 1, 0);

    const days: CalendarDay[] = [];

    // Leading padding — Monday-based week
    const startPad = (firstDay.getDay() + 6) % 7;
    for (let i = startPad - 1; i >= 0; i--) {
      days.push({ date: new Date(year, m, -i), inMonth: false, isToday: false, isSelected: false });
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, m, d);
      days.push({
        date,
        inMonth: true,
        isToday: isSameDay(date, today),
        isSelected: selected ? isSameDay(date, selected) : false,
      });
    }

    // Trailing padding to fill last row
    const remainder = days.length % 7;
    if (remainder > 0) {
      for (let i = 1; i <= 7 - remainder; i++) {
        days.push({ date: new Date(year, m + 1, i), inMonth: false, isToday: false, isSelected: false });
      }
    }

    return days;
  });

  daySlots = computed<SlotItem[]>(() => {
    const date = this.selectedDate();
    if (!date) return [];

    const availableHours = this.workingHours.getSlotsForDate(date);
    const start = this.rangeStart();
    const end = this.rangeEnd();

    return availableHours.map(hour => ({
      hour,
      label: `${String(hour).padStart(2, '0')}:00`,
      busy: this.isSlotBusy(date, hour),
      inRange: start !== null && end !== null && hour >= start && hour <= end,
    }));
  });

  get selectionSummary(): string | null {
    const start = this.rangeStart();
    const end = this.rangeEnd();
    if (start === null || end === null) return null;
    const hours = end - start + 1;
    return `${String(start).padStart(2, '0')}:00 – ${String(end + 1).padStart(2, '0')}:00 · ${hours}h`;
  }

  prevMonth(): void {
    const d = new Date(this.currentMonth());
    d.setMonth(d.getMonth() - 1);
    this.currentMonth.set(d);
  }

  nextMonth(): void {
    const d = new Date(this.currentMonth());
    d.setMonth(d.getMonth() + 1);
    this.currentMonth.set(d);
  }

  selectDate(day: CalendarDay): void {
    // Clicking adjacent-month days navigates there
    if (!day.inMonth) {
      const d = new Date(day.date);
      this.currentMonth.set(new Date(d.getFullYear(), d.getMonth(), 1));
      this.selectedDate.set(d);
    } else {
      this.selectedDate.set(new Date(day.date));
    }
    this.rangeStart.set(null);
    this.rangeEnd.set(null);
  }

  toggleSlot(hour: number): void {
    const start = this.rangeStart();
    const end = this.rangeEnd();

    if (start === null) {
      // Nothing selected — start here
      this.rangeStart.set(hour);
      this.rangeEnd.set(hour);
    } else if (hour === start && hour === end) {
      // Same single slot — deselect
      this.rangeStart.set(null);
      this.rangeEnd.set(null);
      return;
    } else {
      // Extend or restart the range
      const newStart = Math.min(start, hour);
      const newEnd = Math.max(end ?? start, hour);
      const date = this.selectedDate()!;
      const conflict = Array.from({ length: newEnd - newStart + 1 }, (_, i) => newStart + i)
        .some(h => this.isSlotBusy(date, h));

      if (conflict) {
        // Busy slot in the way — start fresh
        this.rangeStart.set(hour);
        this.rangeEnd.set(hour);
      } else {
        this.rangeStart.set(newStart);
        this.rangeEnd.set(newEnd);
      }
    }

    this.emitSelection();
  }

  clearSelection(): void {
    this.rangeStart.set(null);
    this.rangeEnd.set(null);
  }

  private isSlotBusy(date: Date, hour: number): boolean {
    const slotStart = new Date(date);
    slotStart.setHours(hour, 0, 0, 0);
    const slotEnd = new Date(date);
    slotEnd.setHours(hour + 1, 0, 0, 0);

    return this.busyBookings().some(b => {
      const bStart = new Date(b.start_at);
      const bEnd = new Date(b.end_at);
      return bStart < slotEnd && bEnd > slotStart;
    });
  }

  private emitSelection(): void {
    const date = this.selectedDate();
    const start = this.rangeStart();
    const end = this.rangeEnd();
    if (!date || start === null || end === null) return;

    const startAt = new Date(date);
    startAt.setHours(start, 0, 0, 0);
    const endAt = new Date(date);
    endAt.setHours(end + 1, 0, 0, 0);

    this.rangeSelected.emit({ startAt, endAt });
  }
}
