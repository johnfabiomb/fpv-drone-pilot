import { Component, OnInit, computed, inject, effect, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';
import { ToastHostComponent } from '@booking/ui/toast/toast-host.component';
import { ConfirmHostComponent } from '@booking/ui/confirm/confirm-host.component';

@Component({
  selector: 'app-platform-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastHostComponent, ConfirmHostComponent],
  providers: [BookingDataService],
  templateUrl: './platform-shell.component.html',
  styleUrl: './platform-shell.component.scss',
})
export class PlatformShellComponent implements OnInit {
  readonly auth = inject(BookingsAuthService);
  readonly data = inject(BookingDataService);
  private readonly router = inject(Router);

  /** Mobile drawer open/closed. */
  readonly menuOpen = signal(false);

  /** The currently-active org (shown as the sidebar link to /organizations). */
  readonly activeOrg = computed(() =>
    this.auth.orgs().find(o => o.id === this.auth.orgId()) ?? null);

  constructor() {
    // Close the mobile drawer whenever a navigation completes.
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => this.menuOpen.set(false));

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
        this.data.load();
      }
    });
  }
}
