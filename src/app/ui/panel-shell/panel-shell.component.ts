import { AfterViewInit, afterNextRender, Component, DestroyRef, ElementRef, Injector, Input, Output, EventEmitter, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-panel-shell',
  standalone: true,
  imports: [],
  templateUrl: './panel-shell.component.html',
  styleUrl: './panel-shell.component.scss',
})
export class PanelShellComponent implements AfterViewInit {
  @Input() title = '';

  @Output() closeRequested = new EventEmitter<void>();
  @Output() dragStart      = new EventEmitter<TouchEvent>();
  @Output() dragMove       = new EventEmitter<TouchEvent>();
  @Output() dragEnd        = new EventEmitter<TouchEvent>();

  /** Fired only when user pulls down on content that is already scrolled to the top. */
  @Output() bodyDragStart = new EventEmitter<number>();
  @Output() bodyDragMove  = new EventEmitter<TouchEvent>();
  @Output() bodyDragEnd   = new EventEmitter<TouchEvent>();

  @ViewChild('panelBody') private panelBody!: ElementRef<HTMLDivElement>;

  private readonly scrollCache = new Map<string, number>();
  private isPopstate = false;
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);
  readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationStart), takeUntilDestroyed(this.destroyRef))
      .subscribe((e: NavigationStart) => {
        this.isPopstate = e.navigationTrigger === 'popstate';
        this.scrollCache.set(this.router.url, this.panelBody?.nativeElement?.scrollTop ?? 0);
      });

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        afterNextRender(() => {
          const target = this.isPopstate ? (this.scrollCache.get(this.router.url) ?? 0) : 0;
          this.panelBody?.nativeElement?.scrollTo({ top: target, behavior: 'instant' });
        }, { injector: this.injector });
      });
  }

  ngAfterViewInit(): void {
    const body = this.panelBody.nativeElement;
    let touchStartY = 0;
    let isIntercepting = false;

    const onStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      isIntercepting = false;
    };

    const onMove = (e: TouchEvent) => {
      const dy = e.touches[0].clientY - touchStartY;

      // Only intercept a downward pull when the content is already at the top.
      // Upward swipes are always native scroll.
      if (dy > 0 && body.scrollTop <= 0) {
        e.preventDefault();
        if (!isIntercepting) {
          isIntercepting = true;
          this.bodyDragStart.emit(e.touches[0].clientY);
        }
        this.bodyDragMove.emit(e);
      }
    };

    const onEnd = (e: TouchEvent) => {
      if (isIntercepting) {
        isIntercepting = false;
        this.bodyDragEnd.emit(e);
      }
    };

    body.addEventListener('touchstart', onStart, { passive: true });
    body.addEventListener('touchmove', onMove, { passive: false });
    body.addEventListener('touchend', onEnd, { passive: true });

    this.destroyRef.onDestroy(() => {
      body.removeEventListener('touchstart', onStart);
      body.removeEventListener('touchmove', onMove);
      body.removeEventListener('touchend', onEnd);
    });
  }
}
