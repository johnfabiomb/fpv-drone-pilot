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
