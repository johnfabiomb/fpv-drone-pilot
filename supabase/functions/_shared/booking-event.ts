import { createCalendarEvent, updateCalendarEvent } from './google-calendar.ts';

// Single source of truth for the Google Calendar event of a booking.
// Composes a human overview (payment status + work progress) and creates the event
// if missing or patches the description if it already exists. Called server-side from
// the payment webhook, the in-person confirmation, cash approval, and the admin
// "sync-booking-event" function so the calendar always mirrors the booking's state.

// deno-lint-ignore no-explicit-any
type SupabaseClient = any;

const PROGRESS_LABEL: Record<string, string> = {
  to_edit: 'To edit',
  editing: 'Editing',
  to_deliver: 'To deliver',
  delivered: 'Delivered ✓',
};

const BLOCKING_STATUSES = ['booked', 'in_progress', 'done'];

function pickName(v: unknown): string | null {
  const o = Array.isArray(v) ? v[0] : v;
  return (o as { name?: string } | null)?.name ?? null;
}

const euro = (n: number) => `€${(Math.round(n * 100) / 100).toFixed(2)}`;

interface SlotRow {
  id: string;
  start_at: string;
  end_at: string;
  google_event_id: string | null;
}

interface BookingRow {
  id: string;
  booking_ref: string;
  title: string;
  description: string | null;
  location: string | null;
  start_at: string;
  end_at: string;
  price_total: number;
  status: string;
  production_status: string | null;
  google_event_id: string | null;
  notes: string | null;
  client: unknown;
  service: unknown;
  payments: Array<{ amount: number; status: string; method: string }> | null;
  slots: SlotRow[] | null;
}

function composeDescription(b: BookingRow): string {
  const totalPaid = (b.payments ?? [])
    .filter(p => p.status === 'completed')
    .reduce((s, p) => s + Number(p.amount), 0);

  let payment: string;
  if (b.price_total > 0 && totalPaid >= b.price_total) {
    payment = `Paid in full (${euro(totalPaid)})`;
  } else if (totalPaid > 0) {
    payment = `Deposit paid ${euro(totalPaid)} — balance ${euro(b.price_total - totalPaid)}`;
  } else {
    payment = 'Awaiting payment';
  }

  const lines: string[] = [];
  // The admin's free-text work description leads; the auto summary follows.
  if (b.description?.trim()) lines.push(b.description.trim(), '');
  const client = pickName(b.client);
  const service = pickName(b.service);
  if (client) lines.push(`Client: ${client}`);
  if (service) lines.push(`Service: ${service}`);
  lines.push(`Total: ${euro(b.price_total)}`);
  lines.push(`Payment: ${payment}`);
  if (b.production_status) lines.push(`Progress: ${PROGRESS_LABEL[b.production_status] ?? b.production_status}`);
  if (b.notes) { lines.push('', b.notes); }
  lines.push('', `Ref: ${b.booking_ref}`);
  return lines.join('\n');
}

/**
 * Ensure the booking's calendar event exists and its description reflects current
 * payment + production state. Returns the event id (or null if the booking isn't in
 * a calendar-visible state). Swallows nothing — callers decide how to handle errors.
 */
export async function ensureBookingEvent(service: SupabaseClient, bookingId: string): Promise<string | null> {
  const { data } = await service.from('bookings')
    .select('id, org_id, booking_ref, title, description, location, start_at, end_at, price_total, status, production_status, google_event_id, notes, client:client_id(name), service:service_id(name), payments(amount, status, method), slots:booking_slots(id, start_at, end_at, google_event_id)')
    .eq('id', bookingId)
    .single();
  if (!data) return null;
  const b = data as BookingRow & { org_id: string };

  // Multi-tenant: there is ONE shared Google Calendar (the platform owner's). Only that
  // org pushes events to it; other orgs run DB-only (availability is DB-driven and the
  // no-overlap constraint still prevents double-booking). Per-org calendars are future.
  const calendarOrg = Deno.env.get('CALENDAR_ORG_ID');
  if (calendarOrg && b.org_id !== calendarOrg) return null;

  // Only confirmed bookings live on the calendar. (Cancellation handles deletion.)
  if (!BLOCKING_STATUSES.includes(b.status)) return b.google_event_id ?? null;

  const description = composeDescription(b);

  // A booking is one or more time blocks (booking_slots) → one calendar event per block,
  // so a split day (e.g. 13:00–14:00 + 16:00–18:00) shows two events, not one long one.
  // Legacy bookings without slot rows fall back to the booking's own start/end envelope.
  const slots: SlotRow[] = (b.slots ?? []).slice().sort((x, y) => x.start_at.localeCompare(y.start_at));
  if (slots.length === 0) {
    slots.push({ id: 'envelope', start_at: b.start_at, end_at: b.end_at, google_event_id: b.google_event_id });
  }

  const eventIds: string[] = [];
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const summary = slots.length > 1
      ? `${b.title} [${b.booking_ref}] (${i + 1}/${slots.length})`
      : `${b.title} [${b.booking_ref}]`;

    if (slot.google_event_id) {
      await updateCalendarEvent(slot.google_event_id, {
        summary, description, location: b.location, startAt: slot.start_at, endAt: slot.end_at,
      });
      eventIds.push(slot.google_event_id);
    } else {
      const eventId = await createCalendarEvent({
        title: slots.length > 1 ? `${b.title} (${i + 1}/${slots.length})` : b.title,
        description, location: b.location, startAt: slot.start_at, endAt: slot.end_at, bookingRef: b.booking_ref,
      });
      eventIds.push(eventId);
      if (slot.id !== 'envelope') {
        await service.from('booking_slots').update({ google_event_id: eventId }).eq('id', slot.id);
      }
    }
  }

  // Keep booking.google_event_id pointing at the first block's event (cancel-booking and
  // legacy single-event callers rely on it).
  const primary = eventIds[0] ?? null;
  if (primary && primary !== b.google_event_id) {
    await service.from('bookings').update({ google_event_id: primary }).eq('id', bookingId);
  }
  return primary;
}
