import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Group } from '@core/models/group.model';
import { GroupStatus } from '@core/models';
import { MemberAvatarsComponent } from '@features/groups/member-avatars/member-avatars.component';
import { UserAvatarComponent } from '@ui/user-avatar/user-avatar.component';

@Component({
  selector: 'app-group-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MemberAvatarsComponent, UserAvatarComponent, DatePipe],
  template: `
    <a class="group-card" [routerLink]="['/malta/groups', group.id]">

      <div class="group-card__top">
        <app-user-avatar
          [photoURL]="group.leaderPhoto"
          [displayName]="group.leaderName"
          size="md"
          shape="circle"
          [level]="group.leaderLevel"
          [isAdmin]="group.leaderIsAdmin"
          roleLabel="👑 Group leader">
        </app-user-avatar>

        <div class="group-card__main">
          <div class="group-card__title-row">
            <span class="group-card__title">{{ group.title }}</span>
            <span class="group-card__status" [class]="'group-card__status--' + group.status"
              *ngIf="group.status !== 'open'">{{ group.status }}</span>
          </div>
          <div class="group-card__date-row">
            <span class="group-card__date">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {{ group.date.toDate() | date:'EEE d MMM' }} · {{ group.time }}
            </span>
            <span *ngIf="whenLabel" class="group-card__when" [class]="'group-card__when--' + whenVariant">{{ whenLabel }}</span>
          </div>
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
      &--exploring { background: #dbeafe; color: #1d4ed8; }
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

    .group-card__date-row {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-wrap: wrap;
    }

    .group-card__when {
      font-size: 10.5px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 20px;
      white-space: nowrap;

      &--upcoming  { background: #dcfce7; color: #15803d; }
      &--today     { background: #fef9c3; color: #a16207; }
      &--soon      { background: #fef3c7; color: #b45309; }
      &--exploring { background: #dbeafe; color: #1d4ed8; }
      &--past      { background: var(--color-bg-muted); color: var(--color-text-muted); }
    }
  `],
})
export class GroupCardComponent {
  @Input({ required: true }) group!: Group;

  get whenLabel(): string | null {
    if (this.group.status === GroupStatus.Exploring) return '🧭 Exploring now';
    if (this.group.status === GroupStatus.Completed) return 'Completed';
    if (this.group.status === GroupStatus.Cancelled) return 'Cancelled';

    const dt = this.group.date.toDate();
    const [h, m] = this.group.time.split(':').map(Number);
    dt.setHours(h, m, 0, 0);
    const diffMs = dt.getTime() - Date.now();
    const diffH  = diffMs / 3_600_000;
    const diffD  = diffMs / 86_400_000;

    if (diffMs < 0) {
      const agoH = Math.abs(diffH);
      if (agoH < 1)  return 'Just now';
      if (agoH < 24) return `${Math.round(agoH)}h ago`;
      const agoD = Math.round(Math.abs(diffD));
      return agoD === 1 ? 'Yesterday' : `${agoD} days ago`;
    }

    if (diffH < 2)  return 'Starting soon!';

    const today    = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    if (dt.toDateString() === today.toDateString())    return 'Today';
    if (dt.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    if (diffD < 7) return `In ${Math.ceil(diffD)} days`;

    return null;
  }

  get whenVariant(): string {
    const s = this.group.status;
    if (s === GroupStatus.Exploring) return 'exploring';
    if (s === GroupStatus.Completed || s === GroupStatus.Cancelled) return 'past';

    const dt = this.group.date.toDate();
    const [h, m] = this.group.time.split(':').map(Number);
    dt.setHours(h, m, 0, 0);
    const diffMs = dt.getTime() - Date.now();
    if (diffMs < 0) return 'past';

    const diffH = diffMs / 3_600_000;
    if (diffH < 2) return 'soon';

    const today = new Date();
    if (dt.toDateString() === today.toDateString()) return 'today';

    return 'upcoming';
  }

  shortName(fullName: string): string {
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return fullName;
    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  }
}
