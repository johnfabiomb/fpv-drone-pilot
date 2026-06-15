import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { ensureBookingEvent } from '../_shared/booking-event.ts';

// Admin-only. Refreshes a booking's Google Calendar event description so it mirrors
// the current payment + production state. Called after the admin records a cash
// payment, edits the amount, or moves the job through production stages.

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
      .select('org_id').eq('id', bookingId).maybeSingle();
    if (!booking) return json({ error: 'not_found' });

    const { data: member } = await service.from('org_members')
      .select('role').eq('org_id', booking.org_id).eq('user_id', user.id).maybeSingle();
    if (!member || !['owner', 'admin'].includes(member.role)) return json({ error: 'forbidden' }, 403);

    const eventId = await ensureBookingEvent(service, bookingId);
    return json({ ok: true, event_id: eventId });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
