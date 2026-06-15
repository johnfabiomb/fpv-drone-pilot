import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingOrgService } from '@booking/core/services/booking-org.service';
import { OrgService, servicePrice } from '@booking/core/interfaces/org.interface';
import { currencySymbol as toSymbol } from '@booking/core/utils/currency.util';

@Component({
  selector: 'app-service-picker',
  standalone: true,
  templateUrl: './service-picker.component.html',
  styleUrl: './service-picker.component.scss',
})
export class ServicePickerComponent implements OnInit {
  private readonly bookingOrg = inject(BookingOrgService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /** Org slug from the route (`/:org/book`); empty = the default/primary org. */
  private orgSlug = '';

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly org = this.bookingOrg.org;
  readonly services = this.bookingOrg.services;

  // When a service has >1 worker, show the worker choice for it
  readonly pickingWorkersFor = signal<OrgService | null>(null);

  readonly currencySymbol = computed(() => toSymbol(this.org()?.currency));

  async ngOnInit(): Promise<void> {
    this.orgSlug = this.route.snapshot.paramMap.get('org') ?? '';
    const data = await this.bookingOrg.load(this.orgSlug || undefined);
    if (!data) this.error.set('Could not load services. Please try again.');
    this.loading.set(false);
  }

  fromPrice(s: OrgService): number | null { return servicePrice(s.pricing, s.min_hours); }

  pickService(s: OrgService): void {
    if (s.workers.length === 0) return;
    if (s.workers.length === 1) { this.go(s.id, s.workers[0].id); return; }
    this.pickingWorkersFor.set(s);
  }

  pickWorker(serviceId: string, staffId: string): void { this.go(serviceId, staffId); }

  back(): void { this.pickingWorkersFor.set(null); }

  private go(serviceId: string, staffId: string): void {
    const cmds = this.orgSlug ? ['/', this.orgSlug, 'book', 'calendar'] : ['/book/calendar'];
    this.router.navigate(cmds, { queryParams: { service: serviceId, staff: staffId } });
  }
}
