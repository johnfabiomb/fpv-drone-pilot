import { Routes } from '@angular/router';
import { FEATURES } from './feature-flags';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'malta'
    },
    {
        path: '',
        loadComponent: () => import('./platform/home/home.component').then(mod => mod.HomeComponent)
    },
    {
        path: 'malta',
        children: [
            {
                path: '',
                pathMatch: 'full',
                loadComponent: () => import('./platform/malta-map/malta-map.component').then(mod => mod.MaltaMapComponent)
            },
            {
                path: 'list',
                loadComponent: () => import('./platform/location-list/location-list.component').then(m => m.LocationListComponent)
            },
            {
                path: '30-places-2026',
                loadComponent: () => import('./platform/trend/trend.component').then(m => m.TrendComponent)
            },
            {
                path: 'plan',
                canMatch: [() => FEATURES.ROUTE_BUILDER],
                loadComponent: () => import('./platform/route-builder/route-builder.component').then(m => m.RouteBuilderComponent)
            },
        ]
    },
    {
        path: 'pay',
        loadComponent: () => import('./platform/payment/payment.component').then(m => m.PaymentComponent)
    },
    {
        path: 'pay/success',
        loadComponent: () => import('./platform/payment-success/payment-success.component').then(m => m.PaymentSuccessComponent)
    },
];
