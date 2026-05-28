import {
  AfterViewChecked, Component, DestroyRef, ElementRef, HostListener,
  OnDestroy, OnInit, PLATFORM_ID, ViewChild, inject, signal,
} from '@angular/core';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PanelShellComponent } from '../../components/panel-shell/panel-shell.component';
import { MapBridgeService } from '../../shared/services/map-bridge.service';
import { GroupsService } from '../../shared/services/groups.service';
import { AuthService } from '../../shared/services/auth.service';
import { SeoService } from '../../shared/services/seo.service';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { GroupFullError, LeaderMustTransferError } from '../../shared/models/group.model';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, PanelShellComponent],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.scss',
})
export class GroupDetailComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesEnd') private messagesEnd!: ElementRef<HTMLDivElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route      = inject(ActivatedRoute);
  readonly router             = inject(Router);
  private readonly seo        = inject(SeoService);
  private readonly analytics  = inject(AnalyticsService);
  readonly bridge             = inject(MapBridgeService);
  readonly groupsService      = inject(GroupsService);
  readonly authService        = inject(AuthService);

  // ── UI state ──────────────────────────────────────────────────────────────
  readonly actionError      = signal<string | null>(null);
  readonly actionBusy       = signal(false);
  readonly showTransfer     = signal(false);
  readonly messageText      = signal('');
  readonly sendingMessage   = signal(false);

  private groupId = '';
  private shouldScrollToBottom = false;

  // ── Computed helpers ──────────────────────────────────────────────────────
  get currentUser() { return this.authService.user(); }
  get group()       { return this.groupsService.detailGroup(); }
  get members()     { return this.groupsService.detailMembers(); }
  get messages()    { return this.groupsService.messages(); }

  get isLeader(): boolean {
    return !!this.currentUser && this.group?.leaderId === this.currentUser.uid;
  }

  get isMember(): boolean {
    return !!this.currentUser && this.members.some(m => m.uid === this.currentUser!.uid);
  }

  get canJoin(): boolean {
    const g = this.group;
    if (!g) return false;
    return g.status === 'open' && !this.isMember;
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.groupId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.groupId) { this.router.navigate(['/malta/groups']); return; }

    this.groupsService.startDetailListener(this.groupId);

    this.bridge.enterPanelMode([], { label: 'Back to groups' });

    this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.router.navigate(['/malta/groups']));

    if (this.isMember) this.groupsService.updateLastActive(this.groupId);

    this.analytics.pageView(window.location.href, 'Group Detail');
  }

  ngOnDestroy(): void {
    this.groupsService.stopDetailListener();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
      this.shouldScrollToBottom = false;
    }
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (!document.hidden && this.isMember) {
      this.groupsService.updateLastActive(this.groupId);
    }
  }

  // ── Actions ───────────────────────────────────────────────────────────────
  async join(): Promise<void> {
    if (!this.authService.isLoggedIn()) { this.authService.openLoginModal(); return; }
    this.actionError.set(null);
    this.actionBusy.set(true);
    try {
      await this.groupsService.joinGroup(this.groupId);
      await this.groupsService.updateLastActive(this.groupId);
    } catch (e) {
      if (e instanceof GroupFullError) {
        this.actionError.set('This group is now full.');
      } else {
        this.actionError.set(e instanceof Error ? e.message : 'Could not join group.');
      }
    } finally {
      this.actionBusy.set(false);
    }
  }

  async leave(): Promise<void> {
    this.actionError.set(null);
    this.actionBusy.set(true);
    try {
      await this.groupsService.leaveGroup(this.groupId);
      this.router.navigate(['/malta/groups']);
    } catch (e) {
      if (e instanceof LeaderMustTransferError) {
        this.showTransfer.set(true);
        this.actionError.set('Transfer leadership before leaving.');
      } else {
        this.actionError.set(e instanceof Error ? e.message : 'Could not leave group.');
      }
    } finally {
      this.actionBusy.set(false);
    }
  }

  async transferTo(uid: string): Promise<void> {
    this.actionError.set(null);
    this.actionBusy.set(true);
    try {
      await this.groupsService.transferOwnership(this.groupId, uid);
      this.showTransfer.set(false);
    } catch (e) {
      this.actionError.set(e instanceof Error ? e.message : 'Transfer failed.');
    } finally {
      this.actionBusy.set(false);
    }
  }

  async cancelGroup(): Promise<void> {
    if (!confirm('Cancel this group? All members will be notified.')) return;
    this.actionError.set(null);
    this.actionBusy.set(true);
    try {
      await this.groupsService.cancelGroup(this.groupId);
    } catch (e) {
      this.actionError.set(e instanceof Error ? e.message : 'Could not cancel group.');
    } finally {
      this.actionBusy.set(false);
    }
  }

  async sendMessage(): Promise<void> {
    const text = this.messageText().trim();
    if (!text || this.sendingMessage()) return;

    this.sendingMessage.set(true);
    try {
      await this.groupsService.sendMessage(this.groupId, text);
      this.messageText.set('');
      this.shouldScrollToBottom = true;
    } catch {
      // silent — message send failures are transient
    } finally {
      this.sendingMessage.set(false);
    }
  }

  onMessageKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  formatLastActive(ts: unknown): string {
    if (!ts) return '';
    // ts is Firestore Timestamp
    return GroupsService.formatLastActive(ts as Parameters<typeof GroupsService.formatLastActive>[0]);
  }

  get nonLeaderMembers() {
    return this.members.filter(m => m.uid !== this.group?.leaderId);
  }
}
