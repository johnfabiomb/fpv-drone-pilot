import { Component, EventEmitter, Output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModalComponent } from '@ui/modal/app-modal.component';
import { UserAvatarComponent } from '@ui/user-avatar/user-avatar.component';
import { UserDataService } from '@core/services/user-data.service';
import { AuthService } from '@core/services/auth.service';
import { LEVELS, NEW_LEVEL_DURATION_MS, LevelDefinition, XP_ACTIONS, getNextLevel } from '@core/utils/level.utils';

@Component({
  selector: 'app-levels-modal',
  standalone: true,
  imports: [CommonModule, AppModalComponent, UserAvatarComponent],
  template: `
    <app-modal (closeRequested)="closeRequested.emit()">

      <!-- Hero -->
      <div class="lm-hero">
        <app-user-avatar
          [photoURL]="auth.userPhotoURL()"
          [displayName]="auth.userDisplayName()"
          size="xl"
          shape="circle"
          [level]="levelInfo().id">
        </app-user-avatar>
        <p class="lm-name">{{ auth.userDisplayName() }}</p>
        <div class="lm-badge">{{ levelInfo().emoji }} {{ levelInfo().name }} · Level {{ levelInfo().id }}</div>
        <p class="lm-desc">{{ levelInfo().description }}</p>
      </div>

      <!-- New: 24h lock countdown -->
      <div class="lm-new-lock" *ngIf="levelInfo().id === 0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        Levelling up unlocks in {{ hoursLeft() }}h
      </div>

      <!-- XP progress bar -->
      <ng-container *ngIf="levelInfo().id > 0">
        <div class="lm-progress" *ngIf="nextLevel() as next">
          <div class="lm-progress__labels">
            <span>{{ xp() }} XP</span>
            <span>{{ nextLevelXp() }} XP to {{ next.name }}</span>
          </div>
          <div class="lm-progress__bar">
            <div class="lm-progress__fill" [style.width.%]="progressPct()"></div>
          </div>
          <div class="lm-days-gate" *ngIf="nextLevelDaysLeft() > 0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {{ nextLevelDaysLeft() }} more day{{ nextLevelDaysLeft() === 1 ? '' : 's' }} as a member required
          </div>
        </div>
        <div class="lm-maxed" *ngIf="!nextLevel()">
          🏆 You've reached the highest level!
        </div>
      </ng-container>

      <!-- How to earn XP -->
      <div class="lm-xp-grid">
        <div class="lm-xp-row" *ngFor="let item of xpItems">
          <span class="lm-xp-row__label">{{ item.label }}</span>
          <span class="lm-xp-row__val">+{{ item.xp }} XP</span>
        </div>
      </div>

      <div class="lm-divider"></div>

      <!-- All levels -->
      <div class="lm-levels">
        <div *ngFor="let lvl of allLevels"
          class="lm-level"
          [class.lm-level--achieved]="lvl.id < levelInfo().id"
          [class.lm-level--current]="lvl.id === levelInfo().id"
          [class.lm-level--locked]="lvl.id > levelInfo().id">

          <span class="lm-level__emoji">{{ lvl.emoji }}</span>

          <span class="lm-level__info">
            <span class="lm-level__name">{{ lvl.name }}</span>
            <span class="lm-level__perk">{{ lvl.perk }}</span>
          </span>

          <span class="lm-level__req">
            <ng-container *ngIf="lvl.id === 0">24h</ng-container>
            <ng-container *ngIf="lvl.id > 0 && lvl.id <= levelInfo().id">✓</ng-container>
            <ng-container *ngIf="lvl.id > levelInfo().id">
              {{ lvl.minXp | number }}+ XP
              <span *ngIf="lvl.minDays > 0" class="lm-level__days">· {{ lvl.minDays }}d</span>
            </ng-container>
          </span>
        </div>
      </div>

    </app-modal>
  `,
  styles: [`
    .lm-hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      padding-top: 4px;
    }

    .lm-name {
      margin: 4px 0 0;
      font-size: 15px;
      font-weight: 700;
      color: var(--color-text-base);
    }

    .lm-badge {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 14px;
      border-radius: 20px;
      letter-spacing: 0.03em;
    }

    .lm-desc {
      margin: 0;
      font-size: 12.5px;
      color: var(--color-text-muted);
      text-align: center;
      line-height: 1.5;
    }

    .lm-new-lock {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 12.5px;
      font-weight: 600;
      color: #16a34a;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: var(--radius-lg);
      padding: 10px 14px;
      margin-bottom: 20px;
    }

    .lm-progress {
      margin-bottom: 16px;
    }

    .lm-progress__labels {
      display: flex;
      justify-content: space-between;
      font-size: 11.5px;
      color: var(--color-text-muted);
      margin-bottom: 6px;
    }

    .lm-progress__bar {
      height: 6px;
      border-radius: 3px;
      background: var(--color-bg-muted);
      overflow: hidden;
    }

    .lm-progress__fill {
      height: 100%;
      border-radius: 3px;
      background: linear-gradient(90deg, var(--color-primary), var(--color-primary-hover));
      transition: width 0.6s ease;
      min-width: 4px;
    }

    .lm-maxed {
      text-align: center;
      font-size: 13px;
      font-weight: 600;
      color: var(--color-primary);
      margin-bottom: 16px;
    }

    .lm-xp-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 12px;
      background: var(--color-bg-muted);
      border-radius: var(--radius-lg);
      padding: 10px 12px;
      margin-bottom: 16px;
    }

    .lm-xp-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      padding: 2px 0;
    }

    .lm-xp-row__label { color: var(--color-text-secondary); }
    .lm-xp-row__val   { font-weight: 700; color: var(--color-primary); }

    .lm-divider {
      height: 1px;
      background: var(--color-border);
      margin-bottom: 14px;
    }

    .lm-levels {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .lm-level {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: var(--radius-lg);
      background: var(--color-bg-muted);

      &--current {
        background: #fffbeb;
        outline: 1.5px solid var(--color-primary);
      }

      &--locked { opacity: 0.42; }
    }

    .lm-level__emoji {
      font-size: 20px;
      width: 26px;
      text-align: center;
      flex-shrink: 0;
      line-height: 1;
    }

    .lm-level__info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .lm-level__name {
      font-size: 13px;
      font-weight: 700;
      color: var(--color-text-base);
    }

    .lm-level__perk {
      font-size: 10.5px;
      color: var(--color-text-muted);
      line-height: 1.4;
    }

    .lm-level__req {
      font-size: 11px;
      font-weight: 600;
      color: var(--color-text-muted);
      flex-shrink: 0;
      white-space: nowrap;
      text-align: right;
    }

    .lm-level--achieved .lm-level__req { color: #16a34a; }
    .lm-level--current  .lm-level__req { color: var(--color-primary); }

    .lm-level__days {
      color: var(--color-text-light);
      font-weight: 500;
    }

    .lm-days-gate {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 8px;
      font-size: 11.5px;
      font-weight: 600;
      color: #d97706;
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: var(--radius-md);
      padding: 6px 10px;
    }
  `],
})
export class LevelsModalComponent {
  @Output() closeRequested = new EventEmitter<void>();

  readonly auth     = inject(AuthService);
  readonly userData = inject(UserDataService);

  readonly allLevels = LEVELS;
  readonly xpItems   = [
    { label: 'View a location',  xp: XP_ACTIONS.location_viewed },
    { label: 'Save a location',  xp: XP_ACTIONS.location_saved },
    { label: 'Join a group',     xp: XP_ACTIONS.group_joined },
    { label: 'Create a group',   xp: XP_ACTIONS.group_created },
    { label: 'Group completes',  xp: XP_ACTIONS.group_completed },
    { label: 'Chat message',     xp: XP_ACTIONS.message_sent },
    { label: 'Daily login',      xp: XP_ACTIONS.daily_active },
    { label: 'Invite a friend',  xp: XP_ACTIONS.friend_referred },
  ];

  readonly xp               = computed(() => this.userData.xp());
  readonly levelInfo        = computed(() => this.userData.levelInfo());
  readonly nextLevel        = computed(() => getNextLevel(this.levelInfo().id));
  readonly nextLevelXp      = computed(() => this.userData.nextLevelXp());
  readonly nextLevelDaysLeft = computed(() => this.userData.nextLevelDaysLeft());
  readonly hoursLeft = computed(() => {
    const createdAt = this.userData.createdAt();
    if (!createdAt) return 0;
    return Math.max(0, Math.ceil((createdAt + NEW_LEVEL_DURATION_MS - Date.now()) / 3_600_000));
  });
  readonly progressPct = computed(() => {
    return Math.round(this.userData.xpProgress() * 100);
  });
}
