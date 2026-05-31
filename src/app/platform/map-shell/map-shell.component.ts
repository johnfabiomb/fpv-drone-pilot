import { AfterViewInit, Component, PLATFORM_ID, computed, DestroyRef, ElementRef, HostListener, OnDestroy, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MapComponent } from '../../components/map/map.component';
import { NavInterstitialComponent } from '../../components/nav-interstitial/nav-interstitial.component';
import { CouponReminderComponent } from '../../components/coupon-reminder/coupon-reminder.component';
import { ProviderCardComponent } from '../../components/provider-card/provider-card.component';
import { AuthService } from '../../shared/services/auth.service';
import { MapBridgeService } from '../../shared/services/map-bridge.service';
import { InAppBrowserService } from '../../shared/services/in-app-browser.service';
import { Provider, Route } from '../../shared/models';
import { PanelResize } from '../../shared/utils/panel-resize.util';
import { ROUTE_COLORS } from '../../shared/utils/route-drawing';
import { version } from '../../../../package.json';

@Component({
  selector: 'app-map-shell',
  standalone: true,
  providers: [MapBridgeService],
  imports: [CommonModule, RouterOutlet, RouterLink, MapComponent, FilterBarComponent, NavInterstitialComponent, CouponReminderComponent, ProviderCardComponent, FooterComponent],
  templateUrl: './map-shell.component.html',
  styleUrl: './map-shell.component.scss',
})
export class MapShellComponent implements AfterViewInit, OnDestroy {
  @ViewChild('panelWrap') private panelWrap?: ElementRef<HTMLDivElement>;
  @ViewChild(MapComponent) private mapComp?: MapComponent;

  readonly bridge      = inject(MapBridgeService);
  readonly auth        = inject(AuthService);
  readonly iab         = inject(InAppBrowserService);
  private readonly platformId  = inject(PLATFORM_ID);
  private readonly destroyRef  = inject(DestroyRef);
  private readonly router      = inject(Router);

  readonly version = version;
  isOnline = true;
  showDevAbout = false;
  iabLabel: string | null = null;

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
    if (isPlatformBrowser(this.platformId) && this.iab.isInAppBrowser()) {
      this.iabLabel = this.iab.getAppLabel();
    }

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

  toggleDevAbout(e: Event): void {
    e.stopPropagation();
    this.onControlTapped();
    this.showDevAbout = !this.showDevAbout;
  }

  @HostListener('document:click')
  closeDevAbout(): void { this.showDevAbout = false; }

  onControlTapped(): void {
    if (this.bridge.panelOpen() && !this.bridge.panel.minimized()) {
      this.bridge.panel.minimize();
    }
  }

  onMapTapped(): void {
    this.showDevAbout = false;
    if (window.innerWidth <= 768 && this.bridge.panelOpen() && !this.bridge.mapOnly() && !this.bridge.panel.minimized()) {
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
