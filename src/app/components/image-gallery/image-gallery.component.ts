import { Component, Input, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

const AUTO_MS = 2500;
const RESUME_MS = 5000;

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss'
})
export class ImageGalleryComponent implements OnDestroy {
  @Input() set src(value: string[]) {
    this.images = value ?? [];
    this.active = 0;
    this.loadedImgs.clear();
    this.restartAuto();
  }

  images: string[] = [];
  active = 0;
  loadedImgs = new Set<string>();

  markLoaded(img: string): void { this.loadedImgs.add(img); }
  isLoaded(img: string): boolean { return this.loadedImgs.has(img); }

  private autoTimer: ReturnType<typeof setInterval> | null = null;
  private resumeTimer: ReturnType<typeof setTimeout> | null = null;
  private touchStartX = 0;

  // ── Auto-play ─────────────────────────────────────────────

  private restartAuto(): void {
    this.clearTimers();
    if (this.images.length > 1) {
      this.autoTimer = setInterval(() => {
        this.active = (this.active + 1) % this.images.length;
      }, AUTO_MS);
    }
  }

  // Pause immediately; resume AUTO_MS after last user interaction
  private pauseAndResume(): void {
    this.clearTimers();
    this.resumeTimer = setTimeout(() => this.restartAuto(), RESUME_MS);
  }

  private clearTimers(): void {
    if (this.autoTimer)  { clearInterval(this.autoTimer);  this.autoTimer  = null; }
    if (this.resumeTimer){ clearTimeout(this.resumeTimer); this.resumeTimer = null; }
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  // ── Navigation (user-triggered — pause then resume) ───────

  next(): void {
    if (!this.canNavigate) return;
    this.active = (this.active + 1) % this.images.length;
    this.pauseAndResume();
  }

  prev(): void {
    if (!this.canNavigate) return;
    this.active = (this.active - 1 + this.images.length) % this.images.length;
    this.pauseAndResume();
  }

  goTo(index: number): void {
    if (index === this.active) {
      this.openLightbox(index);
      return;
    }
    if (!this.canNavigate) return;
    this.active = index;
    this.pauseAndResume();
  }

  // ── Lightbox ──────────────────────────────────────────────

  lightboxOpen = false;
  lightboxIndex = 0;
  lightboxScale = 1;
  private lbTouchStartX = 0;
  private lbLastTap = 0;

  openLightbox(index: number): void {
    this.lightboxOpen = true;
    this.lightboxIndex = index;
    this.lightboxScale = 1;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    this.lightboxScale = 1;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.lightboxOpen) this.closeLightbox();
  }

  zoomIn(): void {
    this.lightboxScale = Math.min(+(this.lightboxScale * 1.5).toFixed(2), 4);
  }

  zoomOut(): void {
    this.lightboxScale = Math.max(+(this.lightboxScale / 1.5).toFixed(2), 1);
  }

  lightboxPrev(): void {
    this.lightboxIndex = (this.lightboxIndex - 1 + this.images.length) % this.images.length;
    this.lightboxScale = 1;
  }

  lightboxNext(): void {
    this.lightboxIndex = (this.lightboxIndex + 1) % this.images.length;
    this.lightboxScale = 1;
  }

  onLightboxTouchStart(e: TouchEvent): void {
    this.lbTouchStartX = e.touches[0].clientX;
  }

  onLightboxTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.lbTouchStartX;
    const now = Date.now();
    if (Math.abs(dx) < 10) {
      if (now - this.lbLastTap < 300) {
        this.lightboxScale = this.lightboxScale > 1 ? 1 : 2;
        this.lbLastTap = 0;
        return;
      }
      this.lbLastTap = now;
    } else if (this.lightboxScale === 1 && Math.abs(dx) > 40) {
      dx < 0 ? this.lightboxNext() : this.lightboxPrev();
    }
  }

  // ── Touch ─────────────────────────────────────────────────

  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
    this.clearTimers(); // stop immediately while finger is down
  }

  onTouchEnd(e: TouchEvent): void {
    const delta = e.changedTouches[0].clientX - this.touchStartX;
    if (this.canNavigate && Math.abs(delta) > 40) {
      delta < 0 ? this.next() : this.prev(); // next/prev handle pauseAndResume
    } else {
      this.pauseAndResume(); // no swipe — just schedule resume
    }
  }

  // ── Helpers ───────────────────────────────────────────────

  get stackImages(): string[] {
    return this.images.length === 1
      ? [this.images[0], this.images[0], this.images[0]]
      : this.images;
  }

  get canNavigate(): boolean {
    return this.images.length > 1;
  }

  circularOffset(index: number): number {
    const n = this.stackImages.length;
    let d = index - this.active;
    if (d > Math.floor(n / 2)) d -= n;
    if (d < -Math.floor(n / 2)) d += n;
    return d;
  }
}
