import { ensureBookingEvent } from './booking-event.ts';

// Single source of truth for turning a SUCCEEDED Stripe PaymentIntent into a completed
// `payments` row. Idempotent: keyed on the unique stripe_payment_intent_id, so the
// success-page return (`confirm-payment`) and the async `stripe-webhook` can both call
// it for the same intent without ever double-recording. Also confirms the booking and
// refreshes its calendar event. The `payments` ledger therefore only ever holds money
// that actually moved — no pending/abandoned-intent rows.

// deno-lint-ignore no-explicit-any
type SupabaseClient = any;

interface IntentLike {
  id: string;
  amount: number;                       // in cents
  metadata: Record<string, string> | null;
}

export async function recordSucceededIntent(service: SupabaseClient, intent: IntentLike): Promise<void> {
  const bookingId = intent.metadata?.booking_id;
  if (!bookingId) { console.error('recordSucceededIntent: no booking_id on intent', intent.id); return; }

  // org_id is NOT NULL on payments — read it from the booking (don't trust metadata alone).
  const { data: bk } = await service.from('bookings').select('org_id').eq('id', bookingId).maybeSingle();
  if (!bk?.org_id) { console.error('recordSucceededIntent: booking not found', bookingId); return; }

  const type = intent.metadata?.payment_type === 'deposit' ? 'deposit' : 'full';

  // Upsert on the unique intent id → exactly one completed row, however many times this runs.
  const { error } = await service.from('payments').upsert({
    org_id: bk.org_id,
    booking_id: bookingId,
    amount: intent.amount / 100,
    type,
    status: 'completed',
    method: 'card',
    stripe_payment_intent_id: intent.id,
    paid_at: new Date().toISOString(),
  }, { onConflict: 'stripe_payment_intent_id' });
  if (error) { console.error('recordSucceededIntent: upsert failed', error.message); return; }

  // Paying confirms the booking: card holds and pay-later 'pending' links become 'booked'.
  const { error: confirmErr } = await service.from('bookings')
    .update({ status: 'booked', hold_expires_at: null })
    .eq('id', bookingId).in('status', ['hold', 'pending']);
  if (confirmErr) console.error('recordSucceededIntent: confirm failed (slot taken?)', confirmErr.message);

  // Create/refresh the Google Calendar event so it reflects the new payment state.
  try { await ensureBookingEvent(service, bookingId); }
  catch (e) { console.error('recordSucceededIntent: GCal sync failed', (e as Error).message); }
}
