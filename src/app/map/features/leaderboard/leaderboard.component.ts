import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '@map/core/services/seo.service';
import { supabase } from '@map/core/config/supabase.config';
import { LEVELS } from '@map/core/utils/level.utils';
import { UserAvatarComponent } from '@map/ui/user-avatar/user-avatar.component';

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  display_name: string;
  photo_url: string | null;
  level: number;
  xp: number;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterModule, UserAvatarComponent],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent implements OnInit {
  private readonly seo        = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly entries = signal<LeaderboardEntry[]>([]);
  readonly loading = signal(true);
  readonly error   = signal(false);

  ngOnInit(): void {
    this.seo.setPage('leaderboard');
    if (isPlatformBrowser(this.platformId)) {
      this.load();
    }
  }

  private async load(): Promise<void> {
    const { data, error } = await supabase.rpc('get_leaderboard', { p_limit: 50 });
    if (error || !data) {
      this.error.set(true);
    } else {
      this.entries.set(data as LeaderboardEntry[]);
    }
    this.loading.set(false);
  }

  levelInfo(levelId: number) {
    return LEVELS.find(l => l.id === levelId) ?? LEVELS[1];
  }

  medal(rank: number): string {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return String(rank);
  }
}
