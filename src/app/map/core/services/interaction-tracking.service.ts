import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { supabase } from '@map/core/config/supabase.config';
import { AuthService } from '@map/core/services/auth.service';

export type LocationEvent = 'viewed' | 'saved' | 'shared';
export type ProviderEvent = 'viewed' | 'book_now' | 'coupon_copy' | 'shared';

export interface InteractionStats {
  viewCount: number;
  saveCount: number;
  shareCount: number;
  bookNowCount: number;
  couponCopyCount: number;
  firstViewedAt: string | null;
  lastViewedAt: string | null;
}

export interface AggregateStats {
  totalViews: number;
  totalSaves: number;
  totalShares: number;
}

@Injectable({ providedIn: 'root' })
export class InteractionTrackingService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly auth       = inject(AuthService);

  /** Per-user stats keyed by `entityType:entityId`. Only populated for logged-in users. */
  readonly stats          = signal<Map<string, InteractionStats>>(new Map());

  /** Public aggregate stats keyed by `location:slug`. Populated for all users. */
  readonly aggregateStats = signal<Map<string, AggregateStats>>(new Map());

  trackLocation(slug: string, event: LocationEvent): void {
    this.track('location', slug, event);
  }

  trackProvider(id: string, event: ProviderEvent): void {
    this.track('provider', id, event);
  }

  statsFor(entityType: 'location' | 'provider', entityId: string): InteractionStats | undefined {
    return this.stats().get(`${entityType}:${entityId}`);
  }

  aggregateStatsFor(slug: string): AggregateStats | undefined {
    return this.aggregateStats().get(`location:${slug}`);
  }

  private track(entityType: 'location' | 'provider', entityId: string, event: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // saves always require auth — skip silently for anon
    if (event === 'saved' && !this.auth.isLoggedIn()) return;
    // provider events require auth (no aggregate table for providers yet)
    if (entityType === 'provider' && !this.auth.isLoggedIn()) return;

    void supabase.rpc('track_interaction', {
      p_entity_type: entityType,
      p_entity_id:   entityId,
      p_event:       event,
    }).then(({ data, error }) => {
      if (error || !data) return;
      const response = data as {
        stats?:     Record<string, unknown> | null;
        aggregate?: Record<string, unknown> | null;
      };
      const key = `${entityType}:${entityId}`;

      if (response.stats) {
        const row = response.stats;
        this.stats.update(m => {
          const next = new Map(m);
          next.set(key, {
            viewCount:       (row['view_count']        as number) ?? 0,
            saveCount:       (row['save_count']        as number) ?? 0,
            shareCount:      (row['share_count']       as number) ?? 0,
            bookNowCount:    (row['book_now_count']    as number) ?? 0,
            couponCopyCount: (row['coupon_copy_count'] as number) ?? 0,
            firstViewedAt:   (row['first_viewed_at']  as string) ?? null,
            lastViewedAt:    (row['last_viewed_at']   as string) ?? null,
          });
          return next;
        });
      }

      if (response.aggregate) {
        const agg = response.aggregate;
        this.aggregateStats.update(m => {
          const next = new Map(m);
          next.set(key, {
            totalViews:  (agg['total_views']  as number) ?? 0,
            totalSaves:  (agg['total_saves']  as number) ?? 0,
            totalShares: (agg['total_shares'] as number) ?? 0,
          });
          return next;
        });
      }
    });
  }
}
