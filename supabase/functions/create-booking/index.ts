import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders as _cors } from '../_shared/cors.ts';
const corsHeaders = { ..._cors, 'Content-Type': 'application/json' };

const BASE_URL = 'https://johnfabiomb.com';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Verify caller is the admin
    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }
    if (user.email !== 'johnfabiomb@gmail.com') {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: corsHeaders });
    }

    const body = await req.json() as {
      client: { id?: string; name?: string; email?: string; phone?: string; company?: string; notes?: string };
      title: string;
      description?: string;
      location?: string;
      start_at: string;
      end_at: string;
      price_total?: number;
      price_expenses?: number;
      notes?: string;
      expires_in_days?: number;
    };

    // Resolve client
    let clientId: string | null = null;
    if (body.client?.id) {
      clientId = body.client.id;
    } else if (body.client?.name) {
      const { data: newClient, error: clientErr } = await supabase
        .from('clients')
        .insert({
          name: body.client.name,
          email: body.client.email ?? null,
          phone: body.client.phone ?? null,
          company: body.client.company ?? null,
          notes: body.client.notes ?? null,
        })
        .select('id')
        .single();

      if (clientErr) throw new Error(clientErr.message);
      clientId = newClient.id;
    }

    // Create booking
    const { data: booking, error: bookingErr } = await supabase
      .from('bookings')
      .insert({
        client_id: clientId,
        title: body.title,
        description: body.description ?? null,
        location: body.location ?? null,
        start_at: body.start_at,
        end_at: body.end_at,
        price_total: body.price_total ?? 0,
        price_expenses: body.price_expenses ?? 0,
        notes: body.notes ?? null,
        status: 'booked',
      })
      .select('id, booking_ref')
      .single();

    if (bookingErr) throw new Error(bookingErr.message);

    // Create shareable link
    const expiresAt = body.expires_in_days
      ? new Date(Date.now() + body.expires_in_days * 864e5).toISOString()
      : null;

    const { data: link, error: linkErr } = await supabase
      .from('booking_links')
      .insert({ booking_id: booking.id, expires_at: expiresAt })
      .select('token')
      .single();

    if (linkErr) throw new Error(linkErr.message);

    return new Response(
      JSON.stringify({
        booking_id: booking.id,
        booking_ref: booking.booking_ref,
        token: link.token,
        share_url: `${BASE_URL}/book/${link.token}`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
