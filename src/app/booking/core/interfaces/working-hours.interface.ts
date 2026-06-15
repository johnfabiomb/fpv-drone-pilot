export interface TimeRange { start: number; end: number; }

export type DayRule = TimeRange[] | 'closed';

export interface WorkingHoursConfig {
  default: DayRule;
  '0'?: DayRule; // Sunday
  '1'?: DayRule;
  '2'?: DayRule;
  '3'?: DayRule;
  '4'?: DayRule;
  '5'?: DayRule;
  '6'?: DayRule; // Saturday
  overrides?: Record<string, DayRule>; // YYYY-MM-DD → rule
}
