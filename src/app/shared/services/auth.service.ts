import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  Auth, GoogleAuthProvider,
  isSignInWithEmailLink, onAuthStateChanged,
  sendSignInLinkToEmail, signInWithEmailLink,
  signInWithPopup, signOut, User,
} from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly platformId = inject(PLATFORM_ID);

  readonly user = signal<User | null>(null);
  readonly isLoggedIn = computed(() => !!this.user());
  readonly showLoginModal = signal(false);

  private readonly EMAIL_KEY = 'emailForSignIn';
  private readonly CONTINUE_URL = 'https://johnfabiomb.com/malta';

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      onAuthStateChanged(this.auth, user => this.user.set(user));
    }
  }

  async signInWithGoogle(): Promise<void> {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
    this.showLoginModal.set(false);
  }

  /**
   * Sends a Firebase email sign-in link.
   * The email is embedded in continueUrl so it survives cross-browser completion.
   * Requires "Email link (passwordless sign-in)" enabled in Firebase console.
   */
  async sendEmailSignInLink(email: string): Promise<void> {
    const continueUrl = `${this.CONTINUE_URL}?email=${encodeURIComponent(email)}`;
    await sendSignInLinkToEmail(this.auth, email, {
      url: continueUrl,
      handleCodeInApp: true,
    });
    localStorage.setItem(this.EMAIL_KEY, email);
  }

  isEmailSignInLink(href: string): boolean {
    return isSignInWithEmailLink(this.auth, href);
  }

  async completeEmailSignIn(href: string): Promise<boolean> {
    if (!isSignInWithEmailLink(this.auth, href)) return false;
    try {
      const params = new URL(href).searchParams;
      const email = params.get('email') ?? localStorage.getItem(this.EMAIL_KEY) ?? '';
      if (!email) return false;
      await signInWithEmailLink(this.auth, email, href);
      localStorage.removeItem(this.EMAIL_KEY);
      this.showLoginModal.set(false);
      return true;
    } catch {
      return false;
    }
  }

  /** Returns the locally cached current user — no Firebase network call. */
  currentSignedInUser(): User | null {
    return this.auth.currentUser;
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
  }

  openLoginModal(): void {
    this.showLoginModal.set(true);
  }

  closeLoginModal(): void {
    this.showLoginModal.set(false);
  }
}
