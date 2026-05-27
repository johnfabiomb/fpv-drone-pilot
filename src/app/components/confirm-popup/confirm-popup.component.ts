import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="confirm-popup" (click)="$event.stopPropagation()">
      <span class="confirm-popup__text">{{ message }}</span>
      <div class="confirm-popup__actions">
        <button class="confirm-popup__btn confirm-popup__btn--cancel" (click)="cancelled.emit()">
          {{ cancelLabel }}
        </button>
        <button
          class="confirm-popup__btn"
          [class.confirm-popup__btn--danger]="danger"
          [class.confirm-popup__btn--primary]="!danger"
          (click)="confirmed.emit()">
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      z-index: 200;
    }
    .confirm-popup {
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 10px 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.12);
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 168px;
      animation: cpPopUp 0.15s ease;
    }
    .confirm-popup__text {
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text-secondary);
    }
    .confirm-popup__actions {
      display: flex;
      gap: 6px;
    }
    .confirm-popup__btn {
      flex: 1;
      height: 28px;
      border-radius: var(--radius-sm);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: opacity var(--transition);
      &:hover { opacity: 0.85; }
    }
    .confirm-popup__btn--cancel {
      background: var(--color-bg-muted);
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
    }
    .confirm-popup__btn--danger  { background: #e11d48; color: #fff; }
    .confirm-popup__btn--primary { background: var(--color-primary); color: #fff; }
    @keyframes cpPopUp {
      from { opacity: 0; transform: translateY(-4px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
  `],
})
export class ConfirmPopupComponent {
  @Input() message = 'Are you sure?';
  @Input() confirmLabel = 'Yes';
  @Input() cancelLabel = 'No';
  @Input() danger = true;

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
}
