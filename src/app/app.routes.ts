import { Routes } from '@angular/router';
import { bookingRoutes } from './booking/booking.routes';

export const routes: Routes = [
    ...bookingRoutes,
    // Map routes are loaded lazily so the map Supabase client (and the full
    // AuthService / UserDataService chain) is never initialised on booking pages.
    {
        path: '',
        loadChildren: () => import('./map/map.routes').then(m => m.mapRoutes),
    },
];
