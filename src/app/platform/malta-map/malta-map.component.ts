import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { LocationPanelComponent } from '../../components/location-panel/location-panel.component';
import { MapComponent } from '../../components/map/map.component';

const PANEL_MIN_H = 80;          // minimized: drag handle + header visible
const PANEL_EXPANDED_VH = 0.60;  // expanded: 60% of viewport height

@Component({
  selector: 'app-malta-map',
  standalone: true,
  imports: [CommonModule, ComponentsModule, LocationPanelComponent],
  templateUrl: './malta-map.component.html',
  styleUrl: './malta-map.component.scss'
})
export class MaltaMapComponent implements OnInit {
  map = true;
  selectedLocation: any = null;
  mapOnly = false;
  isOnline = navigator.onLine;
  panelMinimized = false;
  userLat: number | null = null;
  userLon: number | null = null;
  activeFilters: string[] = [];

  @ViewChild(MapComponent) mapComp!: MapComponent;
  @ViewChild(LocationPanelComponent) panelComp!: LocationPanelComponent;
  @ViewChild('panelWrap') panelWrap!: ElementRef<HTMLDivElement>;

  private isDragging = false;
  private dragStartY = 0;
  private dragBaseHeight = 0;

  ngOnInit(): void {}

  @HostListener('window:online')
  onOnline() { this.isOnline = true; }

  @HostListener('window:offline')
  onOffline() { this.isOnline = false; }

  onLocationSelected(location: any | null): void {
    this.selectedLocation = location;
    if (!location) {
      this.mapOnly = false;
      this.panelMinimized = false;
    } else {
      this.panelMinimized = false;
      setTimeout(() => {
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
    if (!this.selectedLocation || this.mapOnly) return;
    this.minimizePanel();
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

  // ── Drag handlers ─────────────────────────────────────────

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
    const dy = e.touches[0].clientY - this.dragStartY; // positive = drag down
    const newH = Math.min(Math.max(this.dragBaseHeight - dy, PANEL_MIN_H), this.expandedHeight());
    this.applyPanelHeight(newH, false);
    this.mapComp?.updateSize();
  }

  onDragEnd(_e: TouchEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    const currentH = this.panelWrap?.nativeElement.offsetHeight ?? this.expandedHeight();
    const mid = (this.expandedHeight() + PANEL_MIN_H) / 2;
    if (currentH < mid) {
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

  // ── Helpers ───────────────────────────────────────────────

  private expandedHeight(): number {
    return Math.round(window.innerHeight * PANEL_EXPANDED_VH);
  }

  private applyPanelHeight(h: number, animated = true): void {
    const el = this.panelWrap?.nativeElement;
    if (!el) return;
    if (window.innerWidth > 768) {
      // Desktop: let CSS height: 100% take over — clear any inline override
      el.style.transition = '';
      el.style.height = '';
      return;
    }
    el.style.transition = animated ? 'height 0.28s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
    el.style.height = `${h}px`;
  }
}
