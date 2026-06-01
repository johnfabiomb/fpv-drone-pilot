import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Provider } from '@core/models';
import { resolveProviderColor } from '@core/utils/provider.utils';

@Component({
  selector: 'app-provider-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="avatar" [style.width.px]="size" [style.height.px]="size">
      <ng-container *ngIf="provider.coverImage; else emojiOnly">
        <img class="avatar__img" [src]="provider.coverImage" [alt]="provider.name"
             [style.borderColor]="provider.pinBorderColor ?? '#fff'">
        <span class="avatar__badge"
              [style.width.px]="badgeSize" [style.height.px]="badgeSize"
              [style.fontSize.px]="badgeFont">
          {{ provider.emoji }}
        </span>
      </ng-container>
      <ng-template #emojiOnly>
        <span class="avatar__emoji" [style.fontSize.px]="emojiFont">{{ provider.emoji }}</span>
      </ng-template>
    </div>
  `,
  styles: [`
    :host { display: contents; }

    .avatar {
      position: relative;
      flex-shrink: 0;
    }

    .avatar__img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 2.5px solid;
      display: block;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    }

    .avatar__badge {
      position: absolute;
      bottom: -3px;
      right: -3px;
      background: var(--color-bg);
      border-radius: 50%;
      box-shadow: 0 1px 4px rgba(0,0,0,0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }

    .avatar__emoji {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      line-height: 1;
    }
  `],
})
export class ProviderAvatarComponent {
  @Input() provider!: Provider;
  @Input() size = 68;

  get accentColor(): string { return resolveProviderColor(this.provider); }
  get badgeSize(): number   { return Math.round(this.size * 0.38); }
  get badgeFont(): number   { return Math.round(this.size * 0.22); }
  get emojiFont(): number   { return Math.round(this.size * 0.60); }
}
