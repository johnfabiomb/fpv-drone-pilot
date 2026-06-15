import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { supabase } from '@map/core/config/supabase.config';
import { AuthService } from '@map/core/services/auth.service';
import { NotificationService } from '@map/core/services/notification.service';
import { UserRole } from '@map/core/models';
import { LEVELS, NEW_LEVEL_DURATION_MS, LevelDefinition, getLevelForXp, getNewLevel } from '@map/core/utils/level.utils';

interface CachedUserData {
  savedLocations: string[];
  role: UserRole;
  level: number;
  xp: number;
  receiveUpdates: boolean;
  createdAt: number | null;
  featureAccess?: { groups?: boolean };
  referralCode?: string | null;
  phone?: string | null;
}

const CACHE_KEY = 'vm_ud';
const CACHE_TTL = 24 * 60 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class UserDataService {
  private readonly authService       = inject(AuthService);
  private readonly platformId        = inject(PLATFORM_ID);
  private readonly notificationService = inject(NotificationService);

  readonly savedLocations = signal<Set<string>>(new Set());
  readonly role           = signal<UserRole>(UserRole.Explorer);
  readonly level          = signal<number>(1);
  readonly xp             = signal<number>(0);
  readonly receiveUpdates = signal<boolean>(true);
  readonly createdAt      = signal<number | null>(null);
  readonly referralCode   = signal<string | null>(null);
  readonly phone          = signal<string | null>(null);
  readonly levelUpToast   = signal<LevelDefinition | null>(null);

  readonly needsDisplayName = computed(() =>
    this.authService.isLoggedIn() &&
    !this.authService.user()?.user_metadata?.['full_name']
  );

  private readonly _featureAccess = signal<{ groups?: boolean } | null>(null);
  readonly groupsUnlocked = computed(() => this._featureAccess()?.groups !== false);
  readonly isAdmin        = computed(() => this.role() === UserRole.Admin);
  readonly isGuide        = computed(() => this.role() === UserRole.Guide);
  readonly canSetPrice    = computed(() => this.isAdmin() || this.isGuide());

  readonly daysSinceRegistration = computed(() => {
    const createdAt = this.createdAt();
    return createdAt !== null ? (Date.now() - createdAt) / 86_400_000 : 0;
  });

  readonly levelInfo = computed(() => {
    if (this.isAdmin()) return LEVELS.find(l => l.id === 6)!;
    const createdAt = this.createdAt();
    if (createdAt !== null && Date.now() - createdAt < NEW_LEVEL_DURATION_MS) {
      return getNewLevel();
    }
    return getLevelForXp(this.xp(), this.daysSinceRegistration());
  });

  readonly xpProgress = computed(() => {
    const current = this.levelInfo();
    if (current.id === 0 || current.id === 6) return 0;
    const next = LEVELS.find(l => l.id === current.id + 1);
    if (!next) return 1;
    const range = next.minXp - current.minXp;
    if (range <= 0) return 1;
    return Math.min(1, Math.max(0, (this.xp() - current.minXp) / range));
  });

  readonly nextLevelXp = computed((): number | null => {
    const current = this.levelInfo();
    if (current.id === 0 || current.id === 6) return null;
    const next = LEVELS.find(l => l.id === current.id + 1);
    if (!next) return null;
    return Math.max(0, next.minXp - this.xp());
  });

  readonly nextLevelDaysLeft = computed((): number => {
    const current = this.levelInfo();
    const next = LEVELS.find(l => l.id === current.id + 1);
    if (!next || next.minDays === 0) return 0;
    return Math.max(0, Math.ceil(next.minDays - this.daysSinceRegistration()));
  });

  readonly referralLink = computed(() => {
    const code = this.referralCode();
    return code ? `https://johnfabiomb.com?ref=${code}` : null;
  });

  private saveDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private loadedUserId: string | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const user = this.authService.user();
        const uid = user?.id ?? null;

        // React only to a change of *identity* (login / logout / account switch).
        // Supabase fires USER_UPDATED on every profile metadata edit (avatar,
        // display name), which re-runs this effect with the SAME user. Reloading
        // then would overwrite in-memory state (saved locations, XP, level) from
        // cache/DB — racing the 800ms save debounce and silently dropping recent
        // saves. The mutating methods already keep the signals + cache in sync.
        if (uid === this.loadedUserId) return;
        this.loadedUserId = uid;

        if (user) {
          this.loadUserData(user.id);
        } else {
          this.clearAllCaches();
          this.stopHeartbeat();
          this.savedLocations.set(new Set());
          this.role.set(UserRole.Explorer);
          this.level.set(1);
          this.xp.set(0);
          this.receiveUpdates.set(true);
          this.createdAt.set(null);
          this.referralCode.set(null);
          this._featureAccess.set(null);
        }
      });
    }
  }

  private readCache(uid: string): CachedUserData | null {
    try {
      const raw = localStorage.getItem(`${CACHE_KEY}_${uid}`);
      if (!raw) return null;
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL) return null;
      return data as CachedUserData;
    } catch { return null; }
  }

  private writeCache(uid: string, data: CachedUserData): void {
    try {
      localStorage.setItem(`${CACHE_KEY}_${uid}`, JSON.stringify({ data, ts: Date.now() }));
    } catch {}
  }

  private clearAllCaches(): void {
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith(CACHE_KEY))
        .forEach(k => localStorage.removeItem(k));
    } catch {}
  }

  private applyData(data: CachedUserData): void {
    this.savedLocations.set(new Set(data.savedLocations));
    this.role.set(data.role);
    this.level.set(data.level);
    this.xp.set(data.xp ?? 0);
    this.receiveUpdates.set(data.receiveUpdates);
    this.createdAt.set(data.createdAt);
    this._featureAccess.set(data.featureAccess ?? null);
    this.referralCode.set(data.referralCode ?? null);
    this.phone.set(data.phone ?? null);
  }

  async uploadAvatar(file: File): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const compressed = await this.compressAvatar(file);
    const path = `${user.id}/avatar.webp`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, compressed, { contentType: 'image/webp', upsert: true });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);
    // Append timestamp to bust browser cache on re-upload (same file path, new URL)
    const cacheBustedUrl = `${publicUrl}?v=${Date.now()}`;

    await supabase.from('users').update({ photo_url: cacheBustedUrl }).eq('id', user.id);
    // Update auth user_metadata so userPhotoURL() signal refreshes everywhere
    await supabase.auth.updateUser({ data: { avatar_url: cacheBustedUrl } });
  }

  // Canvas-based compression: center-crop to 300×300, WebP @ 80% quality
  // Matches project thumbnail pipeline (convert-to-webp.js: quality 80, fit cover)
  private compressAvatar(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const SIZE = 300;
        const canvas = document.createElement('canvas');
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext('2d')!;
        const s = Math.min(img.width, img.height);
        const sx = (img.width - s) / 2;
        const sy = (img.height - s) / 2;
        ctx.drawImage(img, sx, sy, s, s, 0, 0, SIZE, SIZE);
        canvas.toBlob(
          blob => blob ? resolve(blob) : reject(new Error('Compression failed')),
          'image/webp', 0.80,
        );
      };
      img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('Image load failed')); };
      img.src = objectUrl;
    });
  }

  async updateProfile(data: { displayName: string; phone?: string | null }): Promise<void> {
    const user = this.authService.user();
    if (!user) throw new Error('Not authenticated');

    const name = data.displayName.trim();
    if (!name) throw new Error('Name is required');

    // Update auth user_metadata so userDisplayName() signal updates everywhere
    await supabase.auth.updateUser({ data: { full_name: name } });

    const update: Record<string, unknown> = { display_name: name };
    if (data.phone !== undefined) update['phone'] = data.phone || null;
    await supabase.from('users').update(update).eq('id', user.id);

    if (data.phone !== undefined) this.phone.set(data.phone || null);
  }

  private async loadUserData(uid: string): Promise<void> {
    const cached = this.readCache(uid);
    if (cached) {
      this.applyData(cached);
      this.fetchAndApply(uid).catch(() => {});
      return;
    }
    await this.fetchAndApply(uid);
  }

  private async fetchAndApply(uid: string): Promise<void> {
    const { data, error } = await supabase
      .from('users')
      .select('saved_locations, role, level, xp, receive_updates, feature_access, created_at, referral_code, phone')
      .eq('id', uid)
      .maybeSingle();

    // A query error (e.g. missing column) must never fall through to the upsert
    // path below — that upsert hardcodes role=Explorer and would overwrite admin.
    if (error) return;

    if (data) {
      const createdAt  = data['created_at'] ? new Date(data['created_at']).getTime() : null;
      const xp         = (data['xp'] as number) ?? 0;
      const savedSlugs = (data['saved_locations'] as string[]) ?? [];

      const userData: CachedUserData = {
        savedLocations: savedSlugs,
        role:           (data['role'] as UserRole) ?? UserRole.Explorer,
        level:          data['level'] ?? 1,
        xp,
        receiveUpdates: data['receive_updates'] ?? true,
        createdAt,
        featureAccess:  data['feature_access'] as { groups?: boolean } | undefined,
        referralCode:   (data['referral_code'] as string | null) ?? null,
        phone:          (data['phone'] as string | null) ?? null,
      };
      this.applyData(userData);
      this.writeCache(uid, userData);

      // Retroactive XP migration: award XP for already-saved locations (one-time)
      if (xp === 0 && savedSlugs.length > 0) {
        await Promise.all(
          savedSlugs.map(slug => supabase.rpc('award_xp', { p_action: 'location_saved', p_ref_id: slug })),
        );
        const { data: refreshed } = await supabase
          .from('users').select('xp, level').eq('id', uid).maybeSingle();
        if (refreshed) {
          const newXp    = (refreshed['xp'] as number) ?? 0;
          const newLevel = (refreshed['level'] as number) ?? 1;
          this.xp.set(newXp);
          this.level.set(newLevel);
          this.writeCache(uid, { ...userData, xp: newXp, level: newLevel });
        }
      }

      // Daily active XP — unique per calendar day
      const today = new Date().toISOString().split('T')[0];
      void this.awardXp('daily_active', today);

      this.startHeartbeat();
    } else {
      // handle_new_user trigger normally creates this row — upsert as fallback
      const user = this.authService.user()!;
      const now  = Date.now();
      const userData: CachedUserData = {
        savedLocations: [], role: UserRole.Explorer, level: 1, xp: 0, receiveUpdates: true, createdAt: now,
      };
      await supabase.from('users').upsert({
        id:              uid,
        email:           user.email ?? '',
        display_name:    user.user_metadata?.['full_name'] ?? null,
        photo_url:       user.user_metadata?.['avatar_url'] ?? null,
        role:            UserRole.Explorer,
        level:           1,
        saved_locations: [],
        receive_updates: true,
      });
      this.applyData(userData);
      this.writeCache(uid, userData);
    }
  }

  private startHeartbeat(): void {
    if (!isPlatformBrowser(this.platformId) || this.heartbeatTimer !== null) return;
    this.heartbeatTimer = setInterval(() => {
      void this.awardXp('session_active');
    }, 10 * 60 * 1000);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer !== null) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  async awardXp(action: string, refId?: string): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    const user = this.authService.user();
    if (!user) return;

    const prevLevel = this.level();

    const { data, error } = await supabase.rpc('award_xp', {
      p_action: action,
      p_ref_id: refId ?? null,
    });

    if (error || !data || (data as Record<string, unknown>)['error'] ||
        (data as Record<string, unknown>)['capped'] || (data as Record<string, unknown>)['duplicate']) return;

    const newXp    = (data as Record<string, unknown>)['xp']    as number;
    const newLevel = (data as Record<string, unknown>)['level']  as number;

    this.xp.set(newXp);
    this.level.set(newLevel);

    const cached = this.readCache(user.id);
    if (cached) this.writeCache(user.id, { ...cached, xp: newXp, level: newLevel });

    if (newLevel > prevLevel) {
      const levelDef = LEVELS.find(l => l.id === newLevel);
      if (levelDef) {
        this.levelUpToast.set(levelDef);
        setTimeout(() => {
          if (this.levelUpToast()?.id === levelDef.id) this.levelUpToast.set(null);
        }, 3500);
        void this.notificationService.createLevelUpNotification(levelDef);
      }
    }
  }

  async toggleSaveLocation(slug: string): Promise<void> {
    const user = this.authService.user();
    if (!user) { this.authService.openLoginModal(); return; }

    const isSaved = this.savedLocations().has(slug);
    this.savedLocations.update(s => {
      const n = new Set(s);
      isSaved ? n.delete(slug) : n.add(slug);
      return n;
    });

    if (!isSaved) {
      void this.awardXp('location_saved', slug);
    }

    if (this.saveDebounceTimer !== null) clearTimeout(this.saveDebounceTimer);
    this.saveDebounceTimer = setTimeout(async () => {
      this.saveDebounceTimer = null;
      const slugs = [...this.savedLocations()];
      await supabase.from('users').update({ saved_locations: slugs }).eq('id', user.id);
      const cached = this.readCache(user.id);
      if (cached) this.writeCache(user.id, { ...cached, savedLocations: slugs });
    }, 800);
  }

  isLocationSaved(slug: string): boolean {
    return this.savedLocations().has(slug);
  }

  async setReceiveUpdates(value: boolean): Promise<void> {
    const user = this.authService.user();
    if (!user || this.receiveUpdates() === value) return;
    this.receiveUpdates.set(value);
    await supabase.from('users').update({ receive_updates: value }).eq('id', user.id);
    const cached = this.readCache(user.id);
    if (cached) this.writeCache(user.id, { ...cached, receiveUpdates: value });
  }
}
