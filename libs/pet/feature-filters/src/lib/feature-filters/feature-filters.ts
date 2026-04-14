import { Component, inject, computed, linkedSignal } from '@angular/core';
import {
  takeUntilDestroyed,
  toSignal,
  toObservable,
} from '@angular/core/rxjs-interop';
import { form as angularForm, FormField } from '@angular/forms/signals';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { Filters, PETLIST_STORE } from '@petsch/api';
import { debounceTime, Observable, merge } from 'rxjs';
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

  readonly form = linkedSignal({
    source: () => this.store.filters(),
    computation: (filters) => ({
      name_like: filters.name_like ?? '',
      kind: filters.kind ?? '',
    }),
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
    const nameChanges$ = toObservable(this.formTree.name_like().value).pipe(
      debounceTime(200),
    );
    const kindChanges$ = toObservable(this.formTree.kind().value).pipe(
      debounceTime(500),
    );

    merge(nameChanges$, kindChanges$)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.store.applyFilters({
          name_like: this.formTree.name_like().value() as string,
          kind: this.formTree.kind().value() as string,
        });
        this.store.loadProducts();
      });
  }

  resetFilter(key: string): void {
    if (key === 'name_like') {
      this.formTree.name_like().value.set('');
    } else if (key === 'kind') {
      this.formTree.kind().value.set('');
    }
    this.store.removeFilter(key as keyof Filters);
  }
}
