import { signal } from '@angular/core';

export const PANEL_MIN_H = 80;
export const PANEL_EXPANDED_VH = 0.62;

export interface MapCompRef {
  updateSize?(): void;
  refitRoute?(): void;
}

/**
 * Encapsulates the drag-to-resize logic shared by every map+panel page.
 * Instantiate in the component, wire touch outputs from panel-shell, and
 * call expand() / minimize() for programmatic control.
 *
 * Usage:
 *   panel = new PanelResize(() => this.panelWrap?.nativeElement, () => this.mapComp);
 */
export class PanelResize {
  readonly minimized = signal(false);

  private isDragging = false;
  private dragStartY = 0;
  private dragBaseHeight = 0;
  private animationTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly getEl: () => HTMLDivElement | undefined,
    private readonly getMapComp: () => MapCompRef | undefined,
    private readonly platformId: object,
    private readonly minHeight = PANEL_MIN_H,
    private readonly expandedVh = PANEL_EXPANDED_VH,
  ) {}

  onDragStart(e: TouchEvent): void {
    if (!this.isMobile()) return;
    this.isDragging = true;
    this.dragStartY = e.touches[0].clientY;
    this.dragBaseHeight = this.getEl()?.offsetHeight ?? this.expandedHeight();
    const el = this.getEl();
    if (el) el.style.transition = 'none';
  }

  onDragMove(e: TouchEvent): void {
    if (!this.isDragging) return;
    const dy = e.touches[0].clientY - this.dragStartY;
    const newH = Math.min(Math.max(this.dragBaseHeight - dy, this.minHeight), this.expandedHeight());
    this.applyHeight(newH, false);
    this.getMapComp()?.updateSize?.();
  }

  onDragEnd(_e: TouchEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    const currentH = this.getEl()?.offsetHeight ?? this.expandedHeight();
    if (currentH < (this.expandedHeight() + this.minHeight) / 2) {
      this.minimize();
    } else {
      this.expand();
    }
  }

  expand(): void {
    this.minimized.set(false);
    this.applyHeight(this.expandedHeight());
    this.scheduleMapUpdate();
  }

  minimize(): void {
    this.minimized.set(true);
    this.applyHeight(this.minHeight);
    this.scheduleMapUpdate();
  }

  resetHeight(): void {
    const el = this.getEl();
    if (!el) return;
    el.style.transition = '';
    el.style.height = '';
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

  private expandedHeight(): number {
    return Math.round(window.innerHeight * this.expandedVh);
  }

  private isMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth <= 768;
  }

  destroy(): void {
    clearTimeout(this.animationTimer);
  }
}
