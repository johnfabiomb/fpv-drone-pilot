import { Component, Input, OnDestroy } from '@angular/core';
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
    if (!this.canNavigate) return;
    this.active = index;
    this.pauseAndResume();
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
