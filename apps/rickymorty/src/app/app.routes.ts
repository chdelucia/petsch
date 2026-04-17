import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'rickymorty',
    pathMatch: 'full',
  },
  {
    path: 'rickymorty',
    loadComponent: () =>
      import('@petsch/feature-page').then((m) => m.FeaturePage),
  },
];
