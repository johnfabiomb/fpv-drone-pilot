import {
  Component, DestroyRef, OnDestroy, OnInit,
  PLATFORM_ID, computed, effect, inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PanelShellComponent } from '@map/ui/panel-shell/panel-shell.component';
import { GroupsSectionComponent } from '@map/features/groups/groups-section/groups-section.component';
import { MapBridgeService } from '@map/core/services/map-bridge.service';
import { GroupsService } from '@map/core/services/groups.service';
import { AuthService } from '@map/core/services/auth.service';
import { UserDataService } from '@map/core/services/user-data.service';
import { SeoService } from '@map/core/services/seo.service';
import { AnalyticsService } from '@map/core/services/analytics.service';
import { Location } from '@map/core/models';

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

  readonly groupsUnlocked = computed(() => this.userDataService.groupsUnlocked());

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
        if (!loc) return;
        if (this.bridge.spotPickMode()) return; // spot picker in groups section handles it
        this.router.navigate(['/malta/locations', loc.slug]);
      });

    this.analytics.pageView(window.location.href, 'Explore Together');
  }

  ngOnDestroy(): void {
    this.groupsService.stopGroupsListener();
    this.bridge.pickMode.set(false);
    this.bridge.meetingPointMarker.set(null);
  }

}
