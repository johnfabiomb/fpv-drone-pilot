import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClientPortalService, ClientBooking, BillingInput } from '@booking/core/services/client-portal.service';
import { BookingOrgService } from '@booking/core/services/booking-org.service';

type Step = 'loading' | 'signin' | 'list';

const STATUS_LABELS: Record<string, string> = {
  pending: 'Awaiting approval', hold: 'Reserving…', booked: 'Confirmed',
  in_progress: 'In progress', done: 'Completed', cancelled: 'Cancelled', expired: 'Expired',
};

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss',
})
export class MyBookingsComponent implements OnInit {
  private readonly portal = inject(ClientPortalService);
  private readonly bookingOrg = inject(BookingOrgService);
  private readonly route = inject(ActivatedRoute);

  readonly step = signal<Step>('loading');
  readonly bookings = signal<ClientBooking[]>([]);

  private orgId = '';
  private orgSlug = '';

  // sign-in
  email = '';
  readonly magicSent = signal(false);

  // billing details (client self-service)
  readonly showBilling = signal(false);
  readonly savingProfile = signal(false);
  readonly profileSaved = signal(false);
  billing: BillingInput = { name: '', email: '', company: '', vat: '', address: '' };

  async ngOnInit(): Promise<void> {
    this.orgSlug = this.route.snapshot.paramMap.get('org') ?? '';
    await this.portal.init();
    if (this.portal.signedIn()) await this.load();
    else this.step.set('signin');
  }

  private async load(): Promise<void> {
    const org = await this.bookingOrg.load(this.orgSlug || undefined);
    if (org) {
      this.orgId = org.org.id;
      this.bookings.set(await this.portal.loadMyBookings(this.orgId));
      const p = await this.portal.loadMyProfile(this.orgId);
      this.billing = {
        name: p?.name ?? '', email: p?.email ?? this.portal.user()?.email ?? '',
        company: p?.company ?? '', vat: p?.vat_number ?? '', address: p?.billing_address ?? '',
      };
    }
    this.step.set('list');
  }

  private redirectPath(): string { return this.orgSlug ? `/${this.orgSlug}/book/mine` : '/book/mine'; }
  async signInGoogle(): Promise<void> { await this.portal.signInWithGoogle(this.redirectPath()); }
  async sendMagicLink(): Promise<void> {
    const e = this.email.trim();
    if (!e) return;
    await this.portal.signInWithEmail(e, this.redirectPath());
    this.magicSent.set(true);
  }

  async signOut(): Promise<void> {
    await this.portal.signOut();
    this.bookings.set([]);
    this.step.set('signin');
  }

  statusLabel(s: string): string { return STATUS_LABELS[s] ?? s; }
  statusClass(s: string): string { return `pill--${s}`; }

  /** Open the printable invoice (the get_invoice RPC authorizes this client). */
  openInvoice(b: ClientBooking): void {
    window.open(`/book/invoice/${b.id}`, '_blank', 'noopener');
  }

  get canSaveBilling(): boolean {
    return !this.savingProfile() && this.billing.name.trim().length > 0 && this.billing.email.trim().length > 0;
  }

  async saveBilling(): Promise<void> {
    if (!this.orgId || !this.canSaveBilling) return;
    this.savingProfile.set(true);
    this.profileSaved.set(false);
    try {
      await this.portal.upsertProfile(this.orgId, this.billing);
      this.profileSaved.set(true);
      setTimeout(() => this.profileSaved.set(false), 2500);
    } finally {
      this.savingProfile.set(false);
    }
  }
}
