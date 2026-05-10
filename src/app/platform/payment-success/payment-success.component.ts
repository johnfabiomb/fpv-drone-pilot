import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string | null = null;
  paidAt = new Date();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');
  }
}
