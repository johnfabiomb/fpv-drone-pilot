import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  amount: number | null = null;

  constructor(private route: ActivatedRoute, private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage('pay');
    this.amount = this.parseAmount(this.route.snapshot.queryParamMap.get('amount'));
  }

  get formattedAmount(): string {
    if (this.amount === null) return '';
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(this.amount);
  }

  private parseAmount(raw: string | null): number | null {
    if (!raw) return null;
    const value = parseFloat(raw.replace(',', '.'));
    if (isNaN(value) || value < 0.5 || value > 999999) return null;
    return Math.round(value * 100) / 100;
  }
}
