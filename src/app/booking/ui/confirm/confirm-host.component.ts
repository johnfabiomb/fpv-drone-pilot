import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalComponent } from '@booking/ui/modal/modal.component';
import { ConfirmService } from '@booking/ui/confirm/confirm.service';

/**
 * Renders the app-wide confirmation dialog (ConfirmService) through the shared
 * <app-modal>. Mounted once in the platform shell — never used per-page.
 */
@Component({
  selector: 'app-confirm-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ModalComponent],
  template: `
    @if (svc.request(); as r) {
      <app-modal [open]="true" (openChange)="$event || svc.resolve(false)" [title]="r.title || 'Please confirm'">
        <p class="confirm__msg">{{ r.message }}</p>
        <div class="confirm__actions">
          <button type="button" class="btn btn--ghost" (click)="svc.resolve(false)">{{ r.cancelLabel || 'Cancel' }}</button>
          <button type="button" class="btn" [class.btn--danger]="r.danger" [class.btn--primary]="!r.danger"
                  (click)="svc.resolve(true)">{{ r.confirmLabel || 'Confirm' }}</button>
        </div>
      </app-modal>
    }
  `,
  styleUrl: './confirm-host.component.scss',
})
export class ConfirmHostComponent {
  readonly svc = inject(ConfirmService);
}
