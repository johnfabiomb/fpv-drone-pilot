import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { ensureBookingEvent } from '../_shared/booking-event.ts';

// An org owner/admin approves a pending cash request:
//   pending → booked (constraint rejects with 23P01 if the worker's slot was
//   taken meanwhile → slot_taken), then pushes the event to Google Calendar.
// Authorization: the caller must be owner/admin of the booking's organization.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: corsHeaders });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'auth required' }, 401);
    const { bookingId } = await req.json() as { bookingId: string };
    if (!bookingId) return json({ error: 'bookingId required' }, 400);

    const url = Deno.env.get('SUPABASE_URL')!;
    const service = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const userClient = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: authHeader } } });
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return json({ error: 'not signed in' }, 401);

    const { data: booking } = await service.from('bookings')
      .select('id, org_id, booking_ref, title, description, location, start_at, end_at, google_event_id, status')
      .eq('id', bookingId).maybeSingle();
    if (!booking) return json({ error: 'not_found' });

    // Authorize: owner/admin of this booking's org
    const { data: member } = await service.from('org_members')
      .select('role').eq('org_id', booking.org_id).eq('user_id', user.id).maybeSingle();
    if (!member || !['owner', 'admin'].includes(member.role)) return json({ error: 'forbidden' }, 403);

    if (booking.status !== 'pending') return json({ error: 'not_pending' });

    const { error: updErr } = await service.from('bookings')
      .update({ status: 'booked', hold_expires_at: null })
      .eq('id', bookingId).eq('status', 'pending');
    if (updErr) {
      if ((updErr as { code?: string }).code === '23P01') return json({ error: 'slot_taken' });
      throw updErr;
    }

    try {
      await ensureBookingEvent(service, bookingId);
    } catch (calErr) {
      console.error('GCal event creation failed:', JSON.stringify(calErr));
    }
    return json({ ok: true });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
