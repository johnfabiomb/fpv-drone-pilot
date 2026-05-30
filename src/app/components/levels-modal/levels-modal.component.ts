import { Component, EventEmitter, Output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModalComponent } from '../app-modal/app-modal.component';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { UserDataService } from '../../shared/services/user-data.service';
import { AuthService } from '../../shared/services/auth.service';
import { LEVELS, NEW_LEVEL_DURATION_MS, getNextLevel } from '../../shared/utils/level.utils';

@Component({
  selector: 'app-levels-modal',
  standalone: true,
  imports: [CommonModule, AppModalComponent, UserAvatarComponent],
  template: `
    <app-modal (closeRequested)="closeRequested.emit()">

      <!-- Hero -->
      <div class="lm-hero">
        <app-user-avatar
          [photoURL]="auth.user()?.photoURL ?? ''"
          [displayName]="auth.user()?.displayName ?? ''"
          size="xl"
          shape="circle"
          [level]="levelInfo().id">
        </app-user-avatar>
        <p class="lm-name">{{ auth.user()?.displayName }}</p>
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

      <!-- Normal progress bar -->
      <ng-container *ngIf="levelInfo().id > 0">
        <div class="lm-progress" *ngIf="nextLevel() as next">
          <div class="lm-progress__labels">
            <span>{{ savedCount() }} saved</span>
            <span>{{ next.minSaved - savedCount() }} to {{ next.name }}</span>
          </div>
          <div class="lm-progress__bar">
            <div class="lm-progress__fill" [style.width.%]="progressPct()"></div>
          </div>
        </div>
        <div class="lm-maxed" *ngIf="!nextLevel()">
          🏆 You've reached the highest level!
        </div>
      </ng-container>

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
            <ng-container *ngIf="lvl.id <= levelInfo().id">✓</ng-container>
            <ng-container *ngIf="lvl.id > levelInfo().id">{{ lvl.minSaved }}+ saved</ng-container>
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
      margin-bottom: 20px;
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
      margin-bottom: 20px;
    }

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
      display:none;
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
  `],
})
export class LevelsModalComponent {
  @Output() closeRequested = new EventEmitter<void>();

  readonly auth     = inject(AuthService);
  readonly userData = inject(UserDataService);

  readonly allLevels   = LEVELS;
  readonly savedCount  = computed(() => this.userData.savedLocations().size);
  readonly levelInfo   = computed(() => this.userData.levelInfo());
  readonly nextLevel   = computed(() => getNextLevel(this.levelInfo().id));
  readonly hoursLeft   = computed(() => {
    const createdAt = this.userData.createdAt();
    if (!createdAt) return 0;
    return Math.max(0, Math.ceil((createdAt + NEW_LEVEL_DURATION_MS - Date.now()) / 3_600_000));
  });
  readonly progressPct = computed(() => {
    const current = this.levelInfo();
    const next    = this.nextLevel();
    if (!next) return 100;
    const range    = next.minSaved - current.minSaved;
    const progress = this.savedCount() - current.minSaved;
    return Math.min(100, Math.max(0, Math.round((progress / range) * 100)));
  });
}
