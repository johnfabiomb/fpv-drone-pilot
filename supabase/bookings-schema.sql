-- ============================================================================
-- JM BOOKINGS — FULL SCHEMA (MULTI-TENANT)  ·  single source of truth
-- ============================================================================
-- This one file builds the entire booking database, multi-tenant from day one,
-- and seeds the first organization (johnfabiomb) with John Montaño as the only
-- worker and two services. It is the single source of truth — all columns are
-- defined inline on their tables (no incremental ALTERs).
--
-- ⚠️  Running the RESET section DROPS every booking table (all data). Review
--     before applying to a live project.
--
-- Tenancy model:
--   organizations → org_members (owner|admin|staff) + platform_admins
--   staff (workers, one shared calendar each) → staff_services (M2M, per-pairing
--   working hours) → services (fixed duration + price)
--   clients / bookings / payments / booking_links all carry org_id.
--   Double-booking is prevented PER WORKER (staff_id) — services on the same
--   worker share the calendar; different workers may overlap.
-- ============================================================================

-- ── 0. RESET (comment out to keep data) ────────────────────────────────────
DROP VIEW  IF EXISTS public.booking_summary CASCADE;
DROP TABLE IF EXISTS public.invoices        CASCADE;
DROP TABLE IF EXISTS public.work_items      CASCADE;
DROP TABLE IF EXISTS public.tasks           CASCADE;
DROP TABLE IF EXISTS public.payments        CASCADE;
DROP TABLE IF EXISTS public.booking_links   CASCADE;
DROP TABLE IF EXISTS public.booking_slots   CASCADE;
DROP TABLE IF EXISTS public.bookings        CASCADE;
DROP TABLE IF EXISTS public.clients         CASCADE;
DROP TABLE IF EXISTS public.staff_services  CASCADE;
DROP TABLE IF EXISTS public.services        CASCADE;
DROP TABLE IF EXISTS public.staff           CASCADE;
DROP TABLE IF EXISTS public.org_members     CASCADE;
DROP TABLE IF EXISTS public.platform_admins CASCADE;
DROP TABLE IF EXISTS public.organizations   CASCADE;


-- ── 1. Extensions & enums ──────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS btree_gist;

DO $$ BEGIN CREATE TYPE booking_status AS ENUM
  ('draft','pending','hold','booked','in_progress','done','cancelled','expired');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE payment_type AS ENUM ('deposit','full');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE payment_status AS ENUM
  ('pending','processing','completed','failed','refunded');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- ── 2. Tenancy tables ──────────────────────────────────────────────────────
CREATE TABLE public.organizations (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT UNIQUE NOT NULL,
  name           TEXT NOT NULL,
  timezone       TEXT NOT NULL DEFAULT 'Europe/Malta',
  currency       TEXT NOT NULL DEFAULT 'EUR',
  booking_params JSONB NOT NULL DEFAULT
    '{"hold_minutes":15,"min_lead_minutes":120,"buffer_minutes":0,"deposit_percent":30,"cash_allowed":true}',
  -- Feature flags (e.g. work_board) and the printable-invoice identity (legal_name,
  -- address, vat_number, vat_rate, invoice_prefix, invoice_footer …) — both per-org JSONB.
  features       JSONB NOT NULL DEFAULT '{}',
  invoice_details JSONB NOT NULL DEFAULT '{}',
  -- Stripe Connect: the org's connected account + onboarding flags + optional platform
  -- fee (basis points). These are payout-critical → service-role-write-only (see §14).
  -- NULL stripe_account_id ⇒ charge on the platform account (single-account fallback).
  stripe_account_id        TEXT,
  stripe_charges_enabled   BOOLEAN NOT NULL DEFAULT false,
  stripe_details_submitted BOOLEAN NOT NULL DEFAULT false,
  application_fee_bps      INT NOT NULL DEFAULT 0 CHECK (application_fee_bps BETWEEN 0 AND 10000),
  status         TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','suspended')),
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.platform_admins (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE public.org_members (
  org_id     UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role       TEXT NOT NULL CHECK (role IN ('owner','admin','staff')),
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (org_id, user_id)
);

CREATE TABLE public.staff (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name        TEXT NOT NULL,
  email       TEXT,
  is_bookable BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);
CREATE UNIQUE INDEX staff_org_user_key ON public.staff(org_id, user_id) WHERE user_id IS NOT NULL;

CREATE TABLE public.services (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  description TEXT,
  -- Variable-duration pricing. Exact tiers + a flat rate for hours beyond the top tier:
  --   price(H) = tier[H].price  OR  (largest tier <= H).price + (H - that tier) * extra_hour_price
  -- e.g. Drone: tiers 1=100,2=190,3=270,4=350 + 80/extra ;  Camera: tier 1=80 + 80/extra (flat 80/h)
  pricing     JSONB NOT NULL DEFAULT '{"tiers":[{"hours":1,"price":0}],"extra_hour_price":0}',
  min_hours   INT NOT NULL DEFAULT 1 CHECK (min_hours > 0),
  max_hours   INT NOT NULL DEFAULT 8 CHECK (max_hours >= min_hours),
  is_active   BOOLEAN NOT NULL DEFAULT true,
  task_template JSONB NOT NULL DEFAULT '[]',  -- default Work-board checklist seeded onto a card
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Which worker offers which service, with that pairing's bookable window.
-- working_hours shape: { "default":[{"start":8,"end":18}], "0".."6":..., "overrides":{...} }
CREATE TABLE public.staff_services (
  staff_id      UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  service_id    UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  working_hours JSONB,
  PRIMARY KEY (staff_id, service_id)
);


-- ── 3. Domain tables ───────────────────────────────────────────────────────
CREATE TABLE public.clients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name            TEXT NOT NULL,
  email           TEXT,
  phone           TEXT,
  company         TEXT,
  vat_number      TEXT,
  billing_address TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);
CREATE UNIQUE INDEX clients_org_user_key ON public.clients(org_id, user_id) WHERE user_id IS NOT NULL;

CREATE TABLE public.bookings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  staff_id        UUID NOT NULL REFERENCES public.staff(id) ON DELETE RESTRICT,
  service_id      UUID REFERENCES public.services(id) ON DELETE SET NULL,
  -- A booking identifies its customer EITHER by a real client row (client_id — the
  -- reusable, invoiceable CRM relationship with company/VAT) OR by a one-off typed
  -- name (contact_name — a "walk-in"/quick booking never persisted to the clients
  -- table). The booking_has_name CHECK enforces exactly that for new/edited rows;
  -- external (imported calendar) blocks are exempt — they're nameless time holds.
  client_id       UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  contact_name    TEXT,
  booking_ref     TEXT NOT NULL,
  title           TEXT NOT NULL,
  description     TEXT,
  location        TEXT,
  start_at        TIMESTAMPTZ NOT NULL,
  end_at          TIMESTAMPTZ NOT NULL,
  price_total     NUMERIC(10,2) NOT NULL DEFAULT 0,
  price_expenses  NUMERIC(10,2) NOT NULL DEFAULT 0,
  status          booking_status NOT NULL DEFAULT 'booked',
  hold_expires_at TIMESTAMPTZ,
  created_by      TEXT NOT NULL DEFAULT 'admin' CHECK (created_by IN ('admin','client')),
  -- Which payment options the client sees on the /book/:token link. If only
  -- allow_inperson is on, the client's confirmation books the job directly
  -- (terms-acceptance); if both are on, "pay later" is a request the admin approves.
  allow_card      BOOLEAN NOT NULL DEFAULT true,
  allow_inperson  BOOLEAN NOT NULL DEFAULT true,
  google_event_id TEXT,
  is_external     BOOLEAN NOT NULL DEFAULT false,
  notes           TEXT,
  -- Per-booking deposit override; NULL ⇒ inherit the org default (booking_params).
  -- deposit_percent is whole-percent; deposit amount = price_total * pct/100.
  deposit_percent INT     CHECK (deposit_percent BETWEEN 1 AND 100),
  deposit_allowed BOOLEAN,
  -- Work board: needs_production opts the booking in; production_status is the stage
  -- (mirrored onto the linked work_items card for the calendar "Progress" line).
  needs_production  BOOLEAN NOT NULL DEFAULT false,
  production_status TEXT CHECK (production_status IN ('to_edit','editing','to_deliver','delivered')),
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE (org_id, booking_ref),
  CONSTRAINT booking_has_name CHECK (client_id IS NOT NULL OR contact_name IS NOT NULL OR is_external)
);

-- Concurrency is enforced PER WORKER on booking_slots: a booking occupies one or more
-- time blocks, and booking_slots_no_overlap (below) forbids overlapping blocking slots
-- for a worker. bookings.start_at/end_at is the ENVELOPE (earliest start → latest end).
CREATE TABLE public.booking_slots (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id     UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  staff_id   UUID NOT NULL REFERENCES public.staff(id) ON DELETE RESTRICT,
  start_at   TIMESTAMPTZ NOT NULL,
  end_at     TIMESTAMPTZ NOT NULL,
  blocking   BOOLEAN NOT NULL DEFAULT true,   -- mirrors booking status (reserves the worker)
  google_event_id TEXT,                       -- per-slot Google Calendar event
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX booking_slots_booking_idx ON public.booking_slots(booking_id);
CREATE INDEX booking_slots_staff_idx   ON public.booking_slots(staff_id);

-- A slot reserves the worker only while its booking is in a blocking status.
CREATE OR REPLACE FUNCTION public.slot_set_blocking() RETURNS TRIGGER
LANGUAGE plpgsql AS $f$
BEGIN
  SELECT (status IN ('hold','booked','in_progress','done')) INTO NEW.blocking
    FROM public.bookings WHERE id = NEW.booking_id;
  RETURN NEW;
END $f$;
DROP TRIGGER IF EXISTS booking_slots_blocking ON public.booking_slots;
CREATE TRIGGER booking_slots_blocking BEFORE INSERT ON public.booking_slots
  FOR EACH ROW EXECUTE FUNCTION public.slot_set_blocking();

-- Status change on a booking frees/reserves all its slots.
CREATE OR REPLACE FUNCTION public.bookings_sync_slot_blocking() RETURNS TRIGGER
LANGUAGE plpgsql AS $f$
BEGIN
  UPDATE public.booking_slots
     SET blocking = (NEW.status IN ('hold','booked','in_progress','done'))
   WHERE booking_id = NEW.id;
  RETURN NEW;
END $f$;
DROP TRIGGER IF EXISTS bookings_blocking_after ON public.bookings;
CREATE TRIGGER bookings_blocking_after AFTER UPDATE OF status ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.bookings_sync_slot_blocking();

-- A worker can't be double-booked across any slot. SQLSTATE 23P01 on conflict.
ALTER TABLE public.booking_slots ADD CONSTRAINT booking_slots_no_overlap
  EXCLUDE USING gist (staff_id WITH =, tstzrange(start_at, end_at, '[)') WITH &&)
  WHERE (blocking);

ALTER TABLE public.booking_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY bs_admin ON public.booking_slots FOR ALL
  USING (public.is_org_admin(org_id)) WITH CHECK (public.is_org_admin(org_id));
GRANT SELECT, INSERT, UPDATE, DELETE ON public.booking_slots TO authenticated;

-- Atomic create/update of a booking + its slots (envelope = min/max of slots).
-- p_slots = [{ "start": iso, "end": iso }, …]. SQLSTATE 23P01 propagates on overlap.
CREATE OR REPLACE FUNCTION public.create_booking(p_booking jsonb, p_slots jsonb)
RETURNS TABLE (id uuid, booking_ref text)
LANGUAGE plpgsql SECURITY INVOKER SET search_path=public AS $$
DECLARE v_id uuid; v_org uuid; v_staff uuid; v_start timestamptz; v_end timestamptz; v_slot jsonb;
BEGIN
  v_org := (p_booking->>'org_id')::uuid; v_staff := (p_booking->>'staff_id')::uuid;
  SELECT min((e->>'start')::timestamptz), max((e->>'end')::timestamptz) INTO v_start, v_end
    FROM jsonb_array_elements(p_slots) e;
  IF v_start IS NULL THEN RAISE EXCEPTION 'no_slots'; END IF;
  INSERT INTO bookings (org_id, staff_id, service_id, client_id, contact_name, title, description,
    start_at, end_at, price_total, price_expenses, status, created_by,
    allow_card, allow_inperson, deposit_allowed, deposit_percent, needs_production, is_external, location, notes)
  VALUES (v_org, v_staff, (p_booking->>'service_id')::uuid, (p_booking->>'client_id')::uuid,
    NULLIF(p_booking->>'contact_name',''),
    p_booking->>'title', p_booking->>'description', v_start, v_end,
    (p_booking->>'price_total')::numeric, COALESCE((p_booking->>'price_expenses')::numeric, 0),
    COALESCE(p_booking->>'status','booked')::booking_status, COALESCE(p_booking->>'created_by','admin'),
    COALESCE((p_booking->>'allow_card')::boolean, true), COALESCE((p_booking->>'allow_inperson')::boolean, true),
    COALESCE((p_booking->>'deposit_allowed')::boolean, true), COALESCE((p_booking->>'deposit_percent')::int, 30),
    COALESCE((p_booking->>'needs_production')::boolean, false), COALESCE((p_booking->>'is_external')::boolean, false),
    p_booking->>'location', p_booking->>'notes')
  RETURNING bookings.id INTO v_id;
  FOR v_slot IN SELECT e FROM jsonb_array_elements(p_slots) e LOOP
    INSERT INTO booking_slots (org_id, booking_id, staff_id, start_at, end_at)
    VALUES (v_org, v_id, v_staff, (v_slot->>'start')::timestamptz, (v_slot->>'end')::timestamptz);
  END LOOP;
  RETURN QUERY SELECT v_id, b.booking_ref FROM bookings b WHERE b.id = v_id;
END $$;
GRANT EXECUTE ON FUNCTION public.create_booking(jsonb,jsonb) TO authenticated;

CREATE OR REPLACE FUNCTION public.update_booking(p_booking_id uuid, p_booking jsonb, p_slots jsonb)
RETURNS void LANGUAGE plpgsql SECURITY INVOKER SET search_path=public AS $$
DECLARE v_org uuid; v_staff uuid; v_start timestamptz; v_end timestamptz; v_slot jsonb; v_old jsonb;
BEGIN
  SELECT org_id INTO v_org FROM bookings WHERE id = p_booking_id;
  v_staff := (p_booking->>'staff_id')::uuid;
  SELECT min((e->>'start')::timestamptz), max((e->>'end')::timestamptz) INTO v_start, v_end
    FROM jsonb_array_elements(p_slots) e;
  IF v_start IS NULL THEN RAISE EXCEPTION 'no_slots'; END IF;
  -- Snapshot the slot→event mapping so unchanged blocks keep their Google Calendar event
  -- (matched by exact start/end) instead of being recreated/orphaned on every edit.
  SELECT COALESCE(jsonb_agg(jsonb_build_object('s', start_at, 'e', end_at, 'g', google_event_id)), '[]'::jsonb)
    INTO v_old FROM booking_slots WHERE booking_id = p_booking_id;
  DELETE FROM booking_slots WHERE booking_id = p_booking_id;
  UPDATE bookings SET staff_id=v_staff, service_id=(p_booking->>'service_id')::uuid,
    client_id=(p_booking->>'client_id')::uuid, contact_name=NULLIF(p_booking->>'contact_name',''),
    title=p_booking->>'title', description=p_booking->>'description',
    start_at=v_start, end_at=v_end, price_total=(p_booking->>'price_total')::numeric,
    allow_card=COALESCE((p_booking->>'allow_card')::boolean,true), allow_inperson=COALESCE((p_booking->>'allow_inperson')::boolean,true),
    deposit_allowed=COALESCE((p_booking->>'deposit_allowed')::boolean,true), deposit_percent=COALESCE((p_booking->>'deposit_percent')::int,30),
    needs_production=COALESCE((p_booking->>'needs_production')::boolean,false), is_external=false,
    location=p_booking->>'location', notes=p_booking->>'notes'
  WHERE id=p_booking_id;
  FOR v_slot IN SELECT e FROM jsonb_array_elements(p_slots) e LOOP
    INSERT INTO booking_slots (org_id, booking_id, staff_id, start_at, end_at, google_event_id)
    VALUES (v_org, p_booking_id, v_staff, (v_slot->>'start')::timestamptz, (v_slot->>'end')::timestamptz,
      (SELECT o->>'g' FROM jsonb_array_elements(v_old) o
        WHERE (o->>'s')::timestamptz = (v_slot->>'start')::timestamptz
          AND (o->>'e')::timestamptz = (v_slot->>'end')::timestamptz
          AND o->>'g' IS NOT NULL LIMIT 1));
  END LOOP;
END $$;
GRANT EXECUTE ON FUNCTION public.update_booking(uuid,jsonb,jsonb) TO authenticated;

CREATE TABLE public.payments (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id                   UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  booking_id               UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  amount                   NUMERIC(10,2) NOT NULL,
  type                     payment_type   NOT NULL,
  status                   payment_status NOT NULL DEFAULT 'pending',
  method                   TEXT NOT NULL DEFAULT 'card' CHECK (method IN ('card','cash','revolut','bank','other')),
  note                     TEXT,                          -- free label for manual payments ("deposit", "final", …)
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_account_id        TEXT,
  paid_at                  TIMESTAMPTZ,
  created_at               TIMESTAMPTZ DEFAULT now()
);

-- A booking can have many payments (deposit + partials + final). total_paid in
-- booking_summary sums all completed ones; outstanding = price_total − total_paid.

CREATE TABLE public.booking_links (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id     UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  token      TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  expires_at TIMESTAMPTZ,
  is_active  BOOLEAN NOT NULL DEFAULT true,
  opened_at  TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);


-- ── 4. Indexes ─────────────────────────────────────────────────────────────
CREATE INDEX bookings_org_idx        ON public.bookings(org_id);
CREATE INDEX bookings_staff_idx      ON public.bookings(staff_id);
CREATE INDEX bookings_start_idx      ON public.bookings(start_at);
CREATE INDEX bookings_status_idx     ON public.bookings(status);
-- Cover the client/service FKs (booking_summary joins + ON DELETE SET NULL scans).
CREATE INDEX bookings_client_idx     ON public.bookings(client_id);
CREATE INDEX bookings_service_idx    ON public.bookings(service_id);
CREATE INDEX clients_org_idx         ON public.clients(org_id);
CREATE INDEX payments_booking_idx    ON public.payments(booking_id);
CREATE INDEX booking_links_token_idx ON public.booking_links(token);
CREATE INDEX booking_links_booking_idx ON public.booking_links(booking_id);  -- lookup link by booking
CREATE INDEX services_org_idx        ON public.services(org_id);
CREATE INDEX staff_org_idx           ON public.staff(org_id);
CREATE INDEX staff_services_service_idx ON public.staff_services(service_id);  -- reverse of the (staff_id,service_id) PK


-- ── 5. Triggers ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at := now(); RETURN NEW; END $$;

DROP TRIGGER IF EXISTS bookings_updated_at ON public.bookings;
CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Per-ORG booking ref (BK-YYYY-NNN, numbered within the org).
CREATE OR REPLACE FUNCTION public.set_booking_ref() RETURNS TRIGGER
LANGUAGE plpgsql AS $$
DECLARE y TEXT := to_char(now(),'YYYY'); seq INT;
BEGIN
  IF NEW.booking_ref IS NULL OR NEW.booking_ref = '' THEN
    SELECT COALESCE(MAX(CAST(SPLIT_PART(booking_ref,'-',3) AS INT)),0)+1 INTO seq
      FROM public.bookings WHERE org_id = NEW.org_id AND booking_ref LIKE 'BK-'||y||'-%';
    NEW.booking_ref := 'BK-'||y||'-'||LPAD(seq::text,3,'0');
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS bookings_set_ref ON public.bookings;
CREATE TRIGGER bookings_set_ref BEFORE INSERT ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_booking_ref();


-- ── 6. Membership & helper functions (SECURITY DEFINER) ────────────────────
CREATE OR REPLACE FUNCTION public.is_platform_admin() RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT EXISTS (SELECT 1 FROM platform_admins WHERE user_id = auth.uid());
$$;

CREATE OR REPLACE FUNCTION public.current_org_ids() RETURNS SETOF UUID
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT org_id FROM org_members WHERE user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_org_member(p_org UUID) RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT EXISTS (SELECT 1 FROM org_members WHERE org_id=p_org AND user_id=auth.uid());
$$;

CREATE OR REPLACE FUNCTION public.is_org_admin(p_org UUID) RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT EXISTS (SELECT 1 FROM org_members
                 WHERE org_id=p_org AND user_id=auth.uid() AND role IN ('owner','admin'));
$$;

CREATE OR REPLACE FUNCTION public.current_staff_id(p_org UUID) RETURNS UUID
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT id FROM staff WHERE org_id=p_org AND user_id=auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.current_client_id(p_org UUID) RETURNS UUID
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT id FROM clients WHERE org_id=p_org AND user_id=auth.uid();
$$;


-- ── 7. Availability (per worker — shared calendar across services) ─────────
CREATE OR REPLACE FUNCTION public.get_busy_ranges(
  p_staff_id UUID, range_start TIMESTAMPTZ, range_end TIMESTAMPTZ
) RETURNS TABLE (start_at TIMESTAMPTZ, end_at TIMESTAMPTZ)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT s.start_at, s.end_at FROM booking_slots s JOIN bookings b ON b.id = s.booking_id
  WHERE s.staff_id = p_staff_id
    AND ( b.status IN ('booked','in_progress','done')
          OR (b.status = 'hold' AND b.hold_expires_at > now()) )
    AND s.start_at < range_end AND s.end_at > range_start;
$$;


-- ── 8. Client RPCs (org-scoped, server-authoritative) ──────────────────────
CREATE OR REPLACE FUNCTION public.upsert_my_client(
  p_org UUID, p_name TEXT, p_email TEXT, p_company TEXT, p_vat TEXT, p_address TEXT
) RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE v_uid UUID := auth.uid(); v_cid UUID;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT id INTO v_cid FROM clients WHERE org_id=p_org AND user_id=v_uid;
  IF v_cid IS NULL THEN
    SELECT id INTO v_cid FROM clients
      WHERE org_id=p_org AND user_id IS NULL AND lower(email)=lower(p_email)
      ORDER BY created_at LIMIT 1;
    IF v_cid IS NOT NULL THEN UPDATE clients SET user_id=v_uid WHERE id=v_cid; END IF;
  END IF;
  IF v_cid IS NULL THEN
    INSERT INTO clients (org_id, user_id, name, email, company, vat_number, billing_address)
      VALUES (p_org, v_uid, p_name, p_email, NULLIF(p_company,''), NULLIF(p_vat,''), NULLIF(p_address,''))
      RETURNING id INTO v_cid;
  ELSE
    UPDATE clients SET name=p_name, email=p_email, company=NULLIF(p_company,''),
      vat_number=NULLIF(p_vat,''), billing_address=NULLIF(p_address,'') WHERE id=v_cid;
  END IF;
  RETURN v_cid;
END $$;

-- Price for a service at a given number of hours (server-authoritative).
-- Exact tier match wins; otherwise (largest tier <= hours) + extra-hour rate.
CREATE OR REPLACE FUNCTION public.service_price(p_service UUID, p_hours INT)
RETURNS NUMERIC
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
DECLARE pr JSONB; base_hours INT; base_price NUMERIC; extra NUMERIC;
BEGIN
  SELECT pricing INTO pr FROM services WHERE id = p_service;
  IF pr IS NULL THEN RETURN NULL; END IF;
  SELECT (t->>'price')::numeric INTO base_price
    FROM jsonb_array_elements(pr->'tiers') t WHERE (t->>'hours')::int = p_hours;
  IF base_price IS NOT NULL THEN RETURN base_price; END IF;
  SELECT (t->>'hours')::int, (t->>'price')::numeric INTO base_hours, base_price
    FROM jsonb_array_elements(pr->'tiers') t WHERE (t->>'hours')::int <= p_hours
    ORDER BY (t->>'hours')::int DESC LIMIT 1;
  IF base_price IS NULL THEN RETURN NULL; END IF;       -- below the minimum tier
  extra := COALESCE((pr->>'extra_hour_price')::numeric, 0);
  RETURN base_price + (p_hours - base_hours) * extra;
END $$;

-- Cash request: hours + price come from the service (client can't tamper).
CREATE OR REPLACE FUNCTION public.create_booking_request(
  p_org UUID, p_staff UUID, p_service UUID, p_start TIMESTAMPTZ, p_hours INT, p_notes TEXT DEFAULT NULL
) RETURNS TABLE (id UUID, booking_ref TEXT)
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE v_client UUID; v_price NUMERIC; v_name TEXT; v_min INT; v_max INT;
BEGIN
  v_client := public.current_client_id(p_org);
  IF v_client IS NULL THEN RAISE EXCEPTION 'no client profile'; END IF;
  IF p_start <= now() THEN RAISE EXCEPTION 'start must be in the future'; END IF;
  SELECT s.name, s.min_hours, s.max_hours INTO v_name, v_min, v_max
    FROM services s WHERE s.id=p_service AND s.org_id=p_org AND s.is_active;
  IF v_name IS NULL THEN RAISE EXCEPTION 'invalid service'; END IF;
  IF p_hours < v_min OR p_hours > v_max THEN RAISE EXCEPTION 'invalid duration'; END IF;
  IF NOT EXISTS (SELECT 1 FROM staff_services ss JOIN staff s ON s.id=ss.staff_id
                 WHERE ss.staff_id=p_staff AND ss.service_id=p_service AND s.org_id=p_org) THEN
    RAISE EXCEPTION 'worker does not offer this service';
  END IF;
  v_price := public.service_price(p_service, p_hours);
  RETURN QUERY
  INSERT INTO bookings (org_id, staff_id, service_id, client_id, title, start_at, end_at,
                        price_total, status, created_by, notes)
  VALUES (p_org, p_staff, p_service, v_client, v_name || ' (' || p_hours || 'h)', p_start,
          p_start + make_interval(hours => p_hours), v_price, 'pending', 'client', p_notes)
  RETURNING bookings.id, bookings.booking_ref;
END $$;


-- ── 9. Admin dashboard view (org admins only) ──────────────────────────────
CREATE VIEW public.booking_summary AS
SELECT
  b.id, b.org_id, b.booking_ref, b.staff_id, b.service_id, b.client_id,
  b.title, b.start_at, b.end_at, b.price_total, b.price_expenses,
  b.price_total - b.price_expenses AS price_revenue,
  b.status, b.google_event_id, b.is_external, b.created_by,
  st.name AS staff_name, s.name AS service_name,
  COALESCE(c.name, b.contact_name) AS client_name, c.email AS client_email,
  (SELECT COUNT(*) FROM public.booking_slots bs WHERE bs.booking_id = b.id) AS slot_count,
  COALESCE(SUM(p.amount) FILTER (WHERE p.status='completed'),0) AS total_paid,
  CASE
    WHEN b.is_external THEN 'external'
    WHEN COALESCE(SUM(p.amount) FILTER (WHERE p.status='completed'),0) >= b.price_total
         AND b.price_total > 0 THEN 'paid'
    WHEN COALESCE(SUM(p.amount) FILTER (WHERE p.status='completed'),0) > 0 THEN 'partial'
    ELSE 'unpaid'
  END AS payment_status
FROM public.bookings b
LEFT JOIN public.staff    st ON st.id = b.staff_id
LEFT JOIN public.services s  ON s.id  = b.service_id
LEFT JOIN public.clients  c  ON c.id  = b.client_id
LEFT JOIN public.payments p  ON p.booking_id = b.id
WHERE public.is_org_admin(b.org_id) OR public.is_platform_admin()
GROUP BY b.id, st.id, s.id, c.id;


-- ── 10. Row-Level Security ─────────────────────────────────────────────────
ALTER TABLE public.organizations   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.org_members     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_services  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_links   ENABLE ROW LEVEL SECURITY;

-- organizations: members read their org; org admin updates it; platform admin all
CREATE POLICY org_read   ON public.organizations FOR SELECT
  USING (public.is_org_member(id) OR public.is_platform_admin());
CREATE POLICY org_update ON public.organizations FOR UPDATE
  USING (public.is_org_admin(id) OR public.is_platform_admin());

-- platform_admins: read own row only
CREATE POLICY pa_read ON public.platform_admins FOR SELECT USING (user_id = auth.uid());

-- org_members: read own membership; org admins manage their org's members
CREATE POLICY mem_read ON public.org_members FOR SELECT
  USING (user_id = auth.uid() OR public.is_org_admin(org_id) OR public.is_platform_admin());
CREATE POLICY mem_admin ON public.org_members FOR ALL
  USING (public.is_org_admin(org_id) OR public.is_platform_admin())
  WITH CHECK (public.is_org_admin(org_id) OR public.is_platform_admin());

-- staff / services / staff_services: org members read; org admins manage
CREATE POLICY staff_read  ON public.staff FOR SELECT USING (public.is_org_member(org_id));
CREATE POLICY staff_admin ON public.staff FOR ALL
  USING (public.is_org_admin(org_id)) WITH CHECK (public.is_org_admin(org_id));
CREATE POLICY svc_read    ON public.services FOR SELECT USING (public.is_org_member(org_id));
CREATE POLICY svc_admin   ON public.services FOR ALL
  USING (public.is_org_admin(org_id)) WITH CHECK (public.is_org_admin(org_id));
CREATE POLICY ss_read     ON public.staff_services FOR SELECT
  USING (EXISTS (SELECT 1 FROM staff s WHERE s.id=staff_id AND public.is_org_member(s.org_id)));
CREATE POLICY ss_admin    ON public.staff_services FOR ALL
  USING (EXISTS (SELECT 1 FROM staff s WHERE s.id=staff_id AND public.is_org_admin(s.org_id)))
  WITH CHECK (EXISTS (SELECT 1 FROM staff s WHERE s.id=staff_id AND public.is_org_admin(s.org_id)));

-- clients: org admin all; a client reads/updates/inserts their own row
CREATE POLICY cl_admin   ON public.clients FOR ALL
  USING (public.is_org_admin(org_id)) WITH CHECK (public.is_org_admin(org_id));
CREATE POLICY cl_self_r  ON public.clients FOR SELECT USING (user_id = auth.uid());
CREATE POLICY cl_self_u  ON public.clients FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY cl_self_i  ON public.clients FOR INSERT WITH CHECK (user_id = auth.uid());

-- bookings: org admin all; staff read own; client read own; client insert pending/hold; token read
CREATE POLICY bk_admin   ON public.bookings FOR ALL
  USING (public.is_org_admin(org_id)) WITH CHECK (public.is_org_admin(org_id));
CREATE POLICY bk_staff_r ON public.bookings FOR SELECT
  USING (staff_id = public.current_staff_id(org_id));
CREATE POLICY bk_client_r ON public.bookings FOR SELECT
  USING (client_id = public.current_client_id(org_id));
CREATE POLICY bk_client_i ON public.bookings FOR INSERT
  WITH CHECK (client_id = public.current_client_id(org_id)
              AND created_by = 'client' AND status IN ('pending','hold'));
CREATE POLICY bk_token_r ON public.bookings FOR SELECT
  USING (EXISTS (SELECT 1 FROM booking_links bl
                 WHERE bl.booking_id = bookings.id AND bl.is_active
                   AND (bl.expires_at IS NULL OR bl.expires_at > now())));

-- payments: org admin all; client reads payments on their own bookings
CREATE POLICY pay_admin  ON public.payments FOR ALL
  USING (public.is_org_admin(org_id)) WITH CHECK (public.is_org_admin(org_id));
CREATE POLICY pay_client_r ON public.payments FOR SELECT
  USING (booking_id IN (SELECT id FROM bookings WHERE client_id = public.current_client_id(org_id)));

-- booking_links: org admin all; anon/auth read an active link by token
CREATE POLICY bl_admin ON public.booking_links FOR ALL
  USING (public.is_org_admin(org_id)) WITH CHECK (public.is_org_admin(org_id));
CREATE POLICY bl_token ON public.booking_links FOR SELECT
  USING (is_active AND (expires_at IS NULL OR expires_at > now()));


-- ── 11. Grants ─────────────────────────────────────────────────────────────
GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON
  public.organizations, public.org_members, public.staff, public.services,
  public.staff_services, public.clients, public.bookings, public.payments,
  public.booking_links TO authenticated;
GRANT SELECT ON public.platform_admins, public.booking_summary TO authenticated;

-- anon: token pay flow only (public service/staff lists are served via Edge Functions)
GRANT SELECT ON public.bookings, public.booking_links TO anon;

GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

GRANT EXECUTE ON FUNCTION
  public.is_platform_admin(), public.current_org_ids(), public.is_org_member(UUID),
  public.is_org_admin(UUID), public.current_staff_id(UUID), public.current_client_id(UUID),
  public.upsert_my_client(UUID,TEXT,TEXT,TEXT,TEXT,TEXT),
  public.create_booking_request(UUID,UUID,UUID,TIMESTAMPTZ,INT,TEXT)
  TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_busy_ranges(UUID,TIMESTAMPTZ,TIMESTAMPTZ) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.service_price(UUID,INT) TO anon, authenticated;


-- ── 12. SEED — first organization: johnfabiomb ─────────────────────────────
-- John's auth user id (creator@johnfabiomb.com), verified in the live project.
DO $$
DECLARE
  v_uid    UUID := '4594a5c1-ad28-40e3-a166-0d641544b3cc';
  v_org    UUID;
  v_staff  UUID;
  v_drone  UUID;
  v_camera UUID;
BEGIN
  INSERT INTO organizations (slug, name) VALUES ('johnfabiomb','John F. Montaño')
    RETURNING id INTO v_org;

  INSERT INTO platform_admins (user_id) VALUES (v_uid) ON CONFLICT DO NOTHING;
  INSERT INTO org_members (org_id, user_id, role) VALUES (v_org, v_uid, 'owner');

  INSERT INTO staff (org_id, user_id, name, email)
    VALUES (v_org, v_uid, 'John Montaño', 'creator@johnfabiomb.com')
    RETURNING id INTO v_staff;

  -- Drone: 1h 100, 2h 190, 3h 270, 4h 350, then +80/extra hour.
  INSERT INTO services (org_id, name, description, pricing, min_hours, max_hours)
    VALUES (v_org, 'Drone Pilot Filming', 'Aerial / FPV drone filming.',
      '{"tiers":[{"hours":1,"price":100},{"hours":2,"price":190},{"hours":3,"price":270},{"hours":4,"price":350}],"extra_hour_price":80}',
      1, 8)
    RETURNING id INTO v_drone;
  -- Camera: flat 80/hour.
  INSERT INTO services (org_id, name, description, pricing, min_hours, max_hours)
    VALUES (v_org, 'Camera Filming', 'On-the-ground camera filming.',
      '{"tiers":[{"hours":1,"price":80}],"extra_hour_price":80}',
      1, 12)
    RETURNING id INTO v_camera;

  -- John offers both. Drone = daytime only; Camera = 24h. (Same shared calendar.)
  INSERT INTO staff_services (staff_id, service_id, working_hours) VALUES
    (v_staff, v_drone,  '{"default":[{"start":8,"end":18}]}'),
    (v_staff, v_camera, '{"default":[{"start":0,"end":24}]}');
END $$;


-- ── 13. Work board (production to-do) ──────────────────────────────────────
-- The Work board (to_edit → editing → to_deliver → delivered) is a list of
-- work_items (§13a); a card may link to a booking or stand alone. Tasks are a
-- checklist on a card. (Columns bookings.needs_production/production_status,
-- services.task_template and organizations.features are defined on their tables.)
CREATE TABLE public.tasks (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id     UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  is_done    BOOLEAN NOT NULL DEFAULT false,
  due_at     TIMESTAMPTZ,
  sort       INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  done_at    TIMESTAMPTZ
);
CREATE INDEX tasks_org_idx     ON public.tasks(org_id);
CREATE INDEX tasks_booking_idx ON public.tasks(booking_id);
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY tasks_admin ON public.tasks FOR ALL
  USING (public.is_org_admin(org_id)) WITH CHECK (public.is_org_admin(org_id));
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tasks TO authenticated;

-- A booking joins the Work board only when explicitly marked `needs_production`
-- (and never if it's an imported/external calendar event). Clearing the flag
-- (or it being external) removes it from the board.
CREATE OR REPLACE FUNCTION public.set_production_status() RETURNS TRIGGER
LANGUAGE plpgsql AS $f$
BEGIN
  IF NEW.is_external OR NOT COALESCE(NEW.needs_production, false) THEN
    NEW.production_status := NULL;
  ELSIF NEW.status IN ('booked','in_progress','done') AND NEW.production_status IS NULL THEN
    NEW.production_status := 'to_edit';
  END IF;
  RETURN NEW;
END $f$;
DROP TRIGGER IF EXISTS bookings_production_before ON public.bookings;
CREATE TRIGGER bookings_production_before BEFORE INSERT OR UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_production_status();


-- ── 13a. Work items (the Work board's unit) ────────────────────────────────
-- The Work board is its own list of cards (Trello-style). A card MAY link to a
-- booking (carrying its client/service/date) or stand alone (a personal reminder
-- with no booking). This replaces the old "one card per needs_production booking"
-- coupling: cards are now created/deleted explicitly, so deleting a card never
-- touches the booking, and you can make your own cards with no job attached.
CREATE TABLE public.work_items (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id            UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  booking_id        UUID REFERENCES public.bookings(id) ON DELETE CASCADE,   -- null = standalone
  title             TEXT NOT NULL,
  production_status TEXT NOT NULL DEFAULT 'to_edit'
                    CHECK (production_status IN ('to_edit','editing','to_deliver','delivered')),
  sort              INT NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX work_items_org_idx     ON public.work_items(org_id);
CREATE INDEX work_items_booking_idx ON public.work_items(booking_id);
ALTER TABLE public.work_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY work_items_admin ON public.work_items FOR ALL
  USING (public.is_org_admin(org_id)) WITH CHECK (public.is_org_admin(org_id));
GRANT SELECT, INSERT, UPDATE, DELETE ON public.work_items TO authenticated;

-- The board reads tasks by work_item_id; booking_id stays for back-compat. (Added
-- after work_items so the FK target exists.)
ALTER TABLE public.tasks ADD COLUMN work_item_id UUID REFERENCES public.work_items(id) ON DELETE CASCADE;
CREATE INDEX tasks_work_item_idx ON public.tasks(work_item_id);

-- Create a card (optionally linked to a booking, whose service task-template is
-- seeded once). SECURITY INVOKER so RLS still scopes writes to the caller's org.
CREATE OR REPLACE FUNCTION public.create_work_item(p_org uuid, p_booking uuid, p_title text)
RETURNS public.work_items LANGUAGE plpgsql SECURITY INVOKER SET search_path=public AS $$
DECLARE v_item public.work_items; v_btitle text; v_svc uuid; tmpl jsonb; t text;
BEGIN
  IF p_booking IS NOT NULL THEN
    SELECT title, service_id INTO v_btitle, v_svc FROM bookings WHERE id = p_booking AND org_id = p_org;
  END IF;
  INSERT INTO work_items (org_id, booking_id, title)
  VALUES (p_org, p_booking, COALESCE(NULLIF(btrim(p_title),''), v_btitle, 'Untitled'))
  RETURNING * INTO v_item;
  IF v_svc IS NOT NULL THEN
    SELECT task_template INTO tmpl FROM services WHERE id = v_svc;
    FOR t IN SELECT jsonb_array_elements_text(COALESCE(tmpl,'[]'::jsonb)) LOOP
      INSERT INTO tasks (org_id, work_item_id, booking_id, title) VALUES (p_org, v_item.id, p_booking, t);
    END LOOP;
  END IF;
  RETURN v_item;
END $$;
GRANT EXECUTE ON FUNCTION public.create_work_item(uuid,uuid,text) TO authenticated;


-- ── 14. Stripe Connect — payout-critical column security ───────────────────
-- The connected-account columns are defined on `organizations` (§2). Each org
-- connects its OWN Standard account; charges go directly on it with an optional
-- platform fee. The platform secret key stays an Edge Function secret — never
-- stored here. stripe_account_id IS NULL ⇒ charge on the platform account.
--
-- SECURITY: org admins must NOT be able to write payout-critical fields.
-- The org_update RLS policy lets an admin UPDATE their org row, and `authenticated`
-- held a TABLE-level UPDATE grant — together that allowed an admin to set
-- `stripe_account_id` (redirecting every payout to an account they control) or flip
-- `stripe_charges_enabled` to bypass onboarding. Postgres RLS is row-level only, so
-- we enforce column-level privileges instead: revoke the blanket UPDATE and grant it
-- back ONLY on the safe, admin-editable columns. The stripe_* / fee columns are then
-- writable solely by `service_role` (Edge Functions via the service key, which holds
-- GRANT ALL above and bypasses RLS). Defence-in-depth: even a compromised admin JWT
-- cannot touch where the money lands.
REVOKE UPDATE ON public.organizations FROM authenticated;
GRANT  UPDATE (name, timezone, currency, booking_params, features, invoice_details)
  ON public.organizations TO authenticated;


-- ── Notes on deposit & invoicing config (columns defined on their tables) ──
-- Deposit policy has two layers: the ORG DEFAULT (booking_params.deposit_percent +
-- deposit_allowed, JSONB) and a PER-BOOKING override (bookings.deposit_percent /
-- deposit_allowed; NULL ⇒ inherit). The override is stored explicitly so changing the
-- org default later never alters an existing payment link.
-- organizations.invoice_details (JSONB) holds the printable-invoice identity:
--   { legal_name, address, phone, email, vat_number, vat_registered, vat_rate (def 18),
--     invoice_prefix (def 'INV'), invoice_footer }. Invoice no. = booking_ref with the
--   prefix swapped (BK-2026-007 → INV-2026-007). When vat_registered is false (Article 11)
--   no VAT is charged; when true, prices are VAT-inclusive and the net/VAT/gross breakdown
--   shows. Admins may edit invoice_details (§14 grant); stripe_* stays service-role-only.


-- ── 15. Editable invoices ──────────────────────────────────────────────────
-- An invoice is generated live from its booking by default; the moment the admin
-- EDITS it (line items / notes / issue date), the edits are persisted here, keyed
-- 1:1 to the booking. Editing an invoice NEVER touches the booking/calendar/work
-- data — full decoupling. Absent row ⇒ the invoice is derived from the booking.
-- `line_items` shape: [{ "description": text, "amount": number }, …].
CREATE TABLE public.invoices (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  booking_id  UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  line_items  JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes       TEXT,
  issue_date  DATE,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (booking_id)
);
CREATE INDEX invoices_org_idx ON public.invoices(org_id);
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
-- WITH CHECK also verifies the booking belongs to org_id, so an admin of org A
-- can't attach an invoice override to org B's booking (cross-tenant integrity).
CREATE POLICY inv_admin ON public.invoices FOR ALL
  USING (public.is_org_admin(org_id))
  WITH CHECK (public.is_org_admin(org_id)
              AND EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND b.org_id = org_id));
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invoices TO authenticated;
CREATE TRIGGER invoices_updated BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- `_invoice_bundle(booking)` assembles the full invoice JSON (org company details,
-- client, line items [override or derived], totals, payments) with NO authorization —
-- it's internal and only reachable through the two SECURITY DEFINER wrappers below, so
-- it's NOT granted to anon/authenticated. Returns only invoice-safe fields (never
-- price_revenue or other bookings).
CREATE OR REPLACE FUNCTION public._invoice_bundle(p_booking UUID)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE b RECORD; org RECORD; cl RECORD; ov RECORD; items JSONB; total NUMERIC; paid NUMERIC; pays JSONB;
BEGIN
  SELECT id, org_id, client_id, contact_name, booking_ref, title, description, location, start_at, end_at, price_total, price_expenses, status
    INTO b FROM bookings WHERE id = p_booking;
  IF NOT FOUND THEN RETURN NULL; END IF;

  SELECT name, currency, invoice_details INTO org FROM organizations WHERE id = b.org_id;
  SELECT name, company, vat_number, billing_address, email, phone INTO cl FROM clients WHERE id = b.client_id;
  SELECT line_items, notes, issue_date INTO ov FROM invoices WHERE booking_id = p_booking;

  IF ov.line_items IS NOT NULL AND jsonb_array_length(ov.line_items) > 0 THEN
    items := ov.line_items;
  ELSE
    items := jsonb_build_array(jsonb_build_object(
      'description', COALESCE(NULLIF(b.description, ''), b.title),
      'amount', GREATEST(0, b.price_total - COALESCE(b.price_expenses, 0))));
    IF COALESCE(b.price_expenses, 0) > 0 THEN
      items := items || jsonb_build_object('description', 'Travel & expenses', 'amount', b.price_expenses);
    END IF;
  END IF;

  SELECT COALESCE(SUM((e->>'amount')::numeric), 0) INTO total FROM jsonb_array_elements(items) e;
  SELECT COALESCE(SUM(amount), 0) INTO paid FROM payments WHERE booking_id = p_booking AND status = 'completed';
  SELECT COALESCE(jsonb_agg(jsonb_build_object('amount', amount, 'method', method, 'paid_at', paid_at)
            ORDER BY COALESCE(paid_at, created_at)), '[]'::jsonb)
    INTO pays FROM payments WHERE booking_id = p_booking AND status = 'completed';

  RETURN jsonb_build_object(
    'org', jsonb_build_object('name', org.name, 'currency', org.currency, 'invoice_details', org.invoice_details),
    -- A real client bills with full details; a quick (contact_name-only) booking bills
    -- to the bare name with no company/VAT/address.
    'client', CASE
        WHEN cl.name IS NOT NULL THEN jsonb_build_object(
          'name', cl.name, 'company', cl.company, 'vat_number', cl.vat_number,
          'billing_address', cl.billing_address, 'email', cl.email, 'phone', cl.phone)
        WHEN b.contact_name IS NOT NULL THEN jsonb_build_object(
          'name', b.contact_name, 'company', NULL, 'vat_number', NULL,
          'billing_address', NULL, 'email', NULL, 'phone', NULL)
        ELSE NULL END,
    'booking', jsonb_build_object('id', b.id, 'booking_ref', b.booking_ref, 'location', b.location,
        'start_at', b.start_at, 'end_at', b.end_at, 'status', b.status, 'price_total', b.price_total),
    'invoice', jsonb_build_object('line_items', items, 'notes', ov.notes, 'issue_date', ov.issue_date,
        'customized', (ov.line_items IS NOT NULL AND jsonb_array_length(ov.line_items) > 0), 'total', total),
    'total_paid', paid, 'payments', pays);
END;
$$;
REVOKE ALL ON FUNCTION public._invoice_bundle(UUID) FROM PUBLIC;

-- Authed accessor: org admin of the booking's org OR the booking's own client.
CREATE OR REPLACE FUNCTION public.get_invoice(p_booking UUID)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_org UUID; v_client UUID;
BEGIN
  SELECT org_id, client_id INTO v_org, v_client FROM bookings WHERE id = p_booking;
  IF v_org IS NULL THEN RETURN NULL; END IF;
  IF NOT (public.is_org_admin(v_org) OR (v_client IS NOT NULL AND v_client = public.current_client_id(v_org))) THEN
    RAISE EXCEPTION 'forbidden' USING errcode = '42501';
  END IF;
  RETURN public._invoice_bundle(p_booking);
END;
$$;
GRANT EXECUTE ON FUNCTION public.get_invoice(UUID) TO authenticated;

-- Token accessor: anon-safe. A valid active pay link already grants access to that
-- booking's pay page, so it can also fetch the invoice (for the success page + the
-- printable invoice opened by a customer who isn't signed in).
CREATE OR REPLACE FUNCTION public.get_invoice_by_token(p_token TEXT)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_booking UUID;
BEGIN
  SELECT booking_id INTO v_booking FROM booking_links
   WHERE token = p_token AND is_active AND (expires_at IS NULL OR expires_at > now());
  IF v_booking IS NULL THEN RETURN NULL; END IF;
  RETURN public._invoice_bundle(v_booking);
END;
$$;
GRANT EXECUTE ON FUNCTION public.get_invoice_by_token(TEXT) TO anon, authenticated;


-- ── 16. Org creation & membership (platform-admin gated) ───────────────────
-- Orgs are NOT self-serve: only a platform admin can create one. The creator
-- becomes its owner (so it appears in their switcher). Org admins (or platform
-- admins) then add members by email — the invitee must have signed in once
-- (exists in auth.users) since there's no email-invite infra yet. All gated &
-- org-scoped; auth.users is only reachable here via SECURITY DEFINER.
CREATE OR REPLACE FUNCTION public.create_org(p_name TEXT, p_slug TEXT, p_timezone TEXT DEFAULT 'Europe/Malta', p_currency TEXT DEFAULT 'EUR')
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_org UUID; v_uid UUID := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  IF NOT public.is_platform_admin() THEN RAISE EXCEPTION 'forbidden' USING errcode = '42501'; END IF;
  INSERT INTO public.organizations (slug, name, timezone, currency)
    VALUES (lower(trim(p_slug)), trim(p_name), p_timezone, upper(p_currency)) RETURNING id INTO v_org;
  INSERT INTO public.org_members (org_id, user_id, role) VALUES (v_org, v_uid, 'owner');
  RETURN v_org;
END $$;
GRANT EXECUTE ON FUNCTION public.create_org(TEXT, TEXT, TEXT, TEXT) TO authenticated;

CREATE OR REPLACE FUNCTION public.add_org_member(p_org UUID, p_email TEXT, p_role TEXT)
RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_uid UUID;
BEGIN
  IF NOT (public.is_org_admin(p_org) OR public.is_platform_admin()) THEN RAISE EXCEPTION 'forbidden' USING errcode = '42501'; END IF;
  IF p_role NOT IN ('owner','admin','staff') THEN RAISE EXCEPTION 'bad_role'; END IF;
  SELECT id INTO v_uid FROM auth.users WHERE lower(email) = lower(trim(p_email));
  IF v_uid IS NULL THEN RETURN 'no_user'; END IF;   -- they must sign in once first
  INSERT INTO public.org_members (org_id, user_id, role) VALUES (p_org, v_uid, p_role)
    ON CONFLICT (org_id, user_id) DO UPDATE SET role = EXCLUDED.role;
  RETURN 'ok';
END $$;
GRANT EXECUTE ON FUNCTION public.add_org_member(UUID, TEXT, TEXT) TO authenticated;

CREATE OR REPLACE FUNCTION public.remove_org_member(p_org UUID, p_user UUID)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT (public.is_org_admin(p_org) OR public.is_platform_admin()) THEN RAISE EXCEPTION 'forbidden' USING errcode = '42501'; END IF;
  IF (SELECT role FROM public.org_members WHERE org_id = p_org AND user_id = p_user) = 'owner'
     AND (SELECT count(*) FROM public.org_members WHERE org_id = p_org AND role = 'owner') <= 1 THEN
    RAISE EXCEPTION 'last_owner';
  END IF;
  DELETE FROM public.org_members WHERE org_id = p_org AND user_id = p_user;
END $$;
GRANT EXECUTE ON FUNCTION public.remove_org_member(UUID, UUID) TO authenticated;

CREATE OR REPLACE FUNCTION public.list_org_members(p_org UUID)
RETURNS TABLE(user_id UUID, email TEXT, role TEXT) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT (public.is_org_admin(p_org) OR public.is_platform_admin()) THEN RAISE EXCEPTION 'forbidden' USING errcode = '42501'; END IF;
  RETURN QUERY
    SELECT m.user_id, u.email::TEXT, m.role
    FROM public.org_members m JOIN auth.users u ON u.id = m.user_id
    WHERE m.org_id = p_org ORDER BY m.role, u.email;
END $$;
GRANT EXECUTE ON FUNCTION public.list_org_members(UUID) TO authenticated;
