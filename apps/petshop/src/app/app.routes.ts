import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'pets',
    pathMatch: 'full',
  },
  {
    path: 'pets',
    loadChildren: () => import('@petsch/shell').then((m) => m.shellRoutes),
  },
  {
    path: '**',
    redirectTo: 'pets',
  },
];
