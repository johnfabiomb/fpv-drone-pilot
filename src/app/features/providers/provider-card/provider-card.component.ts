import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Provider } from '@core/models';
import { ProviderAvatarComponent } from '@features/providers/provider-avatar/provider-avatar.component';
import { resolveProviderColor } from '@core/utils/provider.utils';

@Component({
  selector: 'app-provider-card',
  standalone: true,
  imports: [CommonModule, ProviderAvatarComponent],
  templateUrl: './provider-card.component.html',
  styleUrl: './provider-card.component.scss',
})
export class ProviderCardComponent {
  @Input() provider!: Provider;
  @Output() selected = new EventEmitter<Provider>();

  get accentColor(): string { return resolveProviderColor(this.provider); }

  get discountPct(): string {
    const m = this.provider?.discount?.label?.match(/\d+%/);
    return m ? m[0] : '';
  }

  get discountWhat(): string {
    return this.provider?.discount?.label?.replace(/^\d+%\s*off\s*/i, '') ?? this.provider?.discount?.label ?? '';
  }
}
