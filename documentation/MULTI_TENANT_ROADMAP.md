# Multi-Tenant Booking Platform — Architecture & Roadmap

> **Status:** **Being built now, multi-tenant from day one.** Rather than ship a single-tenant
> version and migrate later, the schema is built multi-tenant immediately with **`johnfabiomb`** as
> the first organization — so adding a second org later "just works" with full data isolation and
> no info leaking between tenants. This document is the architecture + the forward-compatibility
> principles. The complete schema lives in **one file: `supabase/schema.sql`** (the single source
> of truth that replaces the scattered migrations).

## First rollout — organization `johnfabiomb`

The initial tenant is seeded directly:

- **Organization:** `johnfabiomb` ("John F. Montaño"), timezone `Europe/Malta`, currency `EUR`.
- **Members:** John = `owner` (and `platform_admin`).
- **Worker (staff):** **John Montaño** — the only worker for now. He owns **one shared calendar**.
- **Services** (each: fixed duration + price, with its own bookable window per worker):
  - **Drone Pilot Filming** — daytime only (e.g. 08:00–18:00).
  - **Camera Filming** — available 24h.
  - *(Prices are seeded as placeholders — set the real ones.)*

**Key behaviour — shared calendar across services.** Because both services are performed by the
**same worker**, a booking for *either* service blocks that time for *both* — "if the slot is used,
it's used, no matter the service." This falls out naturally from the no-overlap constraint being
partitioned by **`staff_id`** (the worker), not by service. Two *different* workers could be booked
at the same time; the same worker never can.

**Per-(worker, service) schedules.** A service's bookable window can differ per worker, so the
schedule lives on **`staff_services.working_hours`** (John+Drone = daytime; John+Camera = 24h).
Availability for a chosen *service + worker* = that pairing's `working_hours` **minus** all of the
worker's bookings (any service). Customer flow puts **service selection before the calendar**.


## Why this exists

The goal is to evolve the booking system into a **multi-tenant SaaS platform**:

- **Companies (organizations)** sign up.
- Each company adds **services** (fixed duration + price) and **workers** (staff), and assigns
  workers to services.
- A **worker has ONE calendar** — a worker can't do two things at once, even across services, so
  double-booking is prevented **per worker**.
- All data (clients / staff / bookings / services) is **isolated per company**.
- **Staff log in** (a `staff` role) to manage their own schedule and see their own bookings; a
  company **owner/admin** manages the org; a **platform super-admin** oversees all orgs.
- Customer flow: choose company → choose service → choose worker → see availability → book + pay.
- **Per-worker Google Calendar is deferred** (DB-only availability first; add Google-connect-per-worker later).

**Verdict: viable, and the current architecture is well-positioned.** Availability is already
DB-driven (browsing reads `get_busy_ranges`, not Google), and double-booking is guaranteed by a
single Postgres `EXCLUDE` constraint that just needs partitioning by worker. The one genuinely large
workstream is multi-tenant payments (Stripe Connect).

---

## 1. Target data model (additive over today's tables)

### New tenancy tables

| Table | Purpose / key columns |
|---|---|
| `organizations` | Tenant. `id, slug UNIQUE, name, timezone, currency, booking_params jsonb, stripe_account_id, status` |
| `org_members` | Replaces global `user_roles`. `(org_id, user_id, role owner\|admin\|staff)`, PK `(org_id,user_id)` |
| `platform_admins` | Super-admin. `user_id PK` |
| `staff` | A bookable worker (ONE calendar). `id, org_id, user_id?, name, email, is_bookable, working_hours jsonb`. `UNIQUE (org_id, user_id)` |
| `services` | Fixed duration + price. `id, org_id, name, duration_min, price, currency?, is_active` |
| `staff_services` | M2M. `(staff_id, service_id)` PK; enforce same org via trigger/composite FK |

### Augment existing tables (never drop columns)

- `clients` → add `org_id`; change unique to `(org_id, user_id)` (a user can be a client in many orgs).
- `bookings` → add `org_id NOT NULL`, `staff_id NOT NULL` (the worker), `service_id` (nullable for external/synced events).
- `payments` → add `org_id` (denormalized for RLS performance), `stripe_account_id`.
- `booking_links` → add `org_id` (denormalized).

### Retire global config singletons

`admin_settings` (one global key/value row per setting) is **legacy for booking config**. Config moves
to where it belongs:

- Working hours → `staff.working_hours` (per worker).
- Duration + price → `services.duration_min` / `services.price` (per service).
- Booking params (hold/lead/buffer/deposit/cash/timezone) → `organizations.booking_params` + `organizations.timezone`/`currency`.

`booking_ref` becomes **per-org unique** (`UNIQUE (org_id, booking_ref)`; namespace the sequence by org).

---

## 2. Worker-partitioned concurrency (the heart of the migration)

Replace the global no-overlap guard with a worker-partitioned one:

```sql
-- OLD (today): global — blocks ALL overlaps across the whole system
EXCLUDE USING gist (tstzrange(start_at, end_at, '[)') WITH &&)
  WHERE (status IN ('hold','booked','in_progress','done'))

-- NEW: partitioned by worker — a worker can't do two things at once,
-- but different workers may be booked at the same time.
ALTER TABLE bookings ADD CONSTRAINT bookings_no_overlap
  EXCLUDE USING gist (staff_id WITH =, tstzrange(start_at, end_at, '[)') WITH &&)
  WHERE (status IN ('hold','booked','in_progress','done'));
```

`btree_gist` is already installed. The org dimension is implied by `staff_id` (a worker belongs to
exactly one org). **The constraint stays the single source of truth** for double-booking — app code
keeps treating SQLSTATE `23P01` as `slot_taken`.

- `get_busy_ranges(p_staff_id, range_start, range_end)` — per worker (keeps the lazy-expired-hold logic).
- `get-availability({org, service, staff, from, to})` — reads the worker's `working_hours`, sizes slots
  by `service.duration_min`. Preserve the DST `zonedWallClockToUtc` logic verbatim.

---

## 3. RLS isolation strategy

Membership helpers (SECURITY DEFINER, avoid recursion):
`current_org_ids()`, `is_org_member(org)`, `is_org_admin(org)`, `is_platform_admin()`,
`current_staff_id(org)`, and an org-scoped `current_client_id(org)`.

Every tenant table gets layered permissive policies anchored on `org_id` via membership:

- **Org admin/owner**: full DML over their org (`is_org_admin(org_id)`).
- **Staff**: SELECT only their own bookings (`staff_id = current_staff_id(org_id)`).
- **Client**: read own + INSERT only `pending`/`hold` for self (never self-promote to `booked`).
- **Anon (public booking page)**: SELECT only *active* services / *bookable* staff / safe public org
  fields — ideally via a `SECURITY DEFINER get_public_org(slug)` / view, not raw table SELECT.
- **Platform admin**: `is_platform_admin()`.

**Cross-org guarantee:** every policy predicate is anchored on `org_id` through membership. A user in
org A has `current_org_ids() = {A}`; any row with `org_id = B` fails every `USING` clause. There is no
global-role access except `is_platform_admin()`.

---

## 4. Auth & roles

- Retire global `user_roles` / `is_admin()`; use `org_members` (owner|admin|staff) + `platform_admins`.
- The same `auth.users.id` can be **staff in org X, admin in org Y, client in org Z** — all keyed by
  `org_id` (the `UNIQUE (org_id, user_id)` constraints on `staff`/`clients` allow exactly this).
- Frontend `BookingsAuthService` evolves from binary `admin|no-access` to an **org-context model**:
  after login, fetch `org_members` → `[{ org, role }]`; active org from URL slug or a switcher.
  `adminGuard` → `orgRoleGuard(org, ['owner','admin'])`; add `staffGuard`.
- **Remove hardcoded owner-email checks** in `create-booking` / `sync-calendar`.

---

## 5. Payments under multi-tenancy — Stripe Connect (MAJOR workstream)

Highest-risk, highest-effort phase. Money must land in **each company's** Stripe account, not a single
platform pool.

- `organizations.stripe_account_id` (Connect account); platform takes an application fee.
- `start-card-booking`: PaymentIntent on the connected account; price from `services.price`, deposit
  from `org.booking_params`. Add `org_id/staff_id/service_id` to PaymentIntent metadata.
- `stripe-webhook`: handle Connect events; resolve `org_id` from metadata.
- `create-payment-intent` + frontend: per-org publishable-key handling (`stripe(pk, { stripeAccount })`).
- New onboarding functions (`create-connect-account`, `create-account-link`).
- Abstract behind a `PaymentProvider` boundary so "which Stripe account" is just a parameter.

---

## 6. Per-worker Google Calendar (DEFERRED — Phase 7)

Today: a single owner credential in env (`GOOGLE_OAUTH_*`, `GOOGLE_CALENDAR_ID`) in
`_shared/google-calendar.ts`. Availability is DB-driven, so Google is **not needed** for the MVP
multi-tenant product.

Future: `staff_calendar_credentials(staff_id PK, google_calendar_id, refresh_token_encrypted,
access_token_cache, token_expires_at, status)`; a per-staff "Connect Google" OAuth flow; the shared
helpers take a `staffId` and load that worker's token instead of env. Push is opt-in per worker; DB
availability works without it.

---

## 7. Customer flow & routing

**Public:**
```
/{org-slug}/book                → org landing: list active services
/{org-slug}/book/:serviceId     → list workers (staff_services) who offer it → pick worker
                                → get-availability(org, service, staff) → slot grid
/{org-slug}/book/checkout       → sign-in + upsert client (org-scoped) → pay (card/cash)
/{org-slug}/pay/success
/{org-slug}/book/mine           → customer's bookings within this org
```
Generalizes today's `book` / `book/checkout` / `book/mine` routes by prefixing the org slug and
inserting service→worker selection. The token pay page (`book/:token`) stays, scoped to the org.

**Org admin/owner dashboard:** bookings list, new booking, clients (all org-scoped), **Services CRUD**,
**Staff CRUD + per-worker working hours**, members/roles, Stripe Connect onboarding, org settings.

**Staff dashboard:** "my calendar" = bookings where `staff_id = current_staff_id(org)`, edit own hours.

**Platform super-admin:** org list, suspend/activate, `platform_admins` management.

---

## 8. Phased migration roadmap (each phase independently shippable)

| Phase | What | Notes |
|---|---|---|
| **0** | **Data foundation, zero UX change.** Create tenancy tables; insert a **default org** + **default staff** (current owner); migrate global config into them; add `org_id`/`staff_id`/`service_id` to existing tables (backfill to defaults); **swap the no-overlap constraint to worker-partitioned**; keep `is_admin()` in parallel. | All existing data migrates cleanly; nothing in the UI changes. |
| **1** | **Org-scoped RLS & membership auth** behind the single existing org; replace hardcoded email checks; per-org auth context in the frontend. | |
| **2** | **Services & per-worker availability.** Services/Staff CRUD; per-worker working hours; `get_busy_ranges(staff_id,…)`; public calendar picks service → worker. | |
| **3** | **Multi-org onboarding & per-org public routing** (`/{org-slug}/…`, org sign-up, staff dashboard). | Genuinely multi-tenant for DB-only + cash bookings. |
| **4** | **Payments per org (Stripe Connect).** | MAJOR. |
| **5** | **Platform super-admin & org lifecycle** (suspend/activate enforced in RLS). | |
| **6** | **Decommission single-tenant artifacts** (`admin_settings` config, `is_admin()`, global `get_busy_ranges`, hardcoded BASE_URL; converge the two schema files). | |
| **7** | **Per-worker Google Calendar** (deferred, opt-in). | |

---

## 9. Forward-Compatibility Principles — apply to ALL booking work from now on

These keep the future migration **purely additive**. Follow them immediately, even before Phase 0.

- **F1 — Carry scope on new booking rows.** Any new table/column touching bookings/clients/payments
  includes `org_id`, plus `staff_id`/`service_id` when time-bound.
- **F2 — Never add a new GLOBAL config singleton.** Don't add per-tenant keys to `admin_settings`. New
  config lives on `organizations` / `staff` / `services`. Treat existing `working_hours`/`pricing`/
  `booking_params` singletons as legacy to migrate, not extend.
- **F3 — Keep availability DB-driven.** Browsing reads the DB (`get_busy_ranges`), never live Google.
  Google stays a commit-time check only.
- **F4 — Concurrency lives in the DB constraint, partitioned by worker.** Never move double-booking
  prevention into app code; reason about the `EXCLUDE` guarantee per `staff_id`.
- **F5 — Scope every new RPC/service/function, even if defaulted.** New RPCs and Edge Functions accept
  `org_id` (+`staff_id`/`service_id`) from day one; default to the one org while single-tenant.
- **F6 — Roles are org-scoped.** Don't extend the binary `is_admin()`. Model new permissions as org
  membership roles (`owner|admin|staff`) or `platform_admin`; new guards take an org + required roles.
- **F7 — Abstract payment behind a provider interface.** Wrap Stripe so "which Stripe account" is a
  parameter; never hardcode the single account/keys.
- **F8 — One schema source of truth.** Converge `supabase/bookings-schema.sql` and
  `src/app/booking/core/db/schema.sql`; never land new objects in only one copy.
- **F9 — No hardcoded identities.** Never gate by a literal email (as `create-booking`/`sync-calendar`
  do today) or hardcode `BASE_URL`/publishable keys. Resolve via membership; derive from the request.
- **F10 — Refs/links/metadata carry org context.** New `booking_ref` generation, share links, and
  Stripe metadata include `org_id` (+`staff_id`/`service_id`) so cross-org uniqueness and webhook
  routing work later without rework.

---

## Critical current files (referenced by this roadmap)

- `supabase/bookings-schema.sql` **and** `src/app/booking/core/db/schema.sql` — converge into one (F8).
- `supabase/migrations/2026-06-11_phase0_self_serve_booking.sql` — the no-overlap constraint + global config.
- `supabase/functions/get-availability/index.ts`, `start-card-booking/index.ts`, `stripe-webhook/index.ts`, `_shared/google-calendar.ts`.
- `supabase/functions/create-booking/index.ts`, `sync-calendar/index.ts` — hardcoded owner email (F9).
- `src/app/booking/core/services/bookings-auth.service.ts` — binary admin → org context.
