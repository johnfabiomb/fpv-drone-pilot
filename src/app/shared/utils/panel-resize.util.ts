import { signal } from '@angular/core';

export const PANEL_HEADER_H    = 68;   // drag-bar (15px) + header row (52px) + 1px border
export const PANEL_EXPANDED_VH = 0.62; // default resting height
export const PANEL_FULL_VH     = 0.85; // full-sheet — leaves ~15% map visible at top

/** @deprecated use PANEL_HEADER_H */
export const PANEL_MIN_H = PANEL_HEADER_H;

export interface MapCompRef {
  updateSize?(): void;
  refitRoute?(): void;
}

/**
 * Encapsulates the drag-to-resize logic shared by every map+panel page.
 * Three snap points: header-only, partial (default), full-sheet.
 * The panel can never be dismissed by dragging — only the X button does that.
 *
 * Usage:
 *   panel = new PanelResize(() => this.panelWrap?.nativeElement, () => this.mapComp);
 */
export class PanelResize {
  readonly minimized  = signal(false); // true = header-only snap
  readonly fullscreen = signal(false); // true = full-sheet snap

  private isDragging = false;
  private dragStartY = 0;
  private dragBaseHeight = 0;
  private lastMoveY = 0;
  private lastMoveTime = 0;
  private dragVelocity = 0; // px/ms — positive = finger moving down = panel shrinking
  private animationTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly getEl: () => HTMLDivElement | undefined,
    private readonly getMapComp: () => MapCompRef | undefined,
    private readonly platformId: object,
    private readonly minHeight  = PANEL_HEADER_H,
    private readonly expandedVh = PANEL_EXPANDED_VH,
    private readonly fullVh     = PANEL_FULL_VH,
  ) {}

  onDragStart(e: TouchEvent): void {
    this.startDrag(e.touches[0].clientY);
  }

  /** Used when a drag is initiated from the body (pull-down-to-collapse). */
  startDrag(startY: number): void {
    if (!this.isMobile()) return;
    this.isDragging = true;
    this.dragStartY = startY;
    this.dragBaseHeight = this.getEl()?.offsetHeight ?? this.partialHeight();
    this.lastMoveY = startY;
    this.lastMoveTime = Date.now();
    this.dragVelocity = 0;
    const el = this.getEl();
    if (el) el.style.transition = 'none';
  }

  onDragMove(e: TouchEvent): void {
    if (!this.isDragging) return;
    const now = Date.now();
    const currentY = e.touches[0].clientY;
    const dt = now - this.lastMoveTime;
    if (dt > 0 && dt < 80) {
      this.dragVelocity = (currentY - this.lastMoveY) / dt;
    }
    this.lastMoveY = currentY;
    this.lastMoveTime = now;

    const dy = currentY - this.dragStartY;
    // Clamp between header-only and full-sheet — drag can never dismiss the panel
    const newH = Math.min(Math.max(this.dragBaseHeight - dy, this.minHeight), this.fullHeight());
    this.applyHeight(newH, false);
    this.getMapComp()?.updateSize?.();
  }

  onDragEnd(_e: TouchEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    const currentH = this.getEl()?.offsetHeight ?? this.partialHeight();
    // Flick threshold: 0.4 px/ms (~400px/s). A quick flick snaps to the next
    // snap point regardless of how far the user dragged. A slow or stopped
    // drag falls back to nearest-position snapping — no resistance required.
    const FLICK = 0.4;
    let snap: number;
    if (this.dragVelocity < -FLICK) {
      snap = this.nextSnap(currentH, 'up');
    } else if (this.dragVelocity > FLICK) {
      snap = this.nextSnap(currentH, 'down');
    } else {
      snap = this.nearestSnap(currentH);
    }
    this.dragVelocity = 0;
    this.lastMoveTime = 0;

    if (snap <= this.minHeight) this.minimize();
    else if (snap >= this.fullHeight()) this.expandFull();
    else this.expand();
  }

  /** Snap to partial (default resting) height */
  expand(): void {
    this.minimized.set(false);
    this.fullscreen.set(false);
    this.applyHeight(this.partialHeight());
    this.scheduleMapUpdate();
  }

  /** Snap to full-sheet height */
  expandFull(): void {
    this.minimized.set(false);
    this.fullscreen.set(true);
    this.applyHeight(this.fullHeight());
    this.scheduleMapUpdate();
  }

  /** Snap to header-only height (minimum — panel stays visible) */
  minimize(): void {
    this.minimized.set(true);
    this.fullscreen.set(false);
    this.applyHeight(this.minHeight);
    this.scheduleMapUpdate();
  }

  resetHeight(): void {
    const el = this.getEl();
    if (!el) return;
    el.style.transition = '';
    el.style.height = '';
  }

  private nearestSnap(h: number): number {
    const snaps = [this.minHeight, this.partialHeight(), this.fullHeight()];
    return snaps.reduce((a, b) => Math.abs(b - h) < Math.abs(a - h) ? b : a);
  }

  private nextSnap(h: number, dir: 'up' | 'down'): number {
    const snaps = [this.minHeight, this.partialHeight(), this.fullHeight()];
    if (dir === 'up') return snaps.find(s => s > h + 10) ?? this.fullHeight();
    return [...snaps].reverse().find(s => s < h - 10) ?? this.minHeight;
  }

  private scheduleMapUpdate(): void {
    clearTimeout(this.animationTimer);
    this.animationTimer = setTimeout(() => {
      this.getMapComp()?.updateSize?.();
      this.getMapComp()?.refitRoute?.();
    }, 300);
  }

  private applyHeight(h: number, animated = true): void {
    const el = this.getEl();
    if (!el) return;
    if (!this.isMobile()) {
      el.style.transition = '';
      el.style.height = '';
      return;
    }
    el.style.transition = animated ? 'height 0.28s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
    el.style.height = `${h}px`;
  }

  private partialHeight(): number { return Math.round(window.innerHeight * this.expandedVh); }
  private fullHeight():    number { return Math.round(window.innerHeight * this.fullVh); }

  private isMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth <= 768;
  }

  /**
   * Blocks panel interaction for `ms` milliseconds on touch devices only.
   *
   * WHY THIS EXISTS (do not remove):
   *   iOS Safari / Instagram in-app browser fires a synthetic "ghost" click
   *   ~300ms after touchend. When a map pin tap opens the panel, that ghost
   *   click lands on whatever is now under the finger (gallery, share button,
   *   provider card, etc.) and triggers it — a single tap would open a
   *   location AND fire a random panel action.
   *
   * WHY THIS IS JS AND NOT A CSS ANIMATION:
   *   The original implementation used a CSS animation on
   *   .map-layout__panel:not(.panel--hidden) to block pointer-events for
   *   350ms. WebKit restarts CSS animations whenever inline styles change on
   *   the same element. PanelResize.applyHeight() modifies el.style.height
   *   and el.style.transition on every expand()/minimize() call (e.g. when
   *   the user switches route tabs). Each call restarted the 350ms block,
   *   making the close and back buttons unresponsive every time "All routes"
   *   was selected. A JS one-shot targeted only at enterLocationMode() avoids
   *   this entirely.
   *
   * CALL SITE: MapBridgeService.enterLocationMode() only — not expand() or
   * minimize(), which are called on route-tab switches and must never block.
   */
  blockInteractionBriefly(ms = 350): void {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: none)').matches) return;
    const el = this.getEl();
    if (!el) return;
    el.style.pointerEvents = 'none';
    setTimeout(() => { el.style.pointerEvents = ''; }, ms);
  }

  destroy(): void {
    clearTimeout(this.animationTimer);
  }
}
