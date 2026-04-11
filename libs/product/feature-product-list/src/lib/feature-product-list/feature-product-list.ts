import { Component, inject, signal, computed } from '@angular/core';
import { Pet, Filters, CurrentTransitionService } from '@petsch/api';
import { FiltersComponent } from './components';
import {
  PaginationComponent,
  ProductCardComponent,
  ProductCardSkeletonComponent,
  ProductListHeaderComponent,
  CartDrawer,
  CartItem,
  Button,
} from '@petsch/ui';
import { ProductsStore } from '@petsch/data-access';
import { PetOfTheDayStore } from '@petsch/pet-of-the-day-data-access';

@Component({
  selector: 'lib-feature-product-list',
  imports: [
    FiltersComponent,
    ProductCardSkeletonComponent,
    ProductCardComponent,
    PaginationComponent,
    ProductListHeaderComponent,
    CartDrawer,
    CartItem,
    Button,
  ],
  templateUrl: './feature-product-list.html',
  styleUrl: './feature-product-list.css',
})
export class FeatureProductList {
  private readonly store = inject(ProductsStore);
  protected readonly potdStore = inject(PetOfTheDayStore);
  protected readonly transitionService = inject(CurrentTransitionService);

  products = this.store.filteredProducts;

  currentPage = computed(() => this.store.filtersApplied()._page ?? 1);

  totalPages = computed(() => {
    const last = this.store.pagination().last;
    const match = last?.match(/_page=(\d+)(?:&|$)/);
    return match ? Number(match[1]) : 10;
  });

  loading = computed(() => this.store.loading());
  error = this.store.error;

  showFilters = signal(true);
  gridView = signal(true);
  showPotdDrawer = signal(false);

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

  getButtonText() {
    return this.potdStore.isPetAddedToday()
      ? 'Ver la mascota del día'
      : 'Add as pet of the day';
  }

  handlePotdClick(pet: Pet) {
    if (this.potdStore.isPetAddedToday()) {
      this.showPotdDrawer.set(true);
    } else {
      this.potdStore.addPet(pet);
    }
  }

  togglePotdDrawer() {
    this.showPotdDrawer.update((v) => !v);
  }
}
