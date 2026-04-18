import { Routes } from '@angular/router';

export const APP_ROUTES = {
  PETS: 'rickymorty',
  NOT_FOUND: '404',
} as const;

export const PRODUCT_ROUTES = {
  LIST: '',
  DETAILS: ':id',
} as const;

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: APP_ROUTES.PETS,
    pathMatch: 'full',
  },
  {
    path: APP_ROUTES.PETS,
    loadChildren: () => import('@petsch/shell').then((m) => m.shellRoutes),
  },
];
