import { Injectable, signal } from '@angular/core';
import { bookingsDb } from '@booking/core/db/supabase.bookings';

export type AuthState = 'loading' | 'signed-out' | 'no-access' | 'admin';

const ROLE_CACHE_KEY = 'jm-bookings-admin';

@Injectable({ providedIn: 'root' })
export class BookingsAuthService {
  readonly state = signal<AuthState>('loading');
  /** The org this admin owns/administers (single-org for now). */
  readonly orgId = signal<string | null>(null);
  /** The org's feature flags (e.g. work_board). */
  readonly features = signal<{ work_board?: boolean }>({});
  private _initPromise: Promise<void> | null = null;

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
        console.log('[BookingsAuth] getSession →', session ? `uid=${session.user.id}` : 'null');
        await this.resolveRole(session?.user?.id ?? null);
        console.log('[BookingsAuth] state →', this.state());
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
        console.log('[BookingsAuth] auth event:', event, session?.user?.id ?? 'null');
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
    this.state.set('signed-out');
  }

  // ── Helpers ───────────────────────────────────────────────────────────────────

  private async resolveRole(userId: string | null): Promise<void> {
    if (!userId) {
      localStorage.removeItem(ROLE_CACHE_KEY);
      this.state.set('signed-out');
      return;
    }

    try {
      // Admin = owner/admin of at least one organization (single-org for now).
      const { data, error } = await bookingsDb
        .from('org_members')
        .select('org_id, role')
        .eq('user_id', userId)
        .in('role', ['owner', 'admin'])
        .limit(1)
        .maybeSingle();
      console.log('[BookingsAuth] org_members →', data, error ?? '');

      if (error) {
        console.warn('[BookingsAuth] org_members error (keeping current state):', error.message);
        if (this.state() === 'loading') this.state.set('no-access');
        return;
      }

      if (data?.org_id) {
        this.orgId.set(data.org_id);
        localStorage.setItem(ROLE_CACHE_KEY, JSON.stringify({ uid: userId, org: data.org_id }));
        this.state.set('admin');
        // Load org feature flags (non-blocking — nav updates when it resolves).
        bookingsDb.from('organizations').select('features').eq('id', data.org_id).maybeSingle()
          .then(({ data: o }) => this.features.set(((o as { features?: { work_board?: boolean } } | null)?.features ?? {})));
      } else {
        this.orgId.set(null);
        localStorage.removeItem(ROLE_CACHE_KEY);
        this.state.set('no-access');
      }
    } catch (err) {
      console.log('[BookingsAuth] org_members threw →', err);
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
