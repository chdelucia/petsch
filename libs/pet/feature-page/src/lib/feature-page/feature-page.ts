import { Component, inject, signal } from '@angular/core';
import { FeaturePetList } from '@petsch/feature-pet-list';
import { PETLIST_STORE } from '@petsch/api';
import { FeaturePetOfDay } from '@petsch/feature-pet-of-day';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChDropdownFilter, ChListHeader, ChCartDrawer } from '@petsch/ui';
import { FeatureFilters } from '@petsch/feature-filters';

@Component({
  selector: 'lib-feature-page',
  imports: [
    FeaturePetList,
    FeaturePetOfDay,
    TranslocoDirective,
    ChListHeader,
    FeatureFilters,
    ChDropdownFilter,
    ChCartDrawer,
  ],
  templateUrl: './feature-page.html',
  styleUrl: './feature-page.css',
})
export class FeaturePage {
  showFilters = signal(true);
  gridView = signal(true);
  showPotdDrawer = signal(false);

  private readonly store = inject(PETLIST_STORE);

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
