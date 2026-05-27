import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';

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

        <div class="modal-header">
          <span class="modal-emoji">🗺️</span>
          <img class="modal-photo" src="/assets/images/profile.webp" alt="John Montaño" width="52" height="52">
        </div>

        <h2 class="modal-title">Sign in to unlock it all</h2>
        <p class="modal-subtitle">Save spots, reveal coupon codes and get directions across Malta & Gozo.</p>

        <ul class="modal-benefits">
          <li>
            <span class="modal-benefit__icon">🔖</span>
            <span>Save your favourite locations</span>
          </li>
          <li>
            <span class="modal-benefit__icon">🎟️</span>
            <span>Unlock exclusive deals & coupon codes</span>
          </li>
          <li>
            <span class="modal-benefit__icon">📍</span>
            <span>Open directions in Google Maps</span>
          </li>
        </ul>

        <button class="btn-google" (click)="signIn()" [disabled]="loading">
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {{ loading ? 'Signing in…' : 'Continue with Google' }}
        </button>

        <p class="modal-legal">By signing in you agree to our <a href="/privacy" target="_blank">Privacy Policy</a>.</p>
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

    .modal-title {
      margin: 0 0 10px;
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
    }

    .modal-benefits {
      list-style: none;
      margin: 0 0 26px;
      padding: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
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
      padding: 11px 14px;
    }

    .modal-benefit__icon {
      font-size: 20px;
      flex-shrink: 0;
      line-height: 1;
    }

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
      &:disabled { opacity: 0.6; cursor: default; }
    }

    .modal-legal {
      font-size: 11px;
      color: var(--color-text-light);
      margin: 0;
      a { color: var(--color-text-muted); text-decoration: underline; }
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
export class AuthModalComponent {
  readonly auth = inject(AuthService);
  loading = false;

  async signIn(): Promise<void> {
    this.loading = true;
    try {
      await this.auth.signInWithGoogle();
    } finally {
      this.loading = false;
    }
  }
}
