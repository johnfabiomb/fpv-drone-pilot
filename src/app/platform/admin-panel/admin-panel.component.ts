import {
  Component, OnInit, PLATFORM_ID, inject, signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { PanelShellComponent } from '../../components/panel-shell/panel-shell.component';
import { MapBridgeService } from '../../shared/services/map-bridge.service';
import { GroupsService } from '../../shared/services/groups.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [FormsModule, PanelShellComponent],
  template: `
    <app-panel-shell
      title="Admin Panel"
      (closeRequested)="router.navigate(['/malta'])">

      <div class="ap-content">

        <div class="ap-tabs">
          <button class="ap-tab" [class.ap-tab--active]="adminView() === 'groups'"
            (click)="adminView.set('groups')">
            Groups
          </button>
          <button class="ap-tab" [class.ap-tab--active]="adminView() === 'users'"
            (click)="adminView.set('users')">
            Users
          </button>
        </div>

        @if (adminView() === 'groups') {
          <div class="ap-view">
            <p class="ap-view__title">Data maintenance</p>
            <div class="ap-action">
              <div class="ap-action__info">
                <span class="ap-action__label">Fix groups data</span>
                <span class="ap-action__desc">Backfill leaderIsAdmin on all group docs</span>
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
  `],
})
export class AdminPanelComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  readonly router             = inject(Router);
  readonly bridge             = inject(MapBridgeService);
  readonly groupsService      = inject(GroupsService);

  readonly adminView      = signal<'groups' | 'users'>('groups');
  readonly migrating      = signal(false);
  readonly migrateResult  = signal<string | null>(null);
  readonly activating     = signal(false);
  readonly activateEmail  = signal('');
  readonly activateResult = signal<string | null>(null);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.bridge.enterPanelMode([]);
    this.bridge.floatingBackBtn.set(null);
  }

  async runMigration(): Promise<void> {
    this.migrating.set(true);
    this.migrateResult.set(null);
    try {
      const count = await this.groupsService.migrateLeaderIsAdmin();
      this.migrateResult.set(`✅ Done — ${count} group${count === 1 ? '' : 's'} updated.`);
    } catch (e) {
      this.migrateResult.set(`❌ Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      this.migrating.set(false);
    }
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
}
