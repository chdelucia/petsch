import { Route } from '@angular/router';
import { ProductsStore } from '@petsch/data-access';
import { productResolver } from './product-details.resolver';

export const shellRoutes: Route[] = [
  {
    path: '',
    providers: [ProductsStore],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@petsch/feature-product-list').then(
            (m) => m.FeatureProductList,
          ),
      },
      {
        path: 'details/:id',
        resolve: { product: productResolver },
        loadComponent: () =>
          import('@petsch/feature-product-details').then(
            (m) => m.FeatureProductDetails,
          ),
      },
    ],
  },
];
