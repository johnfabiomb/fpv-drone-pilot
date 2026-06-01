import { Component } from '@angular/core';

const BENEFITS: { icon: string; text: string }[] = [
  { icon: '⭐', text: 'Level up and get benefits — unlock more as you explore Malta' },
  { icon: '🧭', text: "Don't explore alone — meet people who love Malta as much as you" },
  { icon: '🔖', text: 'Save your favourite spots and revisit them anytime' },
  { icon: '🎟️', text: 'Get real discounts from local partners I trust' },
  { icon: '⚡', text: 'Open Google Maps instantly — no wait' },
  { icon: '📶', text: 'Browse the map offline, even without signal' },
  { icon: '🔔', text: 'Get notified when I add new spots to the map' },
];

@Component({
  selector: 'app-benefits-list',
  standalone: true,
  template: `
    <ul class="benefits-list">
      @for (b of benefits; track b.icon) {
        <li>
          <span class="benefits-list__icon">{{ b.icon }}</span>
          <span>{{ b.text }}</span>
        </li>
      }
    </ul>
  `,
  styles: [`
    .benefits-list {
      list-style: none;
      margin: 0 0 20px;
      padding: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .benefits-list li {
      display: flex;
      align-items: center;
      gap: 12px;
      text-align: left;
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text-secondary);
      background: var(--color-bg-muted);
      border-radius: var(--radius-lg);
      padding: 10px 14px;
    }

    .benefits-list__icon {
      font-size: 18px;
      flex-shrink: 0;
      line-height: 1;
    }
  `],
})
export class BenefitsListComponent {
  readonly benefits = BENEFITS;
}
