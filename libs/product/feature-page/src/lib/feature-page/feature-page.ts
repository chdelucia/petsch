import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FeatureProductList,
  ProductsStore,
} from '@petsch/feature-product-list';
import { PETLIST_STORE, PETOFDAY_STORE } from '@petsch/api';
import { FeaturePetOfDay, PetOfTheDayStore } from '@petsch/feature-pet-of-day';
import { TranslocoDirective } from '@jsverse/transloco';
import { ListHeader } from '@petsch/ui';
import { FeatureFilters } from '@petsch/feature-filters';

@Component({
  selector: 'lib-feature-page',
  imports: [
    FeatureProductList,
    FeaturePetOfDay,
    TranslocoDirective,
    ListHeader,
    FeatureFilters,
  ],
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
  templateUrl: './feature-page.html',
  styleUrl: './feature-page.css',
})
export class FeaturePage {
  showFilters = signal(true);
  gridView = signal(true);
  showPotdDrawer = signal(false);

  toggleFilters(): void {
    this.showFilters.update((v) => !v);
  }

  toggleView(): void {
    this.gridView.update((v) => !v);
  }
}
