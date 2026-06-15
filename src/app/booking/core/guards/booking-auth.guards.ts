import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';

// Non-blocking: if state is already resolved, redirect immediately.
// If still loading, allow through — PlatformShellComponent shows a spinner
// and redirects via effect() once auth resolves.
export const adminGuard: CanActivateFn = () => {
  const auth = inject(BookingsAuthService);
  const router = inject(Router);
  auth.initialize();
  const s = auth.state();
  if (s === 'loading') return true;
  return s === 'admin' ? true : router.createUrlTree(['/bookings', 'login']);
};

// Non-blocking: only redirect if already confirmed admin.
// LoginComponent calls initialize() and redirects via effect() if needed.
export const loginGuard: CanActivateFn = () => {
  const auth = inject(BookingsAuthService);
  const router = inject(Router);
  auth.initialize();
  if (auth.state() === 'admin') return router.createUrlTree(['/bookings', 'list']);
  return true;
};
