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
        path: 'privacy',
        loadComponent: () => import('./platform/privacy/privacy.component').then(mod => mod.PrivacyComponent)
    },
    {
        path: 'cookies',
        loadComponent: () => import('./platform/cookies/cookies.component').then(mod => mod.CookiesComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('./platform/about/about.component').then(mod => mod.AboutComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('./platform/contact/contact.component').then(mod => mod.ContactComponent)
    },
    {
        path: 'malta',
        children: [
            {
                // Shell owns the persistent map — '' matches /malta, /malta/list, /malta/deals
                path: '',
                loadComponent: () => import('./platform/map-shell/map-shell.component').then(m => m.MapShellComponent),
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        loadComponent: () => import('./platform/map-explore/map-explore.component').then(mod => mod.MapExploreComponent)
                    },
                    {
                        path: 'list',
                        loadComponent: () => import('./platform/location-list/location-list.component').then(m => m.LocationListComponent)
                    },
                    {
                        path: 'deals',
                        loadComponent: () => import('./platform/deals/deals.component').then(m => m.DealsComponent)
                    },
                    {
                        path: 'providers/:id',
                        loadComponent: () => import('./platform/provider-page/provider-page.component').then(m => m.ProviderPageComponent)
                    },
                    {
                        path: 'locations/:slug',
                        loadComponent: () => import('./platform/location-page/location-page.component').then(m => m.LocationPageComponent)
                    },
                    {
                        path: 'saved',
                        loadComponent: () => import('./platform/saved-places/saved-places.component').then(m => m.SavedPlacesComponent)
                    },
                ]
            },
            // Non-map routes are direct siblings — NOT inside the shell
            {
                path: '30-places-2026',
                loadComponent: () => import('./platform/top-places/top-places.component').then(m => m.TopPlacesComponent)
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
