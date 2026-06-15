import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { ensureBookingEvent } from '../_shared/booking-event.ts';

// Public, token-gated. A client opens an admin-sent link and chooses to settle in
// person (cash / Revolut / bank transfer) instead of paying by card.
//
// Behaviour depends on what the admin offered on the link:
//  • Card + pay-later both offered → this is a REQUEST: demote to 'pending' so the
//    admin approves it; the calendar event is created only on approval.
//  • Pay-later is the ONLY option → this is the client CONFIRMING the booking
//    (terms-acceptance: "I agree to pay by cash/Revolut/bank"). Confirm it directly
//    and create the calendar event now.

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
    // Already on the calendar (paid, or already accepted/confirmed) → no-op.
    if (b.google_event_id) return json({ ok: true, already: true });

    const stamp = `Client agreed to pay in person (cash / Revolut / bank transfer). ${new Date().toISOString().slice(0, 10)}`;
    const notes = b.notes ? `${b.notes}\n${stamp}` : stamp;

    // Pay-later is the only option → the client's acceptance confirms the booking.
    if (!b.allow_card) {
      await supabase.from('bookings').update({ notes, status: 'booked' }).eq('id', b.id);
      await ensureBookingEvent(supabase, b.id);
      return json({ ok: true, confirmed: true });
    }

    // Both options offered → this is a request the admin must accept.
    if (b.status === 'pending') return json({ ok: true, already: true });
    await supabase.from('bookings').update({ status: 'pending', notes }).eq('id', b.id);
    return json({ ok: true, confirmed: false });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
