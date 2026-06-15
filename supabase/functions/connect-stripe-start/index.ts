import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { platformStripe } from '../_shared/stripe.ts';

// Org owner/admin starts Stripe Connect onboarding for THEIR org:
//   create a Standard connected account (once) → store its id (service role only) →
//   return a Stripe-hosted account-onboarding link. The org never sees/handles any
//   secret key; we persist only the account id. Authorization is strictly scoped to
//   the caller's membership of the org_id they pass — an admin can never onboard
//   another org, nor inject an arbitrary account id (the id is minted by Stripe here).

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: corsHeaders });

// Onboarding return/refresh URLs come from a TRUSTED configured base (or the
// browser Origin) — never arbitrary client input — to prevent open-redirect abuse.
function appBaseUrl(req: Request): string {
  const configured = Deno.env.get('APP_BASE_URL');
  if (configured) return configured.replace(/\/+$/, '');
  const origin = req.headers.get('Origin');
  if (origin) return origin.replace(/\/+$/, '');
  throw new Error('APP_BASE_URL not set');
}

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

    // Authorize: caller must be owner/admin of THIS org.
    const { data: member } = await service.from('org_members')
      .select('role').eq('org_id', orgId).eq('user_id', user.id).maybeSingle();
    if (!member || !['owner', 'admin'].includes(member.role)) return json({ error: 'forbidden' }, 403);

    const { data: org } = await service.from('organizations')
      .select('stripe_account_id, name').eq('id', orgId).maybeSingle();
    if (!org) return json({ error: 'org_not_found' }, 404);

    const stripe = platformStripe();
    let accountId = org.stripe_account_id as string | null;

    // Mint a Standard connected account once; the org id is Stripe-side metadata.
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'standard',
        metadata: { org_id: orgId },
      });
      accountId = account.id;
      await service.from('organizations').update({ stripe_account_id: accountId }).eq('id', orgId);
    }

    const base = appBaseUrl(req);
    const link = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${base}/bookings/settings?stripe=refresh`,
      return_url: `${base}/bookings/settings?stripe=return`,
      type: 'account_onboarding',
    });

    return json({ url: link.url });
  } catch (err) {
    // Surface the real Stripe/setup reason to the admin instead of a generic 500
    // (e.g. "Connect is not enabled" when the platform was only set up in test mode).
    const msg = (err as Error).message;
    console.error('[connect-stripe-start] failed:', msg);
    return json({ error: msg });
  }
});
