import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders as _cors } from '../_shared/cors.ts';
import { platformStripe, resolveOrgStripe, chargeRouting } from '../_shared/stripe.ts';
const corsHeaders = { ..._cors, 'Content-Type': 'application/json' };

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { token, paymentType } = await req.json() as { token: string; paymentType: 'deposit' | 'full' | 'remainder' };

    if (!token || !paymentType) {
      return new Response(JSON.stringify({ error: 'token and paymentType required' }), { status: 400, headers: corsHeaders });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: link } = await supabase
      .from('booking_links')
      .select('is_active, expires_at, booking_id, bookings(id, org_id, booking_ref, title, start_at, price_total, allow_card, deposit_percent, deposit_allowed)')
      .eq('token', token)
      .single();

    if (!link?.is_active) {
      return new Response(JSON.stringify({ error: 'Invalid or expired link' }), { status: 400, headers: corsHeaders });
    }

    if (link.expires_at && new Date(link.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: 'Link has expired' }), { status: 400, headers: corsHeaders });
    }

    const booking = link.bookings as {
      id: string; org_id: string; booking_ref: string; title: string; start_at: string; price_total: number;
      allow_card: boolean; deposit_percent: number | null; deposit_allowed: boolean | null;
    };

    if (!booking.allow_card) {
      return new Response(JSON.stringify({ error: 'Card payment is not enabled for this booking' }), { status: 400, headers: corsHeaders });
    }

    // Effective deposit policy: the per-booking value, or a safe default for legacy rows.
    const depositPct = booking.deposit_percent ?? 30;
    const depositAllowed = booking.deposit_allowed ?? true;

    const isPast = new Date(booking.start_at) <= new Date();
    if (paymentType === 'deposit' && (isPast || !depositAllowed)) {
      return new Response(JSON.stringify({ error: isPast ? 'Past bookings require full payment' : 'This booking requires full payment' }), { status: 400, headers: corsHeaders });
    }

    let amount: number;
    if (paymentType === 'remainder') {
      const { data: priorPayments } = await supabase
        .from('payments')
        .select('amount')
        .eq('booking_id', booking.id)
        .eq('status', 'completed');
      const totalPaid = (priorPayments ?? []).reduce((sum, p) => sum + p.amount, 0);
      amount = Math.round((booking.price_total - totalPaid) * 100) / 100;
      if (amount <= 0) {
        return new Response(JSON.stringify({ error: 'Booking is already fully paid' }), { status: 400, headers: corsHeaders });
      }
    } else {
      const depositAmount = Math.round(booking.price_total * depositPct) / 100;
      amount = paymentType === 'deposit' ? depositAmount : booking.price_total;
    }
    const amountCents = Math.round(amount * 100);

    // Route to the org's connected account (direct charge + platform fee) or fall back
    // to the platform account. Reject if the org connected but hasn't finished onboarding.
    const orgStripe = await resolveOrgStripe(supabase, booking.org_id);
    if (orgStripe.accountId && !orgStripe.chargesEnabled) {
      return new Response(JSON.stringify({ error: 'This business has not finished payment setup yet.' }), { status: 400, headers: corsHeaders });
    }
    const routing = chargeRouting(orgStripe, amountCents);
    const stripe = platformStripe();

    const intentParams = {
      amount: amountCents,
      currency: 'eur',
      description: `${booking.title} [${booking.booking_ref}] — ${paymentType}`,
      metadata: {
        booking_id: booking.id,
        booking_ref: booking.booking_ref,
        org_id: booking.org_id,
        payment_type: paymentType,
        token,
      },
      automatic_payment_methods: { enabled: true },
      ...routing.intentParams,
    };
    // Pass per-request options ONLY for a connected account — never an empty `{}`,
    // which the Stripe SDK rejects as "Unknown arguments".
    const intent = routing.requestOptions
      ? await stripe.paymentIntents.create(intentParams, routing.requestOptions)
      : await stripe.paymentIntents.create(intentParams);

    // NOTE: we do NOT write a `payments` row here. An intent is not a payment — the
    // customer may pick several amounts before paying (or abandon). A `payments` row is
    // created only when money actually moves, recorded idempotently by `confirm-payment`
    // (on the success-page return) and `stripe-webhook` (async), both keyed on the
    // PaymentIntent id. This keeps the ledger free of pending/abandoned clutter.

    // The client needs the connected account id to init Stripe.js for a direct charge.
    return new Response(JSON.stringify({ clientSecret: intent.client_secret, stripeAccount: orgStripe.accountId }), { headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: corsHeaders });
  }
});
