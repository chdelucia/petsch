import {
  Component,
  inject,
  computed,
  signal,
  InjectionToken,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toSignal,
  toObservable,
} from '@angular/core/rxjs-interop';
import { form as angularForm, FormField } from '@angular/forms/signals';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { PETLIST_STORE } from '@petsch/api';
import { debounceTime, merge, Observable, skip } from 'rxjs';
import {
  ChInputFilter,
  ChRadioFilter,
  ChActiveFiltersComponent,
} from '@petsch/ui';

export interface FilterConfig {
  key: string;
  type: 'input' | 'radio';
  options?: { value: string; text: string }[];
  debounceTime: number;
  initialValue?: string | number | boolean;
}

export const PET_FILTER_CONFIG = new InjectionToken<FilterConfig[]>(
  'PET_FILTER_CONFIG',
);

const DEFAULT_PET_FILTERS: FilterConfig[] = [
  {
    key: 'name_like',
    type: 'input',
    debounceTime: 200,
    initialValue: '',
  },
  {
    key: 'kind',
    type: 'radio',
    options: [
      { value: 'dog', text: 'dog' },
      { value: 'cat', text: 'cat' },
    ],
    debounceTime: 500,
    initialValue: '',
  },
];

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
  private readonly config = inject(PET_FILTER_CONFIG, { optional: true });

  readonly filterConfigs = computed<FilterConfig[]>(() => {
    const baseConfig = (this.config ?? DEFAULT_PET_FILTERS) as FilterConfig[];
    return baseConfig.map((c: FilterConfig) => ({
      ...c,
      options: c.options?.map((o: { value: string; text: string }) => ({
        ...o,
        text: this.transloco.translate(o.text),
      })),
    }));
  });

  readonly form = signal<Partial<Record<string, unknown>>>(
    ((this.config ?? DEFAULT_PET_FILTERS) as FilterConfig[]).reduce(
      (acc: Record<string, unknown>, c: FilterConfig) => ({
        ...acc,
        [c.key]: c.initialValue ?? '',
      }),
      {},
    ),
  );

  readonly formTree = angularForm(this.form);

  constructor() {
    const filterChanges$ = (
      (this.config ?? DEFAULT_PET_FILTERS) as FilterConfig[]
    ).map((config: FilterConfig) => {
      const field = (this.formTree as Record<string, any>)[config.key]();
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

  getFormField(key: string): unknown {
    return (this.formTree as Record<string, unknown>)[key];
  }

  resetFilter(key: string): void {
    const field = (this.formTree as Record<string, any>)[key]();
    const currentValue = field?.value();

    if (field) {
      field.value.set('');
    }

    this.store.removeFilter(key);

    if (!field || currentValue === '') {
      this.applyFiltersAndLoad();
    }
  }
}
