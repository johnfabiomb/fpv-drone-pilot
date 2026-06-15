import { Component, OnInit, inject, effect } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { WorkingHoursService } from '@booking/core/services/working-hours.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { ToastHostComponent } from '@booking/ui/toast/toast-host.component';

@Component({
  selector: 'app-platform-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastHostComponent],
  providers: [BookingDataService],
  templateUrl: './platform-shell.component.html',
  styleUrl: './platform-shell.component.scss',
})
export class PlatformShellComponent implements OnInit {
  readonly auth = inject(BookingsAuthService);
  readonly data = inject(BookingDataService);
  private readonly workingHours = inject(WorkingHoursService);
  private readonly router = inject(Router);

  constructor() {
    // Redirect to login when auth resolves to a non-admin state.
    effect(() => {
      const s = this.auth.state();
      if (s !== 'loading' && s !== 'admin') {
        this.router.navigate(['/bookings', 'login'], { replaceUrl: true });
      }
    });
  }

  ngOnInit(): void {
    // Wait for getSession() to complete so the JWT is confirmed fresh before
    // any DB query runs — prevents the token-refresh race that hangs queries.
    this.auth.initialize().then(() => {
      if (this.auth.state() === 'admin') {
        Promise.all([this.data.load(), this.workingHours.load()]);
      }
    });
  }
}
