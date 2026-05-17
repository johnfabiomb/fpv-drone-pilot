import { AfterViewInit, Component, computed, DestroyRef, ElementRef, HostListener, OnDestroy, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MapComponent } from '../../components/map/map.component';
import { NavInterstitialComponent } from '../../components/nav-interstitial/nav-interstitial.component';
import { MapBridgeService } from '../../shared/services/map-bridge.service';
import { PanelResize } from '../../shared/utils/panel-resize.util';

@Component({
  selector: 'app-malta-shell',
  standalone: true,
  providers: [MapBridgeService],
  imports: [CommonModule, RouterOutlet, MapComponent, FilterBarComponent, NavInterstitialComponent, FooterComponent],
  templateUrl: './malta-shell.component.html',
  styleUrl: './malta-shell.component.scss',
})
export class MaltaShellComponent implements AfterViewInit, OnDestroy {
  @ViewChild('panelWrap') private panelWrap?: ElementRef<HTMLDivElement>;
  @ViewChild(MapComponent) private mapComp?: MapComponent;

  readonly bridge = inject(MapBridgeService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  isOnline = true;

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  readonly isDeals = computed(() => this.currentUrl().includes('/malta/deals'));

  readonly showPanelBtnIcon = computed(() => {
    const url = this.currentUrl();
    if (url.includes('/list'))  return 'fa-list';
    if (url.includes('/deals')) return 'fa-tag';
    return 'fa-info-circle';
  });

  ngAfterViewInit(): void {
    this.bridge.registerPanelGetter(() => this.panelWrap);
    this.bridge.registerMap(this.mapComp!);

    this.bridge.scrollToTop$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.panelWrap?.nativeElement?.scrollTo({ top: 0 });
    });
  }

  ngOnDestroy(): void {
    this.bridge.destroy();
  }

  @HostListener('window:online')
  onOnline(): void { this.isOnline = true; }

  @HostListener('window:offline')
  onOffline(): void { this.isOnline = false; }

  onMapTapped(): void {
    if (window.innerWidth <= 768 && this.bridge.panelOpen() && !this.bridge.mapOnly()) {
      this.bridge.panel.minimize();
    }
  }
}
