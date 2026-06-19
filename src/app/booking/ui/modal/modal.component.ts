import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

/**
 * Reusable modal shell for the booking platform — overlay + card + header (title
 * and ✕) with the body projected via <ng-content>. Two-way bound with `[(open)]`.
 *
 * Clicking the backdrop does NOT dismiss by default (`dismissable=false`), so an
 * accidental click outside never discards in-progress edits; closing is explicit
 * (✕ / Cancel / a save handler). Any modal in the platform should use this shell.
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  readonly open = model(false);
  readonly title = input('');
  readonly dismissable = input(false);

  close(): void { this.open.set(false); }
  onBackdrop(): void { if (this.dismissable()) this.close(); }
}
