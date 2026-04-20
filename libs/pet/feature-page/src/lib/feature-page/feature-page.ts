import { Component, inject, signal, computed } from '@angular/core';
import { FeatureProductList } from '@petsch/feature-pet-list';
import { PRODUCT_LIST_STORE, PRODUCT_UI_CONFIG } from '@petsch/api';
import { FeatureItemOfDay } from '@petsch/feature-pet-of-day';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChDropdownFilter, ChListHeader } from '@petsch/ui';
import { FeatureFilters } from '@petsch/feature-filters';

@Component({
  selector: 'lib-feature-page',
  imports: [
    FeatureProductList,
    FeatureItemOfDay,
    TranslocoDirective,
    ChListHeader,
    FeatureFilters,
    ChDropdownFilter,
  ],
  templateUrl: './feature-page.html',
  styleUrl: './feature-page.css',
})
export class FeaturePage {
  showFilters = signal(true);
  gridView = signal(true);
  showIotdDrawer = signal(false);

  private readonly store = inject(PRODUCT_LIST_STORE);
  private readonly config = inject(PRODUCT_UI_CONFIG, { optional: true });

  hideSort = computed(() => this.config?.hideSort ?? false);

  toggleFilters(): void {
    this.showFilters.update((v) => !v);
  }

  toggleView(): void {
    this.gridView.update((v) => !v);
  }

  sortBy(value: { key: string; order: string }): void {
    this.store.applySort(value);
    this.store.loadProducts();
  }
}
