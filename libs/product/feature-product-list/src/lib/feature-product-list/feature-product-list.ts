import { Component, inject, signal } from '@angular/core';
import { ProductsStore } from './product-list.store';
import { Filters } from '@petsch/api';
import {
  CardComponent,
  CardSkeletonComponent,
  FiltersComponent,
  ListViewComponent,
} from './components';
import { PaginationComponent } from '@petsch/ui';

@Component({
  selector: 'lib-feature-product-list',
  imports: [
    FiltersComponent,
    CardSkeletonComponent,
    ListViewComponent,
    CardComponent,
    PaginationComponent,
  ],
  templateUrl: './feature-product-list.html',
  styleUrl: './feature-product-list.css',
  providers: [ProductsStore],
})
export class FeatureProductList {
  private readonly store = inject(ProductsStore);

  products = this.store.filteredProducts;
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
