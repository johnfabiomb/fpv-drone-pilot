import { AfterViewInit, Component, computed, DestroyRef, ElementRef, HostListener, OnDestroy, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { FilterBarComponent } from '@map/features/map/filter-bar/filter-bar.component';
import { FooterComponent } from '@map/layout/footer/footer.component';
import { MapComponent } from '@map/features/map/map/map.component';
import { NavInterstitialComponent } from '@map/layout/nav-interstitial/nav-interstitial.component';
import { CouponReminderComponent } from '@map/layout/coupon-reminder/coupon-reminder.component';
import { ProviderCardComponent } from '@map/features/providers/provider-card/provider-card.component';
import { EventCardComponent } from '@map/features/events/event-card/event-card.component';
import { AuthService } from '@map/core/services/auth.service';
import { MapBridgeService } from '@map/core/services/map-bridge.service';
import { MaltaEvent, Provider, Route } from '@map/core/models';
import { eventBookUrl } from '@map/core/utils/event.utils';
import { PanelResize } from '@map/core/utils/panel-resize.util';
import { ROUTE_COLORS } from '@map/core/utils/route-drawing';
import { version } from '../../../../../../package.json';

@Component({
  selector: 'app-map-shell',
  standalone: true,
  providers: [MapBridgeService],
  imports: [CommonModule, RouterOutlet, RouterLink, MapComponent, FilterBarComponent, NavInterstitialComponent, CouponReminderComponent, ProviderCardComponent, EventCardComponent, FooterComponent],
  templateUrl: './map-shell.component.html',
  styleUrl: './map-shell.component.scss',
})
export class MapShellComponent implements AfterViewInit, OnDestroy {
  @ViewChild('panelWrap') private panelWrap?: ElementRef<HTMLDivElement>;
  @ViewChild(MapComponent) private mapComp?: MapComponent;

  readonly bridge     = inject(MapBridgeService);
  readonly auth       = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router     = inject(Router);

  readonly version = version;
  readonly now = new Date();
  isOnline = true;
  showDevAbout = false;
  spotPickWrongTap = false;
  private spotPickWrongTapTimer?: ReturnType<typeof setTimeout>;

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
    clearTimeout(this.spotPickWrongTapTimer);
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
    if (this.bridge.spotPickMode()) {
      clearTimeout(this.spotPickWrongTapTimer);
      this.spotPickWrongTap = true;
      this.spotPickWrongTapTimer = setTimeout(() => { this.spotPickWrongTap = false; }, 2200);
      return;
    }
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

  onInterstitialEventSelected(event: MaltaEvent): void {
    window.open(eventBookUrl(event), '_blank', 'noopener');
    this.bridge.clearInterstitial();
  }
}
