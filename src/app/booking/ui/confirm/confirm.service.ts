import { Injectable, signal } from '@angular/core';

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;   // default 'Confirm'
  cancelLabel?: string;    // default 'Cancel'
  danger?: boolean;        // red confirm button (destructive)
}

interface ConfirmRequest extends ConfirmOptions { id: number; }

/**
 * App-wide confirmation dialogs — the styled replacement for window.confirm().
 * Inject anywhere and `await confirm.ask({...})` → resolves true/false. A single
 * <app-confirm-host> (mounted once in the platform shell, like the toast host)
 * renders it through the shared <app-modal>, so every confirm matches the UI.
 */
@Injectable({ providedIn: 'root' })
export class ConfirmService {
  readonly request = signal<ConfirmRequest | null>(null);
  private resolver: ((v: boolean) => void) | null = null;
  private seq = 0;

  ask(opts: ConfirmOptions): Promise<boolean> {
    this.resolver?.(false);              // abandon any outstanding request
    this.request.set({ ...opts, id: ++this.seq });
    return new Promise<boolean>(resolve => { this.resolver = resolve; });
  }

  resolve(value: boolean): void {
    this.resolver?.(value);
    this.resolver = null;
    this.request.set(null);
  }
}
