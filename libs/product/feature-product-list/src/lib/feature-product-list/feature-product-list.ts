import { Component, inject, computed, input } from '@angular/core';
import {
  Pet,
  CurrentTransitionService,
  PETLIST_STORE,
  PETOFDAY_STORE,
} from '@petsch/api';
import {
  ChButton,
  ChPagination,
  ChCard,
  ChCardSkeleton,
  ChBadge,
} from '@petsch/ui';

import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-feature-product-list',
  imports: [
    ChCardSkeleton,
    ChCard,
    ChPagination,
    ChButton,
    ChBadge,
    TranslocoDirective,
  ],
  templateUrl: './feature-product-list.html',
  styleUrl: './feature-product-list.css',
})
export class FeatureProductList {
  private readonly store = inject(PETLIST_STORE);
  protected readonly potdStore = inject(PETOFDAY_STORE);
  protected readonly transitionService = inject(CurrentTransitionService);

  showFilters = input.required<boolean>();

  products = this.store.filteredProducts;

  currentPage = computed(() => this.store.filtersApplied()._page ?? 1);

  totalPages = computed(() => {
    const last = this.store.pagination().last;
    const match = last?.match(/_page=(\d+)(?:&|$)/);
    return match ? Number(match[1]) : 10;
  });

  loading = computed(() => this.store.loading());
  error = this.store.error;

  handlePageChange(page: number): void {
    const filters = this.store.filtersApplied();
    this.store.loadProducts({ ...filters, _page: page });
  }

  getButtonText(): string {
    return this.potdStore.isPetAddedToday()
      ? 'viewPetOfTheDay'
      : 'addAsPetOfTheDay';
  }

  handlePotdClick(pet: Pet): void {
    if (this.potdStore.isPetAddedToday()) {
      this.potdStore.togglePoT(true);
    } else {
      this.potdStore.addPet(pet);
    }
  }
}
