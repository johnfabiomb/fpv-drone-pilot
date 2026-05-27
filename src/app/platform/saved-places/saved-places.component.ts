import { Component, DestroyRef, OnInit, PLATFORM_ID, computed, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { locations } from '../../../assets/locations.json';
import { PanelShellComponent } from '../../components/panel-shell/panel-shell.component';
import { MapBridgeService } from '../../shared/services/map-bridge.service';
import { AuthService } from '../../shared/services/auth.service';
import { UserDataService } from '../../shared/services/user-data.service';
import { Difficulty, Location } from '../../shared/models';
import { difficultyColor as getDifficultyColor, getIslandLabel } from '../../shared/utils/location-filter.util';

@Component({
  selector: 'app-saved-places',
  standalone: true,
  imports: [CommonModule, PanelShellComponent],
  templateUrl: './saved-places.component.html',
  styleUrl: './saved-places.component.scss',
})
export class SavedPlacesComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  readonly bridge = inject(MapBridgeService);
  readonly authService = inject(AuthService);
  readonly userDataService = inject(UserDataService);

  readonly savedLocations = computed(() => {
    const slugs = this.userDataService.savedLocations();
    return (locations as Location[]).filter(loc => loc.slug && slugs.has(loc.slug));
  });

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.bridge.enterPanelMode([]);
    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(loc => {
        if (loc) this.router.navigate(['/malta/locations', loc.slug], { queryParams: { backTo: 'saved' } });
      });
  }

  openLocation(loc: Location): void {
    this.router.navigate(['/malta/locations', loc.slug], { queryParams: { backTo: 'saved' } });
  }

  difficultyColor(d: Difficulty): string { return getDifficultyColor(d); }
  islandLabel(loc: Location): string | null { return getIslandLabel(loc); }
  goToMap(): void { this.router.navigate(['/malta']); }
  browseAll(): void { this.router.navigate(['/malta/list']); }
}
