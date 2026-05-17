import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Provider } from '../../shared/models';

@Component({
  selector: 'app-provider-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provider-card.component.html',
  styleUrl: './provider-card.component.scss',
})
export class ProviderCardComponent {
  @Input() provider!: Provider;
  @Output() selected = new EventEmitter<Provider>();

  get accentColor(): string {
    const map: Record<string, string> = {
      'water-sports': '#0ea5e9',
      'tour':         '#8b5cf6',
      'hotel':        '#f59e0b',
      'restaurant':   '#ef4444',
      'experience':   '#10b981',
    };
    return map[this.provider?.category] ?? '#F4A922';
  }

  get discountPct(): string {
    const m = this.provider?.discount?.label?.match(/\d+%/);
    return m ? m[0] : '';
  }

  get discountWhat(): string {
    return this.provider?.discount?.label?.replace(/^\d+%\s*off\s*/i, '') ?? this.provider?.discount?.label ?? '';
  }
}
