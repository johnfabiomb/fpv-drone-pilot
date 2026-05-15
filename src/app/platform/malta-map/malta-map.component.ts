import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, HostListener, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { LocationDetailComponent } from '../../components/location-panel/location-panel.component';
import { MapComponent } from '../../components/map/map.component';
import { NavInterstitialComponent } from '../../components/nav-interstitial/nav-interstitial.component';
import { PanelShellComponent } from '../../components/panel-shell/panel-shell.component';
import { ProviderDetailComponent } from '../../components/provider-panel/provider-panel.component';
import { ShareButtonComponent } from '../../components/share-button/share-button.component';
import { SeoService } from '../../shared/services/seo.service';
import { FEATURES } from '../../feature-flags';
import { providers } from '../../../assets/providers.json';

const PANEL_MIN_H = 80;
const PANEL_EXPANDED_VH = 0.60;

@Component({
  selector: 'app-malta-map',
  standalone: true,
  imports: [CommonModule, ComponentsModule, PanelShellComponent, LocationDetailComponent, ProviderDetailComponent, NavInterstitialComponent, ShareButtonComponent],
  templateUrl: './malta-map.component.html',
  styleUrl: './malta-map.component.scss'
})
export class MaltaMapComponent implements OnInit {
  map = true;
  selectedLocation: any = null;
  selectedProvider: any = null;
  mapOnly = false;
  isOnline = true;
  panelMinimized = false;
  userLat: number | null = null;
  userLon: number | null = null;
  activeFilters: string[] = [];
  backTo: string | null = null;
  pendingNavUrl: string | null = null;

  readonly navDuration = 3;

  get interstitialProviders(): any[] {
    if (!FEATURES.PROMOTIONS || !this.selectedLocation) return [];
    return (providers as any[])
      .filter(p => p.nearLocationIds?.includes(this.selectedLocation.id))
      .slice(0, 2);
  }

  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private document = inject(DOCUMENT);

  get currentShareUrl(): string {
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : 'https://johnfabiomb.com';
    if (this.selectedProvider) return `${origin}/malta?provider=${this.selectedProvider.id}`;
    if (this.selectedLocation) return `${origin}/malta?locationId=${this.selectedLocation.id}`;
    return '';
  }

  @ViewChild(MapComponent) mapComp!: MapComponent;
  @ViewChild(LocationDetailComponent) locationDetail?: LocationDetailComponent;
  @ViewChild('panelWrap') panelWrap!: ElementRef<HTMLDivElement>;

  private isDragging = false;
  private dragStartY = 0;
  private dragBaseHeight = 0;

  constructor(
    private seo: SeoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.seo.setPage('map');
    this.backTo = this.route.snapshot.queryParamMap.get('backTo');
    if (isPlatformBrowser(this.platformId)) this.isOnline = navigator.onLine;

    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const id = params['provider'];
        this.selectedProvider = id
          ? ((providers as any[]).find(p => p.id === id) ?? null)
          : null;
        if (this.selectedProvider && !this.selectedLocation) {
          this.mapOnly = false;
          this.panelMinimized = false;
          setTimeout(() => {
            this.panelWrap?.nativeElement?.scrollTo({ top: 0 });
            this.applyPanelHeight(this.expandedHeight());
            this.mapComp?.updateSize();
          });
        }
      });
  }

  get panelTitle(): string {
    if (this.selectedProvider) return this.selectedProvider.name;
    return this.selectedLocation?.title ?? '';
  }

  goBack(): void {
    if (this.backTo === '30-places-2026') this.router.navigate(['/malta/30-places-2026']);
    else this.router.navigate(['/malta/list']);
  }

  @HostListener('window:online')
  onOnline() { this.isOnline = true; }

  @HostListener('window:offline')
  onOffline() { this.isOnline = false; }

  openProvider(provider: any): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { provider: provider.id },
      queryParamsHandling: 'merge',
    });
  }

  onLocationSelected(location: any | null): void {
    this.selectedLocation = location;
    if (!location) {
      this.mapOnly = false;
      this.panelMinimized = false;
      this.seo.setPage('map');
    } else {
      this.seo.updateMetaData(location);
      this.panelMinimized = false;
      setTimeout(() => {
        this.panelWrap?.nativeElement.scrollTo({ top: 0 });
        this.applyPanelHeight(this.expandedHeight());
        this.mapComp?.updateSize();
        this.mapComp?.refitRoute();
      });
    }
  }

  onGpsUpdate(coord: { lat: number; lon: number }): void {
    this.userLat = coord.lat;
    this.userLon = coord.lon;
  }

  onMapTapped(): void {
    if (window.innerWidth > 768) return;
    if ((!this.selectedLocation && !this.selectedProvider) || this.mapOnly) return;
    this.minimizePanel();
  }

  onNavRequested(url: string): void {
    this.pendingNavUrl = url;
  }

  /** Shell close button pressed — navigate back through the panel stack. */
  onPanelCloseRequested(): void {
    if (this.selectedProvider) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { provider: null },
        queryParamsHandling: 'merge',
      });
    } else {
      this.locationDetail?.requestClose();
    }
  }

  closePanel(): void {
    this.mapComp.closeLocation();
    this.mapOnly = false;
    this.panelMinimized = false;
  }

  exploreMap(): void {
    this.mapComp.closeLocation();
    this.mapComp.resetToMalta();
    this.mapOnly = false;
    this.panelMinimized = false;
  }

  // ── Drag handlers ──────────────────────────────────────────────────────────

  onDragStart(e: TouchEvent): void {
    if (window.innerWidth > 768) return;
    this.isDragging = true;
    this.dragStartY = e.touches[0].clientY;
    this.dragBaseHeight = this.panelWrap?.nativeElement.offsetHeight ?? this.expandedHeight();
    const el = this.panelWrap?.nativeElement;
    if (el) el.style.transition = 'none';
  }

  onDragMove(e: TouchEvent): void {
    if (!this.isDragging) return;
    const dy = e.touches[0].clientY - this.dragStartY;
    const newH = Math.min(Math.max(this.dragBaseHeight - dy, PANEL_MIN_H), this.expandedHeight());
    this.applyPanelHeight(newH, false);
    this.mapComp?.updateSize();
  }

  onDragEnd(_e: TouchEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    const currentH = this.panelWrap?.nativeElement.offsetHeight ?? this.expandedHeight();
    if (currentH < (this.expandedHeight() + PANEL_MIN_H) / 2) {
      this.minimizePanel();
    } else {
      this.expandPanel();
    }
  }

  expandPanel(): void {
    this.panelMinimized = false;
    this.applyPanelHeight(this.expandedHeight());
    setTimeout(() => { this.mapComp?.updateSize(); this.mapComp?.refitRoute(); }, 300);
  }

  minimizePanel(): void {
    this.panelMinimized = true;
    this.applyPanelHeight(PANEL_MIN_H);
    setTimeout(() => { this.mapComp?.updateSize(); this.mapComp?.refitRoute(); }, 300);
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private expandedHeight(): number {
    return Math.round(window.innerHeight * PANEL_EXPANDED_VH);
  }

  private applyPanelHeight(h: number, animated = true): void {
    const el = this.panelWrap?.nativeElement;
    if (!el) return;
    if (window.innerWidth > 768) {
      el.style.transition = '';
      el.style.height = '';
      return;
    }
    el.style.transition = animated ? 'height 0.28s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
    el.style.height = `${h}px`;
  }
}
