# Project Handover — Venture Map + JM Booking

> A complete catch-up doc for picking this repo up on a fresh machine. It consolidates everything
> that normally lives in the AI assistant's local memory (which does **not** travel between
> computers). Pair this with **`CLAUDE.md`** (the living project guide, also in the repo) and the
> files in **`documentation/`**. Last meaningful update: 2026-06-15.

---

## 0. TL;DR — what this is

This single Angular 19 repo contains **two apps in one codebase**:

1. **Venture Map (Malta)** — a public travel/exploration map site (locations, deals, groups, etc.).
   Hosted on **GitHub Pages** at **johnfabiomb.com**, served from the `docs/` folder. Backed by its
   own Supabase project (the "map" Supabase). This is the original, mature app.
2. **JM Booking** — a **multi-tenant SaaS booking platform** (Calendly-style) for a video/photo
   business: clients book shoots, pay online or in person, the owner manages jobs, payments and a
   production pipeline. Lives under `src/app/booking/`, backed by a **separate Supabase project
   ("jm-bookings")**. This is the actively-developed area and most of this doc is about it.

The two apps share the same Angular shell and build but are otherwise independent (separate Supabase
projects, separate routes, separate styles). **When working on bookings, only touch
`src/app/booking/` and `supabase/` — never the map.**

---

## 1. Getting set up on a new machine

```bash
# Node 22.x, Angular CLI 19.2.x
npm install --legacy-peer-deps      # ALWAYS use --legacy-peer-deps (peer-dep conflicts are expected;
                                    # never edit package.json versions to "fix" them)
npm start                           # ng serve → http://localhost:4200
```

**Build configs** (output goes into `docs/`, which is what GitHub Pages serves):

| Command | Config | Output | Base href | Notes |
|---|---|---|---|---|
| `ng build` | staging (default) | `docs/test/` | `/test/` | noindex, source maps, staging flags |
| `ng build --configuration production` | production | `docs/` | `/` | optimized, production flags |
| `npm run deploy` | bumps version + builds prod + staging | `docs/` | | full release build |

Deploy = build, commit the `docs/` changes, push to `main` (GitHub Pages serves `docs/` directly).
**There is no CI.** See `documentation/DEPLOYMENT.md`.

---

## 2. Accounts, secrets & external services (IMPORTANT)

Nothing secret is committed. To operate the booking backend you need access to:

- **Supabase "jm-bookings" project** — ref **`odmwjhysvvbhxytyefhv`**
  (dashboard: `https://supabase.com/dashboard/project/odmwjhysvvbhxytyefhv`).
  - Used for the booking DB, RLS, Edge Functions, Auth.
  - To run SQL or deploy functions from the CLI you need a **Supabase personal access token**
    (`supabase login`, or set `SUPABASE_ACCESS_TOKEN`). Generate a fresh one in the Supabase
    dashboard → Account → Access Tokens.
  - ⚠️ **SECURITY TODO:** a personal access token (`sbp_…`) was pasted into AI chat during
    development. **Rotate/revoke it** in the Supabase dashboard if you haven't already.
- **Stripe** — **LIVE keys are in use.** The publishable key is in the book page; `STRIPE_SECRET_KEY`
  and `STRIPE_WEBHOOK_SECRET` are Edge Function secrets. Real charges = real money. Switch to test
  keys for testing if needed.
- **Google Calendar** — one calendar (the owner's), accessed server-side via a single OAuth refresh
  token in Edge Function secrets (`GOOGLE_OAUTH_CLIENT_ID/SECRET/REFRESH_TOKEN`, `GOOGLE_CALENDAR_ID`).
  The Google OAuth consent screen is **published to production** (so the refresh token doesn't expire
  after 7 days). Do not un-publish it.
- **The map Supabase project** is separate again — see the map's config files. Not needed for bookings.

The one-time external setup (Stripe keys/webhook, Google OAuth, Supabase auth redirect URLs) is
documented step-by-step in **`documentation/BOOKING_SETUP.md`**.

### Secrets inventory — *where each secret lives, not the values*

> **No secret values are stored here.** Keep the actual values in a password manager / secure note,
> never in the repo. This table is just a checklist for restoring access from the dashboards.

**Non-secret identifiers (safe to keep here):**

| Thing | Value |
|---|---|
| Supabase (jm-bookings) project ref | `odmwjhysvvbhxytyefhv` |
| Supabase dashboard | `https://supabase.com/dashboard/project/odmwjhysvvbhxytyefhv` |
| Org `johnfabiomb` id | `14f2d5fd-e526-4d83-93f4-a450a5c372ff` |
| Owner auth uid (John) | `4594a5c1-ad28-40e3-a166-0d641544b3cc` |
| Staff "John Montaño" id | `e5db32e3-ce28-4a14-8d5c-ef061e0133cb` |
| Service "Drone Pilot Filming" id | `4325a296-cb8e-40ae-aaf8-1d4928b0a7bc` |
| Service "Camera Filming" id | `2646535d-860f-4b66-83e7-39b9e3102481` |
| Live site / repo output | `https://johnfabiomb.com` (GitHub Pages, from `docs/`) |

**Secret values (DO NOT store here — fetch from the source each time):**

| Secret | Where to get / set it |
|---|---|
| Supabase personal access token (`sbp_…`) — CLI / Management API | Supabase → Account → **Access Tokens** (create fresh; **rotate the old one that was in AI chat**) |
| Supabase service-role key | Supabase → Project Settings → **API** (server-only, never client) |
| Supabase DB password | Supabase → Project Settings → **Database** |
| `STRIPE_SECRET_KEY` (**LIVE**) | Stripe Dashboard → Developers → **API keys**; set in Supabase → Edge Functions → **Secrets** |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → **Webhooks** (signing secret); Supabase Edge Function Secrets |
| `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET` | Google Cloud Console → APIs & Services → **Credentials**; Supabase Edge Function Secrets |
| `GOOGLE_OAUTH_REFRESH_TOKEN` | Minted via OAuth Playground (see `BOOKING_SETUP.md`); Supabase Edge Function Secrets. Keep the OAuth app **published** or it expires in 7 days |
| `GOOGLE_CALENDAR_ID` | Google Calendar → calendar settings; Supabase Edge Function Secrets |
| `APP_BASE_URL` | *Not secret* — the site origin (e.g. `https://johnfabiomb.com`); Supabase Edge Function Secrets. Used for Stripe Connect onboarding return/refresh URLs |
| Stripe **publishable** key (`pk_live_…`) | *Not secret* — already in the app source (`book-page.component.ts`). Safe to expose by design |

---

## 3. Repo layout (the parts that matter)

```
src/app/
  app.routes.ts                 # combines map + booking route files
  map/                          # ── the Venture Map app (see CLAUDE.md "Key Files") ──
    map.routes.ts, feature-flags.ts, core/, features/, pages/, ui/ …
  booking/                      # ── the JM Booking app ──
    booking.routes.ts           # all /book/* (public) + /bookings/* (admin) routes
    booking.styles.scss         # booking design tokens (SCSS @use)
    core/
      db/supabase.bookings.ts    # jm-bookings Supabase client (swapped per-env in angular.json)
      services/                  # booking-data, booking-admin, bookings-auth, availability, org, client-portal…
      interfaces/                # booking.interface.ts (BookingSummary, Payment, EditableBooking…), org.interface.ts
      guards/, utils/
    auth/login/                  # /bookings/login
    platform/                    # everything behind the admin auth gate
      platform-shell/            # sidebar + <router-outlet>; mounts <app-toast-host> ONCE
      dashboard/                 # /bookings/dashboard  (default landing)
      bookings/booking-list/     # /bookings/list  (table)
      bookings/booking-form/     # /bookings/new  AND  /bookings/:id/edit
      bookings/booking-detail/   # /bookings/:id  (payments ledger + record payment)
      clients/, services/, staff/, settings/, work/   # admin sections
      admin.shared.scss          # shared admin page/btn/field/card styles
    public/                      # customer-facing, not behind login
      service-picker/, booking-calendar/, booking-checkout/, my-bookings/, book-page/, payment-success/
    ui/                          # shared dumb components
      toast/                     # ToastService (root) + ToastHostComponent  ← app-wide notifications
      booking-invoice/, slot-picker/, …
supabase/
  bookings-schema.sql            # ★ SINGLE SOURCE OF TRUTH for the jm-bookings DB schema
  schema.sql                     # the MAP app's schema — DO NOT touch for bookings
  functions/                     # Edge Functions (Deno) — see §6
documentation/                   # CHANGELOG, DEPLOYMENT, BOOKING_SETUP, MULTI_TENANT_ROADMAP, …
CLAUDE.md                        # living project guide (read this — it's the canonical conventions doc)
```

**Path aliases:** `@booking/core/*`, `@booking/platform/*`, `@booking/public/*`, `@booking/ui/*`, `@booking/auth/*`.

---

## 4. JM Booking — architecture (multi-tenant from day one)

Built so a second organization can be added later **without leaking data between orgs** and without
rework. Today there is exactly **one org (`johnfabiomb`) and one worker (John)**, but the structure
is fully multi-tenant.

### Data model (all in `supabase/bookings-schema.sql`)

```
organizations ──< org_members (role: owner|admin|staff)
              └─< platform_admins (super-admin)
organizations ──< staff (a bookable worker; ONE shared calendar each)
                    └─< staff_services (M2M, per-pairing working_hours jsonb)
organizations ──< services (pricing jsonb {tiers, extra_hour_price}, min/max_hours, task_template)
organizations ──< clients (may be linked to an auth user via clients.user_id)
organizations ──< bookings ──< payments        (a booking has MANY payments)
                          └─< booking_links     (tokenised /book/:token pay links)
organizations ──< tasks (production checklist, linked to a booking)
```

Key invariants (these are the "don't break me" rules):

- **Double-booking is prevented in the DB**, never in app code: a `btree_gist` `EXCLUDE` constraint
  on `bookings` partitioned by **`staff_id`** + time range, where `status IN (hold,booked,in_progress,done)`.
  A losing concurrent insert/update fails with SQLSTATE **`23P01`** → catch it and say "slot taken".
  Services on the same worker share that worker's calendar; different workers may overlap.
- **`booking_ref`** is unique per-org (e.g. `BK-2026-001`), set by a trigger.
- **RLS is org-scoped** via SECURITY-DEFINER helpers: `is_org_admin(org)`, `is_org_member(org)`,
  `current_staff_id(org)`, `current_client_id(org)`, `is_platform_admin()`. A user in org A can never
  read org B's rows.
- **`booking_summary` view** (admin-only) is the read model for the admin UI. It computes
  `total_paid = SUM(payments.amount WHERE status='completed')` and derives `payment_status`
  (`paid` / `partial` / `unpaid` / `external`). The admin app reads this, not the raw tables.
- **Config lives per org/staff/service**, never in a new global singleton (working hours →
  `staff_services.working_hours`; prices → `services.pricing`; deposit %, hold/lead → `organizations.booking_params`).

### Booking statuses

`draft · pending · hold · booked · in_progress · done · cancelled · expired`.
Slot-blocking ones: `hold, booked, in_progress, done`. `pending` (cash request) and `hold`
(15-min card checkout) are temporary. Production pipeline (`bookings.production_status`):
`to_edit → editing → to_deliver → delivered`.

### Deposit policy (org default + per-booking override)

Two layers: the **org default** lives in `organizations.booking_params` (`deposit_percent` = how big, `deposit_allowed` = may a deposit be paid at all, or full only), and a **per-booking override** lives on `bookings.deposit_percent` / `bookings.deposit_allowed` (nullable; NULL ⇒ inherit, legacy rows fall back to 30%/allowed). The New/Edit form prefills from the org default and saves the chosen value **explicitly** on the booking, so changing the org default never alters an existing link. `create-payment-intent` (link) and `start-card-booking` (self-serve) compute the deposit from this and **reject a deposit when it isn't allowed**; `book-page` + the self-serve checkout show the right % or hide the deposit option. (Applied live + deployed 2026-06-15.)

### Invoicing

Org invoicing identity lives in `organizations.invoice_details` (JSONB: legal_name, address, phone, email, vat_number, vat_registered, vat_rate, invoice_prefix, invoice_footer), edited in **Settings → Company & Invoicing** (the Settings page is tabbed). The printable invoice is a standalone route **`/book/invoice/:id`** (A4 + print-to-PDF). Its data comes ONLY from the **`get_invoice(booking)` SECURITY DEFINER RPC**, which authorizes **org admin OR the booking's own client** and returns invoice-safe fields only — the leak-proof boundary (a client can't read `organizations` via RLS, and must not see `price_revenue`/other rows). **Invoice number = booking_ref with the prefix swapped** (`BK-2026-007` → `INV-2026-007`). VAT: registered → net/VAT/gross from a VAT-inclusive total; not registered → "Article 11" note. `price_expenses` is a **client-facing** billing line ("Travel & expenses"), not a hidden cost — safe to show. Clients self-edit billing details on `/book/mine` (`ClientPortalService.upsertProfile`). **Editable invoices:** invoices are derived live from the booking by default; editing one (admin → booking detail → **Edit invoice**, route `/bookings/invoice-edit/:id`) persists line items / notes / issue date to the **`invoices`** table (1:1 with the booking, admin-RLS) **without touching the booking/calendar/work board**. `get_invoice` returns the override if present, else derived items. "Reset to booking" deletes the override. **Invoices module** (sidebar) lists confirmed bookings as invoices with a year filter + CSV export. Invoice numbers are per-org (`{prefix}-{year}-{seq}` from the booking ref) — legally only need to be unique per org; the row UUID is the global key. Access control: `/bookings/*` stays behind `adminGuard` (org owner/admin); the invoice route relies on the RPC, not a guard.

### Payments & deposits (no special "deposit" table)

A **deposit is just a `payments` row** whose sum doesn't yet cover `price_total`:

- `payments`: `amount`, `type` (`deposit|full`, cosmetic), `status` (`pending→completed`, or `refunded`),
  `method` (`card|cash|revolut|bank|other`), `note` (free label), `stripe_payment_intent_id`, `paid_at`.
- `total_paid` = SUM of **completed** payments. `payment_status`: `partial` = "deposit / partially paid"
  (some paid, < total); `paid` = total reached.
- Card 30% deposit % comes from `organizations.booking_params.deposit_percent`.
- A **refund** sets the payment's `status='refunded'` (it stops counting in `total_paid`); it is **not** deleted.
- All earnings figures (Collected, Outstanding, the 6-month chart, dashboard cards) aggregate
  `total_paid`, so installments roll up correctly. Outstanding is clamped at ≥ 0.

### Seeded live IDs (org `johnfabiomb`)

- Org: `14f2d5fd-e526-4d83-93f4-a450a5c372ff`
- John (auth uid, owner/worker/platform_admin): `4594a5c1-ad28-40e3-a166-0d641544b3cc`
- Staff "John Montaño": `e5db32e3-ce28-4a14-8d5c-ef061e0133cb`
- Service "Drone Pilot Filming": `4325a296-cb8e-40ae-aaf8-1d4928b0a7bc` (08–18; 1h€100/2h€190/3h€270/4h€350, +€80/extra hr; min1 max8)
- Service "Camera Filming": `2646535d-860f-4b66-83e7-39b9e3102481` (24h; €80/hr; min1 max12)

---

## 5. JM Booking — routes & user flows

### Admin (behind login, under the platform shell at `/bookings`)

| Route | Page |
|---|---|
| `/bookings/login` | Google OAuth + magic link |
| `/bookings/dashboard` | **Default landing.** KPIs, 6-month "Collected" chart, upcoming, "Needs your attention" (approve/decline) |
| `/bookings/list` | Bookings table. Ref + kebab open the detail page. Payment column shows paid/total |
| `/bookings/new` | Create a booking (pick/create client → service → worker → time/hours → auto-price; or a "Custom" service with manual price). Returns a `/book/:token` pay link |
| `/bookings/:id/edit` | Edit a booking in place (same component as /new) |
| `/bookings/:id` | **Detail page**: Total/Paid/Balance, the payment ledger, and a "Record a payment" form (cash/Revolut/bank/card/other). **This route must stay LAST in `booking.routes.ts`** (`:id` is single-segment and would shadow the literal routes otherwise) |
| `/bookings/work` | Production kanban (feature-flagged `organizations.features.work_board`) — drag jobs through stages, per-job task checklists |
| `/bookings/clients` · `/services` · `/staff` · `/settings` | Admin CRUD; Settings also has live integration status |

Row kebab actions: **View details & payments · Record payment… · Edit booking · Cancel booking**.
("Record payment…" jumps to the detail page form. The booking total is edited in the Edit form.)

### Customer (public)

`/book` (pick service) → `/book/calendar?service=&staff=` (pick a time range) → `/book/checkout`
(sign in + pay) ; `/book/mine` (client's own bookings) ; **`/book/:token`** (the pay link the admin
sends — shows job + lets the client pay by card, or "Pay later — cash/Revolut/bank"). `/pay/success`.

### The pay-later / cash logic (subtle — get it right)

Per-booking flags `bookings.allow_card` + `bookings.allow_inperson` (set in the New/Edit form's
"Payment options": *both* / *card only* / *pay later only*). On `/book/:token`:

- **Card payment** → confirms the booking + creates the calendar event automatically (via `stripe-webhook`).
- **"Pay later" when BOTH options are offered** → raises a **pending cash request**; it shows in the
  admin's "Requests to approve"; the calendar event is created only when the **admin approves**
  (`approve-cash-booking`). Nothing on the calendar before that.
- **"Pay later" when it's the ONLY option** → the client's click **confirms directly** (terms-acceptance:
  "I agree to pay €X by cash/Revolut/bank") and creates the calendar event immediately.

---

## 6. Edge Functions (Deno, in `supabase/functions/`, deployed to ref `odmwjhysvvbhxytyefhv`)

All current functions are **deployed and ACTIVE**. Deploy with `supabase functions deploy <name>`
(add `--no-verify-jwt` for public/token/Stripe-called ones). Shared code in `_shared/` is bundled
into each function that imports it, so redeploy a function after changing shared code.

| Function | JWT | Purpose |
|---|---|---|
| `get-org-booking` | public | org + active services + bookable workers per service |
| `get-availability` | public | free start-times for a worker+service (working hours − busy ranges) |
| `start-card-booking` | jwt | self-serve: create a 15-min `hold` + Stripe PaymentIntent |
| `create-payment-intent` | public | PaymentIntent for a `/book/:token` link (rejects card if `allow_card=false`) |
| `stripe-webhook` | `--no-verify-jwt` | on payment success: mark paid, confirm (`hold|pending → booked`), create/refresh calendar event |
| `accept-inperson` | `--no-verify-jwt` | "Pay later" click: confirm directly (pay-later-only) OR demote to `pending` request (both offered) |
| `approve-cash-booking` | jwt | admin approves a pending cash request → `booked` + calendar event |
| `cancel-booking` | jwt | admin cancel: refund **card** payments via Stripe, remove calendar event, set `cancelled` |
| `sync-booking-event` | jwt | admin-only: refresh a booking's calendar event description from current DB state |
| `check-availability` | public | for `/book/:token`: payment status + live Google free/busy check |
| `check-integrations` | jwt | Settings page: verify Stripe + Google creds actually work |
| `sync-calendar` | jwt | "Sync Calendar" button: push unsynced bookings / pull external events |
| `connect-stripe-start` | jwt | Org admin starts/resumes **Stripe Connect** (Standard) onboarding for their org → mints the connected account (once), stores `stripe_account_id`, returns the hosted onboarding URL |
| `connect-stripe-status` | jwt | Org admin reads Connect status; re-checks Stripe + caches `stripe_charges_enabled`/`stripe_details_submitted` on the org |
| `create-booking` | (legacy) | OLD single-tenant manual create — **fully unused now**, has a hardcoded owner email. Safe to delete |

### Stripe Connect (per-org payouts) — how charges are routed

Each org connects its **own Standard** Stripe account in **Settings → Payments**. Charges are then created as **direct charges on that connected account** (`{ stripeAccount }`) with an optional platform fee (`organizations.application_fee_bps`, basis points). The decision is centralized in **`supabase/functions/_shared/stripe.ts`** (`resolveOrgStripe(orgId)` + `chargeRouting(org, amountCents)`) — used by `start-card-booking`, `create-payment-intent`, and `cancel-booking` (refunds must target the connected account too). The public checkout + `/book/:token` page init **Stripe.js with `{ stripeAccount }`** (the account id is returned in the intent response).

- **Fallback:** `organizations.stripe_account_id IS NULL` ⇒ charge on the **platform account** directly (the original single-account behaviour). The seed org keeps working; Connect is purely additive.
- **Guard:** an org with a connected account that hasn't finished onboarding (`stripe_charges_enabled = false`) is **rejected** before charging — never silently billed on the platform account.
- **The platform secret key never leaves the Edge Function env** — the DB only stores the connected *account id* + onboarding flags; the frontend only ever sees the publishable key + the connected account id.
- **SECURITY (critical):** the `stripe_account_id` / `stripe_charges_enabled` / `stripe_details_submitted` / `application_fee_bps` columns are writable **only by `service_role`** (the Edge Functions). `authenticated` (org admins) has column-level UPDATE on `name, timezone, currency, booking_params, features` only — so a compromised admin JWT can't redirect payouts or bypass onboarding. See `bookings-schema.sql` §14a.
- **Dashboard prerequisite:** Stripe **Connect must be enabled** on the platform account, and the `stripe-webhook` endpoint must be set to **also receive connected-account events** (`payment_intent.succeeded`) — direct-charge events fire on the connected account. New Edge Function secret **`APP_BASE_URL`** (the site origin, e.g. `https://johnfabiomb.com`) supplies the onboarding return/refresh URLs.

### Calendar events — one centralized path

`_shared/booking-event.ts → ensureBookingEvent(serviceClient, bookingId)` is the **single** place that
creates-or-updates a booking's Google Calendar event. The event **description** is a live overview:
`Client / Service / Total / Payment (Paid in full · Deposit paid €X, balance €Y · Awaiting payment) /
Progress (To edit→…→Delivered)`. It's called by `stripe-webhook`, `approve-cash-booking`,
`accept-inperson`, and `sync-booking-event` (which the frontend calls after recording a payment,
editing the amount, or moving a production stage). **Never build event descriptions ad hoc — always
route through `ensureBookingEvent`.** Deletion goes through `cancel-booking → deleteCalendarEvent`
(which only clears the stored `google_event_id` once the delete is confirmed, so failures don't orphan events).

---

## 7. Conventions & gotchas (things that have bitten us)

- **Schema source of truth** = `supabase/bookings-schema.sql`. Old `supabase/migrations/*` and a former
  `core/db/schema.sql` were deleted. Apply schema/column changes to the live DB **and** update this
  file (they must never diverge). DB changes this session were applied via the Supabase Management API
  (`POST /v1/projects/{ref}/database/query`).
- **`ALTER TYPE … ADD VALUE`** (enum) must be committed before the new value is used — run it as its own statement.
- **Supabase auth deadlock:** never `await` a Supabase query *inside* `onAuthStateChange` — defer with
  `setTimeout(0)` or the client deadlocks. (Bit us as "stuck on loading".)
- **Angular new control flow:** `@else if (x; as y)` is **not allowed** (NG5002 "as only on primary @if").
  Nest an `@if (x; as y)` inside the `@else {}` block instead.
- **CDK overlay** structural CSS is already loaded globally (Material dialogs are used in the map app),
  so `@angular/cdk/menu` (the kebab) and overlays position correctly with no extra import.
- **Toasts:** for any new admin action call `toast.success/error/info` from `@booking/ui/toast` — do
  **not** use `alert()` or add markup. The host is mounted once in `platform-shell`.
- **Forward-compatibility (F1–F10)** for ALL booking work, so the eventual multi-org migration stays
  additive — carry `org_id` (+`staff_id`/`service_id`) on new booking rows; no new global config
  singletons; keep availability DB-driven; keep concurrency in the DB `EXCLUDE` constraint; scope new
  RPCs/functions by org; no hardcoded identities (owner email, keys, BASE_URL). Full list in
  **`documentation/MULTI_TENANT_ROADMAP.md`**.
- **Feature flags** (`src/app/map/feature-flags*.ts`, swapped at build time): `PROMOTIONS`, `ROUTE_BUILDER`,
  `GROUPS`. Booking's work board is gated by `organizations.features.work_board` (per-org, in the DB).

---

## 8. Current state — done / deferred / test data

**Done & live:** full multi-tenant DB; all admin pages (dashboard, list, create/edit, detail w/
payments, work board, clients, services, staff, settings); customer book flow; card + cash/in-person
payments; multiple payments per booking; calendar sync with live descriptions; cancel/refund;
toasts; per-link payment options. Build is green (81 prerendered routes for the map).

**Deferred (not blocking):**
- Transactional emails (spec'd in `documentation/BOOKING_EMAILS.md`, not built — highest-impact gap).
- Stripe **Connect** (per-org payouts) — **code built; schema §14 + Edge Functions + `APP_BASE_URL` secret all DEPLOYED to the live project** (2026-06-15). Done: stripe columns added & org UPDATE locked to safe columns (verified live); 5 functions deployed via Supabase CLI preserving `verify_jwt` (`create-payment-intent` stays public; `connect-stripe-*`/`start-card-booking`/`cancel-booking` gated); `APP_BASE_URL=https://johnfabiomb.com` set. **Remaining (manual, can't be scripted):** (1) **deploy the FRONTEND** — the Settings "Connect Stripe" card + Stripe.js `{stripeAccount}` changes are in source but NOT built/pushed to GitHub Pages (`docs/`); (2) Stripe Dashboard → **Connect → Get started**; (3) set the `stripe-webhook` endpoint to also receive **connected-account** `payment_intent.succeeded`; (4) Settings → Payments → **Connect Stripe** → finish onboarding. Until an org connects, it charges on the platform account (fallback). Per-org **publishable** key + Stripe Connect application-fee tuning are still single-platform.
- Per-worker Google Calendars (currently one shared owner calendar).
- Org sign-up / slug-based public routing `/{org-slug}/book` / staff (non-admin) login.
- `MyCalendar` / `working-hours-editor` components are orphaned (compile, unused) — can be removed.

**Test data in the live DB (delete when ready):**
- `BK-2026-001` (Marco Vella, Drone) and `BK-2026-002` (Sea Life Cruises, Camera) — early tests.
  **Only BK-2026-002 is on the Google Calendar.**
- `BK-2026-003` ("hbjhj") — junk test row.
- `BK-2026-004/005/006` + client **"TEST Client (delete me)"** — created to demo the new flows; **none on the calendar**.
- To remove cleanly: cancel anything that IS on the calendar via the UI **Cancel** action first (so the
  Google event is removed), then the rows can be deleted. Rows with no calendar event can be deleted directly.

---

## 9. Working agreements (the human's rules)

- **Never `git commit` / `git add` / `git push`** without being explicitly asked. When work is ready,
  provide a suggested commit message and stop — John commits himself.
- Commit message format: `[TFE-XXXX] type: short title` + a module/area bullet breakdown
  (`feat|fix|refactor|chore|docs|test`).
- **Never merge a PR** unless told "merge it" in that specific message. PRs may be created with `gh`.
- **Never create a `CLAUDE.md` inside the repo** (project rules live in the existing root `CLAUDE.md`;
  global rules live in the user's `~/.claude/CLAUDE.md`).
- Keep the **living docs** in sync before reporting work done: root `CLAUDE.md`,
  `documentation/CHANGELOG.md` (update before every commit), `ADDING_LOCATIONS.md`, `DEPLOYMENT.md`.

---

## 10. Where to read more

- **`CLAUDE.md`** (root) — canonical conventions, design tokens, page patterns, SEO/prerender rules, Key Files table.
- **`documentation/CHANGELOG.md`** — chronological record of every change (most recent at top under "Unreleased").
- **`documentation/MULTI_TENANT_ROADMAP.md`** — booking architecture + F1–F10 forward-compat principles + phased plan.
- **`documentation/BOOKING_SETUP.md`** — one-time external setup (Stripe, Google, Supabase auth).
- **`documentation/BOOKING_EMAILS.md`** — the (not-yet-built) email/notification spec.
- **`documentation/DEPLOYMENT.md`** / **`deploy-staging-from-branch.md`** — build & deploy.
- **`supabase/bookings-schema.sql`** — the authoritative booking DB schema.
