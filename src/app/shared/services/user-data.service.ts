import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Firestore, arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { UserRole } from '../models/user.model';

interface CachedUserData {
  savedLocations: string[];
  role: UserRole;
  level: number;
}

const CACHE_KEY = 'vm_ud';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours — reduces Firestore reads for returning users

@Injectable({ providedIn: 'root' })
export class UserDataService {
  private readonly firestore = inject(Firestore);
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly savedLocations = signal<Set<string>>(new Set());
  readonly role = signal<UserRole>('explorer');
  readonly level = signal<number>(1);

  readonly isAdmin = computed(() => this.role() === 'admin');

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
  }

  private async loadUserData(uid: string): Promise<void> {
    // Serve from cache to avoid a Firestore read on every session
    const cached = this.readCache(uid);
    if (cached) { this.applyData(cached); return; }

    const ref = doc(this.firestore, 'users', uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const d = snap.data();
      const data: CachedUserData = {
        savedLocations: d['savedLocations'] ?? [],
        role: (d['role'] as UserRole) ?? 'explorer',
        level: d['level'] ?? 1,
      };
      this.applyData(data);
      this.writeCache(uid, data);
    } else {
      const user = this.authService.user()!;
      const data: CachedUserData = { savedLocations: [], role: 'explorer', level: 1 };
      await setDoc(ref, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'explorer',
        level: 1,
        savedLocations: [],
        createdAt: new Date(),
      });
      this.applyData(data);
      this.writeCache(uid, data);
    }
  }

  async toggleSaveLocation(slug: string): Promise<void> {
    const user = this.authService.user();
    if (!user) { this.authService.openLoginModal(); return; }

    const ref = doc(this.firestore, 'users', user.uid);
    const isSaved = this.savedLocations().has(slug);

    // Optimistic update
    this.savedLocations.update(s => {
      const n = new Set(s);
      isSaved ? n.delete(slug) : n.add(slug);
      return n;
    });

    await updateDoc(ref, { savedLocations: isSaved ? arrayRemove(slug) : arrayUnion(slug) });

    // Refresh cache after mutation
    const cached = this.readCache(user.uid);
    if (cached) {
      const updated = isSaved
        ? cached.savedLocations.filter(s => s !== slug)
        : [...cached.savedLocations, slug];
      this.writeCache(user.uid, { ...cached, savedLocations: updated });
    }
  }

  isLocationSaved(slug: string): boolean {
    return this.savedLocations().has(slug);
  }
}
