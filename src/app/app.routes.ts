import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { FEATURES } from './feature-flags';
import { UserDataService } from '@core/services/user-data.service';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'malta'
    },
    {
        path: '',
        loadComponent: () => import('@pages/home/home.component').then(mod => mod.HomeComponent)
    },
    {
        path: 'privacy',
        loadComponent: () => import('@pages/privacy/privacy.component').then(mod => mod.PrivacyComponent)
    },
    {
        path: 'cookies',
        loadComponent: () => import('@pages/cookies/cookies.component').then(mod => mod.CookiesComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('@pages/about/about.component').then(mod => mod.AboutComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('@pages/contact/contact.component').then(mod => mod.ContactComponent)
    },
    {
        path: 'malta',
        children: [
            {
                // Shell owns the persistent map — '' matches /malta, /malta/list, /malta/deals
                path: '',
                loadComponent: () => import('@features/map/shell/map-shell.component').then(m => m.MapShellComponent),
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        loadComponent: () => import('@features/map/explore/map-explore.component').then(mod => mod.MapExploreComponent)
                    },
                    {
                        path: 'list',
                        loadComponent: () => import('@features/map/list/location-list.component').then(m => m.LocationListComponent)
                    },
                    {
                        path: 'deals',
                        loadComponent: () => import('@features/map/deals/deals.component').then(m => m.DealsComponent)
                    },
                    {
                        path: 'providers/:id',
                        loadComponent: () => import('@features/providers/provider-page/provider-page.component').then(m => m.ProviderPageComponent)
                    },
                    {
                        path: 'locations/:slug',
                        loadComponent: () => import('@features/locations/location-page/location-page.component').then(m => m.LocationPageComponent)
                    },
                    {
                        path: 'saved',
                        loadComponent: () => import('@features/saved-places/saved-places.component').then(m => m.SavedPlacesComponent)
                    },
                    {
                        path: 'admin',
                        canMatch: [() => inject(UserDataService).isAdmin()],
                        loadComponent: () => import('@pages/admin/admin-panel.component').then(m => m.AdminPanelComponent)
                    },
                    {
                        path: 'groups',
                        canMatch: [() => FEATURES.GROUPS],
                        loadComponent: () => import('@features/groups/groups-list/explore-together.component').then(m => m.ExploreTogetherComponent)
                    },
                    {
                        path: 'groups/:id',
                        canMatch: [() => FEATURES.GROUPS],
                        loadComponent: () => import('@features/groups/group-detail/group-detail.component').then(m => m.GroupDetailComponent)
                    },
                    {
                        path: 'notifications',
                        loadComponent: () => import('@features/notifications/notifications.component').then(m => m.NotificationsComponent)
                    },
                ]
            },
            // Non-map routes are direct siblings — NOT inside the shell
            {
                path: '30-places-2026',
                loadComponent: () => import('@pages/top-places/top-places.component').then(m => m.TopPlacesComponent)
            },
            {
                path: 'leaderboard',
                loadComponent: () => import('@features/leaderboard/leaderboard.component').then(m => m.LeaderboardComponent)
            },
            {
                path: 'plan',
                canMatch: [() => FEATURES.ROUTE_BUILDER],
                loadComponent: () => import('@features/route-builder/route-builder.component').then(m => m.RouteBuilderComponent)
            },
        ]
    },
    {
        path: 'pay',
        loadComponent: () => import('@pages/payment/payment.component').then(m => m.PaymentComponent)
    },
    {
        path: 'pay/success',
        loadComponent: () => import('@pages/payment-success/payment-success.component').then(m => m.PaymentSuccessComponent)
    },
];
