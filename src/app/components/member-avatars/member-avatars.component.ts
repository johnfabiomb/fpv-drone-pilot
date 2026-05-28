import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupMemberPreview } from '../../shared/models/group.model';

@Component({
  selector: 'app-member-avatars',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="avatars">
      <img *ngFor="let p of visible(); let i = index"
        class="avatars__bubble"
        [src]="p.photoURL || '/assets/images/default-avatar.svg'"
        [alt]="p.displayName"
        [style.z-index]="visible().length - i"
        width="28" height="28"
        referrerpolicy="no-referrer">
      <span *ngIf="overflow() > 0" class="avatars__more">+{{ overflow() }}</span>
    </div>
  `,
  styles: [`
    .avatars {
      display: flex;
      align-items: center;
    }

    .avatars__bubble {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--color-bg);
      box-sizing: border-box;
      flex-shrink: 0;

      & + & { margin-left: -8px; }
    }

    .avatars__more {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--color-bg-muted);
      border: 2px solid var(--color-bg);
      box-sizing: border-box;
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
