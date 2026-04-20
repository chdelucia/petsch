import { Component, inject, computed, input, Signal } from '@angular/core';
import {
  CurrentTransitionService,
  PRODUCT_LIST_STORE,
  ITEM_OF_DAY_STORE,
  PRODUCT_UI_CONFIG,
} from '@petsch/api';
import {
  ChButton,
  ChPagination,
  ChCard,
  ChCardSkeleton,
  ChFilterSkeleton,
  ChBadge,
} from '@petsch/ui';

import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-feature-product-list',
  imports: [
    ChCardSkeleton,
    ChFilterSkeleton,
    ChCard,
    ChPagination,
    ChButton,
    ChBadge,
    TranslocoDirective,
  ],
  templateUrl: './feature-pet-list.html',
  styleUrl: './feature-pet-list.css',
})
export class FeatureProductList {
  private readonly store = inject(PRODUCT_LIST_STORE);
  private readonly config = inject(PRODUCT_UI_CONFIG, { optional: true });
  protected readonly iotdStore = inject(ITEM_OF_DAY_STORE);
  protected readonly transitionService = inject(CurrentTransitionService);

  showFilters = input.required<boolean>();

  products = this.store.products as Signal<unknown[]>;

  currentPage = computed(() => {
    const pageKey = this.config?.paginationKeys?.page ?? '_page';
    return (this.store.filters() as Record<string, unknown>)[pageKey] as number ?? 1;
  });

  totalPages = computed(() => {
    const pagination = this.store.pagination();
    if (pagination.pages) {
      return pagination.pages;
    }
    const last = pagination.last;
    const pageKey = this.config?.paginationKeys?.page ?? '_page';
    const regex = new RegExp(`${pageKey}=(\\d+)(?:&|$)`);
    const match = last?.match(regex);
    return match ? Number(match[1]) : this.currentPage();
  });

  loading = computed(() => this.store.loading());
  error = this.store.error;

  iotdButtonText = computed(() =>
    this.iotdStore.isItemAddedToday() ? 'viewItemOfTheDay' : 'addItemToDay',
  );

  handlePageChange(page: number): void {
    this.store.applyPagination(page);
    this.store.loadProducts();
  }

  handleIotdClick(product: unknown): void {
    if (this.iotdStore.isItemAddedToday()) {
      this.iotdStore.toggleIotd(true);
    } else {
      this.iotdStore.addItem(product);
    }
  }
}
