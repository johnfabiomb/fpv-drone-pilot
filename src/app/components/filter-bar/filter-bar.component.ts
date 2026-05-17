import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

interface FilterOption {
  id: string;
  label: string;
  emoji: string;
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent {
  @Output() filterChange = new EventEmitter<string[]>();

  activeFilters = new Set<string>();

  filters: FilterOption[] = [
    { id: 'hidden',     label: 'Hidden Gems',  emoji: '💎' },
    { id: 'cave',       label: 'Caves',        emoji: '🪨' },
    { id: 'beach',      label: 'Beaches',      emoji: '🏖️' },
    { id: 'historical', label: 'Historical',   emoji: '🏛️' },
    { id: 'easy',       label: 'Easy Access',  emoji: '🚶' },
    { id: 'hard',       label: 'Hard Access',  emoji: '🥾' },
  ];

  get isAll(): boolean {
    return this.activeFilters.size === 0;
  }

  isActive(id: string): boolean {
    return this.activeFilters.has(id);
  }

  selectAll(): void {
    this.activeFilters.clear();
    this.filterChange.emit([]);
  }

  toggle(id: string): void {
    if (this.activeFilters.has(id)) {
      this.activeFilters.delete(id);
    } else {
      this.activeFilters.add(id);
    }
    this.filterChange.emit([...this.activeFilters]);
  }
}
