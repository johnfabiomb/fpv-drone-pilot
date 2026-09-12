import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders as _cors } from '../_shared/cors.ts';
import { platformStripe, resolveOrgStripe } from '../_shared/stripe.ts';
import { recordSucceededIntent } from '../_shared/record-payment.ts';
const corsHeaders = { ..._cors, 'Content-Type': 'application/json' };
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: corsHeaders });

// Called by the /pay/success page on return from Stripe with the PaymentIntent id.
// This is the RELIABLE recording path (doesn't depend on webhook config): it retrieves
// the intent from Stripe, verifies it succeeded and belongs to this booking, then
// records it idempotently. Returns fresh totals so the receipt shows the right amounts.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const { token, paymentIntentId } = await req.json() as { token: string; paymentIntentId: string };
    if (!token || !paymentIntentId) return json({ error: 'token and paymentIntentId required' }, 400);

    const service = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    // Resolve the booking from the (anon-safe) pay-link token.
    const { data: link } = await service.from('booking_links')
      .select('booking_id, bookings(id, org_id, price_total)').eq('token', token).maybeSingle();
    const booking = link?.bookings as { id: string; org_id: string; price_total: number } | undefined;
    if (!booking) return json({ error: 'invalid link' }, 400);

    // Retrieve the intent from Stripe — on the org's connected account for a direct charge.
    const orgStripe = await resolveOrgStripe(service, booking.org_id);
    const stripe = platformStripe();
    const opts = orgStripe.accountId ? { stripeAccount: orgStripe.accountId } : undefined;
    const intent = opts
      ? await stripe.paymentIntents.retrieve(paymentIntentId, opts)
      : await stripe.paymentIntents.retrieve(paymentIntentId);

    // Security: the intent must belong to THIS booking (metadata set at creation).
    if (intent.metadata?.booking_id !== booking.id) return json({ error: 'intent_mismatch' }, 400);
    if (intent.status !== 'succeeded') return json({ recorded: false, status: intent.status });

    await recordSucceededIntent(service, intent);

    // Fresh totals for the receipt.
    // service_role bypasses `hide_deleted`, so filter soft-deleted payments explicitly —
    // otherwise a removed payment inflates the receipt's paid total / balance due.
    const { data: pays } = await service.from('payments')
      .select('amount').eq('booking_id', booking.id).eq('status', 'completed')
      .is('deleted_at', null);
    const paid = (pays ?? []).reduce((s: number, p: { amount: number }) => s + Number(p.amount), 0);
    return json({
      recorded: true,
      amount: intent.amount / 100,
      totalPaid: paid,
      balanceDue: Math.max(0, booking.price_total - paid),
    });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
