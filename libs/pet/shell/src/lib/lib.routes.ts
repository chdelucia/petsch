import { Routes } from '@angular/router';
import { productResolver } from './pet-details.resolver';

export const shellRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@petsch/feature-page').then((m) => m.FeaturePage),
      },
      {
        path: ':id',
        resolve: {
          product: productResolver,
        },
        loadComponent: () =>
          import('@petsch/feature-pet-details').then(
            (m) => m.FeatureProductDetails,
          ),
      },
    ],
  },
];
