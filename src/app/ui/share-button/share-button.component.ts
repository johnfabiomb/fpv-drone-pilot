import { Component, EventEmitter, HostBinding, Input, OnDestroy, Output, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-share-btn',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="share-btn" [class.share-btn--labeled]="label" (click)="share()" [title]="copied ? 'Copied!' : 'Share'">
      <svg *ngIf="!copied" width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
      <svg *ngIf="copied" width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span *ngIf="label">{{ copied ? 'Copied!' : label }}</span>
    </button>
  `,
  styles: [`
    .share-btn {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-md);
      background: var(--color-bg-muted);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: background var(--transition);
      color: var(--color-text-muted);
    }
    .share-btn:hover { background: var(--color-border); }
    .share-btn--labeled {
      width: 100%;
      height: 42px;
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      background: var(--color-bg-light);
      color: var(--color-text-secondary);
      font-size: 13px;
      font-weight: 500;
      padding: 0 14px;
      gap: 7px;
    }
    .share-btn--labeled:hover { background: var(--color-bg-muted); }
  `],
})
export class ShareButtonComponent implements OnDestroy {
  @Input() url = '';
  @Input() shareTitle = '';
  @Input() label = '';

  @Output() shared = new EventEmitter<void>();

  @HostBinding('style.flex') get _flex() { return this.label ? '1' : null; }
  @HostBinding('style.minWidth') get _minWidth() { return this.label ? '0' : null; }

  copied = false;
  private timer?: ReturnType<typeof setTimeout>;
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  share(): void {
    if (!isPlatformBrowser(this.platformId) || !this.url) return;
    const onCopied = () => {
      clearTimeout(this.timer);
      this.copied = true;
      this.timer = setTimeout(() => { this.copied = false; }, 2500);
      this.shared.emit();
    };
    if (navigator.share) {
      navigator.share({ title: this.shareTitle, url: this.url })
        .then(() => this.shared.emit())
        .catch(() => {});
      return;
    }
    const fallback = () => {
      const el = this.document.createElement('input') as HTMLInputElement;
      el.value = this.url;
      this.document.body.appendChild(el);
      el.select();
      this.document.execCommand('copy');
      this.document.body.removeChild(el);
      onCopied();
    };
    navigator.clipboard?.writeText(this.url).then(onCopied).catch(fallback) ?? fallback();
  }

  ngOnDestroy(): void { clearTimeout(this.timer); }
}
