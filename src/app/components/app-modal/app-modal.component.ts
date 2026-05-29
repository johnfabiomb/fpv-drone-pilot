import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <div class="am-backdrop" (click)="close()">
      <div class="am-card" [style.maxWidth]="maxWidth" (click)="$event.stopPropagation()">
        <button class="am-close" (click)="close()" aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .am-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 20px;
      animation: amFade 0.2s ease;
    }

    .am-card {
      background: var(--color-bg);
      border-radius: 22px;
      padding: 28px 24px 24px;
      width: 100%;
      max-height: 90dvh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.22), 0 4px 16px rgba(0, 0, 0, 0.1);
      animation: amSlide 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .am-close {
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

    @keyframes amFade {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    @keyframes amSlide {
      from { opacity: 0; transform: translateY(16px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0)    scale(1); }
    }
  `],
})
export class AppModalComponent {
  @Input() maxWidth = '380px';
  @Output() closeRequested = new EventEmitter<void>();

  close(): void {
    this.closeRequested.emit();
  }
}
