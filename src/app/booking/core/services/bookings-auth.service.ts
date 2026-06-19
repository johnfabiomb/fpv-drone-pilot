import { Injectable, signal } from '@angular/core';
import { bookingsDb } from '@booking/core/db/supabase.bookings';

export type AuthState = 'loading' | 'signed-out' | 'no-access' | 'admin';

const ROLE_CACHE_KEY = 'jm-bookings-admin';

@Injectable({ providedIn: 'root' })
export class BookingsAuthService {
  readonly state = signal<AuthState>('loading');
  /** The currently-active org (the one the studio UI is showing). */
  readonly orgId = signal<string | null>(null);
  /** Every org the signed-in user owns/administers (drives the switcher + Organizations page). */
  readonly orgs = signal<{ id: string; name: string; slug: string; role: string }[]>([]);
  /** Platform super-admin — may create organizations. */
  readonly isPlatformAdmin = signal(false);
  /** The org's feature flags (e.g. work_board). */
  readonly features = signal<{ work_board?: boolean }>({});
  private _initPromise: Promise<void> | null = null;
  private currentUserId: string | null = null;
  /** Last user we resolved — dedupes the getSession + onAuthStateChange double-run on load. */
  private lastResolvedUser: string | null = null;

  initialize(): Promise<void> {
    if (this._initPromise) return this._initPromise;

    // ── Fast path ──────────────────────────────────────────────────────────────
    // Read the Supabase session and our role cache from localStorage synchronously.
    // If both exist we know immediately the user is admin — no network call needed.
    // getSession() + the user_roles query still run in the background to refresh
    // the token and re-validate the role, but they no longer block the UI.
    const storedUserId = this.readStoredUserId();
    const cached = storedUserId ? this.readCache(storedUserId) : null;
    if (cached) {
      this.orgId.set(cached.org ?? null);
      this.state.set('admin');
    }

    this._initPromise = new Promise<void>((resolve) => {
      let settled = false;
      const settle = () => { if (!settled) { settled = true; resolve(); } };

      // If the Supabase project is slow/cold this fires after 8 s.
      // By then state is already set from cache so the timeout only
      // clears loading-state for users with no session at all.
      const timeout = setTimeout(() => {
        if (this.state() === 'loading') this.state.set('signed-out');
        settle();
      }, 8000);

      bookingsDb.auth.getSession().then(async ({ data: { session } }) => {
        clearTimeout(timeout);
        await this.resolveRole(session?.user?.id ?? null);
        settle();
      }).catch(() => {
        clearTimeout(timeout);
        // Network failure — keep whatever state was set from cache; only fall
        // back to signed-out if we never had a cached session.
        if (this.state() === 'loading') this.state.set('signed-out');
        settle();
      });

      // Only react to actual session changes, not TOKEN_REFRESHED which races
      // with the getSession() call above.
      //
      // CRITICAL: never await a Supabase call (query or getSession) directly inside
      // this callback. onAuthStateChange is awaited by the client *inside* its own
      // initializePromise; any query here awaits getSession() → initializePromise,
      // which is still pending → the whole client deadlocks and every request times
      // out. Defer with setTimeout(0) so _initialize() can resolve first, then run
      // the role lookup against a working session. (Documented Supabase footgun.)
      bookingsDb.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
          setTimeout(() => { void this.resolveRole(session?.user?.id ?? null); }, 0);
        }
      });
    });

    return this._initPromise;
  }

  async signInWithGoogle(): Promise<void> {
    await bookingsDb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/bookings` },
    });
  }

  async signIn(email: string): Promise<void> {
    await bookingsDb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/bookings` },
    });
  }

  async signOut(): Promise<void> {
    await bookingsDb.auth.signOut();
    localStorage.removeItem(ROLE_CACHE_KEY);
    this.lastResolvedUser = null;
    this.state.set('signed-out');
  }

  // ── Helpers ───────────────────────────────────────────────────────────────────

  /** Re-resolve the user's orgs/role (e.g. after creating an org or adding a member). */
  async refresh(): Promise<void> {
    if (this.currentUserId) await this.resolveRole(this.currentUserId, true);
  }

  /** Switch the active org (used by the sidebar switcher). Must be one of `orgs()`. */
  setActiveOrg(orgId: string): void {
    if (!this.orgs().some(o => o.id === orgId)) return;
    this.applyActiveOrg(orgId);
  }

  private applyActiveOrg(orgId: string): void {
    const orgChanged = this.orgId() !== orgId;
    this.orgId.set(orgId);
    if (this.currentUserId) {
      localStorage.setItem(ROLE_CACHE_KEY, JSON.stringify({ uid: this.currentUserId, org: orgId }));
    }
    // Only blank the flags when actually switching org — re-resolving the same org
    // shouldn't flash dependent UI (e.g. the Work tab) off and back on.
    if (orgChanged) this.features.set({});
    bookingsDb.from('organizations').select('features').eq('id', orgId).maybeSingle()
      .then(({ data: o }) => this.features.set(((o as { features?: { work_board?: boolean } } | null)?.features ?? {})));
  }

  private async resolveRole(userId: string | null, force = false): Promise<void> {
    // Dedupe: getSession() and onAuthStateChange('SIGNED_IN') both fire on load for the
    // same user — resolve once (unless forced via refresh()) to avoid hammering the DB.
    if (!force && userId && userId === this.lastResolvedUser) return;
    this.lastResolvedUser = userId;

    if (!userId) {
      this.currentUserId = null;
      this.orgs.set([]);
      localStorage.removeItem(ROLE_CACHE_KEY);
      this.state.set('signed-out');
      return;
    }
    this.currentUserId = userId;

    try {
      // Admin = owner/admin of one OR MORE organizations.
      const { data, error } = await bookingsDb
        .from('org_members')
        .select('org_id, role, organizations(name, slug)')
        .eq('user_id', userId)
        .in('role', ['owner', 'admin'])
        .order('role');

      if (error) {
        console.warn('[BookingsAuth] org_members error (keeping current state):', error.message);
        if (this.state() === 'loading') this.state.set('no-access');
        return;
      }

      const orgs = (data ?? []).map((r) => {
        const o = (Array.isArray(r.organizations) ? r.organizations[0] : r.organizations) as { name?: string; slug?: string } | null;
        return { id: r.org_id as string, role: r.role as string, name: o?.name ?? 'Organization', slug: o?.slug ?? '' };
      });
      this.orgs.set(orgs);

      // Platform super-admin? (non-blocking; gates the "Create organization" UI)
      bookingsDb.from('platform_admins').select('user_id').eq('user_id', userId).maybeSingle()
        .then(({ data }) => this.isPlatformAdmin.set(!!data));

      if (orgs.length === 0) {
        this.orgId.set(null);
        localStorage.removeItem(ROLE_CACHE_KEY);
        this.state.set('no-access');
        return;
      }

      // Keep the previously-active org if the user is still a member, else the first.
      const cachedOrg = this.readCache(userId)?.org;
      const active = orgs.find(o => o.id === cachedOrg)?.id ?? orgs[0].id;
      this.applyActiveOrg(active);
      this.state.set('admin');
    } catch (err) {
      if (this.state() === 'loading') this.state.set('no-access');
    }
  }

  private readStoredUserId(): string | null {
    try {
      const raw = localStorage.getItem('sb-odmwjhysvvbhxytyefhv-auth-token');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.user?.id ?? parsed?.currentSession?.user?.id ?? null;
    } catch { return null; }
  }

  private readCache(userId: string): { uid: string; org: string | null } | null {
    try {
      const raw = localStorage.getItem(ROLE_CACHE_KEY);
      if (!raw) return null;
      const c = JSON.parse(raw);
      return c?.uid === userId ? { uid: c.uid, org: c.org ?? null } : null;
    } catch { return null; }
  }
}
