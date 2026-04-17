import {
  Component,
  inject,
  signal,
  input,
  numberAttribute,
  effect,
} from '@angular/core';
import { Router } from '@angular/router';
import { FeaturePetList } from '@petsch/feature-pet-list';
import { PETLIST_STORE, Filters } from '@petsch/api';
import { FeaturePetOfDay } from '@petsch/feature-pet-of-day';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChDropdownFilter, ChListHeader } from '@petsch/ui';
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
  ],
  templateUrl: './feature-page.html',
  styleUrl: './feature-page.css',
})
export class FeaturePage {
  showFilters = signal(true);
  gridView = signal(true);
  showPotdDrawer = signal(false);

  private readonly store = inject(PETLIST_STORE);
  private readonly router = inject(Router);

  // Deep linking inputs
  _page = input(1, { transform: numberAttribute });
  _limit = input(12, { transform: numberAttribute });
  _sort = input('');
  _order = input('');
  name_like = input('');
  kind = input('');

  constructor() {
    effect(() => {
      const filters: Partial<Filters> = {};

      if (this._page()) filters._page = this._page();
      if (this._limit()) filters._limit = this._limit();
      if (this._sort()) filters._sort = this._sort();
      if (this._order()) filters._order = this._order();
      if (this.name_like()) filters.name_like = this.name_like();
      if (this.kind()) filters.kind = this.kind();

      this.store.updateFilters(filters);
    });
  }

  toggleFilters(): void {
    this.showFilters.update((v) => !v);
  }

  toggleView(): void {
    this.gridView.update((v) => !v);
  }

  sortBy(value: { key: string; order: string }): void {
    this.router.navigate([], {
      queryParams: {
        _sort: value.key,
        _order: value.order,
        _page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  handleFilterChange(filters: Partial<Filters>): void {
    this.router.navigate([], {
      queryParams: {
        ...filters,
        _page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  handlePageChange(page: number): void {
    this.router.navigate([], {
      queryParams: { _page: page },
      queryParamsHandling: 'merge',
    });
  }
}
