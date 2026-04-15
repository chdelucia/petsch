import { Component, inject, signal, effect } from '@angular/core';
import { FeaturePetList } from '@petsch/feature-pet-list';
import { PETLIST_STORE } from '@petsch/api';
import { FeaturePetOfDay } from '@petsch/feature-pet-of-day';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChDropdownFilter, ChListHeader } from '@petsch/ui';
import { FeatureFilters } from '@petsch/feature-filters';
import { SeoService } from '@petsch/shared-utils';

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
  private readonly seoService = inject(SeoService);
  private readonly translocoService = inject(TranslocoService);

  constructor() {
    this.translocoService.selectTranslation().pipe(
      takeUntilDestroyed()
    ).subscribe(() => {
      this.seoService.updateTitle(this.translocoService.translate('homeTitle'));
      this.seoService.updateDescription(
        this.translocoService.translate('homeDescription'),
      );
    });
  }

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
