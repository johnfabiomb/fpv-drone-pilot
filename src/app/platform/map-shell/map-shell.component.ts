import { AfterViewInit, Component, computed, DestroyRef, ElementRef, HostListener, OnDestroy, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MapComponent } from '../../components/map/map.component';
import { NavInterstitialComponent } from '../../components/nav-interstitial/nav-interstitial.component';
import { CouponReminderComponent } from '../../components/coupon-reminder/coupon-reminder.component';
import { ProviderCardComponent } from '../../components/provider-card/provider-card.component';
import { MapBridgeService } from '../../shared/services/map-bridge.service';
import { Provider, Route } from '../../shared/models';
import { PanelResize } from '../../shared/utils/panel-resize.util';
import { ROUTE_COLORS } from '../../shared/utils/route-drawing';

@Component({
  selector: 'app-map-shell',
  standalone: true,
  providers: [MapBridgeService],
  imports: [CommonModule, RouterOutlet, MapComponent, FilterBarComponent, NavInterstitialComponent, CouponReminderComponent, ProviderCardComponent, FooterComponent],
  templateUrl: './map-shell.component.html',
  styleUrl: './map-shell.component.scss',
})
export class MapShellComponent implements AfterViewInit, OnDestroy {
  @ViewChild('panelWrap') private panelWrap?: ElementRef<HTMLDivElement>;
  @ViewChild(MapComponent) private mapComp?: MapComponent;

  readonly bridge = inject(MapBridgeService);
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

  readonly routes = computed((): Route[] => this.bridge.selectedLocation()?.routes ?? []);
  readonly hasMultipleRoutes = computed(() => this.routes().length >= 2);
  readonly routeColors = ROUTE_COLORS;

  readonly showPanelBtnIcon = computed(() => {
    const url = this.currentUrl();
    if (url.includes('/list'))  return 'fa-list';
    if (url.includes('/deals')) return 'fa-tag';
    return 'fa-info-circle';
  });

  onSelectAllRoutes(): void {
    this.bridge.activeRouteIndex.set(-1);
    this.bridge.drawAllRoutes();
    this.bridge.panel.expand();
  }

  onSelectRoute(index: number): void {
    const routes = this.routes();
    if (!routes[index]) return;
    this.bridge.activeRouteIndex.set(index);
    this.bridge.setRoute(routes[index].mapPoints);
    this.bridge.panel.minimize();
  }

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

  onInterstitialClosed(): void {
    this.bridge.clearInterstitial();
  }

  onInterstitialProviderSelected(provider: Provider): void {
    this.bridge.interstitialProviderSelected$.next(provider);
    this.bridge.clearInterstitial();
  }
}
