import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss'
})
export class ImageGalleryComponent {
  @Input() set src(value: string[]) {
    this.images = value ?? [];
    this.active = 0;
  }

  images: string[] = [];
  active = 0;

  // For single image: repeat 3× so the stacked visual still appears
  get stackImages(): string[] {
    return this.images.length === 1
      ? [this.images[0], this.images[0], this.images[0]]
      : this.images;
  }

  get canNavigate(): boolean {
    return this.images.length > 1;
  }

  next(): void {
    if (!this.canNavigate) return;
    this.active = (this.active + 1) % this.images.length;
  }

  prev(): void {
    if (!this.canNavigate) return;
    this.active = (this.active - 1 + this.images.length) % this.images.length;
  }

  goTo(index: number): void {
    if (!this.canNavigate) return;
    this.active = index;
  }

  // Circular offset relative to stackImages length
  circularOffset(index: number): number {
    const n = this.stackImages.length;
    let d = index - this.active;
    if (d > Math.floor(n / 2)) d -= n;
    if (d < -Math.floor(n / 2)) d += n;
    return d;
  }

  private touchStartX = 0;

  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent): void {
    if (!this.canNavigate) return;
    const delta = e.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(delta) > 40) {
      delta < 0 ? this.next() : this.prev();
    }
  }
}
