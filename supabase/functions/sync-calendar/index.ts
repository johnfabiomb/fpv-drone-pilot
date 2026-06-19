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
    // The single shared Google Calendar belongs to one org (CALENDAR_ORG_ID).
    // Sync only that org's bookings, and attribute imported events to a worker
    // in it (bookings.org_id/staff_id are NOT NULL), preferring the org owner's.
    const calendarOrg = Deno.env.get('CALENDAR_ORG_ID');
    if (!calendarOrg) {
      return new Response(JSON.stringify({ error: 'CALENDAR_ORG_ID not configured' }), { status: 400, headers: corsHeaders });
    }

    // Authorize against org membership (owner/admin of the calendar's org),
    // not a hardcoded email.
    const { data: member } = await supabase
      .from('org_members').select('role').eq('org_id', calendarOrg).eq('user_id', user.id).maybeSingle();
    if (!member || !['owner', 'admin'].includes(member.role)) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: corsHeaders });
    }

    let calendarStaffId: string | null = null;
    const { data: owner } = await supabase
      .from('org_members').select('user_id').eq('org_id', calendarOrg).eq('role', 'owner').limit(1).maybeSingle();
    if (owner?.user_id) {
      const { data: ownerStaff } = await supabase
        .from('staff').select('id').eq('org_id', calendarOrg).eq('user_id', owner.user_id).limit(1).maybeSingle();
      calendarStaffId = ownerStaff?.id ?? null;
    }
    if (!calendarStaffId) {
      const { data: anyStaff } = await supabase
        .from('staff').select('id').eq('org_id', calendarOrg).eq('is_bookable', true).order('created_at').limit(1).maybeSingle();
      calendarStaffId = anyStaff?.id ?? null;
    }
    if (!calendarStaffId) {
      return new Response(JSON.stringify({ error: 'No worker in the calendar org to attribute events to' }), { status: 400, headers: corsHeaders });
    }

    // ── 1. Push: create calendar events for paid bookings that are missing them ──
    const { data: unpushed } = await supabase
      .from('bookings')
      .select('id, booking_ref, title, description, location, start_at, end_at, payments(status)')
      .eq('org_id', calendarOrg)
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
    // Look back ~4 months as well as forward, so past jobs are imported too.
    const timeMin = new Date(Date.now() - 120 * 864e5).toISOString();
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
    const pullErrors: string[] = [];
    for (const e of toImport) {
      const startAt = e.start?.dateTime ?? e.start?.date;
      const endAt   = e.end?.dateTime   ?? e.end?.date;
      if (!startAt || !endAt) continue;

      // Per-event so one bad row (e.g. overlaps an existing booking, 23P01)
      // doesn't abort the whole sync. The imported event's title becomes the
      // booking's contact_name so it shows a customer (no client row is created).
      const { data: created, error } = await supabase.from('bookings').insert({
        org_id:         calendarOrg,
        staff_id:       calendarStaffId,
        title:          e.summary ?? 'External event',
        contact_name:   e.summary ?? null,
        start_at:       startAt,
        end_at:         endAt,
        google_event_id: e.id,
        is_external:    true,
        status:         'booked',
        price_total:    0,
        price_expenses: 0,
      }).select('id').single();
      if (error || !created) { pullErrors.push(`${e.summary ?? e.id}: ${error?.message ?? 'insert failed'}`); continue; }
      // A booking blocks availability through its slots, so the import needs one too
      // (carries the same Google event id). Without it the event wouldn't show as busy.
      await supabase.from('booking_slots').insert({
        org_id: calendarOrg, booking_id: created.id, staff_id: calendarStaffId,
        start_at: startAt, end_at: endAt, google_event_id: e.id,
      });
      pulled++;
    }

    return new Response(
      JSON.stringify({ pushed, pulled, push_errors: pushErrors, pull_errors: pullErrors, total_from_gcal: events.length }),
      { headers: corsHeaders },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: corsHeaders },
    );
  }
});
