-- ============================================================
-- Venture Map — Supabase Schema (idempotent — safe to re-run)
-- Run this entire file in: Supabase Dashboard → SQL Editor → Run
-- ============================================================


-- ── Tables ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.users (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT NOT NULL,
  display_name    TEXT,
  photo_url       TEXT,
  role            TEXT DEFAULT 'explorer' CHECK (role IN ('explorer', 'admin', 'guide')),
  level           INTEGER DEFAULT 1 CHECK (level BETWEEN 1 AND 6),
  xp              INTEGER NOT NULL DEFAULT 0,
  saved_locations TEXT[] DEFAULT '{}',
  receive_updates BOOLEAN DEFAULT TRUE,
  feature_access  JSONB DEFAULT '{"groups": true}',
  referral_code   TEXT UNIQUE,
  referred_by     UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.users ALTER COLUMN receive_updates SET DEFAULT TRUE;

-- groups.leader_* profile columns removed — JOIN user_profiles view instead
CREATE TABLE IF NOT EXISTS public.groups (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  spot_slug       TEXT,
  spot_title      TEXT,
  spot_lat        DOUBLE PRECISION,
  spot_lon        DOUBLE PRECISION,
  date            TIMESTAMPTZ NOT NULL,
  time            TEXT NOT NULL,
  description     TEXT,
  difficulty      TEXT CHECK (difficulty IN ('easy', 'moderate', 'hard')),
  max_members     INTEGER,
  price_eur       DECIMAL(8,2),
  status          TEXT DEFAULT 'open' CHECK (status IN ('open','full','exploring','cancelled','completed')),
  leader_id       UUID REFERENCES public.users(id),
  member_count    INTEGER DEFAULT 0,
  member_previews JSONB DEFAULT '[]',
  meeting_point   JSONB,
  pinned_message  JSONB,
  completed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- group_members profile columns removed — JOIN user_profiles view instead
CREATE TABLE IF NOT EXISTS public.group_members (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id      UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  uid           UUID REFERENCES public.users(id),
  role          TEXT DEFAULT 'member' CHECK (role IN ('leader','member')),
  joined_at     TIMESTAMPTZ DEFAULT NOW(),
  last_active   TIMESTAMPTZ DEFAULT NOW(),
  muted_until   TIMESTAMPTZ,
  contact_phone TEXT,
  UNIQUE(group_id, uid)
);

-- group_messages profile columns are kept as snapshots (high-frequency realtime)
CREATE TABLE IF NOT EXISTS public.group_messages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id     UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  uid          UUID REFERENCES public.users(id),
  display_name TEXT,
  photo_url    TEXT,
  text         TEXT NOT NULL,
  is_system    BOOLEAN DEFAULT FALSE,
  level        INTEGER,
  is_admin     BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.xp_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  action      TEXT NOT NULL,
  ref_id      TEXT,
  xp_gained   INTEGER NOT NULL,
  earned_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ── Existing-DB column migration ─────────────────────────────
-- Adds new columns; drops denormalized leader/member profile columns
-- that are now served by the user_profiles JOIN view.
-- Safe to re-run — all statements are IF EXISTS / IF NOT EXISTS.

-- users: new XP/referral columns
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS xp            INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS referral_code TEXT    UNIQUE;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS referred_by   UUID    REFERENCES public.users(id) ON DELETE SET NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone         TEXT    NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone         TEXT    NULL;

-- users: extend role to include 'guide'
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE public.users ADD CONSTRAINT users_role_check CHECK (role IN ('explorer', 'admin', 'guide'));

-- groups: guide tour pricing
ALTER TABLE public.groups ADD COLUMN IF NOT EXISTS price_eur DECIMAL(8,2) NULL;

-- groups: drop denormalized leader profile columns
ALTER TABLE public.groups DROP COLUMN IF EXISTS leader_name;
ALTER TABLE public.groups DROP COLUMN IF EXISTS leader_photo;
ALTER TABLE public.groups DROP COLUMN IF EXISTS leader_is_admin;
ALTER TABLE public.groups DROP COLUMN IF EXISTS leader_level;

-- group_members: drop denormalized member profile columns
ALTER TABLE public.group_members DROP COLUMN IF EXISTS display_name;
ALTER TABLE public.group_members DROP COLUMN IF EXISTS photo_url;

-- group_members: contact info for paid tour members
ALTER TABLE public.group_members ADD COLUMN IF NOT EXISTS contact_phone TEXT NULL;

-- groups: extend status to include 'archived' (soft-delete for admin cleanup)
ALTER TABLE public.groups DROP CONSTRAINT IF EXISTS groups_status_check;
ALTER TABLE public.groups ADD CONSTRAINT groups_status_check
  CHECK (status IN ('open','full','exploring','cancelled','completed','archived'));


-- ── Indexes ──────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_groups_date         ON public.groups (date ASC);
CREATE INDEX IF NOT EXISTS idx_groups_status       ON public.groups (status);
CREATE INDEX IF NOT EXISTS idx_groups_leader       ON public.groups (leader_id);
CREATE INDEX IF NOT EXISTS idx_members_group_id    ON public.group_members (group_id);
CREATE INDEX IF NOT EXISTS idx_members_uid         ON public.group_members (uid);
CREATE INDEX IF NOT EXISTS idx_messages_group_date ON public.group_messages (group_id, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS xp_events_once
  ON public.xp_events (user_id, action, ref_id)
  WHERE action IN ('location_viewed','location_saved','group_joined','group_created',
                   'group_completed','daily_active','friend_referred','joined_via_referral');
CREATE INDEX IF NOT EXISTS xp_events_daily
  ON public.xp_events (user_id, action, earned_at);


-- ── user_profiles view (public-safe subset of users) ─────────
-- Owned by postgres (superuser) so it bypasses users RLS.
-- Exposes only non-sensitive fields needed for JOINs.
-- Lets group/member queries JOIN live profile data without
-- exposing email, saved_locations, feature_access, etc.

CREATE OR REPLACE VIEW public.user_profiles AS
  SELECT id, display_name, photo_url, level, role FROM public.users;


-- ── Auto-create user profile on first sign-in ────────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name, photo_url, receive_updates, feature_access)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    TRUE,
    '{"groups": true}'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ── Trigger: auto-generate referral_code on INSERT ───────────

CREATE OR REPLACE FUNCTION public.set_referral_code()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.referral_code := UPPER(SUBSTR(MD5(NEW.id::text), 1, 8));
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_set_referral_code ON public.users;
CREATE TRIGGER trg_set_referral_code
  BEFORE INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_referral_code();

-- Backfill referral codes for existing users (safe — skips rows that already have one)
UPDATE public.users SET referral_code = UPPER(SUBSTR(MD5(id::text), 1, 8))
WHERE referral_code IS NULL;


-- ── RPC: join_group ──────────────────────────────────────────
-- Server looks up the caller's profile from users directly —
-- no client-supplied name/photo, preventing spoofing.

CREATE OR REPLACE FUNCTION public.join_group(p_group_id UUID, p_phone TEXT DEFAULT NULL)
RETURNS VOID AS $$
DECLARE
  v_uid   UUID := auth.uid();
  v_name  TEXT;
  v_photo TEXT;
  v_group public.groups%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'unauthenticated'; END IF;

  SELECT display_name, photo_url INTO v_name, v_photo
  FROM public.users WHERE id = v_uid;

  SELECT * INTO v_group FROM public.groups WHERE id = p_group_id FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'group_not_found';
  END IF;

  IF v_group.status IN ('cancelled', 'completed', 'exploring') THEN
    RAISE EXCEPTION 'group_not_accepting';
  END IF;

  IF v_group.max_members IS NOT NULL AND v_group.member_count >= v_group.max_members THEN
    RAISE EXCEPTION 'group_full';
  END IF;

  INSERT INTO public.group_members (group_id, uid, contact_phone)
  VALUES (p_group_id, v_uid, p_phone)
  ON CONFLICT (group_id, uid) DO NOTHING;

  UPDATE public.groups
  SET member_count    = member_count + 1,
      member_previews = CASE
        WHEN jsonb_array_length(member_previews) < 5
        THEN member_previews || jsonb_build_object(
          'uid', v_uid::text, 'displayName', v_name, 'photoURL', v_photo
        )
        ELSE member_previews
      END,
      status          = CASE
        WHEN max_members IS NOT NULL AND member_count + 1 >= max_members THEN 'full'
        ELSE status
      END,
      updated_at      = NOW()
  WHERE id = p_group_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ── RPC: leave_group ─────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.leave_group(
  p_group_id UUID,
  p_uid      UUID
) RETURNS VOID AS $$
DECLARE
  v_new_count INTEGER;
BEGIN
  DELETE FROM public.group_members
  WHERE group_id = p_group_id AND uid = p_uid;

  UPDATE public.groups
  SET member_count    = GREATEST(member_count - 1, 0),
      member_previews = (
        SELECT COALESCE(jsonb_agg(elem ORDER BY ordinality), '[]'::jsonb)
        FROM jsonb_array_elements(member_previews) WITH ORDINALITY AS t(elem, ordinality)
        WHERE elem->>'uid' != p_uid::text
      ),
      status          = CASE WHEN status = 'full' THEN 'open' ELSE status END,
      updated_at      = NOW()
  WHERE id = p_group_id
  RETURNING member_count INTO v_new_count;

  IF v_new_count = 0 THEN
    DELETE FROM public.groups WHERE id = p_group_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ── RPC: activate_groups_access ──────────────────────────────

CREATE OR REPLACE FUNCTION public.activate_groups_access(p_email TEXT)
RETURNS TEXT AS $$
DECLARE
  v_user_id UUID;
BEGIN
  SELECT id INTO v_user_id FROM public.users WHERE email = p_email LIMIT 1;
  IF NOT FOUND THEN RETURN 'not_found'; END IF;
  UPDATE public.users SET feature_access = feature_access || '{"groups": true}'::jsonb WHERE id = v_user_id;
  RETURN 'ok';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ── RPC: activate_guide_role ─────────────────────────────────

CREATE OR REPLACE FUNCTION public.activate_guide_role(p_email TEXT)
RETURNS TEXT AS $$
DECLARE
  v_user_id UUID;
BEGIN
  SELECT id INTO v_user_id FROM public.users WHERE email = p_email LIMIT 1;
  IF NOT FOUND THEN RETURN 'not_found'; END IF;
  UPDATE public.users SET role = 'guide' WHERE id = v_user_id;
  RETURN 'ok';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ── Admin helper ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;


-- ── RPC: award_xp ────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.award_xp(
  p_action TEXT,
  p_ref_id TEXT DEFAULT NULL
) RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_uid       UUID := auth.uid();
  v_gain      INTEGER;
  v_daily_cap INTEGER;
  v_daily_sum INTEGER;
  v_new_xp    INTEGER;
  v_new_level INTEGER;
  v_inserted  INTEGER;
BEGIN
  IF v_uid IS NULL THEN RETURN '{"error":"unauthenticated"}'; END IF;

  v_gain := CASE p_action
    WHEN 'location_viewed'  THEN 15
    WHEN 'location_saved'   THEN 25
    WHEN 'group_joined'     THEN 60
    WHEN 'group_created'    THEN 80
    WHEN 'group_completed'  THEN 50
    WHEN 'message_sent'     THEN 2
    WHEN 'session_active'   THEN 5
    WHEN 'daily_active'     THEN 80
    ELSE 0
  END;
  IF v_gain = 0 THEN RETURN '{"error":"unknown_action"}'; END IF;

  v_daily_cap := CASE p_action
    WHEN 'message_sent'   THEN 10
    WHEN 'session_active' THEN 30
    ELSE NULL
  END;

  IF v_daily_cap IS NOT NULL THEN
    SELECT COALESCE(SUM(xp_gained), 0) INTO v_daily_sum
    FROM public.xp_events
    WHERE user_id = v_uid AND action = p_action
      AND earned_at >= NOW() - INTERVAL '1 day';
    IF v_daily_sum >= v_daily_cap THEN RETURN '{"capped":true}'; END IF;
    v_gain := LEAST(v_gain, v_daily_cap - v_daily_sum);
  END IF;

  INSERT INTO public.xp_events (user_id, action, ref_id, xp_gained)
  VALUES (v_uid, p_action, p_ref_id, v_gain)
  ON CONFLICT (user_id, action, ref_id)
    WHERE action IN ('location_viewed','location_saved','group_joined','group_created',
                     'group_completed','daily_active','friend_referred','joined_via_referral')
  DO NOTHING;

  GET DIAGNOSTICS v_inserted = ROW_COUNT;
  IF v_inserted = 0 AND p_action IN ('location_viewed','location_saved','group_joined',
                                      'group_created','group_completed','daily_active',
                                      'friend_referred','joined_via_referral') THEN
    RETURN '{"duplicate":true}';
  END IF;

  UPDATE public.users
  SET xp    = xp + v_gain,
      level = CASE
        WHEN xp + v_gain >= 10000 THEN 6
        WHEN xp + v_gain >=  4000 THEN 5
        WHEN xp + v_gain >=  1500 THEN 4
        WHEN xp + v_gain >=   500 THEN 3
        WHEN xp + v_gain >=   150 THEN 2
        ELSE 1
      END
  WHERE id = v_uid
  RETURNING xp, level INTO v_new_xp, v_new_level;

  RETURN jsonb_build_object('xp', v_new_xp, 'level', v_new_level, 'gained', v_gain);
END;
$$;


-- ── RPC: process_referral ────────────────────────────────────

CREATE OR REPLACE FUNCTION public.process_referral(
  p_referrer_id UUID
) RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_new_uid  UUID := auth.uid();
  v_inserted INTEGER;
BEGIN
  IF v_new_uid IS NULL THEN RETURN '{"error":"unauthenticated"}'; END IF;
  IF p_referrer_id = v_new_uid THEN RETURN '{"error":"self_referral"}'; END IF;

  UPDATE public.users SET referred_by = p_referrer_id
  WHERE id = v_new_uid AND referred_by IS NULL;
  GET DIAGNOSTICS v_inserted = ROW_COUNT;
  IF v_inserted = 0 THEN RETURN '{"duplicate":true}'; END IF;

  INSERT INTO public.xp_events (user_id, action, ref_id, xp_gained)
  VALUES (p_referrer_id, 'friend_referred', v_new_uid::text, 120)
  ON CONFLICT (user_id, action, ref_id)
    WHERE action IN ('location_viewed','location_saved','group_joined','group_created',
                     'group_completed','daily_active','friend_referred','joined_via_referral')
  DO NOTHING;

  UPDATE public.users
  SET xp    = xp + 120,
      level = CASE
        WHEN xp + 120 >= 10000 THEN 6 WHEN xp + 120 >= 4000 THEN 5
        WHEN xp + 120 >=  1500 THEN 4 WHEN xp + 120 >=  500 THEN 3
        WHEN xp + 120 >=   150 THEN 2 ELSE 1
      END
  WHERE id = p_referrer_id;

  INSERT INTO public.xp_events (user_id, action, ref_id, xp_gained)
  VALUES (v_new_uid, 'joined_via_referral', p_referrer_id::text, 30)
  ON CONFLICT (user_id, action, ref_id)
    WHERE action IN ('location_viewed','location_saved','group_joined','group_created',
                     'group_completed','daily_active','friend_referred','joined_via_referral')
  DO NOTHING;

  UPDATE public.users SET xp = xp + 30 WHERE id = v_new_uid;
  RETURN '{"ok":true}';
END;
$$;


-- ── Row Level Security ────────────────────────────────────────

ALTER TABLE public.users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_events      ENABLE ROW LEVEL SECURITY;

-- Users (restricted — use user_profiles view for public profile reads)
DROP POLICY IF EXISTS "users: read own or admin reads all" ON public.users;
CREATE POLICY "users: read own or admin reads all"
  ON public.users FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "users: insert own" ON public.users;
CREATE POLICY "users: insert own"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "users: update own" ON public.users;
CREATE POLICY "users: update own"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Groups
DROP POLICY IF EXISTS "groups: public read" ON public.groups;
CREATE POLICY "groups: public read"
  ON public.groups FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "groups: authenticated can create" ON public.groups;
CREATE POLICY "groups: authenticated can create"
  ON public.groups FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "groups: leader or admin can update" ON public.groups;
CREATE POLICY "groups: leader or admin can update"
  ON public.groups FOR UPDATE
  USING (auth.uid() = leader_id OR public.is_admin());

-- Group members
DROP POLICY IF EXISTS "members: public read" ON public.group_members;
CREATE POLICY "members: public read"
  ON public.group_members FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "members: own or admin can write" ON public.group_members;
CREATE POLICY "members: own or admin can write"
  ON public.group_members FOR ALL
  USING (auth.uid() = uid OR public.is_admin());

-- Group messages
DROP POLICY IF EXISTS "messages: authenticated read" ON public.group_messages;
CREATE POLICY "messages: authenticated read"
  ON public.group_messages FOR SELECT
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "messages: insert own" ON public.group_messages;
CREATE POLICY "messages: insert own"
  ON public.group_messages FOR INSERT
  WITH CHECK (auth.uid() = uid);

DROP POLICY IF EXISTS "messages: delete own or admin" ON public.group_messages;
CREATE POLICY "messages: delete own or admin"
  ON public.group_messages FOR DELETE
  USING (auth.uid() = uid OR public.is_admin());

-- XP events
DROP POLICY IF EXISTS "xp_events: own" ON public.xp_events;
CREATE POLICY "xp_events: own"
  ON public.xp_events FOR ALL
  USING (user_id = auth.uid());


-- ── Grants ────────────────────────────────────────────────────

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT               ON public.users          TO anon;
GRANT SELECT, INSERT, UPDATE ON public.users        TO authenticated;

GRANT SELECT               ON public.user_profiles  TO anon, authenticated;

GRANT SELECT               ON public.groups         TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.groups TO authenticated;

GRANT SELECT               ON public.group_members  TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.group_members TO authenticated;

GRANT SELECT               ON public.group_messages TO anon;
GRANT SELECT, INSERT, DELETE ON public.group_messages TO authenticated;

GRANT SELECT, INSERT       ON public.xp_events      TO authenticated;

GRANT EXECUTE ON FUNCTION public.is_admin()                TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.join_group(UUID, TEXT)    TO authenticated;
GRANT EXECUTE ON FUNCTION public.leave_group(UUID, UUID)   TO authenticated;
GRANT EXECUTE ON FUNCTION public.activate_groups_access(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.activate_guide_role(TEXT)   TO authenticated;
GRANT EXECUTE ON FUNCTION public.award_xp(TEXT, TEXT)     TO authenticated;
GRANT EXECUTE ON FUNCTION public.process_referral(UUID)   TO authenticated;


-- ── Table: user_interaction_stats ────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_interaction_stats (
  user_id           UUID        NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  entity_type       TEXT        NOT NULL CHECK (entity_type IN ('location', 'provider')),
  entity_id         TEXT        NOT NULL,
  view_count        INTEGER     NOT NULL DEFAULT 0,
  save_count        INTEGER     NOT NULL DEFAULT 0,
  share_count       INTEGER     NOT NULL DEFAULT 0,
  book_now_count    INTEGER     NOT NULL DEFAULT 0,
  coupon_copy_count INTEGER     NOT NULL DEFAULT 0,
  first_viewed_at   TIMESTAMPTZ,
  last_viewed_at    TIMESTAMPTZ,
  last_saved_at     TIMESTAMPTZ,
  last_shared_at    TIMESTAMPTZ,
  last_booked_at    TIMESTAMPTZ,
  PRIMARY KEY (user_id, entity_type, entity_id)
);

ALTER TABLE public.user_interaction_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "own interaction stats" ON public.user_interaction_stats;
CREATE POLICY "own interaction stats" ON public.user_interaction_stats
  FOR ALL USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_interaction_stats_user
  ON public.user_interaction_stats (user_id, entity_type, last_viewed_at DESC);

GRANT ALL ON public.user_interaction_stats TO authenticated;


-- ── Table: location_aggregate_stats ──────────────────────────

CREATE TABLE IF NOT EXISTS public.location_aggregate_stats (
  slug         TEXT        PRIMARY KEY,
  total_views  INTEGER     NOT NULL DEFAULT 0,
  total_saves  INTEGER     NOT NULL DEFAULT 0,
  total_shares INTEGER     NOT NULL DEFAULT 0,
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.location_aggregate_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read aggregate stats" ON public.location_aggregate_stats;
CREATE POLICY "public read aggregate stats" ON public.location_aggregate_stats
  FOR SELECT USING (true);

GRANT SELECT ON public.location_aggregate_stats TO anon, authenticated;
GRANT ALL    ON public.location_aggregate_stats TO service_role;


-- ── RPC: track_interaction ────────────────────────────────────
-- Anon users: increments location_aggregate_stats for viewed/shared only.
-- Auth users: increments both aggregate and per-user user_interaction_stats.
-- Saves always require auth (UI enforces; RPC double-checks via v_uid).

CREATE OR REPLACE FUNCTION public.track_interaction(
  p_entity_type TEXT,
  p_entity_id   TEXT,
  p_event       TEXT
) RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_uid UUID                             := auth.uid();
  v_row public.user_interaction_stats;
  v_agg public.location_aggregate_stats;
BEGIN

  -- ── Aggregate (locations only; anon-safe for viewed + shared) ──
  IF p_entity_type = 'location'
     AND p_event IN ('viewed', 'shared')
     OR (p_entity_type = 'location' AND p_event = 'saved' AND v_uid IS NOT NULL)
  THEN
    INSERT INTO public.location_aggregate_stats (slug)
    VALUES (p_entity_id)
    ON CONFLICT (slug) DO NOTHING;

    UPDATE public.location_aggregate_stats
    SET
      total_views  = total_views  + CASE WHEN p_event = 'viewed' THEN 1 ELSE 0 END,
      total_saves  = total_saves  + CASE WHEN p_event = 'saved'  THEN 1 ELSE 0 END,
      total_shares = total_shares + CASE WHEN p_event = 'shared' THEN 1 ELSE 0 END,
      updated_at   = NOW()
    WHERE slug = p_entity_id
    RETURNING * INTO v_agg;
  END IF;

  -- ── Per-user stats (authenticated only) ──
  IF v_uid IS NOT NULL THEN
    INSERT INTO public.user_interaction_stats (user_id, entity_type, entity_id)
    VALUES (v_uid, p_entity_type, p_entity_id)
    ON CONFLICT (user_id, entity_type, entity_id) DO NOTHING;

    UPDATE public.user_interaction_stats
    SET
      view_count        = view_count        + CASE WHEN p_event = 'viewed'      THEN 1 ELSE 0 END,
      save_count        = save_count        + CASE WHEN p_event = 'saved'       THEN 1 ELSE 0 END,
      share_count       = share_count       + CASE WHEN p_event = 'shared'      THEN 1 ELSE 0 END,
      book_now_count    = book_now_count    + CASE WHEN p_event = 'book_now'    THEN 1 ELSE 0 END,
      coupon_copy_count = coupon_copy_count + CASE WHEN p_event = 'coupon_copy' THEN 1 ELSE 0 END,
      first_viewed_at   = CASE WHEN p_event = 'viewed' AND first_viewed_at IS NULL
                               THEN NOW() ELSE first_viewed_at END,
      last_viewed_at    = CASE WHEN p_event = 'viewed'      THEN NOW() ELSE last_viewed_at  END,
      last_saved_at     = CASE WHEN p_event = 'saved'       THEN NOW() ELSE last_saved_at   END,
      last_shared_at    = CASE WHEN p_event = 'shared'      THEN NOW() ELSE last_shared_at  END,
      last_booked_at    = CASE WHEN p_event = 'book_now'    THEN NOW() ELSE last_booked_at  END
    WHERE user_id = v_uid AND entity_type = p_entity_type AND entity_id = p_entity_id
    RETURNING * INTO v_row;
  END IF;

  RETURN jsonb_build_object(
    'stats', CASE WHEN v_uid IS NOT NULL THEN jsonb_build_object(
      'view_count',        v_row.view_count,
      'save_count',        v_row.save_count,
      'share_count',       v_row.share_count,
      'book_now_count',    v_row.book_now_count,
      'coupon_copy_count', v_row.coupon_copy_count,
      'first_viewed_at',   v_row.first_viewed_at,
      'last_viewed_at',    v_row.last_viewed_at
    ) ELSE NULL END,
    'aggregate', CASE WHEN v_agg.slug IS NOT NULL THEN jsonb_build_object(
      'total_views',  v_agg.total_views,
      'total_saves',  v_agg.total_saves,
      'total_shares', v_agg.total_shares
    ) ELSE NULL END
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.track_interaction(TEXT, TEXT, TEXT) TO authenticated, anon;


-- ── Reports ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reports (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id   UUID        NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reporter_name TEXT        NOT NULL DEFAULT '',
  group_id      TEXT        NOT NULL,
  group_title   TEXT        NOT NULL DEFAULT '',
  message_id    TEXT        NOT NULL,
  message_text  TEXT        NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (reporter_id, message_id)
);
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reports: insert own"   ON public.reports FOR INSERT WITH CHECK (reporter_id = auth.uid());
CREATE POLICY "reports: admin read"   ON public.reports FOR SELECT USING (public.is_admin());
CREATE POLICY "reports: admin delete" ON public.reports FOR DELETE USING (public.is_admin());

GRANT INSERT                ON public.reports TO authenticated;
GRANT SELECT, DELETE        ON public.reports TO authenticated;


-- ── Seed: location_aggregate_stats ───────────────────────────
-- Initial values for all locations.
-- GA-sourced slugs use real page-view data; all others use deterministic
-- hash values matching the UI fallback (so the display never jumps on seed).
-- Re-running this is safe: ON CONFLICT resets to baseline values.
-- After seeding, the RPC auto-increments from these numbers onward.

INSERT INTO public.location_aggregate_stats (slug, total_views, total_saves, total_shares) VALUES
  ('blue-grotto', 971, 45, 29),
  ('il-mara', 1516, 96, 29),
  ('ghar-ir-rih', 2439, 71, 53),
  ('ras-il-mignuna-window', 528, 286, 47),
  ('ras-id-dawwara', 2387, 77, 52),
  ('popeye-village', 1944, 90, 39),
  ('elephant-rock', 2424, 260, 81),
  ('munxar-path', 26845, 1542, 612),
  ('munxar-window', 33219, 2074, 987),
  ('hofriet-window', 561, 137, 16),
  ('bighi-cot-lift', 1587, 101, 98),
  ('wied-il-ghasel', 1585, 261, 15),
  ('coral-lagoon', 663, 45, 42),
  ('il-gebla-l-imtaqqba', 1338, 204, 13),
  ('natural-window', 1883, 149, 94),
  ('mistra-bay', 982, 298, 52),
  ('dingli-cliffs', 628, 124, 17),
  ('st-marks-tower', 1247, 287, 82),
  ('ghar-ic-comb', 1538, 160, 49),
  ('fungus-rock', 2155, 211, 32),
  ('birgu-vittoriosa', 1575, 129, 88),
  ('wied-il-mielah-window', 51634, 3102, 1847),
  ('fort-of-st-angelo', 581, 201, 42),
  ('shrine-of-our-lady-of-mount-carmel', 1211, 35, 44),
  ('la-guardiola', 1943, 111, 75),
  ('mdina-the-silent-city', 2074, 114, 60),
  ('victoria-lines-top-of-the-world', 2387, 167, 43),
  ('migra-l-ferha', 1031, 75, 55),
  ('ras-id-dawwara-cave', 2015, 159, 11),
  ('fomm-ir-rih', 1104, 106, 83),
  ('ghajn-tuffieha-cave', 1086, 156, 10),
  ('inland-sea', 1499, 39, 31),
  ('blata-tal-melh', 820, 284, 66),
  ('tal-mixta-cave', 1368, 166, 28),
  ('secret-spot-cliffside-cave-above-pullicino-s-cove', 1970, 70, 33),
  ('lower-kalkara-gardens', 729, 129, 20),
  ('ta-marija-cave', 84391, 5217, 2843),
  ('cave-facing-fungus-rock', 816, 150, 17),
  ('chinese-garden-of-serenity', 572, 140, 90),
  ('ta-kalanka-sea-cave', 20156, 1247, 531),
  ('xlendi-bay', 1016, 76, 54),
  ('l-ghar-ta-bla-saqaf', 1517, 195, 67),
  ('mini-inland-sea', 49837, 2963, 1421),
  ('st-michael-bastion', 1903, 289, 22),
  ('l-ghawseg', 1276, 146, 98),
  ('paradise-bay', 797, 241, 80),
  ('anchor-bay-popeye-cliffs', 1086, 96, 73),
  ('carolina-grotto', 1612, 248, 45),
  ('babu-valley', 15243, 28, 9),
  ('ghar-hasan-trail-irdum-ta-hal-far', 846, 222, 48),
  ('hidden-sea-cave-near-fort-ricasoli', 643, 151, 41),
  ('ix-xaqqa', 1539, 73, 36),
  ('santa-maria-caves-comino', 584, 190, 48),
  ('wied-il-ghasri', 38492, 2317, 891),
  ('cittadella-victoria-gozo', 1052, 92, 60),
  ('gozo-salt-pans-xwejni', 2362, 86, 83),
  ('ramla-bay-gozo', 1475, 89, 50),
  ('argotti-botanic-gardens', 743, 293, 11),
  ('hondoq-ir-rummien', 43847, 2841, 1203),
  ('rdum-il-qammieh-viewpoint', 29731, 1683, 743),
  ('hidden-rocky-beach-near-gnejna', 10483, 631, 247),
  ('blata-tal-melh-rock-passage', 1857, 99, 28),
  ('qarraba-cliffs', 729, 235, 79),
  ('xlendi-tower-coastal-path', 857, 61, 58),
  ('ghar-hanex', 631, 41, 14)
ON CONFLICT (slug) DO UPDATE SET
  total_views  = EXCLUDED.total_views,
  total_saves  = EXCLUDED.total_saves,
  total_shares = EXCLUDED.total_shares,
  updated_at   = now();
