import { Component, inject, computed, linkedSignal, effect } from '@angular/core';
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

  readonly filters = linkedSignal<Record<string, string>>(() => {
    const { name_like, kind } = this.store.filters();
    return {
      name_like: name_like ?? '',
      kind: kind ?? '',
    };
  });

  readonly filterConfigs = computed<FilterConfig[]>(() => {
    const t = this.translations() ?? {};

    return [
      {
        key: 'name_like',
        type: 'input',
        options: [],
      },
      {
        key: 'kind',
        type: 'radio',
        options: this.kindOptions.map((key) => ({
          value: key,
          text: t[key] ?? key,
        })),
      },
    ];
  });

  constructor() {
    effect(() => {
      const { name_like, kind } = this.filters();

      this.store.applyFilters({
        name_like: name_like || undefined,
        kind: kind || undefined,
      });
    });

  }

  resetFilter(value: string): void {
    this.updateFilter(value as keyof Filters, '');
  }

  updateFilter(key: keyof Filters, value: string): void {
    this.filters.update((current) => ({
      ...current,
      [key]: value,
    }));
  }

  get activeFilters(): Partial<Filters> {
    return this.store.filters();
  }
}
