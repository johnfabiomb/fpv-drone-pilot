import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { platformStripe } from '../_shared/stripe.ts';

// Org owner/admin reads their org's Stripe Connect status. Retrieves the connected
// account from Stripe and caches charges_enabled / details_submitted back onto the
// org (service role only). Called on the Settings page load and when the admin
// returns from Stripe's hosted onboarding. Authorization is scoped to the caller's
// membership of the org_id they pass.

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
    const { orgId } = await req.json() as { orgId: string };
    if (!orgId) return json({ error: 'orgId required' }, 400);

    const url = Deno.env.get('SUPABASE_URL')!;
    const service = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const userClient = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: authHeader } } });
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return json({ error: 'not signed in' }, 401);

    const { data: member } = await service.from('org_members')
      .select('role').eq('org_id', orgId).eq('user_id', user.id).maybeSingle();
    if (!member || !['owner', 'admin'].includes(member.role)) return json({ error: 'forbidden' }, 403);

    const { data: org } = await service.from('organizations')
      .select('stripe_account_id, stripe_charges_enabled, stripe_details_submitted').eq('id', orgId).maybeSingle();
    if (!org) return json({ error: 'org_not_found' }, 404);

    const accountId = org.stripe_account_id as string | null;
    if (!accountId) {
      return json({ connected: false, chargesEnabled: false, detailsSubmitted: false });
    }

    const stripe = platformStripe();
    const account = await stripe.accounts.retrieve(accountId);
    const chargesEnabled = Boolean(account.charges_enabled);
    const detailsSubmitted = Boolean(account.details_submitted);

    // Cache the latest state so the money path doesn't hit Stripe on every charge.
    if (chargesEnabled !== org.stripe_charges_enabled || detailsSubmitted !== org.stripe_details_submitted) {
      await service.from('organizations')
        .update({ stripe_charges_enabled: chargesEnabled, stripe_details_submitted: detailsSubmitted })
        .eq('id', orgId);
    }

    return json({ connected: true, accountId, chargesEnabled, detailsSubmitted });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
