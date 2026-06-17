import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { BookingAdminService, AdminService, AdminStaff } from '@booking/core/services/booking-admin.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { LineItem } from '@booking/core/interfaces/invoice.interface';
import { Client } from '@booking/core/interfaces/booking.interface';
import { AvailabilityPickerComponent, PickedSlot } from './availability-picker.component';
import { LineItemsEditorComponent } from '@booking/ui/line-items-editor/line-items-editor.component';
import { ClientEditorComponent } from '@booking/ui/client-editor/client-editor.component';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe, AvailabilityPickerComponent, LineItemsEditorComponent, ClientEditorComponent],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
})
export class BookingFormComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly admin = inject(BookingAdminService);
  private readonly auth = inject(BookingsAuthService);
  private readonly toast = inject(ToastService);
  readonly data = inject(BookingDataService);

  private editingRef = '';

  readonly services = signal<AdminService[]>([]);
  readonly staff = signal<AdminStaff[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly errorMsg = signal('');
  readonly editingId = signal<string | null>(null);
  readonly created = signal<{ ref: string; link: string | null } | null>(null);

  // ── Form state ──────────────────────────────────────────────────────
  clientId = '';
  readonly clientEditorOpen = signal(false);
  staffId = '';

  // Availability picker: pick a start + end span on the worker's calendar.
  selectedStartIso = '';
  selectedHours = 0;        // duration chosen on the calendar (the booking's length)
  selectedSlotLabel = '';
  prefillStartIso = '';     // edit prefill for the picker (set once, never echoed)
  prefillHours = 0;
  readonly orgTimezone = signal('Europe/Malta');
  readonly currency = signal('EUR');

  // Invoice line items — the source of truth for what's charged + the total.
  // Per-line hours feed the description/price only; the calendar span sets the duration.
  lineItems: LineItem[] = [{ description: '', amount: 0 }];

  title = '';
  location = '';
  notes = '';
  paymentMode: 'both' | 'card' | 'later' = 'both';
  depositMode: 'deposit' | 'full' = 'deposit';
  depositPercent = 30;
  needsProduction = false;   // add to the Work board (editing → delivery)?

  private orgDefaults = { depositPercent: 30, depositAllowed: true };

  async ngOnInit(): Promise<void> {
    await this.auth.initialize();
    const org = this.auth.orgId();
    if (org) {
      const [services, staff, settings] = await Promise.all([
        this.admin.listServices(org),
        this.admin.listStaff(org),
        this.admin.getOrgSettings(org),
      ]);
      this.services.set(services.filter(s => s.is_active));
      this.staff.set(staff.filter(s => s.is_bookable));

      this.orgDefaults = {
        depositPercent: settings?.booking_params?.deposit_percent ?? 30,
        depositAllowed: settings?.booking_params?.deposit_allowed ?? true,
      };
      if (settings?.timezone) this.orgTimezone.set(settings.timezone);
      if (settings?.currency) this.currency.set(settings.currency);
      this.depositPercent = this.orgDefaults.depositPercent;
      this.depositMode = this.orgDefaults.depositAllowed ? 'deposit' : 'full';

      const id = this.route.snapshot.paramMap.get('id');
      if (id) await this.loadForEdit(id);
    }
    this.loading.set(false);
  }

  private async loadForEdit(id: string): Promise<void> {
    const b = await this.data.getBooking(id);
    if (!b) { this.errorMsg.set('Booking not found.'); return; }
    this.editingId.set(id);
    this.editingRef = b.booking_ref;
    this.clientId = b.client_id ?? '';
    this.staffId = b.staff_id;
    this.title = b.title;
    this.location = b.location ?? '';
    this.notes = b.notes ?? '';
    this.paymentMode = b.allow_card && b.allow_inperson ? 'both' : b.allow_card ? 'card' : 'later';
    this.depositMode = (b.deposit_allowed ?? this.orgDefaults.depositAllowed) ? 'deposit' : 'full';
    this.depositPercent = b.deposit_percent ?? this.orgDefaults.depositPercent;
    this.needsProduction = b.needs_production ?? false;

    const dur = Math.max(1, Math.round((new Date(b.end_at).getTime() - new Date(b.start_at).getTime()) / 3_600_000));
    this.selectedStartIso = b.start_at;
    this.selectedHours = dur;
    this.prefillStartIso = b.start_at;   // positions + pre-selects the span in the picker
    this.prefillHours = dur;
    this.selectedSlotLabel = this.rangeLabel(b.start_at, dur);

    // Load the invoice line items (saved breakdown, or a single line derived from the booking).
    const items = await this.data.getInvoiceItems(id);
    this.lineItems = items.length ? items : [{ description: b.description ?? b.title, amount: b.price_total }];
  }

  // ── Derived ─────────────────────────────────────────────────────────
  get isEditing(): boolean { return this.editingId() !== null; }
  /** Any bookable worker — availability is worker-based. */
  get workers(): AdminStaff[] { return this.staff(); }
  /** Booking total = sum of the line items (source of truth). */
  get priceTotal(): number { return this.lineItems.reduce((s, i) => s + (Number(i.amount) || 0), 0); }
  get selectedClient(): Client | undefined { return this.data.clients().find(c => c.id === this.clientId); }
  get startAtValue(): string { return this.selectedStartIso; }

  /** "20 Jun · 08:00–13:00" in the org's timezone. */
  private rangeLabel(startIso: string, hours: number): string {
    const tz = this.orgTimezone();
    const start = new Date(startIso);
    const end = new Date(start.getTime() + hours * 3_600_000);
    const day = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: tz });
    const t = (d: Date) => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz });
    return `${day} · ${t(start)}–${t(end)}`;
  }

  // ── Change handlers ─────────────────────────────────────────────────
  // Charges (pricing) are decoupled from the calendar span — editing items never touches the time.
  onItemsChange(items: LineItem[]): void { this.lineItems = items; }
  onWorkerChange(): void { this.resetSlotSelection(); }
  private resetSlotSelection(): void { this.selectedStartIso = ''; this.selectedHours = 0; this.selectedSlotLabel = ''; }

  onSlotPicked(slot: PickedSlot): void {
    this.selectedStartIso = slot.iso;
    this.selectedHours = slot.hours;
    this.selectedSlotLabel = slot.label;
  }

  // ── Client (reuses the full client editor — never a stub) ────────────
  openClientEditor(): void { this.clientEditorOpen.set(true); }
  onClientCreated(c: Client): void { this.clientId = c.id; }

  // ── Submit ──────────────────────────────────────────────────────────
  get canSubmit(): boolean {
    const itemsOk = this.lineItems.length > 0
      && this.lineItems.every(i => i.description.trim().length > 0) && this.priceTotal > 0;
    return !this.saving() && !!this.clientId && !!this.staffId && !!this.startAtValue && this.selectedHours > 0
      && itemsOk && this.title.trim().length > 0;
  }

  async submit(): Promise<void> {
    if (!this.canSubmit) return;
    const org = this.auth.orgId();
    if (!org) { this.errorMsg.set('No organization context.'); return; }

    this.saving.set(true);
    this.errorMsg.set('');
    try {
      // Keep the service metadata (serviceId/hours) so the breakdown round-trips on edit.
      const items: LineItem[] = this.lineItems.map(i => ({
        description: i.description.trim(), amount: Number(i.amount) || 0,
        ...(i.serviceId ? { serviceId: i.serviceId } : {}),
        ...(i.hours ? { hours: i.hours } : {}),
      }));
      const shared = {
        staffId: this.staffId, serviceId: null, clientId: this.clientId,
        title: this.title.trim(),
        description: items.map(i => i.description).join('\n'),  // client-facing summary on the pay page
        startAt: this.startAtValue, hours: this.selectedHours,
        priceTotal: this.priceTotal,
        allowCard: this.paymentMode !== 'later',
        allowInperson: this.paymentMode !== 'card',
        depositAllowed: this.depositMode === 'deposit',
        depositPercent: this.depositPercent,
        needsProduction: this.needsProduction,
        location: this.location.trim() || null, notes: this.notes.trim() || null,
      };

      if (this.isEditing) {
        const res = await this.data.updateBooking(this.editingId()!, shared);
        if (res.error) { this.errorMsg.set(this.errorText(res.error)); return; }
        await this.data.saveInvoice(org, this.editingId()!, { lineItems: items, notes: null, issueDate: null });
        this.toast.success(`${this.editingRef || 'Booking'} updated`);
        if (this.paymentMode !== 'later') {
          const link = await this.data.generateLink(this.editingId()!);
          this.created.set({ ref: this.editingRef, link });
        } else {
          this.goToList();
        }
        return;
      }

      const res = await this.data.createBooking({ orgId: org, ...shared });
      if (res.error || !res.id) { this.errorMsg.set(this.errorText(res.error)); return; }
      // Persist the line-item breakdown as the invoice (source of truth).
      await this.data.saveInvoice(org, res.id, { lineItems: items, notes: null, issueDate: null });
      const link = await this.data.generateLink(res.id);
      this.created.set({ ref: res.ref ?? '', link });
      this.toast.success(`Booking ${res.ref ?? ''} created`);
    } finally {
      this.saving.set(false);
    }
  }

  private errorText(error?: string): string {
    if (error === 'slot_taken') return 'That worker is already booked for that time. Pick another slot or worker.';
    return error ?? 'Something went wrong. Please try again.';
  }

  async copyLink(): Promise<void> {
    const link = this.created()?.link;
    if (link) await navigator.clipboard.writeText(link);
  }

  reset(): void {
    this.editingId.set(null);
    this.clientId = '';
    this.staffId = '';
    this.resetSlotSelection();
    this.prefillStartIso = ''; this.prefillHours = 0;
    this.lineItems = [{ description: '', amount: 0 }];
    this.title = ''; this.location = ''; this.notes = '';
    this.paymentMode = 'both';
    this.depositMode = this.orgDefaults.depositAllowed ? 'deposit' : 'full';
    this.depositPercent = this.orgDefaults.depositPercent;
    this.needsProduction = false;
    this.created.set(null); this.errorMsg.set('');
  }

  goToList(): void { this.router.navigate(['/bookings/list']); }
}
