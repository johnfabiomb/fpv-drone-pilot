import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { bookingsDb } from '@booking/core/db/supabase.bookings';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { InvoiceDetails } from '@booking/core/services/booking-admin.service';

interface LineItem { description: string; amount: number; }

// Admin edits the invoice for a booking. Loads the current (derived OR previously-saved)
// invoice via get_invoice, lets the admin change line items / notes / issue date, and
// persists them to the `invoices` table. The booking, calendar and work board are never
// touched. "Reset to booking" discards the override.
@Component({
  selector: 'app-invoice-edit',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, RouterLink],
  templateUrl: './invoice-edit.component.html',
  styleUrl: './invoice-edit.component.scss',
})
export class InvoiceEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly data = inject(BookingDataService);
  private readonly auth = inject(BookingsAuthService);
  private readonly toast = inject(ToastService);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly notFound = signal(false);
  readonly customized = signal(false);

  id = '';
  invoiceNumber = '';
  clientName = '';
  currency = 'EUR';

  items: LineItem[] = [];
  notes = '';
  issueDate = '';   // yyyy-MM-dd

  readonly total = computed(() => this.items.reduce((s, i) => s + (Number(i.amount) || 0), 0));

  async ngOnInit(): Promise<void> {
    await this.auth.initialize();
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.id) { this.notFound.set(true); this.loading.set(false); return; }

    const { data, error } = await bookingsDb.rpc('get_invoice', { p_booking: this.id });
    if (error || !data) { this.notFound.set(true); this.loading.set(false); return; }

    const inv = data.invoice;
    const det = (data.org?.invoice_details ?? {}) as InvoiceDetails;
    this.currency = data.org?.currency ?? 'EUR';
    this.clientName = data.client?.company || data.client?.name || '—';
    this.customized.set(!!inv.customized);
    this.items = (inv.line_items ?? []).map((i: LineItem) => ({ description: i.description, amount: Number(i.amount) }));
    this.notes = inv.notes ?? '';
    this.issueDate = inv.issue_date ?? new Date().toISOString().slice(0, 10);

    const ref: string = data.booking?.booking_ref ?? '';
    const prefix = (det.invoice_prefix || 'INV').toUpperCase();
    const dash = ref.indexOf('-');
    this.invoiceNumber = dash >= 0 ? `${prefix}-${ref.slice(dash + 1)}` : `${prefix}-${ref}`;

    if (this.items.length === 0) this.addItem();
    this.loading.set(false);
  }

  addItem(): void { this.items = [...this.items, { description: '', amount: 0 }]; }
  removeItem(i: number): void { this.items = this.items.filter((_, idx) => idx !== i); }

  get canSave(): boolean {
    return !this.saving() && this.items.length > 0 && this.items.every(i => i.description.trim().length > 0);
  }

  async save(): Promise<void> {
    const org = this.auth.orgId();
    if (!org || !this.canSave) return;
    this.saving.set(true);
    try {
      const items = this.items.map(i => ({ description: i.description.trim(), amount: Number(i.amount) || 0 }));
      const res = await this.data.saveInvoice(org, this.id, {
        lineItems: items, notes: this.notes.trim() || null, issueDate: this.issueDate || null,
      });
      if (res.error) { this.toast.error('Could not save the invoice.'); return; }
      this.toast.success('Invoice saved');
      this.router.navigate(['/bookings', this.id]);
    } finally { this.saving.set(false); }
  }

  async resetToBooking(): Promise<void> {
    if (!confirm('Discard your edits and revert this invoice to the booking details?')) return;
    this.saving.set(true);
    try {
      await this.data.resetInvoice(this.id);
      this.toast.info('Invoice reset to the booking');
      this.router.navigate(['/bookings', this.id]);
    } finally { this.saving.set(false); }
  }

  preview(): void { window.open(`/book/invoice/${this.id}`, '_blank', 'noopener'); }
}
