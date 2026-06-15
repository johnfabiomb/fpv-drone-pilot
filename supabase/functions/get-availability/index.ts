import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Public, read-only availability for ONE worker offering ONE service.
// Window = that staff↔service pairing's working_hours (staff_services) minus the
// worker's busy ranges (get_busy_ranges by staff_id — the worker's shared
// calendar across all services). Returns hourly slots + the service's pricing.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: corsHeaders });

interface TimeRange { start: number; end: number; }
type DayRule = TimeRange[] | 'closed';
interface WorkingHoursConfig { default: DayRule; [k: string]: DayRule | Record<string, DayRule> | undefined; overrides?: Record<string, DayRule>; }

const DEFAULT_TZ = 'Europe/Malta';

function zonedWallClockToUtc(y: number, m: number, d: number, hour: number, tz: string): Date {
  const desired = Date.UTC(y, m - 1, d, hour, 0, 0);
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(new Date(desired)).reduce<Record<string, number>>((a, p) => {
    if (p.type !== 'literal') a[p.type] = Number(p.value); return a;
  }, {});
  const seenAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour === 24 ? 0 : parts.hour, parts.minute, parts.second);
  return new Date(desired + (desired - seenAsUtc));
}
function dowInTz(dateStr: string, tz: string): number {
  const [y, m, d] = dateStr.split('-').map(Number);
  const noon = zonedWallClockToUtc(y, m, d, 12, tz);
  const short = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' }).format(noon);
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(short);
}
function ruleForDate(cfg: WorkingHoursConfig, dateStr: string, dow: number): DayRule {
  const o = cfg.overrides?.[dateStr]; if (o !== undefined) return o;
  return (cfg[String(dow)] as DayRule | undefined) ?? cfg.default;
}
function eachDate(from: string, to: string): string[] {
  const out: string[] = []; const s = new Date(`${from}T00:00:00Z`).getTime(); const e = new Date(`${to}T00:00:00Z`).getTime();
  for (let t = s; t <= e; t += 86_400_000) out.push(new Date(t).toISOString().slice(0, 10));
  return out;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const { staffId, serviceId, from, to } = await req.json();
    if (!staffId || !serviceId || !from || !to) return json({ error: 'staffId, serviceId, from, to required' }, 400);

    const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    const { data: pairing } = await sb.from('staff_services')
      .select('working_hours, staff:staff_id(org_id), service:service_id(name, pricing, min_hours, max_hours)')
      .eq('staff_id', staffId).eq('service_id', serviceId).maybeSingle();
    if (!pairing) return json({ error: 'worker_does_not_offer_service' });

    const staff = pairing.staff as { org_id: string };
    const service = pairing.service as { name: string; pricing: unknown; min_hours: number; max_hours: number };

    const { data: org } = await sb.from('organizations').select('timezone, booking_params').eq('id', staff.org_id).single();
    const tz = org?.timezone ?? DEFAULT_TZ;
    const bp = (org?.booking_params ?? {}) as { min_lead_minutes?: number; buffer_minutes?: number };
    const minLeadMs = (bp.min_lead_minutes ?? 0) * 60_000;
    const bufferMs = (bp.buffer_minutes ?? 0) * 60_000;
    const hours = (pairing.working_hours ?? { default: [{ start: 0, end: 24 }] }) as WorkingHoursConfig;

    const winStart = `${from}T00:00:00Z`;
    const winEnd = new Date(new Date(`${to}T00:00:00Z`).getTime() + 86_400_000).toISOString();
    const { data: busyRows } = await sb.rpc('get_busy_ranges', { p_staff_id: staffId, range_start: winStart, range_end: winEnd });
    const busy = ((busyRows ?? []) as Array<{ start_at: string; end_at: string }>).map(b => ({
      start: new Date(b.start_at).getTime() - bufferMs, end: new Date(b.end_at).getTime() + bufferMs,
    }));

    const now = Date.now();
    const days: Array<{ date: string; slots: Array<{ start: string; hour: number; label: string; available: boolean }> }> = [];
    for (const dateStr of eachDate(from, to)) {
      const [y, mo, d] = dateStr.split('-').map(Number);
      const rule = ruleForDate(hours, dateStr, dowInTz(dateStr, tz));
      const slots: Array<{ start: string; hour: number; label: string; available: boolean }> = [];
      if (rule !== 'closed') {
        for (const range of rule as TimeRange[]) {
          for (let h = range.start; h < range.end; h++) {
            const startUtc = zonedWallClockToUtc(y, mo, d, h, tz);
            const endUtc = new Date(startUtc.getTime() + 3_600_000);
            const free = !busy.some(b => startUtc.getTime() < b.end && endUtc.getTime() > b.start);
            slots.push({
              start: startUtc.toISOString(), hour: h, label: `${String(h).padStart(2, '0')}:00`,
              available: startUtc.getTime() >= now + minLeadMs && free,
            });
          }
        }
      }
      days.push({ date: dateStr, slots });
    }

    return json({
      timezone: tz,
      serviceName: service.name,
      pricing: service.pricing,
      minHours: service.min_hours,
      maxHours: service.max_hours,
      days,
    });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
