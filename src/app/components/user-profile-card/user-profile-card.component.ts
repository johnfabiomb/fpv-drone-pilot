import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

/**
 * Shared profile card: avatar + name + optional email/level-badge/role/active.
 * Used by the footer popup (self) and the group member profile popup (others).
 * Callers pass additional rows via ng-content (footer-specific actions, etc.).
 */
@Component({
  selector: 'app-user-profile-card',
  standalone: true,
  imports: [NgIf, UserAvatarComponent],
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
  @Input() roleLabel?: string;   // e.g. '👑 Group leader'
  @Input() activeLabel?: string; // e.g. 'Active today'
  @Input() levelClickable = false;
  @Input() isAdmin        = false;

  @Output() levelClicked = new EventEmitter<void>();
}
