import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '@supabase/supabase-js';
import { supabase } from '@map/core/config/supabase.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly user             = signal<User | null>(null);
  readonly isLoggedIn       = computed(() => !!this.user());
  readonly showLoginModal   = signal(false);

  // Computed helpers — Supabase stores display info in user_metadata
  readonly userDisplayName  = computed(() =>
    this.user()?.user_metadata?.['full_name'] ?? this.user()?.email ?? ''
  );
  readonly userPhotoURL     = computed(() =>
    this.user()?.user_metadata?.['avatar_url'] ?? ''
  );
  readonly userEmail        = computed(() => this.user()?.email ?? '');

  private static readonly RETURN_PATH_KEY = 'auth_return_path';

  private get redirectUrl(): string {
    return `${window.location.origin}/malta`;
  }

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      supabase.auth.onAuthStateChange((event, session) => {
        this.user.set(session?.user ?? null);
        if (event === 'SIGNED_IN' && session?.user) {
          void this.processReferral(session.user.id);
        }
      });
    }
  }

  async signInWithGoogle(): Promise<void> {
    sessionStorage.setItem(AuthService.RETURN_PATH_KEY, window.location.pathname + window.location.search);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: this.redirectUrl },
    });
  }

  async sendEmailSignInLink(email: string): Promise<void> {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: this.redirectUrl },
    });
    if (error) throw error;
  }

  consumeReturnPath(): string {
    const path = sessionStorage.getItem(AuthService.RETURN_PATH_KEY) || '/malta';
    sessionStorage.removeItem(AuthService.RETURN_PATH_KEY);
    return path;
  }

  /** True when the URL contains Supabase auth tokens (magic link or OAuth redirect). */
  isEmailSignInLink(href: string): boolean {
    return href.includes('access_token=') || new URL(href).searchParams.has('code');
  }

  async completeEmailSignIn(_href: string): Promise<boolean> {
    // Supabase processes the URL hash/code automatically on createClient() init.
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  }

  currentSignedInUser(): User | null {
    return this.user();
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }

  openLoginModal(): void {
    if (this.isLoggedIn()) return;
    this.showLoginModal.set(true);
  }

  closeLoginModal(): void {
    this.showLoginModal.set(false);
  }

  private async processReferral(uid: string): Promise<void> {
    const ref = sessionStorage.getItem('vm_ref');
    if (!ref) return;
    sessionStorage.removeItem('vm_ref');

    // Resolve referral code to a user id
    const { data: referrer } = await supabase
      .from('users')
      .select('id')
      .eq('referral_code', ref.toUpperCase())
      .maybeSingle();

    if (!referrer || (referrer as Record<string, unknown>)['id'] === uid) return;

    const referrerId = (referrer as Record<string, unknown>)['id'] as string;
    await supabase.rpc('process_referral', { p_referrer_id: referrerId });
  }
}
