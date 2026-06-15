import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

const OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const CALENDAR_BASE = 'https://www.googleapis.com/calendar/v3';

async function getAccessToken(): Promise<string> {
  const res = await fetch(OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: Deno.env.get('GOOGLE_OAUTH_CLIENT_ID')!,
      client_secret: Deno.env.get('GOOGLE_OAUTH_CLIENT_SECRET')!,
      refresh_token: Deno.env.get('GOOGLE_OAUTH_REFRESH_TOKEN')!,
      grant_type: 'refresh_token',
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`OAuth token refresh failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function checkSlotAvailability(startAt: string, endAt: string, excludeEventId?: string): Promise<boolean> {
  const token = await getAccessToken();
  const calId = encodeURIComponent(Deno.env.get('GOOGLE_CALENDAR_ID')!);
  const url = `${CALENDAR_BASE}/calendars/${calId}/events?timeMin=${encodeURIComponent(startAt)}&timeMax=${encodeURIComponent(endAt)}&singleEvents=true`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json();
  const events: Array<{ id: string; status: string }> = data.items ?? [];
  const blocking = events.filter(e => e.status !== 'cancelled' && e.id !== excludeEventId);
  return blocking.length === 0;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { token } = await req.json();
    if (!token) {
      return new Response(JSON.stringify({ error: 'token required' }), { status: 400, headers: corsHeaders });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: link } = await supabase
      .from('booking_links')
      .select('is_active, expires_at, bookings(id, start_at, end_at, google_event_id, price_total, payments(amount, status))')
      .eq('token', token)
      .single();

    if (!link || !link.is_active) {
      return new Response(JSON.stringify({ available: false, reason: 'invalid_link' }), { headers: corsHeaders });
    }

    if (link.expires_at && new Date(link.expires_at) < new Date()) {
      return new Response(JSON.stringify({ available: false, reason: 'expired' }), { headers: corsHeaders });
    }

    const booking = link.bookings as {
      id: string;
      start_at: string;
      end_at: string;
      google_event_id: string | null;
      price_total: number;
      payments: Array<{ amount: number; status: string }>;
    };

    // Compute payment status from payments table
    const completedPayments = booking.payments.filter(p => p.status === 'completed');
    const totalPaid = completedPayments.reduce((sum, p) => sum + p.amount, 0);
    const priceTotal = booking.price_total;

    let paymentStatus: 'unpaid' | 'partial' | 'paid';
    if (totalPaid >= priceTotal && priceTotal > 0) {
      paymentStatus = 'paid';
    } else if (totalPaid > 0) {
      paymentStatus = 'partial';
    } else {
      paymentStatus = 'unpaid';
    }

    const available = await checkSlotAvailability(
      booking.start_at,
      booking.end_at,
      booking.google_event_id ?? undefined,
    );

    return new Response(
      JSON.stringify({ available, paymentStatus, totalPaid, priceTotal }),
      { headers: corsHeaders },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: corsHeaders });
  }
});
