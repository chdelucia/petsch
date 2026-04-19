import { Route } from '@angular/router';

export const APP_ROUTES = {
  LIST: 'products',
  NOT_FOUND: '404',
} as const;

export const PRODUCT_ROUTES = {
  LIST: '',
  DETAILS: ':id',
} as const;

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: APP_ROUTES.LIST,
    pathMatch: 'full',
  },
  {
    path: APP_ROUTES.LIST,
    loadChildren: () => import('@petsch/shell').then((m) => m.shellRoutes),
  },
  {
    path: APP_ROUTES.NOT_FOUND,
    loadComponent: () =>
      import('@petsch/feature-404').then((m) => m.Feature404),
  },
  {
    path: '**',
    redirectTo: APP_ROUTES.NOT_FOUND,
  },
];
