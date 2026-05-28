import { Component, OnInit, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { InAppBrowserService } from '../../shared/services/in-app-browser.service';

type ModalState = 'default' | 'android-redirect' | 'email-input' | 'email-sent';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" (click)="auth.closeLoginModal()">
      <div class="modal-card" (click)="$event.stopPropagation()">

        <button class="modal-close" (click)="auth.closeLoginModal()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <!-- ── Default: Google + email ──────────────────────── -->
        <ng-container *ngIf="state() === 'default'">
          <div class="modal-header">
            <span class="modal-emoji">🗺️</span>
            <img class="modal-photo" src="/assets/images/profile.webp" alt="John Montaño" width="52" height="52">
          </div>
          <h2 class="modal-title">Sign in to unlock it all</h2>

          <ul class="modal-benefits">
            <li><span class="modal-benefit__icon">🔖</span><span>Save your favourite locations</span></li>
            <li><span class="modal-benefit__icon">🎟️</span><span>Unlock exclusive deals & coupon codes</span></li>
            <li><span class="modal-benefit__icon">📍</span><span>Open directions in Google Maps</span></li>
          </ul>

          <button class="btn-google" (click)="signIn()" [disabled]="loadingGoogle || loadingEmail">
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {{ loadingGoogle ? 'Signing in…' : 'Continue with Google' }}
          </button>

          <div class="divider-or"><span>or</span></div>

          <input
            #emailDefault
            type="email"
            class="email-input"
            placeholder="your@email.com"
            autocomplete="email"
            inputmode="email"
            (keydown.enter)="sendLink(emailDefault.value, 'default')">
          <p *ngIf="emailError" class="field-error">{{ emailError }}</p>
          <button class="btn-email" (click)="sendLink(emailDefault.value, 'default')" [disabled]="loadingGoogle || loadingEmail">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            {{ loadingEmail ? 'Sending link…' : 'Continue with email' }}
          </button>

          <p class="modal-legal">By signing in you agree to our <a href="/privacy" target="_blank">Privacy Policy</a>.</p>
        </ng-container>

        <!-- ── Android IAB: redirect to Chrome ───────────── -->
        <ng-container *ngIf="state() === 'android-redirect'">
          <div class="modal-header">
            <span class="modal-emoji">🌐</span>
          </div>
          <h2 class="modal-title">Opening Chrome…</h2>
          <p class="modal-subtitle">Google sign-in requires a full browser. We're opening Chrome for you now.</p>
          <button class="btn-google" (click)="retryAndroidRedirect()">Open in Chrome</button>
          <p class="modal-legal">Chrome will open this page so you can sign in normally.</p>
        </ng-container>

        <!-- ── iOS IAB: email only ────────────────────────── -->
        <ng-container *ngIf="state() === 'email-input'">
          <div class="modal-header">
            <span class="modal-emoji">✉️</span>
            <img class="modal-photo" src="/assets/images/profile.webp" alt="John Montaño" width="52" height="52">
          </div>
          <h2 class="modal-title">Sign in via email</h2>
          <p class="modal-subtitle">Google sign-in isn't available in this browser. Enter your email and we'll send you a one-tap sign-in link.</p>
          <input
            #emailIab
            type="email"
            class="email-input"
            placeholder="your@email.com"
            autocomplete="email"
            inputmode="email"
            (keydown.enter)="sendLink(emailIab.value, 'email-input')">
          <p *ngIf="emailError" class="field-error">{{ emailError }}</p>
          <button class="btn-google" (click)="sendLink(emailIab.value, 'email-input')" [disabled]="loadingEmail">
            {{ loadingEmail ? 'Sending…' : 'Send sign-in link' }}
          </button>
          <p class="modal-legal">By signing in you agree to our <a href="/privacy" target="_blank">Privacy Policy</a>.</p>
        </ng-container>

        <!-- ── Email sent ─────────────────────────────────── -->
        <ng-container *ngIf="state() === 'email-sent'">
          <div class="sent-icon">✉️</div>
          <h2 class="modal-title">Check your email</h2>

          <!-- Regular user: sign-in completes automatically -->
          <ng-container *ngIf="!isIabFlow()">
            <p class="modal-subtitle">
              We sent a sign-in link to <strong>{{ emailAddress() }}</strong>.
              Tap the link — your browser will sign you in automatically.
            </p>
          </ng-container>

          <!-- IAB user: must return and confirm manually -->
          <ng-container *ngIf="isIabFlow()">
            <p class="modal-subtitle">
              We sent a link to <strong>{{ emailAddress() }}</strong>.
              Tap it in your inbox — it'll open in Safari and sign you in.
            </p>
            <div class="sent-steps">
              <div class="sent-step">
                <span class="sent-step__num">1</span>
                <span>Open your inbox and tap the sign-in link</span>
              </div>
              <div class="sent-step">
                <span class="sent-step__num">2</span>
                <span>Sign in in Safari, then come back here</span>
              </div>
              <div class="sent-step">
                <span class="sent-step__num">3</span>
                <span>Tap the button below to confirm</span>
              </div>
            </div>
            <button class="btn-google" (click)="checkSignIn()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              I've signed in — check now
            </button>
            <p *ngIf="checkError" class="check-error">{{ checkError }}</p>
          </ng-container>

          <button class="btn-ghost" (click)="goBack()">← Try a different email</button>
        </ng-container>

      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 20px;
      animation: amFadeIn 0.25s ease;
    }

    .modal-card {
      background: var(--color-bg);
      border-radius: 22px;
      padding: 36px 24px 26px;
      width: 100%;
      max-width: 340px;
      max-height: calc(100dvh - 40px);
      overflow-y: auto;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.22), 0 4px 16px rgba(0, 0, 0, 0.1);
      animation: amSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .modal-close {
      position: absolute;
      top: 14px;
      right: 14px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      color: var(--color-text-muted);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background var(--transition);
      &:hover { background: var(--color-bg-muted); }
    }

    // ── Header ───────────────────────────────────────────────

    .modal-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 18px;
    }

    .modal-emoji {
      font-size: 56px;
      line-height: 1;
      width: 52px;
      text-align: center;
    }

    .modal-photo {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-lg);
      object-fit: cover;
      object-position: center top;
      border: 2px solid var(--color-primary);
      box-shadow: 0 0 0 3px rgba(244, 169, 34, 0.15);
      flex-shrink: 0;
    }

    // ── Typography ───────────────────────────────────────────

    .modal-title {
      margin: 0 0 18px;
      font-size: 21px;
      font-weight: 800;
      color: var(--color-text-base);
      letter-spacing: -0.4px;
      line-height: 1.2;
    }

    .modal-subtitle {
      margin: 0 0 22px;
      font-size: 13.5px;
      color: var(--color-text-muted);
      line-height: 1.55;
      strong { color: var(--color-text-secondary); font-weight: 600; }
    }

    .modal-legal {
      font-size: 11px;
      color: var(--color-text-light);
      margin: 0;
      a { color: var(--color-text-muted); text-decoration: underline; }
    }

    // ── Benefits list ────────────────────────────────────────

    .modal-benefits {
      list-style: none;
      margin: 0 0 20px;
      padding: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .modal-benefits li {
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

    .modal-benefit__icon {
      font-size: 18px;
      flex-shrink: 0;
      line-height: 1;
    }

    // ── Divider ──────────────────────────────────────────────

    .divider-or {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      margin: 4px 0 12px;

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

    // ── Email input ──────────────────────────────────────────

    .email-input {
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

    .field-error {
      margin: 0 0 8px;
      font-size: 12px;
      color: #dc2626;
      text-align: left;
      width: 100%;
    }

    // ── Email sent ───────────────────────────────────────────

    .sent-icon {
      font-size: 52px;
      line-height: 1;
      margin-bottom: 16px;
    }

    .sent-steps {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      margin-bottom: 20px;
    }

    .sent-step {
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

    .sent-step__num {
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

    .check-error {
      margin: 4px 0 8px;
      font-size: 12px;
      color: var(--color-text-muted);
      line-height: 1.5;
    }

    // ── Buttons ──────────────────────────────────────────────

    .btn-google {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      border: none;
      border-radius: var(--radius-xl);
      background: var(--color-primary);
      color: #fff;
      font-size: 14.5px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 16px var(--color-primary-shadow);
      transition: opacity var(--transition), transform 0.1s;
      margin-bottom: 10px;
      &:hover:not(:disabled) { opacity: 0.92; }
      &:active:not(:disabled) { transform: scale(0.98); }
      &:disabled { opacity: 0.55; cursor: default; }
    }

    .btn-email {
      width: 100%;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-xl);
      background: var(--color-bg);
      color: var(--color-text-secondary);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background var(--transition), border-color var(--transition), transform 0.1s;
      margin-bottom: 16px;
      &:hover:not(:disabled) {
        background: var(--color-bg-muted);
        border-color: var(--color-text-light);
      }
      &:active:not(:disabled) { transform: scale(0.98); }
      &:disabled { opacity: 0.55; cursor: default; }
    }

    .btn-ghost {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text-muted);
      padding: 6px 0;
      transition: color var(--transition);
      &:hover { color: var(--color-text-secondary); }
    }

    @keyframes amFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    @keyframes amSlideUp {
      from { opacity: 0; transform: translateY(24px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
  `],
})
export class AuthModalComponent implements OnInit {
  readonly auth = inject(AuthService);
  private readonly iab = inject(InAppBrowserService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly state = signal<ModalState>('default');
  readonly emailAddress = signal('');
  private readonly backToState = signal<ModalState>('default');

  /** True when the email flow was started from an iOS IAB session. */
  readonly isIabFlow = computed(() => this.backToState() === 'email-input');

  loadingGoogle = false;
  loadingEmail = false;
  emailError = '';
  checkError = '';

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.iab.isInAppBrowser()) return;

    if (this.iab.isAndroid()) {
      this.state.set('android-redirect');
      setTimeout(() => this.iab.openInChrome(), 400);
    } else {
      this.state.set('email-input');
    }
  }

  async signIn(): Promise<void> {
    this.loadingGoogle = true;
    try {
      await this.auth.signInWithGoogle();
    } finally {
      this.loadingGoogle = false;
    }
  }

  retryAndroidRedirect(): void {
    this.iab.openInChrome();
  }

  async sendLink(email: string, from: ModalState): Promise<void> {
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
      this.state.set('email-sent');
    } catch {
      this.emailError = 'Could not send the link. Please try again.';
    } finally {
      this.loadingEmail = false;
    }
  }

  checkSignIn(): void {
    const user = this.auth.currentSignedInUser();
    if (user) {
      this.auth.closeLoginModal();
    } else {
      this.checkError = "Not detected yet. Open the email link first, then tap this button.";
    }
  }

  goBack(): void {
    this.checkError = '';
    this.emailError = '';
    this.state.set(this.backToState());
  }
}
