import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingAdminService, AdminService, AdminStaff, StaffServiceRow } from '@booking/core/services/booking-admin.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';

interface StaffForm { id?: string; name: string; email: string; is_bookable: boolean; }
interface SvcRow { serviceId: string; name: string; assigned: boolean; start: number; end: number; }

@Component({
  selector: 'app-staff-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './staff-admin.component.html',
  styleUrl: './staff-admin.component.scss',
})
export class StaffAdminComponent implements OnInit {
  private readonly admin = inject(BookingAdminService);
  private readonly auth = inject(BookingsAuthService);
  private readonly toast = inject(ToastService);

  readonly staff = signal<AdminStaff[]>([]);
  readonly services = signal<AdminService[]>([]);
  private assignments: StaffServiceRow[] = [];
  readonly loading = signal(true);

  readonly editingStaff = signal<StaffForm | null>(null);
  readonly managing = signal<AdminStaff | null>(null);
  readonly rows = signal<SvcRow[]>([]);
  readonly savingRow = signal<string | null>(null);

  async ngOnInit(): Promise<void> { await this.auth.initialize(); await this.reload(); }

  private async reload(): Promise<void> {
    const org = this.auth.orgId();
    if (org) {
      const [st, sv, asg] = await Promise.all([this.admin.listStaff(org), this.admin.listServices(org), this.admin.listStaffServices()]);
      this.staff.set(st); this.services.set(sv); this.assignments = asg;
    }
    this.loading.set(false);
  }

  servicesFor(staffId: string): string[] {
    const ids = this.assignments.filter(a => a.staff_id === staffId).map(a => a.service_id);
    return this.services().filter(s => ids.includes(s.id)).map(s => s.name);
  }

  // ── Staff add/edit ────────────────────────────────────────────────
  addStaff(): void { this.editingStaff.set({ name: '', email: '', is_bookable: true }); }
  editStaff(s: AdminStaff): void { this.editingStaff.set({ id: s.id, name: s.name, email: s.email ?? '', is_bookable: s.is_bookable }); }
  cancelStaff(): void { this.editingStaff.set(null); }
  async saveStaff(): Promise<void> {
    const f = this.editingStaff(); const org = this.auth.orgId();
    if (!f || !f.name.trim() || !org) return;
    const isNew = !f.id;
    try {
      await this.admin.saveStaff(org, { id: f.id, name: f.name.trim(), email: f.email.trim() || null, is_bookable: f.is_bookable });
      this.editingStaff.set(null);
      await this.reload();
      this.toast.success(`Worker "${f.name.trim()}" ${isNew ? 'added' : 'updated'}`);
    } catch {
      this.toast.error('Could not save the worker. Please try again.');
    }
  }
  async removeStaff(s: AdminStaff): Promise<void> {
    if (!confirm(`Remove worker "${s.name}"?`)) return;
    try {
      await this.admin.deleteStaff(s.id);
      await this.reload();
      this.toast.success(`Worker "${s.name}" removed`);
    } catch {
      this.toast.error('Could not remove the worker.');
    }
  }

  // ── Service assignment + schedule ─────────────────────────────────
  manageServices(s: AdminStaff): void {
    this.managing.set(s);
    this.rows.set(this.services().map(svc => {
      const a = this.assignments.find(x => x.staff_id === s.id && x.service_id === svc.id);
      const range = (a?.working_hours?.default as { start: number; end: number }[] | undefined)?.[0];
      return { serviceId: svc.id, name: svc.name, assigned: !!a, start: range?.start ?? 9, end: range?.end ?? 17 };
    }));
  }
  closeManage(): void { this.managing.set(null); }

  async saveRow(r: SvcRow): Promise<void> {
    const s = this.managing(); if (!s) return;
    this.savingRow.set(r.serviceId);
    try {
      if (r.assigned) await this.admin.assignService(s.id, r.serviceId, { default: [{ start: Number(r.start), end: Number(r.end) }] });
      else await this.admin.unassignService(s.id, r.serviceId);
      await this.reload();
      this.toast.success(`${r.name} ${r.assigned ? 'assigned to' : 'removed from'} ${s.name}`);
    } catch {
      this.toast.error('Could not update the assignment.');
    } finally { this.savingRow.set(null); }
  }
}
