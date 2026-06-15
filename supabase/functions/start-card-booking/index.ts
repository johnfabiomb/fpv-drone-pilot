import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { checkSlotAvailability } from '../_shared/google-calendar.ts';
import { platformStripe, resolveOrgStripe, chargeRouting } from '../_shared/stripe.ts';

// Signed-in client starts a card booking for a given worker + service:
//   resolve org from staff → expire stale holds → live Google check →
//   create a 15-min HOLD (org/staff/service; constraint guards the worker's
//   calendar) → Stripe PaymentIntent (deposit or full, price from the service).
// The stripe-webhook confirms (hold → booked) + pushes to Google Calendar.

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
    const { staffId, serviceId, start, hours, paymentType } = await req.json() as
      { staffId: string; serviceId: string; start: string; hours: number; paymentType: 'deposit' | 'full' };
    if (!staffId || !serviceId || !start || !hours || (paymentType !== 'deposit' && paymentType !== 'full')) {
      return json({ error: 'staffId, serviceId, start, hours, paymentType required' }, 400);
    }

    const url = Deno.env.get('SUPABASE_URL')!;
    const service = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const userClient = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: authHeader } } });
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return json({ error: 'not signed in' }, 401);

    // Worker + service + org
    const { data: pairing } = await service.from('staff_services')
      .select('staff:staff_id(org_id), service:service_id(name, min_hours, max_hours)')
      .eq('staff_id', staffId).eq('service_id', serviceId).maybeSingle();
    if (!pairing) return json({ error: 'worker_does_not_offer_service' });
    const orgId = (pairing.staff as { org_id: string }).org_id;
    const svc = pairing.service as { name: string; min_hours: number; max_hours: number };
    if (hours < svc.min_hours || hours > svc.max_hours) return json({ error: 'invalid_duration' });

    // Client (must have a profile in this org — checkout calls upsert_my_client first)
    const { data: client } = await service.from('clients').select('id').eq('org_id', orgId).eq('user_id', user.id).maybeSingle();
    if (!client) return json({ error: 'no_client_profile' });

    // Price (server-authoritative) + org params
    const { data: priceData } = await service.rpc('service_price', { p_service: serviceId, p_hours: hours });
    const total = Number(priceData);
    if (!isFinite(total)) return json({ error: 'no_price' });
    const { data: org } = await service.from('organizations').select('booking_params').eq('id', orgId).single();
    const bp = (org?.booking_params ?? {}) as { deposit_percent?: number; deposit_allowed?: boolean; hold_minutes?: number };
    const depositPct = bp.deposit_percent ?? 30;
    const depositAllowed = bp.deposit_allowed ?? true;
    const holdMin = bp.hold_minutes ?? 15;
    if (paymentType === 'deposit' && !depositAllowed) return json({ error: 'deposit_not_allowed' });
    const amount = paymentType === 'deposit' ? Math.round(total * depositPct) / 100 : total;
    const amountCents = Math.round(amount * 100);

    const startIso = new Date(start).toISOString();
    const endIso = new Date(new Date(start).getTime() + Number(hours) * 3_600_000).toISOString();
    if (new Date(startIso) <= new Date()) return json({ error: 'start_in_past' });

    // Resolve payment routing BEFORE holding the slot: if the org connected a Stripe
    // account but hasn't finished onboarding, bail now rather than leave a dangling hold.
    const orgStripe = await resolveOrgStripe(service, orgId);
    if (orgStripe.accountId && !orgStripe.chargesEnabled) return json({ error: 'payment_setup_incomplete' });

    // Free stale holds (constraint side) for this worker
    await service.from('bookings').update({ status: 'expired' })
      .eq('staff_id', staffId).eq('status', 'hold').lt('hold_expires_at', new Date().toISOString());

    // Final live Google check — only for the org that owns the shared calendar;
    // other orgs rely on the DB no-overlap constraint below (multi-tenant safe).
    const calendarOrg = Deno.env.get('CALENDAR_ORG_ID');
    if (!calendarOrg || orgId === calendarOrg) {
      const free = await checkSlotAvailability(startIso, endIso);
      if (!free) return json({ error: 'slot_taken' });
    }

    // Create the hold (DB exclusion constraint by staff_id is the real guarantee)
    const { data: booking, error: insErr } = await service.from('bookings').insert({
      org_id: orgId, staff_id: staffId, service_id: serviceId, client_id: client.id,
      title: `${svc.name} (${hours}h)`, start_at: startIso, end_at: endIso, price_total: total,
      status: 'hold', hold_expires_at: new Date(Date.now() + holdMin * 60_000).toISOString(), created_by: 'client',
      deposit_percent: depositPct, deposit_allowed: depositAllowed,
    }).select('id, booking_ref').single();
    if (insErr) {
      if ((insErr as { code?: string }).code === '23P01') return json({ error: 'slot_taken' });
      throw insErr;
    }

    // Route the charge to the org's connected account (direct charge + platform fee),
    // or fall back to the platform account when the org hasn't connected one.
    const routing = chargeRouting(orgStripe, amountCents);
    const stripe = platformStripe();
    const intentParams = {
      amount: amountCents, currency: 'eur',
      description: `${booking.booking_ref} — ${svc.name} — ${paymentType}`,
      metadata: { booking_id: booking.id, booking_ref: booking.booking_ref, org_id: orgId,
                  staff_id: staffId, service_id: serviceId, payment_type: paymentType },
      automatic_payment_methods: { enabled: true },
      ...routing.intentParams,
    };
    // Pass per-request options ONLY for a connected account — never an empty `{}`.
    const intent = routing.requestOptions
      ? await stripe.paymentIntents.create(intentParams, routing.requestOptions)
      : await stripe.paymentIntents.create(intentParams);
    await service.from('payments').insert({
      org_id: orgId, booking_id: booking.id, amount, type: paymentType, status: 'pending',
      method: 'card', stripe_payment_intent_id: intent.id,
    });

    // The client needs the connected account id to init Stripe.js for a direct charge.
    return json({ clientSecret: intent.client_secret, bookingRef: booking.booking_ref,
                  stripeAccount: orgStripe.accountId });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
