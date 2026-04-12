import { Route } from '@angular/router';
import { PRODUCT_ROUTES } from '@petsch/shared-utils';
import { productResolver } from './product-details.resolver';

export const shellRoutes: Route[] = [
  {
    path: PRODUCT_ROUTES.LIST,
    loadComponent: () =>
      import('@petsch/feature-page').then((m) => m.FeaturePage),
  },
  {
    path: PRODUCT_ROUTES.DETAILS,
    resolve: { product: productResolver },
    loadComponent: () =>
      import('@petsch/feature-product-details').then(
        (m) => m.FeatureProductDetails,
      ),
  },
];
