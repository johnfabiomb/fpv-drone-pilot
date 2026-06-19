import { ServicePricing } from '@booking/core/interfaces/org.interface';

export interface HourSlot {
  start: string;       // UTC ISO instant of this 1-hour cell
  hour: number;        // local wall-clock hour (for contiguity checks)
  label: string;       // local 'HH:00'
  available: boolean;  // free to book (not busy, not past)
}

export interface AvailabilityDay {
  date: string;        // YYYY-MM-DD
  slots: HourSlot[];   // every working hour for the day, free or busy
}

export interface AvailabilityResponse {
  timezone: string;
  serviceName: string;
  pricing: ServicePricing;
  minHours: number;
  maxHours: number;
  days: AvailabilityDay[];
}

// ── Shared calendar view models (presentational AvailabilityCalendarComponent) ──
/** One month-grid cell. `date === null` = a leading blank before the 1st. */
export interface CalendarDayCell {
  date: string | null;   // YYYY-MM-DD
  day: number;
  available: boolean;
  isPast: boolean;
}

/** A decorated hour pill. The container fills in the styling/selection flags. */
export interface CalendarSlotView extends HourSlot {
  inRange?: boolean;          // part of the current selection (solid bar)
  isStart?: boolean;          // first cell of the selection (rounded left)
  isEnd?: boolean;            // last cell of the selection (rounded right)
  unstartable?: boolean;      // free, but a block can't start here (too close to a busy slot / day end)
  mine?: boolean;             // already part of THIS booking's selected blocks (on the shown day)
  busyReason?: string | null; // ADMIN ONLY — who/what occupies this slot; never set for public
}
