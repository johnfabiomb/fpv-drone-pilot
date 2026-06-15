import Stripe from 'https://esm.sh/stripe@17?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders as _cors } from '../_shared/cors.ts';
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
      .select('is_active, expires_at, booking_id, bookings(id, org_id, booking_ref, title, start_at, price_total, allow_card)')
      .eq('token', token)
      .single();

    if (!link?.is_active) {
      return new Response(JSON.stringify({ error: 'Invalid or expired link' }), { status: 400, headers: corsHeaders });
    }

    if (link.expires_at && new Date(link.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: 'Link has expired' }), { status: 400, headers: corsHeaders });
    }

    const booking = link.bookings as {
      id: string; org_id: string; booking_ref: string; title: string; start_at: string; price_total: number; allow_card: boolean;
    };

    if (!booking.allow_card) {
      return new Response(JSON.stringify({ error: 'Card payment is not enabled for this booking' }), { status: 400, headers: corsHeaders });
    }

    const isPast = new Date(booking.start_at) <= new Date();
    if (isPast && paymentType === 'deposit') {
      return new Response(JSON.stringify({ error: 'Past bookings require full payment' }), { status: 400, headers: corsHeaders });
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
      const depositAmount = Math.round(booking.price_total * 0.30 * 100) / 100;
      amount = paymentType === 'deposit' ? depositAmount : booking.price_total;
    }
    const amountCents = Math.round(amount * 100);

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);

    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'eur',
      description: `${booking.title} [${booking.booking_ref}] — ${paymentType}`,
      metadata: {
        booking_id: booking.id,
        booking_ref: booking.booking_ref,
        payment_type: paymentType,
        token,
      },
      automatic_payment_methods: { enabled: true },
    });

    await supabase.from('payments').insert({
      org_id: booking.org_id,
      booking_id: booking.id,
      amount,
      type: paymentType === 'remainder' ? 'full' : paymentType,
      status: 'pending',
      method: 'card',
      stripe_payment_intent_id: intent.id,
    });

    return new Response(JSON.stringify({ clientSecret: intent.client_secret }), { headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: corsHeaders });
  }
});
