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

        <div class="modal-logo">🗺️</div>
        <h2 class="modal-title">Unlock exclusive deals</h2>
        <p class="modal-subtitle">Sign in to reveal discount codes and save your favourite spots across Malta & Gozo.</p>

        <button class="btn-google" (click)="signIn()" [disabled]="loading">
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.8 2.5 30.3 0 24 0 14.7 0 6.7 5.4 2.9 13.3l7.8 6C12.5 13 17.8 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17z"/>
            <path fill="#FBBC05" d="M10.7 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.5 10.8l8.2-6.1z"/>
            <path fill="#34A853" d="M24 48c6.2 0 11.5-2 15.3-5.5l-7.5-5.8c-2 1.4-4.6 2.3-7.8 2.3-6.2 0-11.5-4.2-13.3-9.9l-8.2 6.1C6.7 42.6 14.7 48 24 48z"/>
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
      background: rgba(0, 0, 0, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 16px;
      animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .modal-card {
      background: #fff;
      border-radius: 20px;
      padding: 36px 28px 28px;
      width: 100%;
      max-width: 380px;
      position: relative;
      text-align: center;
      animation: slideUp 0.2s ease;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
    }

    @keyframes slideUp {
      from { transform: translateY(16px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
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

    .modal-logo {
      font-size: 40px;
      margin-bottom: 12px;
      line-height: 1;
    }

    .modal-title {
      margin: 0 0 8px;
      font-size: 20px;
      font-weight: 800;
      color: var(--color-text-base);
    }

    .modal-subtitle {
      margin: 0 0 28px;
      font-size: 14px;
      color: var(--color-text-muted);
      line-height: 1.5;
    }

    .btn-google {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 13px 20px;
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-lg);
      background: #fff;
      font-size: 15px;
      font-weight: 600;
      color: var(--color-text-base);
      cursor: pointer;
      transition: background var(--transition), box-shadow var(--transition);
      &:hover:not(:disabled) {
        background: var(--color-bg-light);
        box-shadow: var(--shadow-sm);
      }
      &:disabled { opacity: 0.6; cursor: default; }
    }

    .modal-legal {
      margin: 16px 0 0;
      font-size: 11px;
      color: var(--color-text-light);
      a { color: var(--color-text-muted); text-decoration: underline; }
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
