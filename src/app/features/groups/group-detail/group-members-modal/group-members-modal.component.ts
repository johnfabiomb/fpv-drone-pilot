import {
  Component, EventEmitter, HostListener, Input, OnInit, Output, computed, inject, signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppModalComponent } from '@ui/modal/app-modal.component';
import { UserAvatarComponent } from '@ui/user-avatar/user-avatar.component';
import { ConfirmPopupComponent } from '@ui/confirm-popup/confirm-popup.component';
import { GroupsService } from '@core/services/groups.service';
import { UserDataService } from '@core/services/user-data.service';
import { Group, GroupMember } from '@core/models/group.model';
import { GroupRole } from '@core/models';

@Component({
  selector: 'app-group-members-modal',
  standalone: true,
  imports: [CommonModule, AppModalComponent, UserAvatarComponent, ConfirmPopupComponent],
  templateUrl: './group-members-modal.component.html',
  styleUrl: './group-members-modal.component.scss',
})
export class GroupMembersModalComponent implements OnInit {
  @Input({ required: true }) groupId!: string;
  @Input({ required: true }) group!: Group;
  @Input({ required: true }) members!: GroupMember[];
  @Input() canManageMembers = false;
  @Input() currentUser: { id: string } | null = null;

  @Output() closeRequested = new EventEmitter<void>();

  private readonly groupsService = inject(GroupsService);
  readonly userDataService       = inject(UserDataService);

  readonly memberActionMenu       = signal<string | null>(null);
  readonly confirmingMemberAction = signal<{ action: 'remove' | 'make-leader' | 'mute' | 'unmute'; member: GroupMember } | null>(null);
  readonly bulkSelectMode         = signal(false);
  private  bulkSelectedUids       = signal<Set<string>>(new Set());
  readonly bulkCount              = computed(() => this.bulkSelectedUids().size);
  readonly confirmingBulkAction   = signal<'mute' | 'remove' | null>(null);
  readonly actionBusy             = signal(false);
  readonly actionError            = signal<string | null>(null);

  get bulkEligibleMembers(): GroupMember[] {
    return this.members.filter(m => m.uid !== this.group?.leaderId && m.uid !== this.currentUser?.id);
  }

  ngOnInit(): void {
    this.actionError.set(null);
  }

  onClose(): void {
    this.exitBulkMode();
    this.closeRequested.emit();
  }

  @HostListener('document:click')
  closeMemberMenu(): void {
    if (this.memberActionMenu()) this.memberActionMenu.set(null);
  }

  isMemberMuted(m: GroupMember): boolean {
    return !!m.mutedUntil && m.mutedUntil.toMillis() > Date.now();
  }

  memberRoleLabel(m: GroupMember): string {
    return m.role === GroupRole.Leader ? '👑 Group leader' : 'Member';
  }

  formatLastActive(ts: unknown): string {
    if (!ts) return '';
    return GroupsService.formatLastActive(ts as Parameters<typeof GroupsService.formatLastActive>[0]);
  }

  toggleMemberMenu(uid: string, event: MouseEvent): void {
    event.stopPropagation();
    this.memberActionMenu.set(this.memberActionMenu() === uid ? null : uid);
  }

  pickMemberAction(action: 'remove' | 'make-leader' | 'mute' | 'unmute', member: GroupMember, event: MouseEvent): void {
    event.stopPropagation();
    this.memberActionMenu.set(null);

    if (action === 'make-leader' || action === 'unmute') {
      this.confirmingMemberAction.set({ action, member });
      return;
    }

    const s = new Set(this.bulkSelectedUids());
    s.add(member.uid);
    this.bulkSelectedUids.set(s);
    this.bulkSelectMode.set(true);
  }

  async executeMemberAction(): Promise<void> {
    const target = this.confirmingMemberAction();
    if (!target) return;
    this.confirmingMemberAction.set(null);
    this.actionError.set(null);
    this.actionBusy.set(true);
    try {
      const { action, member } = target;
      if (action === 'remove')      await this.groupsService.removeMember(this.groupId, member.uid);
      if (action === 'make-leader') await this.groupsService.transferOwnership(this.groupId, member.uid);
      if (action === 'mute')        await this.groupsService.muteMember(this.groupId, member.uid, 60);
      if (action === 'unmute')      await this.groupsService.unmuteMember(this.groupId, member.uid);
    } catch (e) {
      this.actionError.set(e instanceof Error ? e.message : 'Action failed.');
    } finally {
      this.actionBusy.set(false);
    }
  }

  isBulkSelected(uid: string): boolean {
    return this.bulkSelectedUids().has(uid);
  }

  toggleBulkSelect(uid: string): void {
    const s = new Set(this.bulkSelectedUids());
    s.has(uid) ? s.delete(uid) : s.add(uid);
    this.bulkSelectedUids.set(s);
  }

  selectAllMembers(): void {
    this.bulkSelectedUids.set(new Set(this.bulkEligibleMembers.map(m => m.uid)));
  }

  exitBulkMode(): void {
    this.bulkSelectMode.set(false);
    this.bulkSelectedUids.set(new Set());
    this.confirmingBulkAction.set(null);
  }

  async executeBulkAction(): Promise<void> {
    const action = this.confirmingBulkAction();
    const uids   = [...this.bulkSelectedUids()];
    if (!action || !uids.length) return;
    this.confirmingBulkAction.set(null);
    this.actionBusy.set(true);
    try {
      if (action === 'remove') await this.groupsService.bulkRemoveMembers(this.groupId, uids);
      if (action === 'mute')   await this.groupsService.bulkMuteMembers(this.groupId, uids, 60);
      this.exitBulkMode();
    } catch (e) {
      this.actionError.set(e instanceof Error ? e.message : 'Action failed.');
    } finally {
      this.actionBusy.set(false);
    }
  }
}
