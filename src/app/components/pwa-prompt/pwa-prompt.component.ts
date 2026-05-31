import { Component, OnDestroy, OnInit, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISSED_KEY = 'pwa-prompt-dismissed';
const DISMISS_TTL   = 30 * 24 * 60 * 60 * 1000; // 30 days

@Component({
  selector: 'app-pwa-prompt',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pwa-card" *ngIf="visible" [class.ios]="isIos">
      <div class="pwa-card__icon">🗺️</div>
      <div class="pwa-card__body">
        <strong>Use offline</strong>
        <span *ngIf="!isIos">Install the app — explore Malta's spots without internet.</span>
        <span *ngIf="isIos">
          Tap <b>Share</b> <span class="ios-share">⎙</span> then
          <b>Add to Home Screen</b> to install.
        </span>
      </div>
      <div class="pwa-card__actions">
        <button class="btn-later" (click)="dismiss()">Later</button>
        <button class="btn-install" (click)="install()" *ngIf="!isIos">Install</button>
        <button class="btn-install" (click)="dismiss()" *ngIf="isIos">Got it</button>
      </div>
      <button class="pwa-card__close" (click)="dismiss()" aria-label="Close">×</button>
    </div>
  `,
  styles: [`
    .pwa-card {
      position: fixed;
      bottom: 80px;
      left: 16px;
      right: 16px;
      max-width: 420px;
      margin: 0 auto;
      right: 16px;
      background: var(--color-bg);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08);
      padding: 14px 25px 14px 14px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      z-index: 9999;
      animation: slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) both;
      border: 1px solid rgba(0,0,0,0.06);
    }

    @keyframes slideUp {
      from { transform: translateY(120%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }

    .pwa-card__icon {
      font-size: 26px;
      line-height: 1;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .pwa-card__body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 13px;
      line-height: 1.4;
      color: var(--color-text-secondary);

      strong {
        font-size: 14px;
        font-weight: 700;
        color: var(--color-text-base);
      }

      .ios-share {
        font-size: 15px;
        font-weight: 700;
      }
    }

    .pwa-card__actions {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex-shrink: 0;

      button {
        border: none;
        border-radius: 20px;
        padding: 6px 14px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
      }
    }

    .btn-later {
      background: var(--color-bg-muted);
      color: var(--color-text-muted);
    }

    .btn-install {
      background: var(--color-primary);
      color: #fff;
    }

    .pwa-card__close {
      position: absolute;
      top: 8px;
      right: 10px;
      background: none;
      border: none;
      font-size: 18px;
      line-height: 1;
      color: var(--color-text-light);
      cursor: pointer;
      padding: 0;
    }
  `],
})
export class PwaPromptComponent implements OnInit, OnDestroy {
  visible = false;
  isIos = false;

  private readonly auth       = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);

  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private readonly wantsToShow = signal(false);

  constructor() {
    // Show only once the user is logged in — avoids colliding with the welcome popup
    // which auto-dismisses on login, so by the time we show the prompt it's already gone.
    effect(() => {
      if (this.auth.isLoggedIn() && this.wantsToShow()) {
        this.wantsToShow.set(false);
        setTimeout(() => { this.visible = true; }, 4000);
      }
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    if ((window.navigator as any).standalone) return;

    const ts = localStorage.getItem(DISMISSED_KEY);
    if (ts && Date.now() - parseInt(ts) < DISMISS_TTL) return;

    this.isIos = /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());

    if (this.isIos) {
      this.wantsToShow.set(true);
    } else {
      window.addEventListener('beforeinstallprompt', this.installHandler);
    }
  }

  private readonly installHandler = (e: Event) => {
    e.preventDefault();
    this.deferredPrompt = e as BeforeInstallPromptEvent;
    this.wantsToShow.set(true);
  };

  async install(): Promise<void> {
    if (!this.deferredPrompt) return;
    this.deferredPrompt.prompt();
    await this.deferredPrompt.userChoice;
    this.deferredPrompt = null;
    this.dismiss();
  }

  dismiss(): void {
    this.visible = false;
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.removeEventListener('beforeinstallprompt', this.installHandler);
  }
}
