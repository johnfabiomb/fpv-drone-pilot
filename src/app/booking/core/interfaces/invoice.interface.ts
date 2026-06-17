import { ServicePricing } from './org.interface';

/**
 * A single charge line on an invoice — description + amount (summed for the total).
 * When it came from a service it also carries `serviceId` + `hours`, which the
 * booking form uses to derive the calendar duration. Invoice renderers read only
 * description + amount; the extra keys are harmless metadata.
 */
export interface LineItem {
  description: string;
  amount: number;
  serviceId?: string | null;
  hours?: number;
}

/** Minimal service shape the line-items editor needs to price a service line. */
export interface ServiceOption {
  id: string;
  name: string;
  pricing: ServicePricing;
}
