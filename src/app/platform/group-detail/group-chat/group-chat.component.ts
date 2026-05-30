import {
  AfterViewChecked, Component, ElementRef, Input,
  OnDestroy, OnInit, ViewChild, effect, inject, signal,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserAvatarComponent } from '../../../components/user-avatar/user-avatar.component';
import { ConfirmPopupComponent } from '../../../components/confirm-popup/confirm-popup.component';
import { GroupsService } from '../../../shared/services/groups.service';
import { AuthService } from '../../../shared/services/auth.service';
import { CooldownError, Group, GroupMessage, SpamMutedError } from '../../../shared/models/group.model';

@Component({
  selector: 'app-group-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, UserAvatarComponent, ConfirmPopupComponent],
  templateUrl: './group-chat.component.html',
  styleUrl: './group-chat.component.scss',
})
export class GroupChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesEnd')       private messagesEnd!: ElementRef<HTMLDivElement>;
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef<HTMLDivElement>;

  @Input({ required: true }) groupId!: string;
  @Input({ required: true }) group!: Group;
  @Input() canPin          = false;
  @Input() isMember        = false;
  @Input() isMuted         = false;
  @Input() mutedMinutesLeft = 0;
  // null = always open (active group); 0 = archived immediately (cancelled); N = ms epoch when chat closes
  @Input() chatClosesAt: number | null = null;

  readonly groupsService = inject(GroupsService);
  readonly authService   = inject(AuthService);

  readonly messageText      = signal('');
  readonly sendingMessage   = signal(false);
  readonly hoveredMessageId = signal<string | null>(null);
  readonly pinnedExpanded   = signal(false);
  readonly confirmingPinMsg = signal<GroupMessage | null>(null);
  readonly cooldownSecs     = signal(0);
  readonly chatError        = signal<string | null>(null);
  readonly chatOpen         = signal(true);
  readonly countdownText    = signal('');

  get messages()     { return this.groupsService.allMessages(); }
  get currentUser()  { return this.authService.user(); }

  private shouldScrollToBottom = false;
  private cooldownTimer:   ReturnType<typeof setInterval> | null = null;
  private countdownTimer:  ReturnType<typeof setInterval> | null = null;

  // Scroll when new messages arrive in the live window.
  // ngOnInit handles the initial "switch to chat" scroll.
  private readonly _scrollEffect = effect(() => {
    this.groupsService.messages();
    if (this.isNearBottom()) this.shouldScrollToBottom = true;
  });

  ngOnInit(): void {
    this.shouldScrollToBottom = true;
    this.initChatCountdown();
  }

  ngOnDestroy(): void {
    this.clearCooldownTimer();
    this.clearCountdownTimer();
  }

  private initChatCountdown(): void {
    if (this.chatClosesAt === null) {
      this.chatOpen.set(true);
      return;
    }
    this.tickCountdown();
    this.countdownTimer = setInterval(() => this.tickCountdown(), 1_000);
  }

  private tickCountdown(): void {
    const remaining = (this.chatClosesAt ?? 0) - Date.now();
    if (remaining <= 0) {
      this.chatOpen.set(false);
      this.countdownText.set('');
      this.clearCountdownTimer();
      return;
    }
    this.chatOpen.set(true);
    const h = Math.floor(remaining / 3_600_000);
    const m = Math.floor((remaining % 3_600_000) / 60_000);
    const s = Math.floor((remaining % 60_000) / 1_000);
    if (h > 0) {
      this.countdownText.set(`${h}h ${m}m ${s}s`);
    } else if (m > 0) {
      this.countdownText.set(`${m}m ${s}s`);
    } else {
      this.countdownText.set(`${s}s`);
    }
  }

  private clearCountdownTimer(): void {
    if (this.countdownTimer !== null) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  }


  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
      this.shouldScrollToBottom = false;
    }
  }

  private isNearBottom(): boolean {
    const el = this.messagesContainer?.nativeElement;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
  }

  async sendMessage(): Promise<void> {
    const text = this.messageText().trim();
    if (!text || this.sendingMessage() || this.cooldownSecs() > 0 || this.isMuted || !this.chatOpen()) return;
    this.chatError.set(null);
    this.sendingMessage.set(true);
    try {
      await this.groupsService.sendMessage(this.groupId, text);
      this.messageText.set('');
      this.shouldScrollToBottom = true;
      this.startCooldown(5);
    } catch (e) {
      if (e instanceof CooldownError) {
        this.startCooldown(e.secondsLeft);
      } else if (e instanceof SpamMutedError) {
        this.chatError.set(`You've been muted for ${e.minutesLeft} min${e.minutesLeft === 1 ? '' : 's'} for sending too many messages.`);
      } else {
        this.chatError.set('Could not send message. Check your connection and try again.');
      }
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

  loadEarlier(): void {
    this.groupsService.loadEarlierMessages(this.groupId);
  }

  async pinMessage(msg: GroupMessage): Promise<void> {
    try {
      await this.groupsService.pinMessage(this.groupId, msg);
      this.pinnedExpanded.set(false);
    } catch { /* silent */ }
  }

  async unpinMessage(): Promise<void> {
    try { await this.groupsService.unpinMessage(this.groupId); }
    catch { /* silent */ }
  }

  private startCooldown(seconds: number): void {
    this.cooldownSecs.set(seconds);
    this.clearCooldownTimer();
    this.cooldownTimer = setInterval(() => {
      const remaining = this.cooldownSecs() - 1;
      if (remaining <= 0) {
        this.cooldownSecs.set(0);
        this.clearCooldownTimer();
      } else {
        this.cooldownSecs.set(remaining);
      }
    }, 1000);
  }

  private clearCooldownTimer(): void {
    if (this.cooldownTimer !== null) {
      clearInterval(this.cooldownTimer);
      this.cooldownTimer = null;
    }
  }
}
