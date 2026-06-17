import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience, Provider } from '@map/core/models';
import { experienceColor, experienceIcon, resolveExperienceDiscount } from '@map/core/utils/experience.utils';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.scss',
})
export class ExperienceCardComponent {
  @Input() experience!: Experience;
  @Input() provider!: Provider;
  @Output() selected = new EventEmitter<Experience>();

  get accentColor(): string { return experienceColor(this.provider); }
  get icon(): string { return experienceIcon(this.experience); }

  private get discountLabel(): string {
    return resolveExperienceDiscount(this.experience, this.provider)?.label ?? '';
  }

  get discountPct(): string {
    return this.discountLabel.match(/\d+%/)?.[0] ?? '';
  }

  get discountWhat(): string {
    return this.discountLabel.replace(/^\d+%\s*off\s*/i, '') || this.discountLabel;
  }
}
