import { Route } from '@angular/router';
import { PRODUCT_ROUTES } from '@petsch/shared-utils';
import { productResolver } from './pet-details.resolver';
import { PRODUCT_LIST_STORE, ITEM_OF_DAY_STORE } from '@petsch/api';
import { ProductsStore } from '@petsch/feature-pet-list';
import { ItemOfDayStore } from '@petsch/feature-pet-of-day';

export const shellRoutes: Route[] = [
  {
    path: '',
    providers: [
      {
        provide: PRODUCT_LIST_STORE,
        useClass: ProductsStore,
      },
      {
        provide: ITEM_OF_DAY_STORE,
        useClass: ItemOfDayStore,
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
          import('@petsch/feature-pet-details').then(
            (m) => m.FeatureProductDetails,
          ),
      },
    ],
  },
];
