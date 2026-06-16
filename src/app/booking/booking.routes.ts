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
    // Printable invoice. ?token=… serves anon pay-link customers (get_invoice_by_token);
    // the /:id form below serves admins + the booking's own client (get_invoice).
    // Both precede 'book/:token' so 'invoice' isn't captured as a token.
    path: 'book/invoice',
    loadComponent: () => import('@booking/public/invoice/invoice.component').then(m => m.InvoiceComponent),
  },
  {
    path: 'book/invoice/:id',
    loadComponent: () => import('@booking/public/invoice/invoice.component').then(m => m.InvoiceComponent),
  },
  {
    path: 'book/:token',
    loadComponent: () => import('@booking/public/book-page/book-page.component').then(m => m.BookPageComponent),
  },
  {
    path: 'pay/success',
    loadComponent: () => import('@booking/public/payment-success/payment-success.component').then(m => m.PaymentSuccessComponent),
  },

  // ── Per-org public booking (slug-driven) ──────────────────────────
  // `:org/book*` — the `book` second segment can't collide with the map app
  // (no map route has `/book` as its 2nd segment). The default `/book` above
  // stays for the primary org.
  {
    path: ':org/book',
    loadComponent: () => import('@booking/public/service-picker/service-picker.component').then(m => m.ServicePickerComponent),
  },
  {
    path: ':org/book/calendar',
    loadComponent: () => import('@booking/public/booking-calendar/booking-calendar.component').then(m => m.BookingCalendarComponent),
  },
  {
    path: ':org/book/checkout',
    loadComponent: () => import('@booking/public/booking-checkout/booking-checkout.component').then(m => m.BookingCheckoutComponent),
  },
  {
    path: ':org/book/mine',
    loadComponent: () => import('@booking/public/my-bookings/my-bookings.component').then(m => m.MyBookingsComponent),
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
            path: 'organizations',
            loadComponent: () => import('@booking/platform/organizations/organizations.component').then(m => m.OrganizationsComponent),
          },
          {
            path: 'invoices',
            loadComponent: () => import('@booking/platform/invoices/invoices-admin.component').then(m => m.InvoicesAdminComponent),
          },
          {
            // literal segment, so it precedes the catch-all ':id' below
            path: 'invoice-edit/:id',
            loadComponent: () => import('@booking/platform/invoices/invoice-edit.component').then(m => m.InvoiceEditComponent),
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
