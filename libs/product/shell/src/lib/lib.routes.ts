import { Route } from '@angular/router';

export const shellRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@petsch/feature-product-list').then((m) => m.FeatureProductList),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('@petsch/feature-product-details').then(
        (m) => m.FeatureProductDetails,
      ),
  },
];
