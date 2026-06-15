import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

/**
 * App-wide toast notifications. Inject anywhere and call success/error/info.
 * A single <app-toast-host> (mounted once in the platform shell) renders them —
 * no per-page markup. Toasts auto-dismiss; errors linger a little longer.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();
  private seq = 0;

  show(message: string, type: ToastType = 'info', durationMs = 3800): void {
    const id = ++this.seq;
    this._toasts.update(list => [...list, { id, type, message }]);
    if (durationMs > 0) setTimeout(() => this.dismiss(id), durationMs);
  }

  success(message: string, durationMs?: number): void { this.show(message, 'success', durationMs); }
  error(message: string, durationMs = 5200): void { this.show(message, 'error', durationMs); }
  info(message: string, durationMs?: number): void { this.show(message, 'info', durationMs); }

  dismiss(id: number): void {
    this._toasts.update(list => list.filter(t => t.id !== id));
  }
}
