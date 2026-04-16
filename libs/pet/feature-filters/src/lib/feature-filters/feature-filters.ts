import { Component, inject, computed, signal } from '@angular/core';
import {
  takeUntilDestroyed,
  toSignal,
  toObservable,
} from '@angular/core/rxjs-interop';
import { form as angularForm, FormField } from '@angular/forms/signals';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { Filters, PETLIST_STORE } from '@petsch/api';
import { debounceTime, merge, Observable, skip } from 'rxjs';
import {
  ChInputFilter,
  ChRadioFilter,
  ChActiveFiltersComponent,
} from '@petsch/ui';

interface FilterConfig {
  key: keyof Filters;
  type: 'input' | 'radio';
  options?: { value: string; text: string }[];
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

  readonly form = signal<Partial<Filters>>({
    name_like: '',
    kind: '',
  });

  readonly formTree = angularForm(this.form);

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
    const filterChanges$ = this.filterConfigs().map((config) => {
      const field = (this.formTree as any)[config.key]();
      return toObservable(field.value).pipe(
        skip(1),
        debounceTime(config.debounceTime),
      );
    });

    merge(...filterChanges$)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.applyFiltersAndLoad();
      });
  }

  private applyFiltersAndLoad(): void {
    const currentForm = this.form();

    this.store.applyFilters(currentForm);
    this.store.loadProducts();
  }

  resetFilter(key: string): void {
    const field = (this.formTree as any)[key];
    const currentValue = field?.().value();

    if (field) {
      field().value.set('');
    }

    this.store.removeFilter(key as keyof Filters);

    if (!field || currentValue === '') {
      this.applyFiltersAndLoad();
    }
  }
}
