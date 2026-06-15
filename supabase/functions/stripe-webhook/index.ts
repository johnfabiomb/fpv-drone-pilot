import Stripe from 'https://esm.sh/stripe@17?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { ensureBookingEvent } from '../_shared/booking-event.ts';

Deno.serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);

  // Two webhook destinations point here: one for the platform account and one for
  // connected-account events (Stripe Connect). Each has its own signing secret, so
  // verify against both and accept whichever matches.
  const secrets = [
    Deno.env.get('STRIPE_WEBHOOK_SECRET'),
    Deno.env.get('STRIPE_WEBHOOK_SECRET_CONNECT'),
  ].filter((s): s is string => !!s);

  let event: Stripe.Event | null = null;
  let lastErr = '';
  for (const secret of secrets) {
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature!, secret);
      break;
    } catch (err) {
      lastErr = (err as Error).message;
    }
  }
  if (!event) {
    return new Response(`Webhook signature failed: ${lastErr}`, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object as Stripe.PaymentIntent;
    const { booking_id, booking_ref, payment_type } = intent.metadata;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    await supabase
      .from('payments')
      .update({ status: 'completed', paid_at: new Date().toISOString() })
      .eq('stripe_payment_intent_id', intent.id);

    // Paying confirms the booking: self-serve card bookings start as a 'hold', and a
    // link booking the client first asked to pay in person sits at 'pending'. Either
    // way a successful payment makes it 'booked'. (Already-'booked' links are skipped.)
    // The slot wasn't hard-held while 'pending', so re-confirming could in theory clash
    // with another booking taken meanwhile (23P01) — log it; the payment still stands.
    const { error: confirmErr } = await supabase
      .from('bookings')
      .update({ status: 'booked', hold_expires_at: null })
      .eq('id', booking_id)
      .in('status', ['hold', 'pending']);
    if (confirmErr) console.error('Booking confirm failed (slot taken meanwhile?):', confirmErr.message);

    // Create the calendar event (or refresh its description so it shows the new
    // payment state — e.g. deposit → paid in full). Idempotent on the event id.
    try {
      await ensureBookingEvent(supabase, booking_id);
    } catch (calErr) {
      console.error('GCal sync failed:', JSON.stringify(calErr));
    }

    console.log(`Payment ${payment_type} completed for booking ${booking_ref}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
