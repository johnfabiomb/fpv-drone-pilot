import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { LineItem, ServiceOption } from '@booking/core/interfaces/invoice.interface';
import { servicePrice } from '@booking/core/interfaces/org.interface';

/**
 * Reusable invoice line-items editor. Adding a line is guided: pick one of your
 * services (then how many hours → description + price pre-filled) or a free
 * "Custom charge". Service lines remember `serviceId`/`hours` so the booking form
 * can derive the calendar duration. Two-way bound via `[(items)]`.
 */
@Component({
  selector: 'app-line-items-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './line-items-editor.component.html',
  styleUrl: './line-items-editor.component.scss',
})
export class LineItemsEditorComponent {
  readonly items = model.required<LineItem[]>();
  readonly currency = input<string>('EUR');
  readonly services = input<ServiceOption[]>([]);

  readonly total = computed(() => this.items().reduce((s, i) => s + (Number(i.amount) || 0), 0));

  // ── Add flow ────────────────────────────────────────────────────────
  readonly picking = signal(false);
  pickId = '';        // '' = none | 'custom' | a service id
  pickHours: number | string = 1;

  get pickedService(): ServiceOption | undefined { return this.services().find(s => s.id === this.pickId); }
  private get pickHoursNum(): number { return Math.max(1, Math.floor(Number(this.pickHours) || 1)); }
  get pickPrice(): number | null {
    const s = this.pickedService;
    return s ? servicePrice(s.pricing, this.pickHoursNum) : null;
  }

  startAdd(): void {
    if (this.services().length) { this.pickId = ''; this.pickHours = 1; this.picking.set(true); }
    else this.addCustom();
  }
  cancelAdd(): void { this.picking.set(false); }

  confirmAdd(): void {
    if (!this.pickId) return;
    if (this.pickId === 'custom') { this.addCustom(); return; }
    const svc = this.pickedService;
    if (!svc) return;
    const hours = this.pickHoursNum;
    this.items.update(list => [...list, {
      description: `${svc.name} — ${hours} ${hours === 1 ? 'hour' : 'hours'}`,
      amount: servicePrice(svc.pricing, hours) ?? 0,
      serviceId: svc.id, hours,
    }]);
    this.picking.set(false);
  }

  private addCustom(): void {
    this.items.update(list => [...list, { description: '', amount: 0 }]);
    this.picking.set(false);
  }

  remove(i: number): void { this.items.update(list => list.filter((_, idx) => idx !== i)); }
  setDescription(i: number, value: string): void {
    this.items.update(list => list.map((it, idx) => idx === i ? { ...it, description: value } : it));
  }
  setAmount(i: number, value: number | string): void {
    const amount = Number(value) || 0;
    this.items.update(list => list.map((it, idx) => idx === i ? { ...it, amount } : it));
  }
}
