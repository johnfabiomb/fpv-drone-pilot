import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeliveryLink, isDeliveryUrl } from '@booking/core/interfaces/delivery.interface';

/**
 * Reusable list editor for a delivery's links (label + URL). Two-way bound via
 * `[(links)]`. Mirrors `line-items-editor`'s recipe — immutable `model.update()`
 * writes and one-way `[ngModel]` + explicit `(ngModelChange)` per field, never
 * `[(ngModel)]` on an array element (which would mutate the bound array in place).
 */
@Component({
  selector: 'app-links-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './links-editor.component.html',
  styleUrl: './links-editor.component.scss',
})
export class LinksEditorComponent {
  readonly links = model.required<DeliveryLink[]>();

  /** A typed-but-malformed URL gets an inline warning; blank rows are dropped on save. */
  invalid(link: DeliveryLink): boolean {
    return !!link.url.trim() && !isDeliveryUrl(link.url);
  }

  add(): void { this.links.update(list => [...list, { label: '', url: '' }]); }

  remove(i: number): void { this.links.update(list => list.filter((_, idx) => idx !== i)); }

  setLabel(i: number, value: string): void {
    this.links.update(list => list.map((l, idx) => idx === i ? { ...l, label: value } : l));
  }

  setUrl(i: number, value: string): void {
    this.links.update(list => list.map((l, idx) => idx === i ? { ...l, url: value } : l));
  }
}
