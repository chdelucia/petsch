import { Component, inject, computed, effect, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { Filters, PETLIST_STORE } from '@petsch/api';
import { Observable } from 'rxjs';
import {
  ChInputFilter,
  ChRadioFilter,
  ChActiveFiltersComponent,
} from '@petsch/ui';

interface FilterConfig {
  key: keyof Filters;
  type: 'input' | 'radio';
  options: { value: string; text: string }[];
  debounceTime: number;
  triggersLoad: boolean;
}

const kindOptions = ['dog', 'cat'] as const;
type KindKey = (typeof kindOptions)[number];

@Component({
  selector: 'lib-feature-filters',
  imports: [
    ChRadioFilter,
    ChInputFilter,
    ChActiveFiltersComponent,
    TranslocoDirective,
  ],
  templateUrl: './feature-filters.html',
})
export class FeatureFilters {
  readonly store = inject(PETLIST_STORE);
  private readonly transloco = inject(TranslocoService);

  private readonly kindOptions = kindOptions;

  private readonly translations = toSignal(
    this.transloco.selectTranslateObject(
      this.kindOptions,
    ) as unknown as Observable<Record<KindKey, string>>,
    { initialValue: {} as Record<KindKey, string> },
  );

  readonly filterConfigs = computed<FilterConfig[]>(() => {
    const t = this.translations() ?? {};

    return [
      {
        key: 'name',
        type: 'input',
        options: [],
        debounceTime: 0,
        triggersLoad: false,
      },
      {
        key: 'kind',
        type: 'radio',
        options: this.kindOptions.map((key) => ({
          value: key,
          text: t[key] ?? key,
        })),
        debounceTime: 0,
        triggersLoad: true,
      },
    ];
  });

  updateFilter(key: keyof Filters, value: string): void {
    const config = this.filterConfigs().find((c) => c.key === key);
    this.store.applyFilters({ [key]: value || '' });
    if (config?.triggersLoad) {
      this.store.loadProducts();
    }
  }

  resetFilter(value: string): void {
    const filterKey = value as keyof Filters;
    this.store.removeFilter(filterKey);
  }

  get activeFilters(): Partial<Filters> {
    return this.store.filters();
  }
}
