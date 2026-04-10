import { Route } from '@angular/router';
import { productResolver, ProductsStore } from '@petsch/data-access';

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
