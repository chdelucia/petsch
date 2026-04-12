import { Route } from '@angular/router';
import { PRODUCT_ROUTES } from '@petsch/shared-utils';
import { productResolver } from './product-details.resolver';
import { PETLIST_STORE, PETOFDAY_STORE } from '@petsch/api';
import { ProductsStore } from '@petsch/feature-product-list';
import { PetOfTheDayStore } from '@petsch/feature-pet-of-day';

export const shellRoutes: Route[] = [
  {
    path: '',
    providers: [
      {
        provide: PETLIST_STORE,
        useClass: ProductsStore,
      },
      {
        provide: PETOFDAY_STORE,
        useClass: PetOfTheDayStore,
      },
    ],
    children: [
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
    ],
  },
];
