import { Routes } from '@angular/router';
import { MaltaMapComponent } from './platform/malta-map/malta-map.component';
import { FEATURES } from './feature-flags';

export const routes: Routes = [
    {
        path: '',
        pathMatch:'full',
        redirectTo: 'malta'
    },
    {
        path: '',
        loadComponent: () => import('./platform/home/home.component').then(mod => mod.HomeComponent)
    },
    {
        path: 'malta',
        loadComponent: () => import('./platform/malta-map/malta-map.component').then(mod => mod.MaltaMapComponent)
    },
    {
        path: 'plan',
        canMatch: [() => FEATURES.ROUTE_BUILDER],
        loadComponent: () => import('./platform/route-builder/route-builder.component').then(m => m.RouteBuilderComponent)
    }
];
