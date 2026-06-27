import { Routes } from '@angular/router';
import { bookingRoutes } from './booking/booking.routes';

export const routes: Routes = [
    ...bookingRoutes,
    // Personal landing page at the exact root (johnfabiomb.com/). Standalone — it must NOT
    // sit inside the map chrome, so it precedes the map module and uses pathMatch: 'full'.
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./landing/landing.component').then(m => m.LandingComponent),
    },
    // Map routes are loaded lazily so the map Supabase client (and the full
    // AuthService / UserDataService chain) is never initialised on booking pages.
    // Handles /malta, /privacy, /contact, /pay, … (everything except the bare root).
    {
        path: '',
        loadChildren: () => import('./map/map.routes').then(m => m.mapRoutes),
    },
];
