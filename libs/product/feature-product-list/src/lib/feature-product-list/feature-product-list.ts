import { Component, inject, signal, computed } from '@angular/core';
import { Filters, CurrentTransitionService } from '@petsch/api';
import { FiltersComponent } from './components';
import {
  Button,
  CartDrawer,
  Pagination,
  Card,
  CardSkeleton,
  ListHeader,
} from '@petsch/ui';
import { ProductsStore } from '@petsch/data-access';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-feature-product-list',
  imports: [
    FiltersComponent,
    CardSkeleton,
    Card,
    Pagination,
    ListHeader,
    CartDrawer,
    Button,
    TranslocoDirective,
  ],
  templateUrl: './feature-product-list.html',
  styleUrl: './feature-product-list.css',
})
export class FeatureProductList {
  private readonly store = inject(ProductsStore);
  protected readonly transitionService = inject(CurrentTransitionService);

  products = this.store.filteredProducts;

  currentPage = computed(() => this.store.filtersApplied()._page ?? 1);

  open = signal(false);

  totalPages = computed(() => {
    const last = this.store.pagination().last;
    const match = last?.match(/_page=(\d+)(?:&|$)/);
    return match ? Number(match[1]) : 10;
  });

  loading = computed(() => this.store.loading());
  error = this.store.error;

  showFilters = signal(true);
  gridView = signal(true);

  updateFilter(partial: Partial<Filters>) {
    this.store.updateFilters(partial);
  }

  clearFilters(): void {
    this.store.clearProducts();
  }

  toggleFilters(): void {
    this.showFilters.update((v) => !v);
  }

  toggleView(): void {
    this.gridView.update((v) => !v);
  }

  handlePageChange(page: number): void {
    const filters = this.store.filtersApplied();
    this.store.loadProducts({ ...filters, _page: page });
  }
}
