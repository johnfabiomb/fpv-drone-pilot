import Stripe from 'https://esm.sh/stripe@17?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { recordSucceededIntent } from '../_shared/record-payment.ts';

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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    // Idempotent with confirm-payment (success-page return) — keyed on the intent id.
    await recordSucceededIntent(supabase, intent);
    console.log(`Payment ${intent.metadata?.payment_type} recorded for ${intent.metadata?.booking_ref}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
