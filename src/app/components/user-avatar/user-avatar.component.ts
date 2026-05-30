import { Component, Input, inject } from '@angular/core';
import { LEVELS } from '../../shared/utils/level.utils';
import { ProfileModalService } from '../../shared/services/profile-modal.service';

export type AvatarSize  = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'squircle';

const SIZE_PX: Record<AvatarSize, number> = { xs: 22, sm: 28, md: 36, lg: 52, xl: 72 };

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [],
  template: `
    <div [class]="wrapClass" (click)="onClick($event)">
      <div [class]="'uav ' + cls">
        @if (photoURL) {
          <img [src]="photoURL" [alt]="displayName" [width]="sizePx" [height]="sizePx" referrerpolicy="no-referrer">
        } @else {
          <svg class="uav-guest-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        }
      </div>
      @if (showPill) {
        <span [class]="'uav-pill ' + pillClass">{{ pillLabel }}</span>
      }
    </div>

  `,
  styles: [`
    :host {
      display: inline-flex;
      flex-shrink: 0;
    }

    .uav-wrap {
      position: relative;
      display: inline-flex;

      &--clickable { cursor: pointer; }
    }

    .uav {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      box-sizing: border-box;
    }

    .uav img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
    }

    // ── Sizes ────────────────────────────────────────────────────
    .uav--xs  { width: 22px; height: 22px; }
    .uav--sm  { width: 28px; height: 28px; }
    .uav--md  { width: 36px; height: 36px; }
    .uav--lg  { width: 52px; height: 52px; }
    .uav--xl  { width: 72px; height: 72px; }

    // ── Shapes ───────────────────────────────────────────────────
    .uav--circle   { border-radius: 50%; }
    .uav--squircle { border-radius: var(--radius-lg); }

    // ── Guest (no photo) — neutral, no animation ─────────────────
    .uav--guest {
      background: var(--color-bg-light);
      border: 2px solid var(--color-border);
      color: var(--color-text-light);
    }

    // ── Compact (xs/sm) — no animation, clean in tight rows ──────
    .uav--compact {
      border: 1.5px solid rgba(0,0,0,0.1);
    }

    .uav-guest-icon {
      width: 55%;
      height: 55%;
    }

    // ── Level 0 · New — green breath  (2.5s, gentle) ────────────
    .uav--level-0 {
      border: 2px solid #22c55e;
      animation: uavL0 2.5s ease-in-out infinite;
    }

    // ── Level 1 · Explorer — gold breath  (3s, very subtle) ─────
    .uav--level-1 {
      border: 2px solid var(--color-primary);
      animation: uavL1 3s ease-in-out infinite;
    }

    // ── Level 2 · Wanderer — teal breath  (2.5s, soft) ──────────
    .uav--level-2 {
      border: 2px solid #0ea5e9;
      animation: uavL2 2.5s ease-in-out infinite;
    }

    // ── Level 3 · Scout — purple breath  (2s, noticeable) ───────
    .uav--level-3 {
      border: 2px solid #7c3aed;
      animation: uavL3 2s ease-in-out infinite;
    }

    // ── Level 4 · Navigator — gold pulse  (1.8s, strong) ────────
    .uav--level-4 {
      border: 2.5px solid var(--color-primary);
      animation: uavL4 1.8s ease-in-out infinite;
    }

    // ── Level 5 · Pioneer — fire  (1.2s alternate, intense) ─────
    .uav--level-5 {
      border: 2.5px solid #f97316;
      animation: uavL5 1.2s ease-in-out infinite alternate;
    }

    // ── Level 6 · Legend — rainbow  (2.5s, max intensity) ───────
    .uav--level-6 {
      border: 3px solid #f43f5e;
      animation: uavL6 2.5s linear infinite;
    }

    // ── Admin · GM — warm fire ring  (3s, matches GM pill) ──────
    .uav--admin {
      border: 3px solid #dc2626;
      animation: uavAdmin 3s linear infinite;
    }

    // Animations — glow size and opacity scale with level

    @keyframes uavL0 {
      0%, 100% { box-shadow: 0 0 0 2px rgba(34,197,94,0.1),  0 0  6px rgba(34,197,94,0.1); }
      50%       { box-shadow: 0 0 0 3px rgba(34,197,94,0.3),  0 0 14px rgba(34,197,94,0.35); }
    }

    @keyframes uavL1 {
      0%, 100% { box-shadow: 0 0 0 2px rgba(244,169,34,0.1),  0 0  4px rgba(244,169,34,0.08); }
      50%       { box-shadow: 0 0 0 3px rgba(244,169,34,0.28), 0 0 12px rgba(244,169,34,0.22); }
    }

    @keyframes uavL2 {
      0%, 100% { box-shadow: 0 0 0 2px rgba(14,165,233,0.12), 0 0  6px rgba(14,165,233,0.1); }
      50%       { box-shadow: 0 0 0 3px rgba(14,165,233,0.4),  0 0 18px rgba(14,165,233,0.32); }
    }

    @keyframes uavL3 {
      0%, 100% { box-shadow: 0 0 0 2px rgba(124,58,237,0.18), 0 0  8px rgba(124,58,237,0.15); }
      50%       { box-shadow: 0 0 0 4px rgba(124,58,237,0.52), 0 0 24px rgba(124,58,237,0.48); }
    }

    @keyframes uavL4 {
      0%, 100% { box-shadow: 0 0 0 3px rgba(244,169,34,0.2),  0 0 10px rgba(244,169,34,0.2); }
      50%       { box-shadow: 0 0 0 5px rgba(244,169,34,0.58), 0 0 30px rgba(244,169,34,0.55); }
    }

    @keyframes uavL5 {
      from { border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.28), 0 0 16px rgba(239,68,68,0.32); }
      to   { border-color: #dc2626; box-shadow: 0 0 0 6px rgba(239,68,68,0.58),  0 0 36px rgba(249,115,22,0.68); }
    }

    @keyframes uavL6 {
      0%   { border-color: #f43f5e; box-shadow: 0 0 0 4px rgba(244, 63, 94,0.45), 0 0 28px rgba(244, 63, 94,0.55); }
      16%  { border-color: #f97316; box-shadow: 0 0 0 4px rgba(249,115, 22,0.45), 0 0 28px rgba(249,115, 22,0.55); }
      33%  { border-color: #eab308; box-shadow: 0 0 0 4px rgba(234,179,  8,0.45), 0 0 28px rgba(234,179,  8,0.55); }
      50%  { border-color: #22c55e; box-shadow: 0 0 0 4px rgba( 34,197, 94,0.45), 0 0 28px rgba( 34,197, 94,0.55); }
      66%  { border-color: #3b82f6; box-shadow: 0 0 0 4px rgba( 59,130,246,0.45), 0 0 28px rgba( 59,130,246,0.55); }
      83%  { border-color: #8b5cf6; box-shadow: 0 0 0 4px rgba(139, 92,246,0.45), 0 0 28px rgba(139, 92,246,0.55); }
      100% { border-color: #f43f5e; box-shadow: 0 0 0 4px rgba(244, 63, 94,0.45), 0 0 28px rgba(244, 63, 94,0.55); }
    }

    @keyframes uavAdmin {
      0%   { border-color: #dc2626; box-shadow: 0 0 0 3px rgba(220, 38, 38,0.35), 0 0 18px rgba(220, 38, 38,0.4); }
      33%  { border-color: #ea580c; box-shadow: 0 0 0 3px rgba(234, 88, 12,0.35), 0 0 18px rgba(234, 88, 12,0.4); }
      66%  { border-color: #d97706; box-shadow: 0 0 0 3px rgba(217,119,  6,0.35), 0 0 18px rgba(217,119,  6,0.4); }
      100% { border-color: #dc2626; box-shadow: 0 0 0 3px rgba(220, 38, 38,0.35), 0 0 18px rgba(220, 38, 38,0.4); }
    }

    // ── Level pill — shared base ──────────────────────────────────
    .uav-pill {
      position: absolute;
      bottom: -7px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 8px;
      font-weight: 700;
      line-height: 1;
      padding: 2px 5px;
      border-radius: 4px;
      white-space: nowrap;
      letter-spacing: 0.04em;
      pointer-events: none;
      z-index: 1;
    }

    // ── Per-level pill colours ────────────────────────────────────
    .uav-pill--level-0 { background: #22c55e; color: #fff; }
    .uav-pill--level-1 { background: #F4A922; color: #000; }
    .uav-pill--level-2 { background: #0ea5e9; color: #fff; }
    .uav-pill--level-3 { background: #7c3aed; color: #fff; }
    .uav-pill--level-4 { background: #d97706; color: #fff; }
    .uav-pill--level-5 { background: #f97316; color: #fff; }
    .uav-pill--level-6 { background: #f43f5e; color: #fff; }

    // ── GM pill — warm fire cycle ─────────────────────────────────
    .uav-pill--gm {
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.1em;
      color: #fff;
      animation: gmPill 3s linear infinite;
    }

    @keyframes gmPill {
      0%   { background: #dc2626; box-shadow: 0 0 5px 1px rgba(220, 38, 38,0.6); }
      33%  { background: #ea580c; box-shadow: 0 0 5px 1px rgba(234, 88, 12,0.6); }
      66%  { background: #d97706; box-shadow: 0 0 5px 1px rgba(217,119,  6,0.6); }
      100% { background: #dc2626; box-shadow: 0 0 5px 1px rgba(220, 38, 38,0.6); }
    }
  `],
})
export class UserAvatarComponent {
  @Input() photoURL    = '';
  @Input() displayName = '';
  @Input() size: AvatarSize  = 'md';
  @Input() shape: AvatarShape = 'circle';
  @Input() level   = 1;
  @Input() isAdmin = false;

  // Profile modal inputs — pass context-specific labels from the parent
  @Input() roleLabel   = '';  // e.g. '👑 Group leader', 'Member'
  @Input() activeLabel = '';  // e.g. 'Active today'
  // Set to false on avatars where clicking must NOT open the modal (e.g. inside the modal itself)
  @Input() clickable   = true;
  // Set to true when this avatar represents the currently logged-in user — opens the account popup instead of the profile modal
  @Input() isSelf      = false;

  private readonly profileModal = inject(ProfileModalService);

  get sizePx(): number {
    return SIZE_PX[this.size] ?? 36;
  }

  get cls(): string {
    let levelCls: string;
    if (!this.photoURL) {
      levelCls = 'uav--guest';
    } else if (this.size === 'xs' || this.size === 'sm') {
      levelCls = 'uav--compact';
    } else if (this.isAdmin) {
      levelCls = 'uav--admin';
    } else {
      levelCls = `uav--level-${this.level}`;
    }
    return `uav--${this.size} uav--${this.shape} ${levelCls}`;
  }

  get wrapClass(): string {
    const clickable = this.clickable && !!this.displayName;
    return clickable ? 'uav-wrap uav-wrap--clickable' : 'uav-wrap';
  }

  // Only show pill on md/lg/xl — sm and xs are too small (chat bubbles, compact rows)
  get showPill(): boolean {
    return (this.size === 'md' || this.size === 'lg' || this.size === 'xl')
      && (this.isAdmin || !!this.photoURL);
  }

  get pillLabel(): string {
    if (this.isAdmin) return 'GM';
    if (this.level === 0) return 'New';
    return String(this.level);
  }

  get pillClass(): string {
    if (this.isAdmin) return 'uav-pill--gm';
    return `uav-pill--level-${this.level}`;
  }

  get levelLabel(): string {
    if (this.isAdmin) return 'GM · Legend';
    const def = LEVELS.find(l => l.id === this.level);
    return def ? `${def.name} · Level ${def.id}` : 'Explorer · Level 1';
  }

  onClick(event: MouseEvent): void {
    if (!this.clickable || !this.displayName) return;
    event.stopPropagation();
    event.preventDefault();
    if (this.isSelf) {
      this.profileModal.openSelf();
      return;
    }
    this.profileModal.show({
      photoURL:    this.photoURL,
      displayName: this.displayName,
      levelId:     this.level,
      levelLabel:  this.levelLabel,
      isAdmin:     this.isAdmin,
      roleLabel:   this.roleLabel || undefined,
      activeLabel: this.activeLabel || undefined,
    });
  }
}
