import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe, NgIf } from '@angular/common';
import { UserAvatarComponent } from '@ui/user-avatar/user-avatar.component';

/**
 * Shared profile card: avatar + name + optional email/level-badge/role/active.
 * Used by the footer popup (self) and the group member profile popup (others).
 * Callers pass additional rows via ng-content (footer-specific actions, etc.).
 */
@Component({
  selector: 'app-user-profile-card',
  standalone: true,
  imports: [NgIf, DecimalPipe, UserAvatarComponent],
  template: `
    <app-user-avatar
      [photoURL]="photoURL"
      [displayName]="displayName"
      size="xl"
      shape="circle"
      [level]="levelId"
      [isAdmin]="isAdmin"
      [clickable]="false"
      style="margin-bottom: 18px">
    </app-user-avatar>

    <div class="upc__name">{{ displayName }}</div>
    <div class="upc__email" *ngIf="email">{{ email }}</div>

    <div class="upc__level-badge"
      [class.upc__level-badge--clickable]="levelClickable"
      (click)="levelClickable && levelClicked.emit()">
      {{ levelLabel }}
    </div>

    <!-- XP progress bar (self-view, Explorer–Pioneer only) -->
    <ng-container *ngIf="xpProgress !== undefined && levelId >= 1 && levelId < 6">
      <div class="upc__xp-bar">
        <div class="upc__xp-fill" [style.width.%]="xpProgress! * 100"></div>
      </div>
      <div class="upc__xp-label" *ngIf="nextLevelXp !== null && nextLevelXp !== undefined">
        {{ nextLevelXp | number }} XP to next level
      </div>
      <div class="upc__days-gate" *ngIf="nextLevelDaysLeft && nextLevelDaysLeft > 0">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        {{ nextLevelDaysLeft }} more day{{ nextLevelDaysLeft === 1 ? '' : 's' }} required
      </div>
    </ng-container>

    <div class="upc__role" *ngIf="roleLabel">{{ roleLabel }}</div>
    <div class="upc__active" *ngIf="activeLabel">{{ activeLabel }}</div>

    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 100%;
    }

    .upc__name {
      font-size: 16px;
      font-weight: 700;
      color: var(--color-text-base);
      letter-spacing: -0.3px;
    }

    .upc__email {
      font-size: 11.5px;
      color: var(--color-text-muted);
      margin-top: 3px;
      word-break: break-all;
    }

    .upc__level-badge {
      display: inline-flex;
      align-items: center;
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 20px;
      letter-spacing: 0.04em;
      margin-top: 8px;

      &--clickable { cursor: pointer; }
    }

    .upc__xp-bar {
      width: 100%;
      max-width: 160px;
      height: 4px;
      border-radius: 2px;
      background: var(--color-bg-muted);
      margin-top: 8px;
      overflow: hidden;
    }

    .upc__xp-fill {
      height: 100%;
      border-radius: 2px;
      background: linear-gradient(90deg, var(--color-primary), var(--color-primary-hover));
      transition: width 0.6s ease;
      min-width: 3px;
    }

    .upc__xp-label {
      font-size: 10.5px;
      color: var(--color-text-muted);
      margin-top: 4px;
    }

    .upc__days-gate {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 5px;
      font-size: 10.5px;
      font-weight: 600;
      color: #d97706;
    }

    .upc__role {
      font-size: 12px;
      color: var(--color-text-muted);
      font-weight: 500;
      margin-top: 8px;
    }

    .upc__active {
      font-size: 11.5px;
      color: var(--color-text-muted);
      margin-top: 3px;
    }
  `],
})
export class UserProfileCardComponent {
  @Input() photoURL      = '';
  @Input() displayName   = '';
  @Input() levelId       = 1;
  @Input() levelLabel    = 'Explorer · Level 1';
  @Input() email?: string;
  @Input() roleLabel?: string;
  @Input() activeLabel?: string;
  @Input() levelClickable  = false;
  @Input() isAdmin         = false;
  @Input() xpProgress?: number;       // 0-1 float; undefined = don't show bar
  @Input() nextLevelXp?: number | null;
  @Input() nextLevelDaysLeft?: number;

  @Output() levelClicked = new EventEmitter<void>();
}
