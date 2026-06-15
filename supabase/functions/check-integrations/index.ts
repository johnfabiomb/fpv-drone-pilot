import Stripe from 'https://esm.sh/stripe@17?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Admin-only: verifies that the Stripe + Google Calendar credentials are
// configured and actually work. Returns a per-integration status for the
// Settings → Integration status panel. Reads only env secrets, no org data.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: corsHeaders });

async function checkStripe(): Promise<{ ok: boolean; detail: string }> {
  const key = Deno.env.get('STRIPE_SECRET_KEY');
  if (!key) return { ok: false, detail: 'STRIPE_SECRET_KEY not set' };
  try {
    const stripe = new Stripe(key);
    const bal = await stripe.balance.retrieve();
    const mode = key.startsWith('sk_live') ? 'live' : 'test';
    const webhook = Deno.env.get('STRIPE_WEBHOOK_SECRET') ? 'webhook secret set' : 'webhook secret MISSING';
    return { ok: true, detail: `Connected (${mode} mode, ${bal.available?.[0]?.currency ?? 'eur'}); ${webhook}` };
  } catch (e) {
    return { ok: false, detail: (e as Error).message };
  }
}

async function checkGoogle(): Promise<{ ok: boolean; detail: string }> {
  const id = Deno.env.get('GOOGLE_OAUTH_CLIENT_ID');
  const secret = Deno.env.get('GOOGLE_OAUTH_CLIENT_SECRET');
  const refresh = Deno.env.get('GOOGLE_OAUTH_REFRESH_TOKEN');
  const calId = Deno.env.get('GOOGLE_CALENDAR_ID');
  if (!id || !secret || !refresh || !calId) return { ok: false, detail: 'One or more GOOGLE_* secrets not set' };
  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: id, client_secret: secret, refresh_token: refresh, grant_type: 'refresh_token' }),
    });
    const data = await res.json();
    if (!data.access_token) return { ok: false, detail: `Token refresh failed: ${data.error_description ?? data.error ?? 'unknown'}` };
    return { ok: true, detail: `Connected to calendar ${calId}` };
  } catch (e) {
    return { ok: false, detail: (e as Error).message };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'auth required' }, 401);
    const url = Deno.env.get('SUPABASE_URL')!;
    const service = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const userClient = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: authHeader } } });
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return json({ error: 'not signed in' }, 401);
    const { data: member } = await service.from('org_members').select('role').eq('user_id', user.id).in('role', ['owner', 'admin']).limit(1).maybeSingle();
    if (!member) return json({ error: 'forbidden' }, 403);

    const [stripe, google] = await Promise.all([checkStripe(), checkGoogle()]);
    return json({ stripe, google });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
