import { Injectable } from '@angular/core';
import { bookingsDb } from '@booking/core/db/supabase.bookings';
import { AvailabilityResponse } from '@booking/core/interfaces/availability.interface';

// Availability for a specific worker + service (the worker's shared calendar,
// the service's pricing). Backed by the public `get-availability` Edge Function.
@Injectable({ providedIn: 'root' })
export class AvailabilityService {
  async getAvailability(staffId: string, serviceId: string, from: string, to: string): Promise<AvailabilityResponse> {
    const { data, error } = await bookingsDb.functions.invoke<AvailabilityResponse>('get-availability', {
      body: { staffId, serviceId, from, to },
    });
    if (error) throw error;
    if (!data) throw new Error('No availability returned');
    return data;
  }
}
