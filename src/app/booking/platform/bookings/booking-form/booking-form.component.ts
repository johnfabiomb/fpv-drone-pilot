import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { BookingAdminService, AdminService, AdminStaff } from '@booking/core/services/booking-admin.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { LineItem } from '@booking/core/interfaces/invoice.interface';
import { Client, BookingSlot } from '@booking/core/interfaces/booking.interface';
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
  readonly created = signal<{ id: string; ref: string; link: string | null } | null>(null);

  // ── Form state ──────────────────────────────────────────────────────
  // A booking's customer is EITHER an existing client (reusable CRM record with
  // company/VAT) OR a one-off typed name (a "quick" booking, never saved to Clients).
  clientMode: 'existing' | 'quick' = 'existing';
  clientId = '';
  contactName = '';
  readonly clientEditorOpen = signal(false);
  staffId = '';

  // Availability picker: one or more time blocks on the worker's calendar (across days).
  selectedSlots: PickedSlot[] = [];
  prefillSlots: BookingSlot[] = [];   // edit prefill for the picker (set once, never echoed)
  readonly orgTimezone = signal('Europe/Malta');
  readonly currency = signal('EUR');

  // Invoice line items — the source of truth for what's charged + the total.
  // Per-line hours feed the description/price only; the calendar span sets the duration.
  // Starts empty: the admin must add at least one charge (enforced by canSubmit).
  lineItems: LineItem[] = [];

  title = '';
  location = '';
  notes = '';
  paymentMode: 'both' | 'card' | 'later' = 'both';
  depositMode: 'deposit' | 'full' = 'deposit';
  depositPercent = 30;
  needsProduction = false;   // add to the Work board (editing → delivery)?
  addToCalendar = true;      // confirm now → push to Google Calendar immediately

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
    if (b.client_id) {
      this.clientMode = 'existing'; this.clientId = b.client_id; this.contactName = '';
    } else if (b.contact_name) {
      this.clientMode = 'quick'; this.contactName = b.contact_name; this.clientId = '';
    }
    this.staffId = b.staff_id;
    this.title = b.title;
    this.location = b.location ?? '';
    this.notes = b.notes ?? '';
    this.paymentMode = b.allow_card && b.allow_inperson ? 'both' : b.allow_card ? 'card' : 'later';
    this.depositMode = (b.deposit_allowed ?? this.orgDefaults.depositAllowed) ? 'deposit' : 'full';
    this.depositPercent = b.deposit_percent ?? this.orgDefaults.depositPercent;
    this.needsProduction = b.needs_production ?? false;

    // Seed the picker from the booking's real time blocks (one or more).
    this.prefillSlots = await this.data.getBookingSlots(id);

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
  /** A customer is set when an existing client is picked, or a quick name is typed. */
  get hasCustomer(): boolean {
    return this.clientMode === 'existing' ? !!this.clientId : this.contactName.trim().length > 0;
  }
  /** The DB slots to persist (one row per chosen block). */
  get slotsValue(): BookingSlot[] { return this.selectedSlots.map(s => ({ start: s.iso, end: s.endIso })); }

  // ── Change handlers ─────────────────────────────────────────────────
  // Charges (pricing) are decoupled from the calendar — editing items never touches the time blocks.
  onItemsChange(items: LineItem[]): void { this.lineItems = items; }
  // The picker clears its blocks (and emits []) when the worker changes, so no manual reset needed.
  onSlotsChanged(slots: PickedSlot[]): void { this.selectedSlots = slots; }

  // ── Client (reuses the full client editor — never a stub) ────────────
  openClientEditor(): void { this.clientEditorOpen.set(true); }
  onClientCreated(c: Client): void { this.clientMode = 'existing'; this.clientId = c.id; }

  // ── Submit ──────────────────────────────────────────────────────────
  get canSubmit(): boolean {
    const itemsOk = this.lineItems.length > 0
      && this.lineItems.every(i => i.description.trim().length > 0) && this.priceTotal > 0;
    return !this.saving() && this.hasCustomer && !!this.staffId && this.selectedSlots.length > 0
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
        staffId: this.staffId, serviceId: null,
        clientId: this.clientMode === 'existing' ? this.clientId : null,
        contactName: this.clientMode === 'quick' ? this.contactName.trim() : null,
        title: this.title.trim(),
        description: items.map(i => i.description).join('\n'),  // client-facing summary on the pay page
        slots: this.slotsValue,
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
          this.created.set({ id: this.editingId()!, ref: this.editingRef, link });
        } else {
          this.goToList();
        }
        return;
      }

      const res = await this.data.createBooking({ orgId: org, ...shared });
      if (res.error || !res.id) { this.errorMsg.set(this.errorText(res.error)); return; }
      // Persist the line-item breakdown as the invoice (source of truth).
      await this.data.saveInvoice(org, res.id, { lineItems: items, notes: null, issueDate: null });
      // Confirmed → push to Google Calendar now (don't wait for the client to pay/confirm).
      if (this.addToCalendar) await this.data.confirmToCalendar(res.id);
      // Opted into post-production → drop a linked card on the Work board (seeds the
      // service's task checklist). The board is otherwise managed manually.
      if (this.needsProduction) await this.admin.addWorkItem(org, res.id, '');
      const link = await this.data.generateLink(res.id);
      this.created.set({ id: res.id, ref: res.ref ?? '', link });
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
    this.clientMode = 'existing';
    this.clientId = '';
    this.contactName = '';
    this.staffId = '';
    this.selectedSlots = [];
    this.prefillSlots = [];
    this.lineItems = [];
    this.title = ''; this.location = ''; this.notes = '';
    this.paymentMode = 'both';
    this.depositMode = this.orgDefaults.depositAllowed ? 'deposit' : 'full';
    this.depositPercent = this.orgDefaults.depositPercent;
    this.needsProduction = false;
    this.addToCalendar = true;
    this.created.set(null); this.errorMsg.set('');
  }

  goToList(): void { this.router.navigate(['/bookings/list']); }
}
