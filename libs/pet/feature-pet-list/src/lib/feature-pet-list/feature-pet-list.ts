import { Component, inject, computed, input, Signal } from '@angular/core';
import {
  CurrentTransitionService,
  PETLIST_STORE,
  PETOFDAY_STORE,
  PET_UI_CONFIG,
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
  selector: 'lib-feature-pet-list',
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
export class FeaturePetList {
  private readonly store = inject(PETLIST_STORE);
  private readonly config = inject(PET_UI_CONFIG, { optional: true });
  protected readonly potdStore = inject(PETOFDAY_STORE);
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

  potdButtonText = computed(() =>
    this.potdStore.isPetAddedToday() ? 'viewPetOfTheDay' : 'addAsPetOfTheDay',
  );

  handlePageChange(page: number): void {
    this.store.applyPagination(page);
    this.store.loadProducts();
  }

  handlePotdClick(pet: unknown): void {
    if (this.potdStore.isPetAddedToday()) {
      this.potdStore.togglePoT(true);
    } else {
      this.potdStore.addPet(pet);
    }
  }
}
