import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-welcome-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible()" class="wp-backdrop" (click)="dismiss()">
      <div class="wp-card" (click)="$event.stopPropagation()">

        <div class="wp-header">
          <span class="wp-emoji">🗺️</span>
          <img class="wp-photo" src="/assets/images/profile.webp" alt="John Montaño" width="52" height="52" style="flex-shrink:0">
        </div>

        <p class="wp-hey">Hey, I'm John 👋</p>
        <h2 class="wp-title">Welcome to My Malta Map!</h2>
        <p class="wp-sub">Your guide to Malta's best spots — sign in to get the most out of it.</p>

        <ul class="wp-benefits">
          <li>
            <span class="wp-benefit__icon">🔖</span>
            <span>Save your favourite spots and revisit them anytime</span>
          </li>
          <li>
            <span class="wp-benefit__icon">🎟️</span>
            <span>Unlock exclusive deals & coupon codes from local partners</span>
          </li>
          <li>
            <span class="wp-benefit__icon">📍</span>
            <span>Get directions straight to every location on the map</span>
          </li>
        </ul>

        <button class="wp-btn wp-btn--primary" (click)="signIn()">
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        <button class="wp-btn wp-btn--ghost" (click)="dismiss()">
          Continue as guest
        </button>

      </div>
    </div>
  `,
  styles: [`
    .wp-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1200;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: wpFadeIn 0.3s ease;
    }

    .wp-card {
      background: var(--color-bg);
      border-radius: 22px;
      padding: 36px 24px 26px;
      width: 100%;
      max-width: 340px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.22), 0 4px 16px rgba(0, 0, 0, 0.1);
      animation: wpSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .wp-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 18px;
    }

    .wp-emoji {
      font-size: 56px;
      line-height: 1;
      width: 52px;
      text-align: center;
    }

    .wp-photo {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-lg);
      object-fit: cover;
      object-position: center top;
      border: 2px solid var(--color-primary);
      box-shadow: 0 0 0 3px rgba(244, 169, 34, 0.15);
    }

    .wp-hey {
      margin: 0 0 4px;
      font-size: 13px;
      font-weight: 600;
      color: var(--color-primary);
      letter-spacing: 0.01em;
    }

    .wp-title {
      margin: 0 0 8px;
      font-size: 20px;
      font-weight: 800;
      color: var(--color-text-base);
      letter-spacing: -0.4px;
      line-height: 1.2;
    }

    .wp-sub {
      margin: 0 0 20px;
      font-size: 12.5px;
      color: var(--color-text-muted);
      line-height: 1.5;
    }

    .wp-benefits {
      list-style: none;
      margin: 0 0 26px;
      padding: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .wp-benefits li {
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

    .wp-benefit__icon {
      font-size: 20px;
      flex-shrink: 0;
      line-height: 1;
    }

    .wp-btn {
      width: 100%;
      border-radius: var(--radius-xl);
      font-size: 14.5px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: opacity var(--transition), background var(--transition), transform 0.1s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      &:active { transform: scale(0.98); }
    }

    .wp-btn--primary {
      height: 50px;
      background: var(--color-primary);
      color: #fff;
      margin-bottom: 10px;
      box-shadow: 0 4px 16px var(--color-primary-shadow);
      &:hover { opacity: 0.92; }
    }

    .wp-btn--ghost {
      height: 38px;
      background: transparent;
      color: var(--color-text-muted);
      font-size: 13px;
      font-weight: 500;
      &:hover { color: var(--color-text-secondary); }
    }

    @keyframes wpFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    @keyframes wpSlideUp {
      from { opacity: 0; transform: translateY(24px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
  `],
})
export class WelcomePopupComponent implements OnInit {
  private readonly auth       = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly visible = signal(false);

  private readonly STORAGE_KEY = 'vm_welcome_shown';

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.auth.isLoggedIn()) return;
    if (localStorage.getItem(this.STORAGE_KEY)) return;

    setTimeout(() => {
      if (!this.auth.isLoggedIn()) {
        this.visible.set(true);
        localStorage.setItem(this.STORAGE_KEY, '1');
      }
    }, 2500);
  }

  signIn(): void {
    this.visible.set(false);
    this.auth.openLoginModal();
  }

  dismiss(): void {
    this.visible.set(false);
  }
}
