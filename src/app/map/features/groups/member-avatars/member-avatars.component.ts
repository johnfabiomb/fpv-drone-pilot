import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupMemberPreview } from '@map/core/models/group.model';
import { UserAvatarComponent } from '@map/ui/user-avatar/user-avatar.component';

@Component({
  selector: 'app-member-avatars',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent],
  template: `
    <div class="avatars">
      <div *ngFor="let p of visible(); let i = index"
        class="avatars__wrap"
        [style.z-index]="visible().length - i">
        <app-user-avatar
          [photoURL]="p.photoURL"
          [displayName]="p.displayName"
          size="sm"
          shape="circle"
          [level]="1"
          [clickable]="false">
        </app-user-avatar>
      </div>
      <span *ngIf="overflow() > 0" class="avatars__more">+{{ overflow() }}</span>
    </div>
  `,
  styles: [`
    .avatars {
      display: flex;
      align-items: center;
    }

    .avatars__wrap {
      display: inline-flex;
      flex-shrink: 0;
      border-radius: 50%;
      /* white ring keeps overlapping avatars visually separated */
      box-shadow: 0 0 0 2px var(--color-bg);

      & + & { margin-left: -8px; }
    }

    .avatars__more {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--color-bg-muted);
      box-shadow: 0 0 0 2px var(--color-bg);
      font-size: 10px;
      font-weight: 600;
      color: var(--color-text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-left: -8px;
    }
  `],
})
export class MemberAvatarsComponent {
  private readonly _previews = signal<GroupMemberPreview[]>([]);
  private readonly _total    = signal(0);

  @Input() set previews(v: GroupMemberPreview[]) { this._previews.set(v ?? []); }
  @Input() set total(v: number)                  { this._total.set(v ?? 0); }

  readonly visible  = computed(() => this._previews().slice(0, 5));
  readonly overflow = computed(() => Math.max(0, this._total() - this.visible().length));
}
