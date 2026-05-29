import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { UserRole } from '../models/user.model';
import { LEVELS, NEW_LEVEL_DURATION_MS, getLevelForSaved, getNewLevel } from '../utils/level.utils';

interface CachedUserData {
  savedLocations: string[];
  role: UserRole;
  level: number;
  receiveUpdates: boolean;
  createdAt: number | null; // ms timestamp
}

const CACHE_KEY = 'vm_ud';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours — reduces Firestore reads for returning users

@Injectable({ providedIn: 'root' })
export class UserDataService {
  private readonly firestore = inject(Firestore);
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly savedLocations = signal<Set<string>>(new Set());
  readonly role           = signal<UserRole>('explorer');
  readonly level          = signal<number>(1);
  readonly receiveUpdates = signal<boolean>(true);
  readonly createdAt      = signal<number | null>(null);

  readonly isAdmin   = computed(() => this.role() === 'admin');
  readonly levelInfo = computed(() => {
    if (this.isAdmin()) return LEVELS.find(l => l.id === 6)!;
    const createdAt = this.createdAt();
    if (createdAt !== null && Date.now() - createdAt < NEW_LEVEL_DURATION_MS) {
      return getNewLevel();
    }
    return getLevelForSaved(this.savedLocations().size);
  });

  private saveDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const user = this.authService.user();
        if (user) {
          this.loadUserData(user.uid);
        } else {
          this.savedLocations.set(new Set());
          this.role.set('explorer');
          this.level.set(1);
          this.receiveUpdates.set(true);
          this.createdAt.set(null);
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

  private applyData(data: CachedUserData): void {
    this.savedLocations.set(new Set(data.savedLocations));
    this.role.set(data.role);
    this.level.set(data.level);
    this.receiveUpdates.set(data.receiveUpdates);
    this.createdAt.set(data.createdAt);
  }

  private async loadUserData(uid: string): Promise<void> {
    const cached = this.readCache(uid);
    if (cached) {
      this.applyData(cached);
      // Always refresh in the background — role or other fields may have changed
      // since the cache was written (e.g. admin promotion). Updates signals + cache.
      this.fetchAndApply(uid).catch(() => {});
      return;
    }
    await this.fetchAndApply(uid);
  }

  private async fetchAndApply(uid: string): Promise<void> {
    const ref = doc(this.firestore, 'users', uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const d = snap.data();
      const raw = d['createdAt'];
      const createdAt = raw?.toMillis?.() ?? (raw instanceof Date ? raw.getTime() : null);
      const data: CachedUserData = {
        savedLocations: d['savedLocations'] ?? [],
        role: (d['role'] as UserRole) ?? 'explorer',
        level: d['level'] ?? 1,
        receiveUpdates: d['receiveUpdates'] ?? true,
        createdAt,
      };
      this.applyData(data);
      this.writeCache(uid, data);
    } else {
      const user = this.authService.user()!;
      const now = Date.now();
      const data: CachedUserData = { savedLocations: [], role: 'explorer', level: 1, receiveUpdates: true, createdAt: now };
      await setDoc(ref, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'explorer',
        level: 1,
        savedLocations: [],
        receiveUpdates: true,
        createdAt: new Date(),
      });
      this.applyData(data);
      this.writeCache(uid, data);
    }
  }

  async toggleSaveLocation(slug: string): Promise<void> {
    const user = this.authService.user();
    if (!user) { this.authService.openLoginModal(); return; }

    // Optimistic update
    const isSaved = this.savedLocations().has(slug);
    this.savedLocations.update(s => {
      const n = new Set(s);
      isSaved ? n.delete(slug) : n.add(slug);
      return n;
    });

    // Debounce: accumulate rapid toggles and write the full array once
    if (this.saveDebounceTimer !== null) clearTimeout(this.saveDebounceTimer);
    this.saveDebounceTimer = setTimeout(async () => {
      this.saveDebounceTimer = null;
      const slugs = [...this.savedLocations()];
      const ref = doc(this.firestore, 'users', user.uid);
      await updateDoc(ref, { savedLocations: slugs });
      const cached = this.readCache(user.uid);
      if (cached) this.writeCache(user.uid, { ...cached, savedLocations: slugs });
    }, 800);
  }

  isLocationSaved(slug: string): boolean {
    return this.savedLocations().has(slug);
  }

  async setReceiveUpdates(value: boolean): Promise<void> {
    const user = this.authService.user();
    if (!user || this.receiveUpdates() === value) return;
    this.receiveUpdates.set(value);
    const ref = doc(this.firestore, 'users', user.uid);
    await updateDoc(ref, { receiveUpdates: value });
    const cached = this.readCache(user.uid);
    if (cached) this.writeCache(user.uid, { ...cached, receiveUpdates: value });
  }
}
