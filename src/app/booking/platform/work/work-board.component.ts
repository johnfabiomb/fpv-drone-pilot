import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BookingAdminService, WorkJob, TaskRow, ProductionStage, JobOption, AdminStaff } from '@booking/core/services/booking-admin.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { ConfirmService } from '@booking/ui/confirm/confirm.service';
import { subscribeToChanges, RealtimeHandle } from '@booking/core/utils/realtime.util';

// The board has a Backlog (waiting cards) followed by the four production stages.
// A card sits in Backlog until its shoot is over (auto) or it's pulled in; the stages
// are where active work moves.
type ColumnKey = 'backlog' | ProductionStage;
const STAGES: { key: ProductionStage; label: string }[] = [
  { key: 'to_edit', label: 'To edit' },
  { key: 'editing', label: 'Editing' },
  { key: 'to_deliver', label: 'To deliver' },
  { key: 'delivered', label: 'Delivered' },
];
const COLUMNS: { key: ColumnKey; label: string }[] = [{ key: 'backlog', label: 'Backlog' }, ...STAGES];
const COLUMN_KEYS = COLUMNS.map(c => c.key);

type Board = Record<ColumnKey, WorkJob[]>;
const emptyBoard = (): Board => ({ backlog: [], to_edit: [], editing: [], to_deliver: [], delivered: [] });

@Component({
  selector: 'app-work-board',
  standalone: true,
  imports: [FormsModule, DatePipe, DragDropModule],
  templateUrl: './work-board.component.html',
  styleUrl: './work-board.component.scss',
})
export class WorkBoardComponent implements OnInit, OnDestroy {
  private readonly admin = inject(BookingAdminService);
  private readonly auth = inject(BookingsAuthService);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);

  readonly columns = COLUMNS;
  readonly board = signal<Board>(emptyBoard());
  readonly tasks = signal<TaskRow[]>([]);
  readonly staff = signal<AdminStaff[]>([]);
  readonly loading = signal(true);
  newTask: Record<string, string> = {};

  // ── New-card composer ──────────────────────────────────────────────
  readonly jobOptions = signal<JobOption[]>([]);
  readonly composerOpen = signal(false);
  newCardTitle = '';
  newCardBookingId = '';   // '' = standalone (no job)
  readonly adding = signal(false);

  private realtime: RealtimeHandle | null = null;

  /** Active cards past their deliver-by date (and not yet delivered). */
  readonly overdueCount = computed(() => {
    const now = Date.now();
    return Object.values(this.board()).flat()
      .filter(j => j.isActive && j.production_status !== 'delivered'
                && j.dueAt && new Date(j.dueAt).getTime() < now).length;
  });

  async ngOnInit(): Promise<void> {
    await this.auth.initialize();
    await this.reload();
    this.realtime = subscribeToChanges('work-board', ['tasks', 'bookings'], () => void this.reload());
  }
  ngOnDestroy(): void { this.realtime?.destroy(); }

  private async reload(): Promise<void> {
    const org = this.auth.orgId();
    if (org) {
      const [jobs, tasks, jobOptions, staff] = await Promise.all([
        this.admin.loadJobs(org), this.admin.loadTasks(org), this.admin.loadJobOptions(org), this.admin.listStaff(org),
      ]);
      this.tasks.set(tasks);
      this.jobOptions.set(jobOptions);
      this.staff.set(staff);
      const grouped = emptyBoard();
      for (const j of jobs) grouped[this.columnOf(j)].push(j);
      this.board.set(grouped);
    }
    this.loading.set(false);
  }

  /** Which board column a card belongs to right now. */
  private columnOf(j: WorkJob): ColumnKey { return j.isActive ? j.production_status : 'backlog'; }
  private columnLabel(key: ColumnKey): string { return COLUMNS.find(c => c.key === key)?.label ?? key; }

  tasksFor(workItemId: string): TaskRow[] { return this.tasks().filter(t => t.work_item_id === workItemId); }
  remaining(workItemId: string): number { return this.tasksFor(workItemId).filter(t => !t.is_done).length; }

  // ── New / delete cards ─────────────────────────────────────────────
  toggleComposer(): void {
    this.composerOpen.update(v => !v);
    this.newCardTitle = ''; this.newCardBookingId = '';
  }
  async addCard(): Promise<void> {
    const org = this.auth.orgId();
    const bookingId = this.newCardBookingId || null;
    if (!org || this.adding() || (!bookingId && !this.newCardTitle.trim())) return;
    this.adding.set(true);
    try {
      await this.admin.addWorkItem(org, bookingId, this.newCardTitle.trim());
      await this.reload();
      this.composerOpen.set(false); this.newCardTitle = ''; this.newCardBookingId = '';
      this.toast.success('Card added');
    } finally { this.adding.set(false); }
  }
  async deleteCard(j: WorkJob): Promise<void> {
    const ok = await this.confirm.ask(j.bookingId
      ? { title: 'Remove from board', message: 'Remove this card from the Work board? The booking, invoice and calendar event are kept.', confirmLabel: 'Remove', danger: true }
      : { title: 'Delete card', message: 'Delete this card? This can’t be undone.', confirmLabel: 'Delete', danger: true });
    if (!ok) return;
    await this.admin.deleteWorkItem(j.id, j.bookingId);
    await this.reload();
    this.toast.info(j.bookingId ? 'Removed from board' : 'Card deleted');
  }

  // ── Moving cards (Backlog ↔ stages) — drag or arrows ───────────────
  /** Persist a move to a target column: Backlog = send back; a stage = activate + set stage. */
  private async moveTo(j: WorkJob, target: ColumnKey): Promise<void> {
    if (target === 'backlog') {
      await this.admin.backlogCard(j.id);
    } else {
      if (!j.isActive) await this.admin.activateCard(j.id);
      await this.admin.setStage(j.id, target, j.bookingId);
    }
    await this.reload();
  }

  async drop(event: CdkDragDrop<WorkJob[]>, target: ColumnKey): Promise<void> {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.board.set({ ...this.board() });
      return;
    }
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    const job = event.container.data[event.currentIndex];
    this.board.set({ ...this.board() });   // optimistic; reload reconciles
    await this.moveTo(job, target);
    this.toast.success(target === 'backlog' ? 'Moved to Backlog' : `Moved to ${this.columnLabel(target)}`);
  }

  // Arrow buttons — touch-friendly alternative to dragging (Backlog ‹—› stages).
  canPrev(j: WorkJob): boolean { return COLUMN_KEYS.indexOf(this.columnOf(j)) > 0; }
  canNext(j: WorkJob): boolean { return COLUMN_KEYS.indexOf(this.columnOf(j)) < COLUMN_KEYS.length - 1; }
  async move(j: WorkJob, delta: number): Promise<void> {
    const i = COLUMN_KEYS.indexOf(this.columnOf(j)) + delta;
    if (i < 0 || i >= COLUMN_KEYS.length) return;
    await this.moveTo(j, COLUMN_KEYS[i]);
    this.toast.success(COLUMN_KEYS[i] === 'backlog' ? 'Moved to Backlog' : `Moved to ${this.columnLabel(COLUMN_KEYS[i])}`);
  }

  // ── Assignee + due date (Trello-style) ─────────────────────────────
  async assign(j: WorkJob, staffId: string): Promise<void> {
    await this.admin.assignCard(j.id, staffId || null);
    await this.reload();
  }
  /** Initials for the assignee avatar chip. */
  initials(name: string | null): string {
    if (!name) return '?';
    return name.trim().split(/\s+/).map(p => p[0]).slice(0, 2).join('').toUpperCase();
  }
  isOverdue(j: WorkJob): boolean {
    return !!j.dueAt && j.production_status !== 'delivered' && new Date(j.dueAt).getTime() < Date.now();
  }
  dueValue(j: WorkJob): string { return j.dueAt ? j.dueAt.slice(0, 10) : ''; }
  async setDue(j: WorkJob, value: string): Promise<void> {
    await this.admin.setDue(j.id, value ? new Date(`${value}T12:00:00`).toISOString() : null);
    await this.reload();
  }

  // ── Tasks ─────────────────────────────────────────────────────────
  async toggle(t: TaskRow): Promise<void> { await this.admin.toggleTask(t.id, !t.is_done); await this.reload(); }
  async add(workItemId: string): Promise<void> {
    const title = (this.newTask[workItemId] ?? '').trim();
    if (!title) return;
    this.newTask[workItemId] = '';
    const org = this.auth.orgId();
    if (org) { await this.admin.addTask(org, workItemId, title); await this.reload(); this.toast.success('Task added'); }
  }
  async remove(t: TaskRow): Promise<void> { await this.admin.removeTask(t.id); await this.reload(); this.toast.info('Task removed'); }
}
