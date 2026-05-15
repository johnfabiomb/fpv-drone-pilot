import { Component, ElementRef, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { PanelShellComponent } from '../../components/panel-shell/panel-shell.component';
import { ProviderCardComponent } from '../../components/provider-card/provider-card.component';
import { ProviderDetailComponent } from '../../components/provider-panel/provider-panel.component';
import { NavInterstitialComponent } from '../../components/nav-interstitial/nav-interstitial.component';
import { ShareButtonComponent } from '../../components/share-button/share-button.component';
import { SeoService } from '../../shared/services/seo.service';
import { providers } from '../../../assets/providers.json';

const PANEL_MIN_H = 80;
const PANEL_EXPANDED_VH = 0.62;

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [CommonModule, ComponentsModule, PanelShellComponent, ProviderCardComponent, ProviderDetailComponent, NavInterstitialComponent, ShareButtonComponent],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss',
})
export class CouponsComponent implements OnInit {
  readonly allProviders = [...providers];
  readonly mapProviders = (providers as any[]).filter(p => p.showOnMap && p.lat && p.lon);

  selectedProvider: any = null;
  panelMinimized = false;
  mapOnly = false;
  pendingNavUrl: string | null = null;

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private isDragging = false;
  private dragStartY = 0;
  private dragBaseHeight = 0;

  @ViewChild('mapComp') mapComp: any;
  @ViewChild('panelWrap') panelWrap!: ElementRef<HTMLDivElement>;

  constructor(private router: Router, private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage('deals');
  }

  get currentShareUrl(): string {
    if (!this.selectedProvider) return '';
    const origin = isPlatformBrowser(this.platformId) ? this.document.location.origin : 'https://johnfabiomb.com';
    return `${origin}/malta?provider=${this.selectedProvider.id}`;
  }

  get panelTitle(): string {
    return this.selectedProvider ? this.selectedProvider.name : 'Exclusive Deals';
  }

  openProvider(provider: any): void {
    this.selectedProvider = provider;
    this.mapOnly = false;
    this.panelMinimized = false;
    setTimeout(() => {
      this.panelWrap?.nativeElement?.scrollTo({ top: 0 });
      this.applyPanelHeight(this.expandedHeight());
      this.mapComp?.updateSize?.();
    });
  }

  onProviderPinSelected(provider: any): void {
    this.openProvider(provider);
  }

  onPanelCloseRequested(): void {
    if (this.selectedProvider) {
      this.selectedProvider = null;
    } else {
      this.mapOnly = true;
    }
  }

  onLocationSelected(location: any): void {
    if (location) {
      this.router.navigate(['/malta'], { queryParams: { locationId: location.id } });
    }
  }

  onNavRequested(url: string): void {
    this.pendingNavUrl = url;
  }

  goBack(): void {
    this.router.navigate(['/malta']);
  }

  onMapTapped(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.innerWidth > 768 || this.mapOnly) return;
    this.minimizePanel();
  }

  // ── Drag handlers ──────────────────────────────────────────────────────────

  onDragStart(e: TouchEvent): void {
    if (!isPlatformBrowser(this.platformId) || window.innerWidth > 768) return;
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
    this.mapComp?.updateSize?.();
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
    setTimeout(() => this.mapComp?.updateSize?.(), 300);
  }

  minimizePanel(): void {
    this.panelMinimized = true;
    this.applyPanelHeight(PANEL_MIN_H);
    setTimeout(() => this.mapComp?.updateSize?.(), 300);
  }

  private expandedHeight(): number {
    if (!isPlatformBrowser(this.platformId)) return 400;
    return Math.round(window.innerHeight * PANEL_EXPANDED_VH);
  }

  private applyPanelHeight(h: number, animated = true): void {
    const el = this.panelWrap?.nativeElement;
    if (!el) return;
    if (!isPlatformBrowser(this.platformId) || window.innerWidth > 768) {
      el.style.transition = '';
      el.style.height = '';
      return;
    }
    el.style.transition = animated ? 'height 0.28s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
    el.style.height = `${h}px`;
  }
}
