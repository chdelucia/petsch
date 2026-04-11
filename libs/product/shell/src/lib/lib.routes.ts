import { Route } from '@angular/router';
import { productResolver } from './product-details.resolver';

export const shellRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@petsch/feature-page').then((m) => m.FeaturePage),
  },
  {
    path: ':id',
    resolve: { product: productResolver },
    loadComponent: () =>
      import('@petsch/feature-product-details').then(
        (m) => m.FeatureProductDetails,
      ),
  },
];
