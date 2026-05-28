import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Group } from '../../shared/models/group.model';
import { MemberAvatarsComponent } from '../member-avatars/member-avatars.component';

@Component({
  selector: 'app-group-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MemberAvatarsComponent, DatePipe],
  template: `
    <a class="group-card" [routerLink]="['/malta/groups', group.id]">

      <div class="group-card__top">
        <img class="group-card__avatar"
          [src]="group.leaderPhoto || '/assets/images/default-avatar.svg'"
          [alt]="group.leaderName"
          width="36" height="36"
          referrerpolicy="no-referrer">

        <div class="group-card__main">
          <div class="group-card__title-row">
            <span class="group-card__title">{{ group.title }}</span>
            <span class="group-card__status" [class]="'group-card__status--' + group.status"
              *ngIf="group.status !== 'open'">{{ group.status }}</span>
          </div>
          <span class="group-card__date">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {{ group.date.toDate() | date:'EEE d MMM' }} · {{ group.time }}
          </span>
        </div>
      </div>

      <div class="group-card__divider"></div>

      <div class="group-card__bottom">
        <div class="group-card__meta-row">
          <span class="badge" [class]="'badge--' + group.difficulty">{{ group.difficulty }}</span>
          <span class="group-card__leader">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            {{ shortName(group.leaderName) }} leading
          </span>
        </div>
        <div class="group-card__members">
          <app-member-avatars [previews]="group.memberPreviews" [total]="group.memberCount"></app-member-avatars>
          <span class="group-card__count">
            {{ group.memberCount }}{{ group.maxMembers ? ' / ' + group.maxMembers : '' }}
            <span class="group-card__count-label">joining</span>
          </span>
        </div>
      </div>

    </a>
  `,
  styles: [`
    .group-card {
      display: flex;
      flex-direction: column;
      gap: 0;
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: 14px;
      text-decoration: none;
      transition: box-shadow var(--transition), border-color var(--transition);
      cursor: pointer;

      &:hover {
        box-shadow: 0 4px 16px rgba(0,0,0,0.09);
        border-color: rgba(244, 169, 34, 0.5);
      }
    }

    .group-card__top {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 12px;
    }

    .group-card__avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
      border: 2px solid var(--color-bg-muted);
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    }

    .group-card__main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .group-card__title-row {
      display: flex;
      align-items: flex-start;
      gap: 7px;
    }

    .group-card__title {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--color-text-base);
      line-height: 1.3;
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .group-card__date {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11.5px;
      color: var(--color-text-muted);
      svg { flex-shrink: 0; opacity: 0.7; }
    }

    .group-card__status {
      flex-shrink: 0;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-top: 1px;

      &--full      { background: #fef3c7; color: #92400e; }
      &--cancelled { background: #fee2e2; color: #dc2626; }
      &--completed { background: var(--color-bg-muted); color: var(--color-text-muted); }
    }

    .group-card__divider {
      height: 1px;
      background: var(--color-border);
      margin-bottom: 10px;
    }

    .group-card__bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .group-card__meta-row {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .group-card__leader {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11.5px;
      color: var(--color-text-muted);
      svg { flex-shrink: 0; opacity: 0.6; }
    }

    .group-card__members {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-shrink: 0;
    }

    .group-card__count {
      font-size: 12px;
      font-weight: 700;
      color: var(--color-text-secondary);
    }

    .group-card__count-label {
      font-weight: 400;
      color: var(--color-text-muted);
    }
  `],
})
export class GroupCardComponent {
  @Input({ required: true }) group!: Group;

  shortName(fullName: string): string {
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return fullName;
    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  }
}
