import { Component, inject, signal, computed } from '@angular/core';
import { ProductsStore } from './product-list.store';
import { Filters, Product, CurrentTransitionService } from '@petsch/api';
import { FiltersComponent } from './components';
import {
  PaginationComponent,
  ProductCardComponent,
  ProductCardSkeletonComponent,
  ProductListHeaderComponent,
  ProductListViewComponent,
  UiItem,
} from '@petsch/ui';

@Component({
  selector: 'lib-feature-product-list',
  imports: [
    FiltersComponent,
    ProductCardSkeletonComponent,
    ProductListViewComponent,
    ProductCardComponent,
    PaginationComponent,
    ProductListHeaderComponent,
  ],
  templateUrl: './feature-product-list.html',
  styleUrl: './feature-product-list.css',
  providers: [ProductsStore],
})
export class FeatureProductList {
  private readonly store = inject(ProductsStore);
  protected readonly transitionService = inject(CurrentTransitionService);

  products = this.store.filteredProducts;

  uiProducts = computed(() =>
    this.products().map(
      (p): UiItem => ({
        id: p.id,
        name: p.name,
        title: p.title,
        description: p.description,
        price: p.price,
        imageUrl: p.images[0],
        creationAt: p.creationAt,
        categoryName: p.category['name'],
      })
    )
  );

  loading = this.store.loading;
  error = this.store.error;

  filtersPending = this.store.filtersPending;

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
    console.log(page);
    //this.filters = { ...this.filters, page };
    //this.searchCharacters(this.filters);
  }
}
