import { Routes } from '@angular/router';
import { adminGuard, loginGuard } from '@booking/core/guards/booking-auth.guards';

export const bookingRoutes: Routes = [
  // ── Public (no auth) ──────────────────────────────────────────────
  {
    path: 'book',
    loadComponent: () => import('@booking/public/service-picker/service-picker.component').then(m => m.ServicePickerComponent),
  },
  {
    // literals must precede 'book/:token' so they aren't captured as a token
    path: 'book/calendar',
    loadComponent: () => import('@booking/public/booking-calendar/booking-calendar.component').then(m => m.BookingCalendarComponent),
  },
  {
    path: 'book/checkout',
    loadComponent: () => import('@booking/public/booking-checkout/booking-checkout.component').then(m => m.BookingCheckoutComponent),
  },
  {
    path: 'book/mine',
    loadComponent: () => import('@booking/public/my-bookings/my-bookings.component').then(m => m.MyBookingsComponent),
  },
  {
    path: 'book/:token',
    loadComponent: () => import('@booking/public/book-page/book-page.component').then(m => m.BookPageComponent),
  },
  {
    path: 'pay/success',
    loadComponent: () => import('@booking/public/payment-success/payment-success.component').then(m => m.PaymentSuccessComponent),
  },

  // ── Studio (logged-in platform) ───────────────────────────────────
  {
    path: 'bookings',
    children: [
      {
        path: 'login',
        canActivate: [loginGuard],
        loadComponent: () => import('@booking/auth/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: '',
        canActivate: [adminGuard],
        loadComponent: () => import('@booking/platform/platform-shell/platform-shell.component').then(m => m.PlatformShellComponent),
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            loadComponent: () => import('@booking/platform/dashboard/dashboard.component').then(m => m.DashboardComponent),
          },
          {
            path: 'list',
            loadComponent: () => import('@booking/platform/bookings/booking-list/booking-list.component').then(m => m.BookingListComponent),
          },
          {
            path: 'new',
            loadComponent: () => import('@booking/platform/bookings/booking-form/booking-form.component').then(m => m.BookingFormComponent),
          },
          {
            path: ':id/edit',
            loadComponent: () => import('@booking/platform/bookings/booking-form/booking-form.component').then(m => m.BookingFormComponent),
          },
          {
            path: 'clients',
            loadComponent: () => import('@booking/platform/clients/client-list/client-list.component').then(m => m.ClientListComponent),
          },
          {
            path: 'services',
            loadComponent: () => import('@booking/platform/services/services-admin.component').then(m => m.ServicesAdminComponent),
          },
          {
            path: 'staff',
            loadComponent: () => import('@booking/platform/staff/staff-admin.component').then(m => m.StaffAdminComponent),
          },
          {
            path: 'settings',
            loadComponent: () => import('@booking/platform/settings/settings-admin.component').then(m => m.SettingsAdminComponent),
          },
          {
            path: 'work',
            loadComponent: () => import('@booking/platform/work/work-board.component').then(m => m.WorkBoardComponent),
          },
          {
            // Keep LAST: ':id' matches a single segment, so it must come after all
            // the literal routes above (list/new/clients/…) to avoid shadowing them.
            path: ':id',
            loadComponent: () => import('@booking/platform/bookings/booking-detail/booking-detail.component').then(m => m.BookingDetailComponent),
          },
        ],
      },
    ],
  },
];
