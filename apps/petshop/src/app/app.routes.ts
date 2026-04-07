import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: () => import('@petsch/shell').then((m) => m.shellRoutes),
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];
