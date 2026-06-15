import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Public: everything the booking landing needs for one organization —
// the org (name, timezone, currency), its active services (with pricing),
// and which bookable workers offer each service. No auth required.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: corsHeaders });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const { slug } = await req.json() as { slug: string };
    if (!slug) return json({ error: 'slug required' }, 400);

    const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    const { data: org } = await sb.from('organizations')
      .select('id, slug, name, timezone, currency, booking_params')
      .eq('slug', slug).eq('status', 'active').maybeSingle();
    if (!org) return json({ error: 'org_not_found' });

    const { data: services } = await sb.from('services')
      .select('id, name, description, pricing, min_hours, max_hours')
      .eq('org_id', org.id).eq('is_active', true).order('name');

    const ids = (services ?? []).map(s => s.id);
    const workersByService: Record<string, { id: string; name: string }[]> = {};
    if (ids.length) {
      const { data: rows } = await sb.from('staff_services')
        .select('service_id, staff:staff_id(id, name, is_bookable)')
        .in('service_id', ids);
      for (const r of (rows ?? []) as Array<{ service_id: string; staff: { id: string; name: string; is_bookable: boolean } | null }>) {
        if (r.staff?.is_bookable) (workersByService[r.service_id] ??= []).push({ id: r.staff.id, name: r.staff.name });
      }
    }

    const out = (services ?? []).map(s => ({ ...s, workers: workersByService[s.id] ?? [] }));
    return json({ org, services: out });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
