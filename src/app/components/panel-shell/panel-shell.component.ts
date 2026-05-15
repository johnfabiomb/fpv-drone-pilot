import { afterNextRender, Component, DestroyRef, ElementRef, Injector, Input, Output, EventEmitter, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-panel-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-shell.component.html',
  styleUrl: './panel-shell.component.scss',
})
export class PanelShellComponent {
  @Input() title = '';
  @Input() minimized = false;

  @Output() closeRequested = new EventEmitter<void>();
  @Output() dragStart = new EventEmitter<TouchEvent>();
  @Output() dragMove = new EventEmitter<TouchEvent>();
  @Output() dragEnd = new EventEmitter<TouchEvent>();
  @Output() toggleCollapse = new EventEmitter<void>();

  @ViewChild('panelBody') private panelBody!: ElementRef<HTMLDivElement>;

  private scrollCache = new Map<string, number>();
  private isPopstate = false;
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationStart), takeUntilDestroyed(this.destroyRef))
      .subscribe((e: any) => {
        this.isPopstate = e.navigationTrigger === 'popstate';
        this.scrollCache.set(this.router.url, this.panelBody?.nativeElement?.scrollTop ?? 0);
      });

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        // Wait until *ngIf content has finished rendering before scrolling
        afterNextRender(() => {
          const target = this.isPopstate ? (this.scrollCache.get(this.router.url) ?? 0) : 0;
          this.panelBody?.nativeElement?.scrollTo({ top: target, behavior: 'instant' });
        }, { injector: this.injector });
      });
  }
}
