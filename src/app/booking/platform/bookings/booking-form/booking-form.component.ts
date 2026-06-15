import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { BookingAdminService, AdminService, AdminStaff, StaffServiceRow } from '@booking/core/services/booking-admin.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { servicePrice } from '@booking/core/interfaces/org.interface';

const CUSTOM = 'custom';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe],
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
  readonly staffServices = signal<StaffServiceRow[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly errorMsg = signal('');
  readonly editingId = signal<string | null>(null);
  readonly created = signal<{ ref: string; link: string | null } | null>(null);

  // ── Form state ──────────────────────────────────────────────────────
  clientMode: 'existing' | 'new' = 'existing';
  clientId = '';
  newClientName = '';
  newClientEmail = '';
  serviceId = '';            // '' | service id | CUSTOM
  staffId = '';
  startLocal = '';           // datetime-local (admin's wall-clock)
  hours = 1;
  title = '';
  priceTotal: number | null = null;
  location = '';
  notes = '';
  paymentMode: 'both' | 'card' | 'later' = 'both';   // which options the client sees on the link

  async ngOnInit(): Promise<void> {
    await this.auth.initialize();
    const org = this.auth.orgId();
    if (org) {
      const [services, staff, ss] = await Promise.all([
        this.admin.listServices(org),
        this.admin.listStaff(org),
        this.admin.listStaffServices(),
      ]);
      this.services.set(services.filter(s => s.is_active));
      this.staff.set(staff);
      this.staffServices.set(ss);

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
    this.clientMode = 'existing';
    this.clientId = b.client_id ?? '';
    this.serviceId = b.service_id ?? CUSTOM;
    this.staffId = b.staff_id;
    this.startLocal = this.toLocalInput(b.start_at);
    this.hours = Math.max(1, Math.round((new Date(b.end_at).getTime() - new Date(b.start_at).getTime()) / 3_600_000));
    this.title = b.title;
    this.priceTotal = b.price_total;
    this.location = b.location ?? '';
    this.notes = b.notes ?? '';
    this.paymentMode = b.allow_card && b.allow_inperson ? 'both' : b.allow_card ? 'card' : 'later';
  }

  // ── Derived ─────────────────────────────────────────────────────────
  get isCustom(): boolean { return this.serviceId === CUSTOM; }
  get isEditing(): boolean { return this.editingId() !== null; }
  get selectedService(): AdminService | undefined {
    return this.services().find(s => s.id === this.serviceId);
  }
  /** Workers for the chosen service (or every bookable worker when custom). */
  get workers(): AdminStaff[] {
    if (this.isCustom) return this.staff().filter(s => s.is_bookable);
    const ids = new Set(this.staffServices().filter(ss => ss.service_id === this.serviceId).map(ss => ss.staff_id));
    return this.staff().filter(s => ids.has(s.id) && s.is_bookable);
  }
  get computedPrice(): number | null {
    const svc = this.selectedService;
    return svc ? servicePrice(svc.pricing, this.hours) : null;
  }
  get minDateTime(): string {
    return this.toLocalInput(new Date().toISOString());
  }

  private toLocalInput(iso: string): string {
    const d = new Date(iso);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
  }

  // ── Change handlers ─────────────────────────────────────────────────
  onServiceChange(): void {
    const svc = this.selectedService;
    if (svc) {
      this.hours = Math.min(Math.max(this.hours, svc.min_hours), svc.max_hours);
      this.title = svc.name;
    }
    const ws = this.workers;
    this.staffId = ws.length === 1 ? ws[0].id : (ws.some(w => w.id === this.staffId) ? this.staffId : '');
    this.syncPrice();
  }
  onHoursChange(): void { this.syncPrice(); }
  /** Reset to the service's computed price (clears it for custom — admin sets their own). */
  syncPrice(): void { this.priceTotal = this.computedPrice; }

  // ── Submit ──────────────────────────────────────────────────────────
  get canSubmit(): boolean {
    const clientOk = this.clientMode === 'existing' ? !!this.clientId : this.newClientName.trim().length > 0;
    return !this.saving() && clientOk && !!this.serviceId && !!this.staffId
      && !!this.startLocal && this.hours > 0 && this.priceTotal != null && this.priceTotal >= 0
      && this.title.trim().length > 0;
  }

  async submit(): Promise<void> {
    if (!this.canSubmit) return;
    const org = this.auth.orgId();
    if (!org) { this.errorMsg.set('No organization context.'); return; }
    const svc = this.selectedService;
    if (svc && (this.hours < svc.min_hours || this.hours > svc.max_hours)) {
      this.errorMsg.set(`This service is ${svc.min_hours}–${svc.max_hours} hours.`); return;
    }

    this.saving.set(true);
    this.errorMsg.set('');
    try {
      // Resolve / create the client.
      let clientId = this.clientId;
      if (this.clientMode === 'new') {
        const c = await this.data.createClient(org, this.newClientName.trim(), this.newClientEmail.trim() || null);
        if (!c) { this.errorMsg.set('Could not create the client.'); return; }
        clientId = c.id;
      }

      const serviceId = this.isCustom ? null : this.serviceId;
      const shared = {
        staffId: this.staffId, serviceId, clientId,
        title: this.title.trim(), startAt: this.startLocal, hours: this.hours,
        priceTotal: this.priceTotal!,
        allowCard: this.paymentMode !== 'later',
        allowInperson: this.paymentMode !== 'card',
        location: this.location.trim() || null, notes: this.notes.trim() || null,
      };

      if (this.isEditing) {
        const res = await this.data.updateBooking(this.editingId()!, shared);
        if (res.error) { this.errorMsg.set(this.errorText(res.error)); return; }
        this.toast.success(`${this.editingRef || 'Booking'} updated`);
        this.goToList();
        return;
      }

      const res = await this.data.createBooking({ orgId: org, ...shared });
      if (res.error || !res.id) { this.errorMsg.set(this.errorText(res.error)); return; }
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
    this.clientMode = 'existing';
    this.clientId = ''; this.newClientName = ''; this.newClientEmail = '';
    this.serviceId = ''; this.staffId = ''; this.startLocal = ''; this.hours = 1;
    this.title = ''; this.priceTotal = null; this.location = ''; this.notes = '';
    this.paymentMode = 'both';
    this.created.set(null); this.errorMsg.set('');
  }

  goToList(): void { this.router.navigate(['/bookings/list']); }
}
