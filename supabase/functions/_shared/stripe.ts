import Stripe from 'https://esm.sh/stripe@17?target=deno';
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Centralizes "which Stripe account does this org charge on, and what platform fee".
// Every money function (start-card-booking, create-payment-intent, cancel-booking)
// resolves payments through here so the connected-account decision is made in ONE
// place — never ad hoc. The platform SECRET key lives only in the Edge Function env;
// it is never stored in the DB or sent to the client.

export interface OrgStripe {
  /** The org's connected Standard account, or null = charge on the platform account. */
  accountId: string | null;
  /** Onboarding finished and the account can accept charges. */
  chargesEnabled: boolean;
  /** Platform application fee in basis points (0 = none). */
  feeBps: number;
}

/** A Stripe client bound to the platform secret key. */
export function platformStripe(): Stripe {
  const key = Deno.env.get('STRIPE_SECRET_KEY');
  if (!key) throw new Error('STRIPE_SECRET_KEY not set');
  return new Stripe(key);
}

/** Load an org's Connect state. Throws if the org is missing. */
export async function resolveOrgStripe(service: SupabaseClient, orgId: string): Promise<OrgStripe> {
  const { data, error } = await service
    .from('organizations')
    .select('stripe_account_id, stripe_charges_enabled, application_fee_bps')
    .eq('id', orgId)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('org_not_found');
  return {
    accountId: (data.stripe_account_id as string | null) ?? null,
    chargesEnabled: Boolean(data.stripe_charges_enabled),
    feeBps: Number(data.application_fee_bps ?? 0),
  };
}

export interface ChargeRouting {
  /** Extra PaymentIntent.create params (application fee on direct charges). */
  intentParams: { application_fee_amount?: number };
  /**
   * Per-request options — `{ stripeAccount }` for direct charges, or `undefined` for
   * the platform account. It MUST be undefined (never `{}`) when there's no connected
   * account: the Stripe SDK rejects an empty options object with
   * "Unknown arguments ([object Object])".
   */
  requestOptions?: Stripe.RequestOptions;
}

/**
 * Decide how to route a charge of `amountCents` for an org.
 * - Connected + charges enabled → DIRECT charge on the connected account, platform fee applied.
 * - Connected but onboarding NOT complete → reject (don't silently charge the platform).
 * - No connected account → platform account fallback (original single-account behaviour).
 */
export function chargeRouting(org: OrgStripe, amountCents: number): ChargeRouting {
  if (!org.accountId) {
    return { intentParams: {} }; // platform fallback — NO requestOptions (undefined)
  }
  if (!org.chargesEnabled) {
    throw new Error('payment_setup_incomplete');
  }
  const intentParams: { application_fee_amount?: number } = {};
  if (org.feeBps > 0) {
    intentParams.application_fee_amount = Math.round((amountCents * org.feeBps) / 10000);
  }
  return { intentParams, requestOptions: { stripeAccount: org.accountId } };
}

/** Per-request options for an org, or undefined for the platform account (never `{}`). */
export function orgRequestOptions(org: OrgStripe): Stripe.RequestOptions | undefined {
  return org.accountId ? { stripeAccount: org.accountId } : undefined;
}
