import { Component, Input, Output, EventEmitter, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MaltaEvent } from '@map/core/models';
import { eventBookUrl, eventCategoryMeta, formatEventDate, nextDate } from '@map/core/utils/event.utils';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input() event!: MaltaEvent;
  /** "now" passed in so the whole list shares one clock (and SSR stays deterministic). */
  @Input() now: Date = new Date(0);
  @Output() selected = new EventEmitter<MaltaEvent>();

  private readonly platformId = inject(PLATFORM_ID);

  get meta() { return eventCategoryMeta(this.event.category); }

  get whenLabel(): string {
    const next = nextDate(this.event, this.now);
    const raw = this.event.dates.find(d => d.start === next)?.dateRaw ?? this.event.dates[0]?.dateRaw ?? '';
    return formatEventDate(next, raw);
  }

  /** "+3 more dates" hint for recurring events. */
  get extraDates(): number {
    return Math.max(0, this.event.dates.length - 1);
  }

  openTickets(e: MouseEvent): void {
    e.stopPropagation();
    if (isPlatformBrowser(this.platformId)) {
      window.open(eventBookUrl(this.event), '_blank', 'noopener');
    }
  }
}
