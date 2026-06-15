import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BookingDataService } from '@booking/core/services/booking-data.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent {
  readonly data = inject(BookingDataService);
}
