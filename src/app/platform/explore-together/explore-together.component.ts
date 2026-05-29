import {
  Component, DestroyRef, OnDestroy, OnInit,
  PLATFORM_ID, effect, inject, signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PanelShellComponent } from '../../components/panel-shell/panel-shell.component';
import { GroupsSectionComponent } from '../../components/groups-section/groups-section.component';
import { MapBridgeService } from '../../shared/services/map-bridge.service';
import { GroupsService } from '../../shared/services/groups.service';
import { AuthService } from '../../shared/services/auth.service';
import { UserDataService } from '../../shared/services/user-data.service';
import { SeoService } from '../../shared/services/seo.service';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { Location } from '../../shared/models';

@Component({
  selector: 'app-explore-together',
  standalone: true,
  imports: [CommonModule, PanelShellComponent, GroupsSectionComponent],
  templateUrl: './explore-together.component.html',
  styleUrl: './explore-together.component.scss',
})
export class ExploreTogetherComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  readonly router             = inject(Router);
  private readonly seo        = inject(SeoService);
  private readonly analytics  = inject(AnalyticsService);
  readonly bridge             = inject(MapBridgeService);
  readonly groupsService      = inject(GroupsService);
  readonly authService        = inject(AuthService);
  readonly userDataService    = inject(UserDataService);

  // Admin-only migration state
  readonly migrating    = signal(false);
  readonly migrateResult = signal<string | null>(null);

  constructor() {
    effect(() => {
      this.bridge.providerPins.set(this.groupsService.groupsAsProviderPins());
    });
  }

  ngOnInit(): void {
    this.seo.setPage('groups');

    if (!isPlatformBrowser(this.platformId)) return;

    this.groupsService.startGroupsListener();
    this.bridge.enterPanelMode(this.groupsService.groupsAsProviderPins());

    this.bridge.providerPinSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(p => {
        if (p.category === 'group') {
          this.router.navigate(['/malta/groups', p.id]);
        }
      });

    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loc: Location | null) => {
        if (loc) this.router.navigate(['/malta/locations', loc.slug]);
      });

    this.analytics.pageView(window.location.href, 'Explore Together');
  }

  ngOnDestroy(): void {
    this.groupsService.stopGroupsListener();
    this.bridge.pickMode.set(false);
    this.bridge.meetingPointMarker.set(null);
  }

  async runMigration(): Promise<void> {
    this.migrating.set(true);
    this.migrateResult.set(null);
    try {
      const count = await this.groupsService.migrateLeaderIsAdmin();
      this.migrateResult.set(`✅ Done — ${count} group${count === 1 ? '' : 's'} updated.`);
    } catch (e) {
      this.migrateResult.set(`❌ Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      this.migrating.set(false);
    }
  }
}
