import { Route } from '@angular/router';
import { productResolver } from '@petsch/feature-product-details';

export const shellRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@petsch/feature-product-list').then((m) => m.FeatureProductList),
  },
  {
    path: 'details/:id',
    resolve: {
      product: productResolver,
    },
    loadComponent: () =>
      import('@petsch/feature-product-details').then(
        (m) => m.FeatureProductDetails,
      ),
  },
];
