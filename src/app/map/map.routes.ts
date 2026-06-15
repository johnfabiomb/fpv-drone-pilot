import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { FEATURES } from './feature-flags';
import { UserDataService } from '@map/core/services/user-data.service';

export const mapRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./map-root.component').then(m => m.MapRootComponent),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'malta'
            },
            {
                path: '',
                loadComponent: () => import('@map/pages/home/home.component').then(mod => mod.HomeComponent)
            },
            {
                path: 'privacy',
                loadComponent: () => import('@map/pages/privacy/privacy.component').then(mod => mod.PrivacyComponent)
            },
            {
                path: 'cookies',
                loadComponent: () => import('@map/pages/cookies/cookies.component').then(mod => mod.CookiesComponent)
            },
            {
                path: 'about',
                loadComponent: () => import('@map/pages/about/about.component').then(mod => mod.AboutComponent)
            },
            {
                path: 'contact',
                loadComponent: () => import('@map/pages/contact/contact.component').then(mod => mod.ContactComponent)
            },
            {
                path: 'malta',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('@map/features/map/shell/map-shell.component').then(m => m.MapShellComponent),
                        children: [
                            {
                                path: '',
                                pathMatch: 'full',
                                loadComponent: () => import('@map/features/map/explore/map-explore.component').then(mod => mod.MapExploreComponent)
                            },
                            {
                                path: 'list',
                                loadComponent: () => import('@map/features/map/list/location-list.component').then(m => m.LocationListComponent)
                            },
                            {
                                path: 'deals',
                                loadComponent: () => import('@map/features/map/deals/deals.component').then(m => m.DealsComponent)
                            },
                            {
                                path: 'providers/:id',
                                loadComponent: () => import('@map/features/providers/provider-page/provider-page.component').then(m => m.ProviderPageComponent)
                            },
                            {
                                path: 'locations/:slug',
                                loadComponent: () => import('@map/features/locations/location-page/location-page.component').then(m => m.LocationPageComponent)
                            },
                            {
                                path: 'saved',
                                loadComponent: () => import('@map/features/saved-places/saved-places.component').then(m => m.SavedPlacesComponent)
                            },
                            {
                                path: 'admin',
                                canMatch: [() => inject(UserDataService).isAdmin()],
                                loadComponent: () => import('@map/pages/admin/admin-panel.component').then(m => m.AdminPanelComponent)
                            },
                            {
                                path: 'groups',
                                canMatch: [() => FEATURES.GROUPS],
                                loadComponent: () => import('@map/features/groups/groups-list/explore-together.component').then(m => m.ExploreTogetherComponent)
                            },
                            {
                                path: 'groups/:id',
                                canMatch: [() => FEATURES.GROUPS],
                                loadComponent: () => import('@map/features/groups/group-detail/group-detail.component').then(m => m.GroupDetailComponent)
                            },
                            {
                                path: 'notifications',
                                loadComponent: () => import('@map/features/notifications/notifications.component').then(m => m.NotificationsComponent)
                            },
                        ]
                    },
                    {
                        path: '30-places-2026',
                        loadComponent: () => import('@map/pages/top-places/top-places.component').then(m => m.TopPlacesComponent)
                    },
                    {
                        path: 'leaderboard',
                        loadComponent: () => import('@map/features/leaderboard/leaderboard.component').then(m => m.LeaderboardComponent)
                    },
                    {
                        path: 'plan',
                        canMatch: [() => FEATURES.ROUTE_BUILDER],
                        loadComponent: () => import('@map/features/route-builder/route-builder.component').then(m => m.RouteBuilderComponent)
                    },
                ]
            },
            {
                path: 'pay',
                loadComponent: () => import('@map/pages/payment/payment.component').then(m => m.PaymentComponent)
            },
        ]
    },
];
