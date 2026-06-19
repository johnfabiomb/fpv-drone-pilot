import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

export interface InvoiceData {
  ref: string;
  title: string;
  description: string | null;
  location: string | null;
  startAt: string;
  endAt: string;
  priceTotal: number;
  priceExpenses: number;
  amountPaid: number;
  balanceDue: number;
  paymentType: 'deposit' | 'full';
  paidAt: Date | null;
}

@Component({
  selector: 'app-booking-invoice',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './booking-invoice.component.html',
  styleUrl: './booking-invoice.component.scss',
})
export class BookingInvoiceComponent {
  @Input() invoice: InvoiceData | null = null;
  @Input() backLink: string | null = '/malta';
  @Input() backLabel = '← Back to explore';

  get typeLabel(): string {
    return this.invoice?.paymentType === 'deposit' ? 'Deposit (30%)' : 'Full payment';
  }
}
