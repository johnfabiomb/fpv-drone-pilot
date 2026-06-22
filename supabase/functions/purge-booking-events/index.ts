// Removes a booking's Google Calendar events. Called automatically by the DB trigger
// `bookings_purge_calendar` (via pg_net) whenever a booking is soft-deleted or cancelled,
// so the calendar is cleaned server-side regardless of which client did the delete.
// Auth: a shared secret (x-purge-secret) set both here (PURGE_SECRET) and in Vault.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { deleteCalendarEvent } from '../_shared/google-calendar.ts';

const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' };
const json = (o: unknown, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { ...cors, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.headers.get('x-purge-secret') !== Deno.env.get('PURGE_SECRET')) return json({ error: 'forbidden' }, 403);

  const { bookingId } = await req.json() as { bookingId?: string };
  if (!bookingId) return json({ error: 'bookingId required' }, 400);

  // Service role → reads the (now soft-deleted) booking + slots and clears ids, bypassing RLS.
  const service = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data: booking, error: bErr } = await service.from('bookings')
    .select('id, google_event_id').eq('id', bookingId).maybeSingle();
  if (bErr) return json({ error: 'booking_query_failed', detail: bErr.message }, 500);
  if (!booking) return json({ ok: true, note: 'no booking' });

  const { data: slotRows } = await service.from('booking_slots')
    .select('id, google_event_id').eq('booking_id', bookingId);

  let cleared = 0, failed = 0;
  const slots = (slotRows ?? []) as Array<{ id: string; google_event_id: string | null }>;
  for (const s of slots) {
    if (!s.google_event_id) continue;
    try {
      await deleteCalendarEvent(s.google_event_id);
      await service.from('booking_slots').update({ google_event_id: null }).eq('id', s.id);
      cleared++;
    } catch (e) { failed++; console.error('purge slot event failed:', (e as Error).message); }
  }
  if (booking.google_event_id) {
    try {
      await deleteCalendarEvent(booking.google_event_id);
      await service.from('bookings').update({ google_event_id: null }).eq('id', bookingId);
      cleared++;
    } catch (e) { failed++; console.error('purge booking event failed:', (e as Error).message); }
  }
  return json({ ok: true, cleared, failed });
});
