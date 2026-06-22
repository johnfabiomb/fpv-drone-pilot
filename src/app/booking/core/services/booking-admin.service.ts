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
  id: string;                  // work_item id (the board's unit)
  bookingId: string | null;    // linked booking, or null for a standalone card
  title: string;
  start_at: string | null;     // booking start (null for standalone)
  bookingEndAt: string | null; // booking end — drives auto-activation
  production_status: ProductionStage;
  isActive: boolean;           // on the board (true) vs in the Backlog (false)
  assigneeId: string | null;
  assigneeName: string | null;
  dueAt: string | null;        // deliver-by date
  clientName: string | null;
  serviceName: string | null;
}

export interface TaskRow {
  id: string;
  work_item_id: string | null;
  title: string;
  is_done: boolean;
  due_at: string | null;
}

/** A booking option for linking a new work card to a job. */
export interface JobOption {
  id: string;
  title: string;
  start_at: string;
  clientName: string | null;
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

export interface InvoiceDetails {
  legal_name?: string;
  address?: string;
  phone?: string;
  email?: string;
  vat_number?: string;
  vat_registered?: boolean;
  vat_rate?: number;        // percent, default 18
  vat_note?: string;        // legal VAT statement printed on every invoice (e.g. reverse-charge)
  invoice_prefix?: string;  // default 'INV'
  invoice_footer?: string;  // payment terms / thank-you / bank details
}

export interface OrgSettings {
  timezone: string;
  currency: string;
  booking_params: {
    deposit_percent?: number;
    deposit_allowed?: boolean;
    hold_minutes?: number;
    min_lead_minutes?: number;
    buffer_minutes?: number;
    cash_allowed?: boolean;
  };
  features?: { work_board?: boolean };
  invoice_details?: InvoiceDetails;
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
    // Soft delete via RPC — RLS hides it from every read; the row (and its history) is kept.
    await bookingsDb.rpc('soft_delete', { p_table: 'services', p_id: id });
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
    await bookingsDb.rpc('soft_delete', { p_table: 'staff', p_id: id });
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
    const { data } = await bookingsDb.from('organizations').select('timezone, currency, booking_params, features, invoice_details').eq('id', orgId).maybeSingle();
    return (data as OrgSettings) ?? null;
  }

  // ── Work board (production) ───────────────────────────────────────
  /** All cards (active + backlog) from the work_board view — names/is_active resolved server-side. */
  async loadJobs(orgId: string): Promise<WorkJob[]> {
    const { data } = await bookingsDb.from('work_board')
      .select('id, title, production_status, booking_id, booking_start_at, booking_end_at, is_active, assignee_id, assignee_name, due_at, client_name, service_name')
      .eq('org_id', orgId).order('sort').order('created_at');
    return ((data ?? []) as Array<Record<string, unknown>>).map(w => ({
      id: w['id'] as string, bookingId: (w['booking_id'] as string | null) ?? null,
      title: w['title'] as string,
      start_at: (w['booking_start_at'] as string | null) ?? null,
      bookingEndAt: (w['booking_end_at'] as string | null) ?? null,
      production_status: w['production_status'] as ProductionStage,
      isActive: !!w['is_active'],
      assigneeId: (w['assignee_id'] as string | null) ?? null,
      assigneeName: (w['assignee_name'] as string | null) ?? null,
      dueAt: (w['due_at'] as string | null) ?? null,
      clientName: (w['client_name'] as string | null) ?? null,
      serviceName: (w['service_name'] as string | null) ?? null,
    }));
  }
  /** Pull a backlog card onto the board (or push one back). */
  async activateCard(id: string): Promise<void> {
    await bookingsDb.from('work_items').update({ activated_at: new Date().toISOString() }).eq('id', id);
  }
  async backlogCard(id: string): Promise<void> {
    await bookingsDb.from('work_items').update({ activated_at: null }).eq('id', id);
  }
  /** Assign a card to a staff member (or clear it). */
  async assignCard(id: string, staffId: string | null): Promise<void> {
    await bookingsDb.from('work_items').update({ assignee_id: staffId }).eq('id', id);
  }
  /** Set / clear a card's deliver-by date (yyyy-MM-dd or null). */
  async setDue(id: string, dueAt: string | null): Promise<void> {
    await bookingsDb.from('work_items').update({ due_at: dueAt }).eq('id', id);
  }
  /** Bookings the admin can attach a new work card to (most recent first). */
  async loadJobOptions(orgId: string): Promise<JobOption[]> {
    const { data } = await bookingsDb.from('booking_summary')
      .select('id, title, start_at, client_name').eq('org_id', orgId)
      .order('start_at', { ascending: false }).limit(100);
    return ((data ?? []) as Array<Record<string, unknown>>).map(b => ({
      id: b['id'] as string, title: b['title'] as string,
      start_at: b['start_at'] as string, clientName: (b['client_name'] as string | null) ?? null,
    }));
  }
  /** Create a work card — standalone (bookingId null) or linked to a booking (seeds its service tasks). */
  async addWorkItem(orgId: string, bookingId: string | null, title: string): Promise<void> {
    await bookingsDb.rpc('create_work_item', { p_org: orgId, p_booking: bookingId, p_title: title });
  }
  /** Remove a card from the board (soft delete via RPC). Never touches the booking — only
   *  unflags it. The work_items → tasks cascade trigger hides its checklist automatically. */
  async deleteWorkItem(id: string, bookingId: string | null): Promise<void> {
    await bookingsDb.rpc('soft_delete', { p_table: 'work_items', p_id: id });
    if (bookingId) await bookingsDb.from('bookings').update({ needs_production: false }).eq('id', bookingId);
  }
  async loadTasks(orgId: string): Promise<TaskRow[]> {
    const { data } = await bookingsDb.from('tasks').select('id, work_item_id, title, is_done, due_at')
      .eq('org_id', orgId).order('sort').order('created_at');
    return (data ?? []) as TaskRow[];
  }
  async toggleTask(id: string, done: boolean): Promise<void> {
    await bookingsDb.from('tasks').update({ is_done: done, done_at: done ? new Date().toISOString() : null }).eq('id', id);
  }
  async addTask(orgId: string, workItemId: string, title: string): Promise<void> {
    await bookingsDb.from('tasks').insert({ org_id: orgId, work_item_id: workItemId, title });
  }
  async removeTask(id: string): Promise<void> { await bookingsDb.rpc('soft_delete', { p_table: 'tasks', p_id: id }); }
  async setStage(workItemId: string, stage: ProductionStage, bookingId: string | null = null): Promise<void> {
    await bookingsDb.from('work_items').update({ production_status: stage }).eq('id', workItemId);
    // For a booking-linked card, mirror progress to the booking + its Google Calendar event.
    if (bookingId) {
      await bookingsDb.from('bookings').update({ production_status: stage }).eq('id', bookingId);
      void bookingsDb.functions.invoke('sync-booking-event', { body: { bookingId } })
        .then(({ error }) => { if (error) console.warn('[BookingAdmin] calendar sync failed:', error.message); });
    }
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

  // ── Stripe Connect (per-org payouts) ──────────────────────────────
  /** Start (or resume) Stripe Connect onboarding; returns the hosted onboarding URL. */
  async connectStripeStart(orgId: string): Promise<{ url?: string; error?: string }> {
    const { data, error } = await bookingsDb.functions.invoke('connect-stripe-start', { body: { orgId } });
    if (error) return { error: error.message };
    return data as { url?: string; error?: string };
  }

  /** Read the org's Connect status (re-checks Stripe + caches the result). */
  async connectStripeStatus(orgId: string): Promise<ConnectStatus> {
    const { data, error } = await bookingsDb.functions.invoke('connect-stripe-status', { body: { orgId } });
    if (error) return { connected: false, chargesEnabled: false, detailsSubmitted: false, error: error.message };
    return data as ConnectStatus;
  }

  // ── Organizations & members (platform-admin gated where required) ──
  /** Create a new organization (platform admin only). Returns the new org id. */
  async createOrg(name: string, slug: string, timezone: string, currency: string): Promise<{ id?: string; error?: string }> {
    const { data, error } = await bookingsDb.rpc('create_org', { p_name: name, p_slug: slug, p_timezone: timezone, p_currency: currency });
    if (error) return { error: error.message };
    return { id: data as string };
  }

  async listMembers(orgId: string): Promise<OrgMember[]> {
    const { data } = await bookingsDb.rpc('list_org_members', { p_org: orgId });
    return (data ?? []) as OrgMember[];
  }

  /** Add/update a member by email. 'no_user' = they must sign in once first. */
  async addMember(orgId: string, email: string, role: string): Promise<'ok' | 'no_user' | 'error'> {
    const { data, error } = await bookingsDb.rpc('add_org_member', { p_org: orgId, p_email: email, p_role: role });
    if (error) return 'error';
    return (data as 'ok' | 'no_user') ?? 'error';
  }

  async removeMember(orgId: string, userId: string): Promise<{ ok?: boolean; error?: string }> {
    const { error } = await bookingsDb.rpc('remove_org_member', { p_org: orgId, p_user: userId });
    if (error) return { error: error.message };
    return { ok: true };
  }
}

export interface OrgMember { user_id: string; email: string; role: string; }

export interface ConnectStatus {
  connected: boolean;
  chargesEnabled: boolean;
  detailsSubmitted: boolean;
  accountId?: string;
  error?: string;
}
