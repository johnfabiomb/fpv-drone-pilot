import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingAdminService, AdminService } from '@booking/core/services/booking-admin.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';

interface ServiceForm {
  id?: string;
  name: string;
  description: string;
  min_hours: number;
  max_hours: number;
  extra_hour_price: number;
  tiers: { hours: number; price: number }[];
  is_active: boolean;
  taskText: string; // default production tasks, one per line
}

const blankForm = (): ServiceForm => ({
  name: '', description: '', min_hours: 1, max_hours: 8, extra_hour_price: 0,
  tiers: [{ hours: 1, price: 0 }], is_active: true, taskText: '',
});

@Component({
  selector: 'app-services-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './services-admin.component.html',
  styleUrl: './services-admin.component.scss',
})
export class ServicesAdminComponent implements OnInit {
  private readonly admin = inject(BookingAdminService);
  private readonly auth = inject(BookingsAuthService);
  private readonly toast = inject(ToastService);

  readonly services = signal<AdminService[]>([]);
  readonly loading = signal(true);
  readonly editing = signal<ServiceForm | null>(null);
  readonly saving = signal(false);

  async ngOnInit(): Promise<void> { await this.auth.initialize(); await this.reload(); }

  private async reload(): Promise<void> {
    const org = this.auth.orgId();
    if (org) this.services.set(await this.admin.listServices(org));
    this.loading.set(false);
  }

  add(): void { this.editing.set(blankForm()); }

  edit(s: AdminService): void {
    this.editing.set({
      id: s.id, name: s.name, description: s.description ?? '',
      min_hours: s.min_hours, max_hours: s.max_hours,
      extra_hour_price: s.pricing?.extra_hour_price ?? 0,
      tiers: (s.pricing?.tiers ?? [{ hours: 1, price: 0 }]).map(t => ({ ...t })),
      is_active: s.is_active,
      taskText: (s.task_template ?? []).join('\n'),
    });
  }

  cancel(): void { this.editing.set(null); }
  addTier(): void { this.editing.update(f => f ? { ...f, tiers: [...f.tiers, { hours: f.tiers.length + 1, price: 0 }] } : f); }
  removeTier(i: number): void { this.editing.update(f => f ? { ...f, tiers: f.tiers.filter((_, j) => j !== i) } : f); }

  async save(): Promise<void> {
    const f = this.editing();
    if (!f || !f.name.trim() || this.saving()) return;
    const org = this.auth.orgId();
    if (!org) return;
    const isNew = !f.id;
    this.saving.set(true);
    try {
      await this.admin.saveService(org, {
        id: f.id, name: f.name.trim(), description: f.description.trim() || null,
        min_hours: Number(f.min_hours), max_hours: Number(f.max_hours),
        is_active: f.is_active,
        pricing: {
          tiers: f.tiers.map(t => ({ hours: Number(t.hours), price: Number(t.price) })).sort((a, b) => a.hours - b.hours),
          extra_hour_price: Number(f.extra_hour_price),
        },
        task_template: f.taskText.split('\n').map(t => t.trim()).filter(Boolean),
      });
      this.editing.set(null);
      await this.reload();
      this.toast.success(`Service "${f.name.trim()}" ${isNew ? 'created' : 'updated'}`);
    } catch {
      this.toast.error('Could not save the service. Please try again.');
    } finally { this.saving.set(false); }
  }

  async remove(s: AdminService): Promise<void> {
    if (!confirm(`Delete service "${s.name}"? This can't be undone.`)) return;
    try {
      await this.admin.deleteService(s.id);
      await this.reload();
      this.toast.success(`Service "${s.name}" deleted`);
    } catch {
      this.toast.error('Could not delete the service.');
    }
  }

  priceLabel(s: AdminService): string {
    const t = s.pricing?.tiers ?? [];
    if (t.length === 1) return `€${t[0].price} + €${s.pricing.extra_hour_price}/hr`;
    return t.map(x => `${x.hours}h €${x.price}`).join(' · ') + ` + €${s.pricing.extra_hour_price}/hr`;
  }
}
