import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CalendarDayCell, CalendarSlotView } from '@booking/core/interfaces/availability.interface';

/**
 * Presentational month-grid + hour-pill calendar shared by the public booking
 * page and the admin availability picker. It is "dumb": it renders the cells
 * and slots it is given and emits clicks — all selection/availability logic
 * lives in the container.
 *
 * Privacy: busy reasons are only rendered when `showBusyReason` is true (admin).
 * The public container leaves it false, so it never receives or shows details.
 */
@Component({
  selector: 'app-availability-calendar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './availability-calendar.component.html',
  styleUrl: './availability-calendar.component.scss',
})
export class AvailabilityCalendarComponent {
  // Month grid
  readonly monthLabel = input.required<string>();
  readonly canGoPrev = input<boolean>(true);
  readonly cells = input.required<CalendarDayCell[]>();
  readonly selectedDate = input<string | null>(null);
  readonly loading = input<boolean>(false);
  readonly error = input<string | null>(null);
  readonly dayLabel = input<string>('Choose a day');

  // Hour slots (for the selected day)
  readonly slots = input<CalendarSlotView[]>([]);
  readonly timeLabel = input<string>('Choose a time');
  readonly timeHint = input<string>('');
  readonly emptyText = input<string>('No times available on this day.');
  readonly showBusyReason = input<boolean>(false);
  readonly hasSelection = input<boolean>(false);

  readonly prevMonth = output<void>();
  readonly nextMonth = output<void>();
  readonly daySelected = output<CalendarDayCell>();
  readonly slotSelected = output<CalendarSlotView>();
  readonly clearSelection = output<void>();

  readonly dow = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}
