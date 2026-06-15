import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders as _cors } from '../_shared/cors.ts';
import { listEvents, createCalendarEvent } from '../_shared/google-calendar.ts';

const corsHeaders = { ..._cors, 'Content-Type': 'application/json' };

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }
    if (user.email !== 'johnfabiomb@gmail.com') {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: corsHeaders });
    }

    // ── 1. Push: create calendar events for paid bookings that are missing them ──
    const { data: unpushed } = await supabase
      .from('bookings')
      .select('id, booking_ref, title, description, location, start_at, end_at, payments(status)')
      .is('google_event_id', null)
      .eq('is_external', false);

    let pushed = 0;
    const pushErrors: string[] = [];

    for (const booking of unpushed ?? []) {
      const payments = booking.payments as Array<{ status: string }>;
      const hasPaidPayment = payments.some(p => p.status === 'completed');
      if (!hasPaidPayment) continue;

      try {
        const eventId = await createCalendarEvent({
          title: booking.title,
          description: booking.description,
          location: booking.location,
          startAt: booking.start_at,
          endAt: booking.end_at,
          bookingRef: booking.booking_ref,
        });
        await supabase.from('bookings').update({ google_event_id: eventId }).eq('id', booking.id);
        pushed++;
      } catch (err) {
        pushErrors.push(`${booking.booking_ref}: ${(err as Error).message}`);
      }
    }

    // ── 2. Pull: import GCal events not yet in Supabase ──
    const timeMin = new Date().toISOString();
    const timeMax = new Date(Date.now() + 90 * 864e5).toISOString();
    const events = await listEvents(timeMin, timeMax) as Array<{
      id: string; status: string; summary?: string;
      start?: { dateTime?: string; date?: string };
      end?: { dateTime?: string; date?: string };
    }>;

    const { data: existing } = await supabase
      .from('bookings')
      .select('google_event_id')
      .not('google_event_id', 'is', null);

    const knownIds = new Set((existing ?? []).map(b => b.google_event_id as string));
    const toImport = events.filter(e => e.status !== 'cancelled' && !knownIds.has(e.id));

    let pulled = 0;
    for (const e of toImport) {
      const startAt = e.start?.dateTime ?? e.start?.date;
      const endAt   = e.end?.dateTime   ?? e.end?.date;
      if (!startAt || !endAt) continue;

      await supabase.from('bookings').insert({
        title:          e.summary ?? 'External event',
        start_at:       startAt,
        end_at:         endAt,
        google_event_id: e.id,
        is_external:    true,
        status:         'booked',
        price_total:    0,
        price_expenses: 0,
      });
      pulled++;
    }

    return new Response(
      JSON.stringify({ pushed, pulled, push_errors: pushErrors, total_from_gcal: events.length }),
      { headers: corsHeaders },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: corsHeaders },
    );
  }
});
