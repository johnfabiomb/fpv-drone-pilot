import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BookingAdminService, WorkJob, TaskRow, ProductionStage, JobOption } from '@booking/core/services/booking-admin.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { ToastService } from '@booking/ui/toast/toast.service';
import { ConfirmService } from '@booking/ui/confirm/confirm.service';
import { subscribeToChanges, RealtimeHandle } from '@booking/core/utils/realtime.util';

const STAGES: { key: ProductionStage; label: string }[] = [
  { key: 'to_edit', label: 'To edit' },
  { key: 'editing', label: 'Editing' },
  { key: 'to_deliver', label: 'To deliver' },
  { key: 'delivered', label: 'Delivered' },
];
type Board = Record<ProductionStage, WorkJob[]>;
const emptyBoard = (): Board => ({ to_edit: [], editing: [], to_deliver: [], delivered: [] });

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

  readonly stages = STAGES;
  private stageLabel(key: ProductionStage): string { return STAGES.find(s => s.key === key)?.label ?? key; }
  readonly board = signal<Board>(emptyBoard());
  readonly tasks = signal<TaskRow[]>([]);
  readonly loading = signal(true);
  newTask: Record<string, string> = {};

  // ── New-card composer ──────────────────────────────────────────────
  readonly jobOptions = signal<JobOption[]>([]);
  readonly composerOpen = signal(false);
  newCardTitle = '';
  newCardBookingId = '';   // '' = standalone (no job)
  readonly adding = signal(false);

  private realtime: RealtimeHandle | null = null;

  readonly overdueCount = computed(() => {
    const now = Date.now();
    return this.tasks().filter(t => !t.is_done && t.due_at && new Date(t.due_at).getTime() < now).length;
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
      const [jobs, tasks, jobOptions] = await Promise.all([
        this.admin.loadJobs(org), this.admin.loadTasks(org), this.admin.loadJobOptions(org),
      ]);
      this.tasks.set(tasks);
      this.jobOptions.set(jobOptions);
      const grouped = emptyBoard();
      for (const j of jobs) grouped[j.production_status].push(j);
      this.board.set(grouped);
    }
    this.loading.set(false);
  }

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
    // A standalone card needs a title; a job-linked one can inherit the booking's title.
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

  // ── Drag & drop between stage columns ─────────────────────────────
  async drop(event: CdkDragDrop<WorkJob[]>, target: ProductionStage): Promise<void> {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.board.set({ ...this.board() });
      return;
    }
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    const job = event.container.data[event.currentIndex];
    job.production_status = target;
    this.board.set({ ...this.board() });
    await this.admin.setStage(job.id, target, job.bookingId); // realtime reload reconciles
    this.toast.success(`Moved to ${this.stageLabel(target)}`);
  }

  // Arrow buttons — touch-friendly alternative to dragging.
  canPrev(j: WorkJob): boolean { return STAGES.findIndex(s => s.key === j.production_status) > 0; }
  canNext(j: WorkJob): boolean { return STAGES.findIndex(s => s.key === j.production_status) < STAGES.length - 1; }
  async move(j: WorkJob, delta: number): Promise<void> {
    const i = STAGES.findIndex(s => s.key === j.production_status) + delta;
    if (i < 0 || i >= STAGES.length) return;
    await this.admin.setStage(j.id, STAGES[i].key, j.bookingId);
    await this.reload();
    this.toast.success(`Moved to ${this.stageLabel(STAGES[i].key)}`);
  }

  // ── Tasks ─────────────────────────────────────────────────────────
  // Toggling a task checkbox is high-frequency + has its own visual state — no toast.
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
