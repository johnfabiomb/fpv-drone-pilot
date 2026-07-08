import {
  Component, DestroyRef, OnInit, PLATFORM_ID, inject, signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { PanelShellComponent } from '@map/ui/panel-shell/panel-shell.component';
import { MapBridgeService } from '@map/core/services/map-bridge.service';
import { GroupsService } from '@map/core/services/groups.service';
import { supabase } from '@map/core/config/supabase.config';
import { ReportRow } from '@map/core/models/group.model';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, PanelShellComponent],
  template: `
    <app-panel-shell
      title="Admin Panel"
      (closeRequested)="router.navigate(['/malta'])">

      <div class="ap-content">

        <div class="ap-tabs">
          <button class="ap-tab" [class.ap-tab--active]="adminView() === 'groups'"
            (click)="adminView.set('groups')">Groups</button>
          <button class="ap-tab" [class.ap-tab--active]="adminView() === 'users'"
            (click)="adminView.set('users')">Users</button>
          <button class="ap-tab" [class.ap-tab--active]="adminView() === 'reports'"
            (click)="adminView.set('reports'); loadReports()">
            Reports
            @if (reports().length) {
              <span class="ap-tab__badge">{{ reports().length }}</span>
            }
          </button>
          <button class="ap-tab" [class.ap-tab--active]="adminView() === 'notifications'"
            (click)="adminView.set('notifications')">Notify</button>
        </div>

        @if (adminView() === 'groups') {
          <div class="ap-view">
            <p class="ap-view__title">Data maintenance</p>
            <div class="ap-action">
              <div class="ap-action__info">
                <span class="ap-action__label">Fix groups data</span>
                <span class="ap-action__desc">Backfill leaderIsAdmin + completedAt on all group docs</span>
              </div>
              <button class="ap-action__btn" (click)="runMigration()" [disabled]="migrating()">
                {{ migrating() ? 'Updating…' : '🔧 Run' }}
              </button>
            </div>
            @if (migrateResult()) {
              <p class="ap-result">{{ migrateResult() }}</p>
            }
          </div>
        }

        @if (adminView() === 'users') {
          <div class="ap-view">
            <p class="ap-view__title">Early access</p>
            <p class="ap-view__desc">Enter the user's email to grant Groups access. Takes effect on their next login.</p>
            <div class="ap-input-row">
              <input class="ap-email-input"
                type="email"
                placeholder="user@email.com"
                [ngModel]="activateEmail()"
                (ngModelChange)="activateEmail.set($event)"
                (keydown.enter)="activateGroupsForUser()">
              <button class="ap-submit-btn"
                (click)="activateGroupsForUser()"
                [disabled]="activating() || !activateEmail().trim()">
                {{ activating() ? '…' : 'Activate' }}
              </button>
            </div>
            @if (activateResult()) {
              <p class="ap-result">{{ activateResult() }}</p>
            }

            <p class="ap-view__title" style="margin-top:20px">Grant guide role</p>
            <p class="ap-view__desc">Guides can set a price on their group tours. Takes effect on their next login.</p>
            <div class="ap-input-row">
              <input class="ap-email-input"
                type="email"
                placeholder="user@email.com"
                [ngModel]="guideEmail()"
                (ngModelChange)="guideEmail.set($event)"
                (keydown.enter)="activateGuideForUser()">
              <button class="ap-submit-btn"
                (click)="activateGuideForUser()"
                [disabled]="activatingGuide() || !guideEmail().trim()">
                {{ activatingGuide() ? '…' : 'Grant' }}
              </button>
            </div>
            @if (guideResult()) {
              <p class="ap-result">{{ guideResult() }}</p>
            }
          </div>
        }

        @if (adminView() === 'notifications') {
          <div class="ap-view">
            <p class="ap-view__title">Send notification</p>
            <p class="ap-view__desc">Leave target email blank to broadcast to all users.</p>

            <select class="ap-email-input" style="height:38px"
              [ngModel]="notifType()" (ngModelChange)="notifType.set($event)">
              <option value="announcement">📢 Announcement</option>
              <option value="info">🔔 Info</option>
              <option value="new_location">📍 New location</option>
              <option value="deal">Deal</option>
              <option value="achievement">🏆 Achievement</option>
            </select>

            <input class="ap-email-input" type="text"
              placeholder="Title *"
              [ngModel]="notifTitle()" (ngModelChange)="notifTitle.set($event)">

            <textarea class="ap-email-input" rows="4" style="height:auto;padding:9px 12px;resize:vertical"
              placeholder="Body (HTML supported)"
              [ngModel]="notifBody()" (ngModelChange)="notifBody.set($event)">
            </textarea>

            <input class="ap-email-input" type="email"
              placeholder="Target email (blank = everyone)"
              [ngModel]="notifTarget()" (ngModelChange)="notifTarget.set($event)">

            <input class="ap-email-input" type="text"
              placeholder="Action URL (e.g. /malta/locations/babu-valley)"
              [ngModel]="notifActionUrl()" (ngModelChange)="notifActionUrl.set($event)">

            <input class="ap-email-input" type="text"
              placeholder="Action label (e.g. View location)"
              [ngModel]="notifActionLabel()" (ngModelChange)="notifActionLabel.set($event)">

            <button class="ap-submit-btn" style="align-self:flex-start;padding:9px 20px"
              (click)="sendNotification()"
              [disabled]="notifSending() || !notifTitle().trim()">
              {{ notifSending() ? 'Sending…' : '🔔 Send' }}
            </button>

            @if (notifResult()) {
              <p class="ap-result">{{ notifResult() }}</p>
            }
          </div>
        }

        @if (adminView() === 'reports') {
          <div class="ap-view">
            <p class="ap-view__title">Reported messages</p>
            @if (reportsLoading()) {
              <p class="ap-view__desc">Loading…</p>
            } @else if (reports().length === 0) {
              <p class="ap-view__desc">No reports — all clear ✅</p>
            } @else {
              <div class="ap-reports">
                @for (r of reports(); track r.id) {
                  <div class="ap-report">
                    <div class="ap-report__meta">
                      <span class="ap-report__group">{{ r.group_title || r.group_id }}</span>
                      <span class="ap-report__time">{{ r.created_at | date:'d MMM · HH:mm' }}</span>
                    </div>
                    <p class="ap-report__text">"{{ r.message_text }}"</p>
                    <p class="ap-report__reporter">Reported by {{ r.reporter_name }}</p>
                    <div class="ap-report__actions">
                      <button class="ap-report__btn ap-report__btn--dismiss"
                        (click)="dismissReport(r.id)">Dismiss</button>
                      <button class="ap-report__btn ap-report__btn--delete"
                        (click)="deleteReportedMessage(r)">Delete message</button>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        }

      </div>
    </app-panel-shell>
  `,
  styles: [`
    .ap-content { padding: 0; }

    .ap-tabs {
      display: flex;
      border-bottom: 1px solid var(--color-border);
      background: var(--color-bg-light);
    }

    .ap-tab {
      flex: 1;
      padding: 12px 0;
      font-size: 13px;
      font-weight: 600;
      color: var(--color-text-muted);
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all var(--transition);

      &:hover { color: var(--color-text-secondary); background: var(--color-bg-muted); }

      &--active {
        color: var(--color-text-base);
        background: var(--color-bg);
        border-bottom-color: var(--color-primary);
      }
    }

    .ap-view {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .ap-view__title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--color-text-muted);
      margin: 0;
    }

    .ap-view__desc {
      font-size: 13px;
      color: var(--color-text-muted);
      line-height: 1.5;
      margin: 0;
    }

    .ap-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 14px;
      background: var(--color-bg-light);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
    }

    .ap-action__info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
    }

    .ap-action__label {
      font-size: 13.5px;
      font-weight: 600;
      color: var(--color-text-base);
    }

    .ap-action__desc {
      font-size: 11.5px;
      color: var(--color-text-muted);
    }

    .ap-action__btn {
      padding: 7px 14px;
      font-size: 12.5px;
      font-weight: 600;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
      background: var(--color-bg);
      color: var(--color-text-secondary);
      cursor: pointer;
      white-space: nowrap;
      transition: background var(--transition);
      &:hover { background: var(--color-bg-muted); }
      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }

    .ap-input-row {
      display: flex;
      gap: 8px;
    }

    .ap-email-input {
      flex: 1;
      min-width: 0;
      padding: 9px 12px;
      font-size: 13px;
      font-family: inherit;
      color: var(--color-text-base);
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      outline: none;
      &:focus { border-color: var(--color-primary); }
      &::placeholder { color: var(--color-text-light); }
    }

    .ap-submit-btn {
      padding: 9px 16px;
      font-size: 13px;
      font-weight: 700;
      border-radius: var(--radius-md);
      border: none;
      background: var(--color-primary);
      color: #fff;
      cursor: pointer;
      white-space: nowrap;
      transition: opacity var(--transition);
      &:hover { opacity: 0.88; }
      &:disabled { opacity: 0.45; cursor: not-allowed; }
    }

    .ap-result {
      font-size: 13px;
      color: var(--color-text-secondary);
      margin: 0;
      padding: 10px 14px;
      background: var(--color-bg-light);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
    }

    .ap-tab__badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      border-radius: 8px;
      background: #ef4444;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      margin-left: 5px;
      line-height: 1;
    }

    .ap-reports {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .ap-report {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 12px 14px;
      background: var(--color-bg-light);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
    }

    .ap-report__meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .ap-report__group {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--color-text-secondary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ap-report__time {
      font-size: 10.5px;
      color: var(--color-text-light);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .ap-report__text {
      font-size: 12.5px;
      color: var(--color-text-base);
      margin: 0;
      line-height: 1.45;
      word-break: break-word;
    }

    .ap-report__reporter {
      font-size: 11px;
      color: var(--color-text-muted);
      margin: 0;
    }

    .ap-report__actions {
      display: flex;
      gap: 7px;
      margin-top: 2px;
    }

    .ap-report__btn {
      padding: 5px 12px;
      font-size: 12px;
      font-weight: 600;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
      cursor: pointer;
      transition: opacity var(--transition);
      &:hover { opacity: 0.8; }

      &--dismiss {
        background: var(--color-bg);
        color: var(--color-text-secondary);
      }
      &--delete {
        background: #fee2e2;
        color: #dc2626;
        border-color: #fecaca;
      }
    }
  `],
})
export class AdminPanelComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  readonly router             = inject(Router);
  readonly bridge             = inject(MapBridgeService);
  private readonly destroyRef = inject(DestroyRef);
  readonly groupsService      = inject(GroupsService);

  readonly adminView      = signal<'groups' | 'users' | 'reports' | 'notifications'>('groups');
  readonly migrating      = signal(false);
  readonly migrateResult  = signal<string | null>(null);
  readonly activating     = signal(false);
  readonly activateEmail  = signal('');
  readonly activateResult = signal<string | null>(null);
  readonly activatingGuide = signal(false);
  readonly guideEmail     = signal('');
  readonly guideResult    = signal<string | null>(null);
  readonly reports        = signal<ReportRow[]>([]);
  readonly reportsLoading = signal(false);

  // Notifications tab
  readonly notifType        = signal<string>('announcement');
  readonly notifTitle       = signal('');
  readonly notifBody        = signal('');
  readonly notifTarget      = signal('');
  readonly notifActionUrl   = signal('');
  readonly notifActionLabel = signal('');
  readonly notifSending     = signal(false);
  readonly notifResult      = signal<string | null>(null);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.bridge.enterPanelMode([]);
    this.bridge.floatingBackBtn.set(null);

    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(loc => { if (loc) this.router.navigate(['/malta/locations', loc.slug]); });
  }

  async runMigration(): Promise<void> {
    this.migrating.set(true);
    this.migrateResult.set(null);
    try {
      const completedAtCount = await this.groupsService.migrateCompletedAt();
      const parts: string[] = [];
      if (completedAtCount > 0) parts.push(`${completedAtCount} completedAt backfilled`);
      this.migrateResult.set(parts.length
        ? `✅ Done — ${parts.join(', ')}.`
        : '✅ Nothing to fix — all data is up to date.');
    } catch (e) {
      this.migrateResult.set(`❌ Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      this.migrating.set(false);
    }
  }

  async loadReports(): Promise<void> {
    if (this.reportsLoading()) return;
    this.reportsLoading.set(true);
    try {
      this.reports.set(await this.groupsService.fetchReports());
    } finally {
      this.reportsLoading.set(false);
    }
  }

  async dismissReport(reportId: string): Promise<void> {
    await this.groupsService.dismissReport(reportId);
    this.reports.update(rs => rs.filter(r => r.id !== reportId));
  }

  async deleteReportedMessage(r: ReportRow): Promise<void> {
    await this.groupsService.deleteReportedMessage(r.group_id, r.message_id, r.id);
    this.reports.update(rs => rs.filter(x => x.id !== r.id));
  }

  async activateGroupsForUser(): Promise<void> {
    const email = this.activateEmail().trim();
    if (!email) return;
    this.activating.set(true);
    this.activateResult.set(null);
    try {
      const result = await this.groupsService.activateGroupsAccess(email);
      if (result === 'not_found') {
        this.activateResult.set('❌ No user found with that email.');
      } else {
        this.activateResult.set(`✅ Groups activated for ${email}`);
        this.activateEmail.set('');
      }
    } catch (e) {
      this.activateResult.set(`❌ Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      this.activating.set(false);
    }
  }

  async activateGuideForUser(): Promise<void> {
    const email = this.guideEmail().trim();
    if (!email) return;
    this.activatingGuide.set(true);
    this.guideResult.set(null);
    try {
      const result = await this.groupsService.activateGuideRole(email);
      if (result === 'not_found') {
        this.guideResult.set('❌ No user found with that email.');
      } else {
        this.guideResult.set(`✅ Guide role granted to ${email}`);
        this.guideEmail.set('');
      }
    } catch (e) {
      this.guideResult.set(`❌ Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      this.activatingGuide.set(false);
    }
  }

  async sendNotification(): Promise<void> {
    const title = this.notifTitle().trim();
    if (!title) return;
    this.notifSending.set(true);
    this.notifResult.set(null);
    try {
      // Resolve target email → user_id if provided
      let targetUserId: string | null = null;
      const email = this.notifTarget().trim();
      if (email) {
        const { data } = await supabase
          .from('users')
          .select('id')
          .eq('email', email)
          .maybeSingle();
        if (!data) { this.notifResult.set('❌ No user found with that email.'); return; }
        targetUserId = data['id'] as string;
      }

      const { error } = await supabase.rpc('admin_create_notification', {
        p_type:         this.notifType(),
        p_title:        title,
        p_body:         this.notifBody().trim() || null,
        p_target_user:  targetUserId,
        p_action_url:   this.notifActionUrl().trim() || null,
        p_action_label: this.notifActionLabel().trim() || null,
        p_image_url:    null,
        p_expires_at:   null,
      });

      if (error) throw error;
      this.notifResult.set(targetUserId
        ? `✅ Notification sent to ${email}`
        : '✅ Broadcast sent to all users');
      this.notifTitle.set('');
      this.notifBody.set('');
      this.notifTarget.set('');
      this.notifActionUrl.set('');
      this.notifActionLabel.set('');
    } catch (e) {
      this.notifResult.set(`❌ Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      this.notifSending.set(false);
    }
  }
}
