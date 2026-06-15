# Booking Platform — Setup Guide

Everything needed to make the booking system fully operational. Some steps are **in-app**
(done by the org admin in `/bookings`), and some are **external accounts** (Stripe, Google,
Supabase) that must be configured once with credentials only you have.

**Supabase project:** `jm-bookings` (ref `odmwjhysvvbhxytyefhv`).

---

## Checklist (high level)

| # | Step | Where |
|---|---|---|
| 1 | Create services + pricing | In-app → **Services** |
| 2 | Add workers + assign services + set their schedules | In-app → **Staff** |
| 3 | Set org settings (deposit %, hold time, lead time, timezone) | In-app → **Settings** |
| 4 | Connect **Stripe** (keys + webhook) | Stripe + Supabase secrets |
| 5 | Connect **Google Calendar** (OAuth + refresh token) | Google Cloud + Supabase secrets |
| 6 | Allow sign-in redirect URLs | Supabase → Auth |
| 7 | Verify with the **Settings → Integration status** check | In-app |

---

## 1–3. In-app setup (Services, Staff, Settings)

Sign in at **`/bookings`** (you're the org owner). Then:

- **Services** — create each service you offer. Set the **name**, **pricing** (either a flat
  hourly rate or per-hour tiers, e.g. Drone 1h €100 / 2h €190 / 3h €270 / 4h €350 + €80 each extra
  hour), and **min/max hours**. Assign which **workers** perform it.
- **Staff** — add each worker. For every service a worker performs, set their **schedule**
  (the hours they're available for it). A worker has **one shared calendar** — a booking for any
  of their services blocks that time for all of them.
- **Settings** — deposit % (for card deposits), hold minutes (how long a card checkout reserves a
  slot), minimum lead time, timezone, currency, and whether **cash** requests are allowed.

> Multiple durations? Either use per-hour tiers on one service, or create separate services
> (e.g. "Drone — Half day"). Prices are server-enforced; clients can't tamper.

---

## 4. Stripe (card payments)

Card payments use **one Stripe account** (yours, the platform). *(Per-org Stripe Connect — separate
account per company — is a future upgrade; see `MULTI_TENANT_ROADMAP.md`.)*

### 4a. Get your keys
1. Go to **dashboard.stripe.com** → **Developers → API keys**.
2. Copy the **Secret key** (`sk_live_…` for real money, or `sk_test_…` to test safely).
3. Copy the **Publishable key** (`pk_live_…` / `pk_test_…`).

### 4b. Set the secret in Supabase
Edge Functions read the secret key from a Supabase **secret** (never the frontend):
- Supabase dashboard → **Project Settings → Edge Functions → Secrets** (or `Functions → Secrets`),
  add: **`STRIPE_SECRET_KEY`** = your `sk_…` key.
- Or CLI: `supabase secrets set STRIPE_SECRET_KEY=sk_live_xxx --project-ref odmwjhysvvbhxytyefhv`

### 4c. Put the publishable key in the app
The **publishable** key (safe to expose) is used by the checkout. It currently lives as `STRIPE_PK`
in `booking-checkout.component.ts` (and `book-page.component.ts`). Replace it if you rotate keys.

### 4d. Configure the webhook (critical — this confirms bookings)
Stripe must notify the app when a payment succeeds, or paid bookings won't confirm.
1. Stripe → **Developers → Webhooks → Add endpoint**.
2. **Endpoint URL:** `https://odmwjhysvvbhxytyefhv.supabase.co/functions/v1/stripe-webhook`
3. **Events to send:** `payment_intent.succeeded`.
4. Save, then copy the endpoint's **Signing secret** (`whsec_…`).
5. Set it in Supabase secrets: **`STRIPE_WEBHOOK_SECRET`** = `whsec_…`.

### 4e. Test vs live
- To test without real charges, use **test** keys (`sk_test_`/`pk_test_`) everywhere and a Stripe
  **test card** (`4242 4242 4242 4242`, any future expiry/CVC).
- With **live** keys, any payment is real money — book the smallest deposit and refund it in Stripe.

---

## 5. Google Calendar (availability + auto-events)

Confirmed bookings are pushed to **one Google Calendar** (yours), and your calendar's busy times
block availability. *(Per-worker calendars are a future upgrade.)*

### 5a. Google Cloud project + Calendar API
1. **console.cloud.google.com** → create/select a project.
2. **APIs & Services → Library** → enable **Google Calendar API**.

### 5b. OAuth consent screen — PUBLISH IT
1. **APIs & Services → OAuth consent screen** (newer UI: **Google Auth Platform → Audience**).
2. **Publish app** → status must be **In production**.
   ⚠️ In "Testing" mode Google **expires the refresh token every 7 days** — sync will silently die.

### 5c. OAuth client credentials
1. **APIs & Services → Credentials → Create credentials → OAuth client ID** → type **Web application**.
2. Add an authorized redirect URI (e.g. `https://developers.google.com/oauthplayground` for step 5d).
3. Copy the **Client ID** and **Client secret**.

### 5d. Get a refresh token (one-time)
1. Open **developers.google.com/oauthplayground**.
2. Gear icon (⚙) → tick **Use your own OAuth credentials** → paste Client ID + Secret.
3. Left panel → scope: **`https://www.googleapis.com/auth/calendar`** → **Authorize APIs** →
   sign in with the Google account that owns the calendar → allow.
4. **Exchange authorization code for tokens** → copy the **Refresh token**.

### 5e. Set the secrets in Supabase
Add these Edge Function secrets:
- **`GOOGLE_OAUTH_CLIENT_ID`** = your client id
- **`GOOGLE_OAUTH_CLIENT_SECRET`** = your client secret
- **`GOOGLE_OAUTH_REFRESH_TOKEN`** = the refresh token from 5d
- **`GOOGLE_CALENDAR_ID`** = the calendar's id (your gmail address for the primary calendar, or the
  Calendar's "Integrate calendar → Calendar ID" value)

---

## 6. Sign-in redirect URLs (Supabase Auth)

So Google / magic-link sign-in returns to the app correctly:
- Supabase → **Authentication → URL Configuration → Redirect URLs**, add:
  - `http://localhost:58935/**` (local dev)
  - `https://yourdomain.com/**` (production)

---

## 7. Verify

In **Settings → Integration status**, the app checks that Stripe and Google credentials work.
Both should show **Connected**. Then do one real test booking end-to-end:
`/book` → pick a service → pick a slot → pay (card) or request (cash) → confirm it appears in
`/bookings` and (for paid/approved) on your Google Calendar.

---

## Where each secret lives (summary)

| Secret | Set in | Used by |
|---|---|---|
| `STRIPE_SECRET_KEY` | Supabase Edge Function secrets | start-card-booking, create-payment-intent, stripe-webhook |
| `STRIPE_WEBHOOK_SECRET` | Supabase secrets | stripe-webhook (signature check) |
| Stripe publishable key | `booking-checkout.component.ts` `STRIPE_PK` | the card form in the browser |
| `GOOGLE_OAUTH_CLIENT_ID/SECRET/REFRESH_TOKEN` | Supabase secrets | _shared/google-calendar.ts |
| `GOOGLE_CALENDAR_ID` | Supabase secrets | which calendar to read/write |
