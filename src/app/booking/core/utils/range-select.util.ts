/** A contiguous selection of hour-of-day cells; `end === null` means "awaiting the end tap". */
export interface HourRange { start: number | null; end: number | null; }

/**
 * One step of standard range-picker behaviour for the hour grid:
 *  - nothing selected, or a COMPLETE range → the tap starts a fresh selection (awaiting end);
 *  - awaiting the end → the tap sets the end (tapping the start again = a 1-hour selection);
 *  - tapping before the start, or across a busy gap / past the max → restart from the tapped cell.
 * `isFree(h)` reports whether an hour cell is selectable.
 */
export function nextRange(cur: HourRange, hour: number, isFree: (h: number) => boolean, maxHours = 24): HourRange {
  const { start, end } = cur;
  if (start === null || end !== null) return { start: hour, end: null };   // empty or complete → start fresh
  if (hour < start) return { start: hour, end: null };                     // tapped earlier → move the start
  if (hour - start + 1 > maxHours) return { start: hour, end: null };
  for (let h = start; h <= hour; h++) if (!isFree(h)) return { start: hour, end: null };  // gap → restart
  return { start, end: hour };
}
