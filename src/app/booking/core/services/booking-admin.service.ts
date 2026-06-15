import { Injectable } from '@angular/core';
import { bookingsDb } from '@booking/core/db/supabase.bookings';
import { ServicePricing } from '@booking/core/interfaces/org.interface';
import { WorkingHoursConfig } from '@booking/core/interfaces/working-hours.interface';

export interface AdminService {
  id: string;
  org_id: string;
  name: string;
  description: string | null;
  pricing: ServicePricing;
  min_hours: number;
  max_hours: number;
  is_active: boolean;
  task_template: string[];
}

export type ProductionStage = 'to_edit' | 'editing' | 'to_deliver' | 'delivered';

export interface WorkJob {
  id: string;
  title: string;
  start_at: string;
  production_status: ProductionStage;
  clientName: string | null;
  serviceName: string | null;
}

export interface TaskRow {
  id: string;
  booking_id: string | null;
  title: string;
  is_done: boolean;
  due_at: string | null;
}

export interface AdminStaff {
  id: string;
  org_id: string;
  user_id: string | null;
  name: string;
  email: string | null;
  is_bookable: boolean;
}

export interface StaffServiceRow {
  staff_id: string;
  service_id: string;
  working_hours: WorkingHoursConfig | null;
}

export interface OrgSettings {
  timezone: string;
  currency: string;
  booking_params: {
    deposit_percent?: number;
    hold_minutes?: number;
    min_lead_minutes?: number;
    buffer_minutes?: number;
    cash_allowed?: boolean;
  };
  features?: { work_board?: boolean };
}

// Org-admin CRUD over services / staff / assignments / org settings.
// RLS (is_org_admin) enforces that an admin only ever touches their own org.
@Injectable({ providedIn: 'root' })
export class BookingAdminService {
  // ── Services ──────────────────────────────────────────────────────
  async listServices(orgId: string): Promise<AdminService[]> {
    const { data } = await bookingsDb.from('services').select('*').eq('org_id', orgId).order('name');
    return (data ?? []) as AdminService[];
  }
  async saveService(orgId: string, s: Partial<AdminService>): Promise<void> {
    const row = {
      org_id: orgId, name: s.name, description: s.description ?? null,
      pricing: s.pricing, min_hours: s.min_hours, max_hours: s.max_hours,
      is_active: s.is_active ?? true, task_template: s.task_template ?? [],
    };
    if (s.id) await bookingsDb.from('services').update(row).eq('id', s.id);
    else await bookingsDb.from('services').insert(row);
  }
  async deleteService(id: string): Promise<void> {
    await bookingsDb.from('services').delete().eq('id', id);
  }

  // ── Staff ─────────────────────────────────────────────────────────
  async listStaff(orgId: string): Promise<AdminStaff[]> {
    const { data } = await bookingsDb.from('staff').select('*').eq('org_id', orgId).order('name');
    return (data ?? []) as AdminStaff[];
  }
  async saveStaff(orgId: string, s: Partial<AdminStaff>): Promise<void> {
    const row = { org_id: orgId, name: s.name, email: s.email ?? null, is_bookable: s.is_bookable ?? true };
    if (s.id) await bookingsDb.from('staff').update(row).eq('id', s.id);
    else await bookingsDb.from('staff').insert(row);
  }
  async deleteStaff(id: string): Promise<void> {
    await bookingsDb.from('staff').delete().eq('id', id);
  }

  // ── Staff ↔ Service assignment + schedule ─────────────────────────
  async listStaffServices(): Promise<StaffServiceRow[]> {
    // RLS already limits to the admin's org.
    const { data } = await bookingsDb.from('staff_services').select('staff_id, service_id, working_hours');
    return (data ?? []) as StaffServiceRow[];
  }
  async assignService(staffId: string, serviceId: string, workingHours: WorkingHoursConfig): Promise<void> {
    await bookingsDb.from('staff_services').upsert({ staff_id: staffId, service_id: serviceId, working_hours: workingHours });
  }
  async unassignService(staffId: string, serviceId: string): Promise<void> {
    await bookingsDb.from('staff_services').delete().eq('staff_id', staffId).eq('service_id', serviceId);
  }

  // ── Org settings ──────────────────────────────────────────────────
  async getOrgSettings(orgId: string): Promise<OrgSettings | null> {
    const { data } = await bookingsDb.from('organizations').select('timezone, currency, booking_params, features').eq('id', orgId).maybeSingle();
    return (data as OrgSettings) ?? null;
  }

  // ── Work board (production) ───────────────────────────────────────
  async loadJobs(orgId: string): Promise<WorkJob[]> {
    const { data } = await bookingsDb.from('bookings')
      .select('id, title, start_at, production_status, client:client_id(name), service:service_id(name)')
      .eq('org_id', orgId).not('production_status', 'is', null).order('start_at');
    const pickName = (v: unknown): string | null => {
      const o = Array.isArray(v) ? v[0] : v;
      return (o as { name?: string } | null)?.name ?? null;
    };
    return ((data ?? []) as Array<Record<string, unknown>>).map(b => ({
      id: b['id'] as string, title: b['title'] as string, start_at: b['start_at'] as string,
      production_status: b['production_status'] as ProductionStage,
      clientName: pickName(b['client']), serviceName: pickName(b['service']),
    }));
  }
  async loadTasks(orgId: string): Promise<TaskRow[]> {
    const { data } = await bookingsDb.from('tasks').select('id, booking_id, title, is_done, due_at')
      .eq('org_id', orgId).order('sort').order('created_at');
    return (data ?? []) as TaskRow[];
  }
  async toggleTask(id: string, done: boolean): Promise<void> {
    await bookingsDb.from('tasks').update({ is_done: done, done_at: done ? new Date().toISOString() : null }).eq('id', id);
  }
  async addTask(orgId: string, bookingId: string | null, title: string): Promise<void> {
    await bookingsDb.from('tasks').insert({ org_id: orgId, booking_id: bookingId, title });
  }
  async removeTask(id: string): Promise<void> { await bookingsDb.from('tasks').delete().eq('id', id); }
  async setStage(bookingId: string, stage: ProductionStage): Promise<void> {
    await bookingsDb.from('bookings').update({ production_status: stage }).eq('id', bookingId);
    // Mirror the new progress onto the Google Calendar event description (fire-and-forget).
    void bookingsDb.functions.invoke('sync-booking-event', { body: { bookingId } })
      .then(({ error }) => { if (error) console.warn('[BookingAdmin] calendar sync failed:', error.message); });
  }
  async updateOrgSettings(orgId: string, patch: Partial<OrgSettings>): Promise<void> {
    await bookingsDb.from('organizations').update(patch).eq('id', orgId);
  }

  // ── Integrations ──────────────────────────────────────────────────
  async checkIntegrations(): Promise<{ stripe?: { ok: boolean; detail: string }; google?: { ok: boolean; detail: string }; error?: string }> {
    const { data, error } = await bookingsDb.functions.invoke('check-integrations');
    if (error) return { error: error.message };
    return data as { stripe: { ok: boolean; detail: string }; google: { ok: boolean; detail: string } };
  }
}
