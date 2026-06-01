import { Component, OnInit, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { SignInFormComponent, FormState } from '@ui/sign-in-form/sign-in-form.component';
import { InAppBrowserService } from '@core/services/in-app-browser.service';

@Component({
  selector: 'app-welcome-popup',
  standalone: true,
  imports: [CommonModule, SignInFormComponent],
  template: `
    <div *ngIf="visible()" class="wp-backdrop" (click)="dismiss()">
      <div class="wp-card" (click)="$event.stopPropagation()">

        <!-- Welcome content: shown on default and IAB email-input states -->
        <ng-container *ngIf="formState() === 'default' || formState() === 'email-input'">
          <div class="wp-header">
            <span class="wp-emoji">🗺️</span>
            <img class="wp-photo" src="/assets/images/profile.webp" alt="John Montaño" width="52" height="52" style="flex-shrink:0">
          </div>
          <p class="wp-hey">Hey, I'm John 👋</p>
          <h2 class="wp-title">Welcome to My Malta Map!</h2>
          <p class="wp-sub">I've mapped out my favourite spots — sign in and I'll save yours too.</p>
          <ul class="wp-benefits">
            <li>
              <span class="wp-benefit__icon">🧭</span>
              <span>Join or start a group for any spot — find people heading the same way</span>
            </li>
            <li>
              <span class="wp-benefit__icon">💬</span>
              <span>Every group has a live chat — plan the day, share tips, never explore alone</span>
            </li>
            <li>
              <span class="wp-benefit__icon">🔖</span>
              <span>Save your favourite spots and build your own bucket list</span>
            </li>
            <li>
              <span class="wp-benefit__icon">🎟️</span>
              <span>Unlock real discounts from local partners I personally trust</span>
            </li>
            <li>
              <span class="wp-benefit__icon">📶</span>
              <span>Works offline — explore without signal, no problem</span>
            </li>
          </ul>
        </ng-container>

        <app-sign-in-form (stateChange)="formState.set($event)"></app-sign-in-form>

        <button *ngIf="formState() === 'default' || formState() === 'email-input'" class="wp-ghost" (click)="dismiss()">
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
      align-items: flex-start;
      justify-content: center;
      padding: 20px;
      overflow-y: auto;
      animation: wpFadeIn 0.3s ease;
    }

    .wp-card {
      background: var(--color-bg);
      border-radius: 22px;
      padding: 36px 24px 26px;
      width: 100%;
      max-width: 340px;
      margin: auto;
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
      margin: 0 0 24px;
      padding: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
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
      padding: 10px 14px;
    }

    .wp-benefit__icon { font-size: 18px; flex-shrink: 0; line-height: 1; }

    .wp-ghost {
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
  private readonly auth        = inject(AuthService);
  private readonly iab         = inject(InAppBrowserService);
  private readonly platformId  = inject(PLATFORM_ID);

  readonly visible   = signal(false);
  readonly formState = signal<FormState>('default');
  private readonly STORAGE_KEY = 'vm_welcome_shown';

  constructor() {
    // Initialize correct IAB state before first render so header/benefits stay visible
    if (isPlatformBrowser(this.platformId) && this.iab.isInAppBrowser()) {
      this.formState.set(this.iab.isAndroid() ? 'android-redirect' : 'email-input');
    }

    // Auto-dismiss when sign-in completes
    effect(() => {
      if (this.auth.isLoggedIn() && this.visible()) {
        this.visible.set(false);
      }
    });
  }

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

  dismiss(): void {
    this.visible.set(false);
  }
}
