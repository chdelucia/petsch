import { Component, inject, computed, signal } from '@angular/core';
import {
  takeUntilDestroyed,
  toSignal,
  toObservable,
} from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { Filters, PETLIST_STORE } from '@petsch/api';
import { debounceTime, Observable } from 'rxjs';
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
}

const kindOptions = ['dog', 'cat'] as const;
type KindKey = (typeof kindOptions)[number];

@Component({
  selector: 'lib-feature-filters',
  imports: [
    ChRadioFilter,
    ChInputFilter,
    FormField,
    ChActiveFiltersComponent,
    TranslocoDirective,
  ],
  templateUrl: './feature-filters.html',
})
export class FeatureFilters {
  readonly store = inject(PETLIST_STORE);
  private readonly transloco = inject(TranslocoService);

  readonly #formModel = signal({
    name_like: '',
    kind: '',
  });

  readonly form = form(this.#formModel);

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
        key: 'name_like',
        type: 'input',
        options: [],
        debounceTime: 200,
      },
      {
        key: 'kind',
        type: 'radio',
        options: this.kindOptions.map((key) => ({
          value: key,
          text: t[key] ?? key,
        })),
        debounceTime: 500,
      },
    ];
  });

  constructor() {
    this.filterConfigs().forEach((config) => {
      const field = (this.form as any)[config.key];

      toObservable(field().value)
        .pipe(debounceTime(config.debounceTime), takeUntilDestroyed())
        .subscribe((value: unknown) => {
          this.store.applyFilters({ [config.key]: (value as string) || '' });
          this.store.loadProducts();
        });
    });
  }

  resetFilter(key: string): void {
    const field = (this.form as any)[key];
    field().value.set('');
    this.store.removeFilter(key as keyof Filters);
  }

  get activeFilters(): Partial<Filters> {
    return this.#formModel();
  }

  getField(key: keyof Filters) {
    return (this.form as any)[key];
  }
}
