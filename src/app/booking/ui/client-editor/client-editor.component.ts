import { ChangeDetectionStrategy, Component, effect, inject, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { Client } from '@booking/core/interfaces/booking.interface';

interface ClientDraft {
  id?: string; name: string; email: string; phone: string;
  company: string; vat_number: string; billing_address: string; notes: string;
}
const EMPTY: ClientDraft = { name: '', email: '', phone: '', company: '', vat_number: '', billing_address: '', notes: '' };

/**
 * Reusable add/edit-client modal. Used by the Clients page and the booking form
 * (so a new client is always captured with full billing details, never a stub).
 * Two-way `[(open)]`; emits the saved client via `(saved)` for auto-selection.
 */
@Component({
  selector: 'app-client-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './client-editor.component.html',
  styleUrl: './client-editor.component.scss',
})
export class ClientEditorComponent {
  private readonly data = inject(BookingDataService);
  private readonly auth = inject(BookingsAuthService);
  private readonly toast = inject(ToastService);

  readonly open = model(false);
  readonly client = input<Client | null>(null);   // null = create
  readonly saved = output<Client>();

  readonly saving = signal(false);
  draft: ClientDraft = { ...EMPTY };

  constructor() {
    // (Re)seed the form whenever the modal opens, from the client being edited.
    effect(() => {
      if (!this.open()) return;
      const c = this.client();
      this.draft = c
        ? { id: c.id, name: c.name, email: c.email ?? '', phone: c.phone ?? '',
            company: c.company ?? '', vat_number: c.vat_number ?? '',
            billing_address: c.billing_address ?? '', notes: c.notes ?? '' }
        : { ...EMPTY };
    });
  }

  get canSave(): boolean { return this.draft.name.trim().length > 0 && !this.saving(); }
  close(): void { this.open.set(false); }

  async save(): Promise<void> {
    if (!this.canSave) return;
    const org = this.auth.orgId();
    if (!org) { this.toast.error('No organization context.'); return; }
    this.saving.set(true);
    try {
      const res = await this.data.saveClient(org, { ...this.draft });
      if (res.error || !res.client) { this.toast.error('Could not save the client.'); return; }
      this.toast.success(this.draft.id ? 'Client updated' : 'Client added');
      this.saved.emit(res.client);
      this.open.set(false);
    } finally {
      this.saving.set(false);
    }
  }
}
