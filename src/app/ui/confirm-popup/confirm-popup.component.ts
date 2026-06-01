import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Output, EventEmitter, Renderer2, inject } from '@angular/core';
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
    /* Fixed variant — centered above the footer, used for full-block action areas */
    :host.is-fixed {
      position: fixed;
      top: auto;
      right: auto;
      bottom: 90px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10000;
    }
    :host.is-fixed .confirm-popup {
      width: min(260px, 80vw);
    }
    .confirm-popup {
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 12px 14px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.16);
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 168px;
      animation: cpPopUp 0.15s ease;
    }
    .confirm-popup__text {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--color-text-secondary);
      line-height: 1.45;
    }
    .confirm-popup__actions {
      display: flex;
      gap: 6px;
    }
    .confirm-popup__btn {
      flex: 1;
      height: 32px;
      border-radius: var(--radius-sm);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: opacity 0.15s;
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
    @keyframes cpPopUpFixed {
      from { opacity: 0; transform: translateX(-50%) scale(0.96); }
      to   { opacity: 1; transform: translateX(-50%) scale(1); }
    }
    :host.is-fixed .confirm-popup { animation-name: cpPopUpFixed; }
  `],
})
export class ConfirmPopupComponent implements OnInit, OnDestroy {
  private readonly el       = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  @Input() message = 'Are you sure?';
  @Input() confirmLabel = 'Yes';
  @Input() cancelLabel = 'No';
  @Input() danger = true;
  /** Use fixed centering when the popup is inside a large action block (not a small anchor). */
  @Input() set fixed(v: boolean) { this._fixed = v; }
  @HostBinding('class.is-fixed') _fixed = false;

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  ngOnInit(): void {
    if (this._fixed) {
      this.renderer.appendChild(document.body, this.el.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this._fixed && document.body.contains(this.el.nativeElement)) {
      this.renderer.removeChild(document.body, this.el.nativeElement);
    }
  }
}
