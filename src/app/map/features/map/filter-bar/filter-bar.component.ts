import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FILTER_OPTIONS, FilterOption } from '@map/core/utils/location-filter.util';
import { FEATURES } from '../../../feature-flags';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent {
  @Output() filterChange = new EventEmitter<string[]>();

  activeFilter: string | null = null;

  readonly filters: FilterOption[] = FEATURES.PROMOTIONS
    ? FILTER_OPTIONS
    : FILTER_OPTIONS.filter(f => f.id !== 'deals');

  get isAll(): boolean { return this.activeFilter === null; }
  isActive(id: string): boolean { return this.activeFilter === id; }

  selectAll(): void {
    this.activeFilter = null;
    this.filterChange.emit([]);
  }

  toggle(id: string): void {
    this.activeFilter = this.activeFilter === id ? null : id;
    this.filterChange.emit(this.activeFilter ? [this.activeFilter] : []);
  }
}
