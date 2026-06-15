import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

// Mounted once (in the platform shell). Renders the live toast stack — bottom-right
// on desktop, full-width bottom on mobile. Click a toast to dismiss early.
@Component({
  selector: 'app-toast-host',
  standalone: true,
  template: `
    <div class="toasts" aria-live="polite" aria-atomic="false">
      @for (t of toast.toasts(); track t.id) {
        <button type="button" class="toast toast--{{ t.type }}" (click)="toast.dismiss(t.id)" role="status">
          <span class="toast__icon">
            @switch (t.type) {
              @case ('success') { ✓ }
              @case ('error') { ✕ }
              @default { i }
            }
          </span>
          <span class="toast__msg">{{ t.message }}</span>
        </button>
      }
    </div>
  `,
  styleUrl: './toast-host.component.scss',
})
export class ToastHostComponent {
  readonly toast = inject(ToastService);
}
