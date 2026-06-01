import { Component, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { SignInFormComponent, FormState } from '@ui/sign-in-form/sign-in-form.component';
import { InAppBrowserService } from '@core/services/in-app-browser.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, SignInFormComponent],
  template: `
    <div class="modal-backdrop" (click)="auth.closeLoginModal()">
      <div class="modal-card" (click)="$event.stopPropagation()">

        <button class="modal-close" (click)="auth.closeLoginModal()" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <!-- Header + title hidden when form shows its own full-screen state -->
        <ng-container *ngIf="formState() === 'default' || formState() === 'email-input'">
          <div class="modal-header">
            <span class="modal-emoji">🗺️</span>
            <img class="modal-photo" src="/assets/images/profile.webp" alt="John Montaño" width="52" height="52">
          </div>
          <p class="modal-hey">Hey, I'm John 👋</p>
          <h2 class="modal-title">It's way better signed in</h2>
        </ng-container>

        <ul class="modal-benefits" *ngIf="formState() === 'default' || formState() === 'email-input'">
          <li><span class="modal-benefit__icon">🧭</span><span>Don't explore alone — meet people who love Malta as much as you</span></li>
          <li><span class="modal-benefit__icon">🔖</span><span>Save your favourite spots and revisit them anytime</span></li>
          <li><span class="modal-benefit__icon">🎟️</span><span>Get real discounts from local partners I trust</span></li>
          <li><span class="modal-benefit__icon">⚡</span><span>Open Google Maps instantly — no wait</span></li>
          <li><span class="modal-benefit__icon">📶</span><span>Browse the map offline, even without signal</span></li>
          <li><span class="modal-benefit__icon">🔔</span><span>Get notified when I add new spots to the map</span></li>
        </ul>

        <app-sign-in-form (stateChange)="formState.set($event)"></app-sign-in-form>

        <p class="modal-legal" *ngIf="formState() !== 'email-sent'">
          By signing in you agree to our <a href="/privacy" target="_blank">Privacy Policy</a>.
        </p>

        <button class="modal-guest"
          *ngIf="formState() === 'default' || formState() === 'email-input'"
          (click)="auth.closeLoginModal()">
          Maybe later — continue as guest
        </button>

      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      z-index: 9999;
      padding: 20px;
      overflow-y: auto;
      animation: amFadeIn 0.25s ease;
    }

    .modal-card {
      background: var(--color-bg);
      border-radius: 22px;
      padding: 36px 24px 26px;
      width: 100%;
      max-width: 340px;
      margin: auto;
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

    .modal-hey {
      margin: 0 0 4px;
      font-size: 13px;
      font-weight: 600;
      color: var(--color-primary);
      letter-spacing: 0.01em;
    }

    .modal-title {
      margin: 0 0 18px;
      font-size: 21px;
      font-weight: 800;
      color: var(--color-text-base);
      letter-spacing: -0.4px;
      line-height: 1.2;
    }

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

    .modal-benefit__icon { font-size: 18px; flex-shrink: 0; line-height: 1; }

    .modal-legal {
      font-size: 11px;
      color: var(--color-text-light);
      margin: 0 0 4px;
      a { color: var(--color-text-muted); text-decoration: underline; }
    }

    .modal-guest {
      background: none;
      border: none;
      padding: 6px 0 2px;
      font-size: 12px;
      color: var(--color-text-light);
      cursor: pointer;
      transition: color var(--transition);
      &:hover { color: var(--color-text-muted); }
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
  readonly auth       = inject(AuthService);
  private readonly iab        = inject(InAppBrowserService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly formState = signal<FormState>('default');

  constructor() {
    // Set the correct initial state before first render so header/benefits show correctly
    if (isPlatformBrowser(this.platformId) && this.iab.isInAppBrowser()) {
      this.formState.set(this.iab.isAndroid() ? 'android-redirect' : 'email-input');
    }

    effect(() => {
      if (this.auth.isLoggedIn()) {
        this.auth.showLoginModal.set(false);
      }
    });
  }
}
