import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { supabase } from '@core/config/supabase.config';
import { AuthService } from '@core/services/auth.service';
import { LevelDefinition } from '@core/utils/level.utils';

export interface AppNotification {
  id: string;
  target_user: string | null;
  type: 'info' | 'level_up' | 'achievement' | 'new_location' | 'deal' | 'announcement';
  title: string;
  body: string | null;
  action_url: string | null;
  action_label: string | null;
  image_url: string | null;
  created_by: string | null;
  created_at: string;
  expires_at: string | null;
  is_read: boolean;
  read_at: string | null;
}

export const NOTIF_ICONS: Record<AppNotification['type'], string> = {
  info:         '🔔',
  level_up:     '🎉',
  achievement:  '🏆',
  new_location: '📍',
  deal:         '🏷️',
  announcement: '📢',
};

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly platformId  = inject(PLATFORM_ID);
  private readonly authService = inject(AuthService);

  private channel: ReturnType<typeof supabase.channel> | null = null;

  readonly notifications = signal<AppNotification[]>([]);
  readonly unreadCount   = computed(() => this.notifications().filter(n => !n.is_read).length);
  readonly loaded        = signal(false);

  constructor() {
    // Auto-load when user logs in, clear when they log out
    effect(() => {
      if (this.authService.isLoggedIn()) {
        void this.load();
      } else {
        this.clear();
      }
    });
  }

  async load(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.authService.isLoggedIn()) return;
    const { data, error } = await supabase.rpc('get_my_notifications', { p_limit: 50 });
    if (!error && data) this.notifications.set(data as AppNotification[]);
    this.loaded.set(true);
    void this.subscribeRealtime();
  }

  async markRead(id: string): Promise<void> {
    await supabase.rpc('mark_notification_read', { p_notification_id: id });
    this.notifications.update(list =>
      list.map(n => n.id === id ? { ...n, is_read: true, read_at: new Date().toISOString() } : n)
    );
  }

  async markAllRead(): Promise<void> {
    await supabase.rpc('mark_all_notifications_read');
    const now = new Date().toISOString();
    this.notifications.update(list =>
      list.map(n => ({ ...n, is_read: true, read_at: n.read_at ?? now }))
    );
  }

  async createLevelUpNotification(level: LevelDefinition): Promise<void> {
    const user = this.authService.user();
    if (!user) return;
    await supabase.rpc('create_system_notification', {
      p_user_id:    user.id,
      p_type:       'level_up',
      p_title:      `You reached ${level.emoji} ${level.name}!`,
      p_body:       `<p><strong>${level.description}</strong></p><p>🎁 New perk: ${level.perk}</p>`,
      p_action_url: '/malta',
    });
  }

  clear(): void {
    if (this.channel) { supabase.removeChannel(this.channel); this.channel = null; }
    this.notifications.set([]);
    this.loaded.set(false);
  }

  private async subscribeRealtime(): Promise<void> {
    if (this.channel) return;
    const userId = this.authService.user()?.id;
    if (!userId) return;

    // Ensure the realtime socket carries the user's JWT — the notifications
    // SELECT policy requires auth.uid(), so an anon socket gets zero events.
    const { data: { session } } = await supabase.auth.getSession();
    if (session) supabase.realtime.setAuth(session.access_token);

    // No server-side filter: postgres_changes can't express "mine OR broadcast"
    // (it has no `is.null` operator), so we subscribe to all inserts and filter here.
    this.channel = supabase
      .channel(`notif:${userId}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'notifications',
      }, payload => {
        const n = payload.new as AppNotification;
        // Only show personal-to-me or broadcasts (target_user null)
        if (n.target_user !== null && n.target_user !== userId) return;
        // Guard against duplicates (e.g. own level-up already inserted optimistically)
        if (this.notifications().some(x => x.id === n.id)) return;
        this.notifications.update(list => [{ ...n, is_read: false, read_at: null }, ...list]);
      })
      .subscribe(status => {
        // On a dead channel, drop it so the next load() (panel open) retries cleanly.
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
          if (this.channel) { supabase.removeChannel(this.channel); this.channel = null; }
        }
      });
  }
}
