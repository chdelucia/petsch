import { Routes } from '@angular/router';

export const APP_ROUTES = {
  PRODUCTS: 'dragonball',
  NOT_FOUND: '404',
} as const;

export const PRODUCT_ROUTES = {
  LIST: '',
  DETAILS: ':id',
} as const;

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: APP_ROUTES.PRODUCTS,
    pathMatch: 'full',
  },
  {
    path: APP_ROUTES.PRODUCTS,
    loadChildren: () => import('@petsch/shell').then((m) => m.shellRoutes),
  },
];
