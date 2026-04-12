import { Route } from '@angular/router';
import { APP_ROUTES } from '@petsch/shared-utils';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: APP_ROUTES.PETS,
    pathMatch: 'full',
  },
  {
    path: APP_ROUTES.PETS,
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
