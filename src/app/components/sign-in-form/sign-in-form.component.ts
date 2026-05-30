import {
  Component, EventEmitter, OnInit, Output, PLATFORM_ID,
  computed, inject, signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { InAppBrowserService } from '../../shared/services/in-app-browser.service';

export type FormState = 'default' | 'android-redirect' | 'email-input' | 'email-sent';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ── Default: Google + email ─────────────────────────── -->
    <ng-container *ngIf="state() === 'default'">
      <button class="sf-btn sf-btn--primary" (click)="signInWithGoogle()" [disabled]="busy">
        <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        {{ loadingGoogle ? 'Signing in…' : 'Continue with Google' }}
      </button>
      <p *ngIf="googleError" class="sf-error">{{ googleError }}</p>

      <div class="sf-divider"><span>or</span></div>

      <input
        #emailDefault
        type="email"
        class="sf-input"
        placeholder="your@email.com"
        autocomplete="email"
        inputmode="email"
        (keydown.enter)="sendLink(emailDefault.value, 'default')">
      <p *ngIf="emailError" class="sf-error">{{ emailError }}</p>
      <button class="sf-btn sf-btn--secondary" (click)="sendLink(emailDefault.value, 'default')" [disabled]="busy">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
        {{ loadingEmail ? 'Sending…' : 'Continue with email' }}
      </button>
    </ng-container>

    <!-- ── Android IAB: redirect to Chrome ─────────────────── -->
    <ng-container *ngIf="state() === 'android-redirect'">
      <div class="sf-redirect-icon">🌐</div>
      <p class="sf-note">Opening Chrome for sign-in…</p>
      <button class="sf-btn sf-btn--primary" (click)="retryAndroidRedirect()">Open in Chrome</button>
    </ng-container>

    <!-- ── iOS IAB: email only ─────────────────────────────── -->
    <ng-container *ngIf="state() === 'email-input'">
      <p class="sf-note">You're in a browser that blocks Google sign-in — no worries! Drop your email and I'll send you a magic link.</p>
      <input
        #emailIab
        type="email"
        class="sf-input"
        placeholder="your@email.com"
        autocomplete="email"
        inputmode="email"
        (keydown.enter)="sendLink(emailIab.value, 'email-input')">
      <p *ngIf="emailError" class="sf-error">{{ emailError }}</p>
      <button class="sf-btn sf-btn--primary" (click)="sendLink(emailIab.value, 'email-input')" [disabled]="loadingEmail">
        {{ loadingEmail ? 'Sending…' : 'Send sign-in link' }}
      </button>
    </ng-container>

    <!-- ── Email sent ──────────────────────────────────────── -->
    <ng-container *ngIf="state() === 'email-sent'">
      <div class="sf-sent-icon">✉️</div>
      <p class="sf-sent-title">Link on its way! ✉️</p>

      <p class="sf-note" *ngIf="!isIabFlow()">
        I've sent a sign-in link to <strong>{{ emailAddress() }}</strong> — just tap it and you're in.
      </p>

      <ng-container *ngIf="isIabFlow()">
        <p class="sf-note">
          I've sent a link to <strong>{{ emailAddress() }}</strong>.
          Tap it in your inbox — it opens in Safari and signs you in.
        </p>
        <div class="sf-steps">
          <div class="sf-step"><span class="sf-step__num">1</span><span>Open your inbox and tap the sign-in link</span></div>
          <div class="sf-step"><span class="sf-step__num">2</span><span>Head to Safari, sign in, then come back here</span></div>
          <div class="sf-step"><span class="sf-step__num">3</span><span>Tap the button below to confirm</span></div>
        </div>
        <button class="sf-btn sf-btn--primary" (click)="checkSignIn()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          I've signed in — check now
        </button>
        <p *ngIf="checkError" class="sf-check-error">{{ checkError }}</p>
      </ng-container>

      <button class="sf-btn sf-btn--ghost" (click)="goBack()">← Try a different email</button>
    </ng-container>
  `,
  styles: [`
    :host { display: contents; }

    // ── Buttons ───────────────────────────────────────────────

    .sf-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      border-radius: var(--radius-xl);
      font-weight: 700;
      cursor: pointer;
      transition: opacity var(--transition), background var(--transition),
                  border-color var(--transition), transform 0.1s;
      &:active:not(:disabled) { transform: scale(0.98); }
      &:disabled { opacity: 0.55; cursor: not-allowed; }
    }

    .sf-btn--primary {
      height: 50px;
      border: none;
      background: var(--color-primary);
      color: #fff;
      font-size: 14.5px;
      box-shadow: 0 4px 16px var(--color-primary-shadow);
      margin-bottom: 10px;
      &:hover:not(:disabled) { opacity: 0.92; }
    }

    .sf-btn--secondary {
      height: 46px;
      border: 1.5px solid var(--color-border);
      background: var(--color-bg);
      color: var(--color-text-secondary);
      font-size: 14px;
      margin-bottom: 16px;
      &:hover:not(:disabled) {
        background: var(--color-bg-muted);
        border-color: var(--color-text-light);
      }
    }

    .sf-btn--ghost {
      height: auto;
      border: none;
      background: none;
      color: var(--color-text-muted);
      font-size: 13px;
      font-weight: 500;
      padding: 6px 0;
      margin-bottom: 0;
      box-shadow: none;
      &:hover { color: var(--color-text-secondary); opacity: 1; }
    }

    // ── Divider ───────────────────────────────────────────────

    .sf-divider {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      margin: 2px 0 12px;

      &::before, &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: var(--color-border);
      }

      span {
        font-size: 11px;
        font-weight: 700;
        color: var(--color-text-light);
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
    }

    // ── Input ─────────────────────────────────────────────────

    .sf-input {
      width: 100%;
      height: 48px;
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 0 14px;
      font-size: 15px;
      color: var(--color-text-base);
      background: var(--color-bg-light);
      outline: none;
      box-sizing: border-box;
      margin-bottom: 8px;
      transition: border-color var(--transition), box-shadow var(--transition);

      &:focus {
        border-color: var(--color-primary);
        background: var(--color-bg);
        box-shadow: 0 0 0 3px rgba(244, 169, 34, 0.1);
      }

      &::placeholder { color: var(--color-text-light); }
    }

    // ── Messages ──────────────────────────────────────────────

    .sf-error {
      margin: 0 0 8px;
      font-size: 12px;
      color: #dc2626;
      text-align: left;
      width: 100%;
    }

    .sf-note {
      font-size: 13.5px;
      color: var(--color-text-muted);
      line-height: 1.55;
      margin: 0 0 18px;
      text-align: center;
      strong { color: var(--color-text-secondary); font-weight: 600; }
    }

    .sf-check-error {
      margin: 4px 0 8px;
      font-size: 12px;
      color: var(--color-text-muted);
      line-height: 1.5;
      text-align: center;
    }

    // ── Redirect ──────────────────────────────────────────────

    .sf-redirect-icon {
      font-size: 48px;
      line-height: 1;
      margin-bottom: 12px;
    }

    // ── Email sent ────────────────────────────────────────────

    .sf-sent-icon {
      font-size: 52px;
      line-height: 1;
      margin-bottom: 12px;
    }

    .sf-sent-title {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: 800;
      color: var(--color-text-base);
      letter-spacing: -0.3px;
    }

    .sf-steps {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      margin-bottom: 20px;
    }

    .sf-step {
      display: flex;
      align-items: center;
      gap: 12px;
      text-align: left;
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text-secondary);
      background: var(--color-bg-muted);
      border-radius: var(--radius-lg);
      padding: 10px 14px;
    }

    .sf-step__num {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--color-primary);
      color: #fff;
      font-size: 11px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
  `],
})
export class SignInFormComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly iab = inject(InAppBrowserService);
  private readonly platformId = inject(PLATFORM_ID);

  @Output() readonly stateChange = new EventEmitter<FormState>();

  readonly state = signal<FormState>('default');
  readonly emailAddress = signal('');
  private readonly backToState = signal<FormState>('default');
  readonly isIabFlow = computed(() => this.backToState() === 'email-input');

  loadingGoogle = false;
  loadingEmail = false;
  googleError = '';
  emailError = '';
  checkError = '';

  get busy(): boolean { return this.loadingGoogle || this.loadingEmail; }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.iab.isInAppBrowser()) return;
    if (this.iab.isAndroid()) {
      this.setState('android-redirect');
      setTimeout(() => this.iab.openInChrome(), 400);
    } else {
      this.setState('email-input');
    }
  }

  async signInWithGoogle(): Promise<void> {
    if (this.busy) return;
    this.loadingGoogle = true;
    this.googleError = '';
    try {
      await this.auth.signInWithGoogle();
    } catch (err: any) {
      this.googleError = this.resolveGoogleError(err?.code);
    } finally {
      this.loadingGoogle = false;
    }
  }

  retryAndroidRedirect(): void {
    this.iab.openInChrome();
  }

  async sendLink(email: string, from: FormState = 'default'): Promise<void> {
    if (this.busy) return;
    const trimmed = email.trim();
    if (!trimmed.includes('@')) {
      this.emailError = 'Please enter a valid email address.';
      return;
    }
    this.loadingEmail = true;
    this.emailError = '';
    try {
      await this.auth.sendEmailSignInLink(trimmed);
      this.emailAddress.set(trimmed);
      this.backToState.set(from);
      this.setState('email-sent');
    } catch {
      this.emailError = 'Could not send the link. Please try again.';
    } finally {
      this.loadingEmail = false;
    }
  }

  checkSignIn(): void {
    if (this.auth.currentSignedInUser()) {
      this.auth.closeLoginModal();
    } else {
      this.checkError = 'Not detected yet — open the email link first, then tap here.';
    }
  }

  goBack(): void {
    this.checkError = '';
    this.emailError = '';
    this.googleError = '';
    this.setState(this.backToState());
  }

  private setState(s: FormState): void {
    this.state.set(s);
    this.stateChange.emit(s);
  }

  private resolveGoogleError(code: string): string {
    switch (code) {
      case 'auth/popup-closed-by-user':
      case 'auth/cancelled-popup-request':
        return 'Sign-in was cancelled.';
      case 'auth/popup-blocked':
        return 'Popup blocked — please allow popups for this site.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      default:
        return 'Sign-in failed. Please try again.';
    }
  }
}
