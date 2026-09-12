import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { deleteCalendarEvent } from '../_shared/google-calendar.ts';
import { platformStripe, resolveOrgStripe } from '../_shared/stripe.ts';

// Admin cancels a booking: optionally refunds its completed card payments via
// Stripe, removes the Google Calendar event, and sets status 'cancelled'.
// Admin-only (owner/admin of the booking's organization).

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
    const { bookingId, refund } = await req.json() as { bookingId: string; refund?: boolean };
    if (!bookingId) return json({ error: 'bookingId required' }, 400);

    const url = Deno.env.get('SUPABASE_URL')!;
    const service = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const userClient = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: authHeader } } });
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return json({ error: 'not signed in' }, 401);

    const { data: booking } = await service.from('bookings')
      .select('id, org_id, google_event_id, status, slots:booking_slots(id, google_event_id)').eq('id', bookingId).maybeSingle();
    if (!booking) return json({ error: 'not_found' });

    const { data: member } = await service.from('org_members')
      .select('role').eq('org_id', booking.org_id).eq('user_id', user.id).maybeSingle();
    if (!member || !['owner', 'admin'].includes(member.role)) return json({ error: 'forbidden' }, 403);

    // Optional refund of completed card payments
    let refunded = 0;
    if (refund) {
      // Soft-deleted payments must not be refunded — service_role bypasses `hide_deleted`,
      // so a payment the admin already removed would otherwise be sent to Stripe.
      const { data: pays } = await service.from('payments')
        .select('id, amount, stripe_payment_intent_id')
        .eq('booking_id', bookingId).eq('status', 'completed').eq('method', 'card')
        .is('deleted_at', null);
      const stripe = platformStripe();
      // Direct charges live on the connected account, so refunds must target it too.
      // Options must be undefined (never `{}`) for the platform account, or the SDK
      // rejects it with "Unknown arguments".
      const orgStripe = await resolveOrgStripe(service, booking.org_id);
      const reqOpts = orgStripe.accountId ? { stripeAccount: orgStripe.accountId } : undefined;
      for (const p of (pays ?? []) as Array<{ id: string; amount: number; stripe_payment_intent_id: string | null }>) {
        if (!p.stripe_payment_intent_id) continue;
        try {
          await stripe.refunds.create(
            { payment_intent: p.stripe_payment_intent_id },
            ...(reqOpts ? [reqOpts] : []),
          );
          await service.from('payments').update({ status: 'refunded' }).eq('id', p.id);
          refunded += Number(p.amount);
        } catch (e) {
          return json({ error: `refund_failed: ${(e as Error).message}` }, 500);
        }
      }
    }

    // Cancel + free the slot
    await service.from('bookings').update({ status: 'cancelled', hold_expires_at: null }).eq('id', bookingId);

    // Remove every block's calendar event (a booking can be several time blocks) — only
    // forget an id once we know it's actually gone, so a transient failure doesn't orphan
    // the event on the calendar with no way back.
    let calendarCleared = true;
    const slots = (booking.slots ?? []) as Array<{ id: string; google_event_id: string | null }>;
    for (const slot of slots) {
      if (!slot.google_event_id) continue;
      try {
        await deleteCalendarEvent(slot.google_event_id);
        await service.from('booking_slots').update({ google_event_id: null }).eq('id', slot.id);
      } catch (e) {
        calendarCleared = false;
        console.error('GCal slot delete failed:', (e as Error).message);
      }
    }
    // Legacy bookings store the event id on the booking row itself.
    if (booking.google_event_id) {
      try {
        await deleteCalendarEvent(booking.google_event_id);
        await service.from('bookings').update({ google_event_id: null }).eq('id', bookingId);
      } catch (e) {
        calendarCleared = false;
        console.error('GCal delete failed:', (e as Error).message);
      }
    }

    return json({ ok: true, refunded, calendar_cleared: calendarCleared });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
