import { Route } from '@angular/router';
import { PRODUCT_ROUTES } from '@petsch/shared-utils';
import { petResolver } from './pet-details.resolver';
import { PETLIST_STORE, PETOFDAY_STORE } from '@petsch/api';
import { PetsStore } from '@petsch/feature-pet-list';
import { PetOfTheDayStore } from '@petsch/feature-pet-of-day';

export const shellRoutes: Route[] = [
  {
    path: '',
    providers: [
      {
        provide: PETLIST_STORE,
        useClass: PetsStore,
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
        resolve: { product: petResolver },
        loadComponent: () =>
          import('@petsch/feature-pet-details').then(
            (m) => m.FeaturePetDetails,
          ),
      },
    ],
  },
];
