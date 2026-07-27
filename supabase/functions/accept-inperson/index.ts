import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Public, token-gated. A client opens an admin-sent link and chooses to settle in
// person (cash / Revolut / bank transfer) instead of paying by card.
//
// This is always a REQUEST the admin confirms — never a direct booking. It marks the
// booking 'pending' (held) and stamps a note that the client agreed to pay in person,
// so it surfaces in the admin's "To confirm" list. The admin's confirm (approve-cash-
// booking) is what books it and pushes the Google Calendar event. If the booking is
// already confirmed (paid, or the admin pre-confirmed it), this is a no-op.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: corsHeaders });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const { token } = await req.json() as { token: string };
    if (!token) return json({ error: 'token required' }, 400);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: link } = await supabase
      .from('booking_links')
      .select('is_active, expires_at, bookings(id, status, google_event_id, notes, allow_card, allow_inperson)')
      .eq('token', token)
      .single();

    if (!link?.is_active) return json({ error: 'invalid_link' });
    if (link.expires_at && new Date(link.expires_at) < new Date()) return json({ error: 'expired' });

    const b = link.bookings as unknown as {
      id: string; status: string; google_event_id: string | null; notes: string | null;
      allow_card: boolean; allow_inperson: boolean;
    };

    if (!b.allow_inperson) return json({ error: 'not_allowed' });
    if (b.status === 'cancelled' || b.status === 'expired') return json({ error: 'cancelled' });
    // Already confirmed (admin pre-confirmed, or paid → on the calendar) → nothing to request.
    const CONFIRMED = ['booked', 'in_progress', 'done'];
    if (CONFIRMED.includes(b.status) || b.google_event_id) return json({ ok: true, already: true, confirmed: true });

    // Raise (or re-affirm) the request: hold it as 'pending' and stamp that the client
    // agreed to pay in person, so the admin sees it in "To confirm". Idempotent — a repeat
    // click just refreshes the note. The calendar event is created on the admin's confirm.
    const stamp = `Client agreed to pay in person (cash / Revolut / bank transfer). ${new Date().toISOString().slice(0, 10)}`;
    const notes = b.notes && b.notes.includes('Client agreed to pay in person')
      ? b.notes
      : (b.notes ? `${b.notes}\n${stamp}` : stamp);
    await supabase.from('bookings').update({ status: 'pending', notes }).eq('id', b.id);
    return json({ ok: true, confirmed: false, requested: true });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
