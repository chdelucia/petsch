import {
  Component,
  inject,
  computed,
  signal,
  InjectionToken,
  ChangeDetectionStrategy,
  effect,
} from '@angular/core';
import {
  toSignal,
} from '@angular/core/rxjs-interop';
import { form, FormField, debounce, Field, FieldTree } from '@angular/forms/signals';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { PRODUCT_LIST_STORE } from '@petsch/api';
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

export const PRODUCT_FILTER_CONFIG = new InjectionToken<FilterConfig[]>(
  'PRODUCT_FILTER_CONFIG',
);

const DEFAULT_PRODUCT_FILTERS: FilterConfig[] = [
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feature-filters.html',
})
export class FeatureFilters {
  readonly store = inject(PRODUCT_LIST_STORE);
  private readonly transloco = inject(TranslocoService);
  private readonly config = inject(PRODUCT_FILTER_CONFIG, { optional: true });
  private readonly lang = toSignal(this.transloco.langChanges$);

  readonly filterConfigs = computed<FilterConfig[]>(() => {
    this.lang();
    const baseConfig = (this.config ?? DEFAULT_PRODUCT_FILTERS) as FilterConfig[];
    return baseConfig.map((c: FilterConfig) => ({
      ...c,
      options: c.options?.map((o: { value: string; text: string }) => ({
        ...o,
        text: this.transloco.translate(o.text),
      })),
    }));
  });

  readonly form = signal<Partial<Record<string, unknown>>>(
    (() => {
      const configs = (this.config ?? DEFAULT_PRODUCT_FILTERS) as FilterConfig[];
      const storeFilters = this.store.filters() as Record<string, unknown>;
      return configs.reduce(
        (acc: Record<string, unknown>, c: FilterConfig) => ({
          ...acc,
          [c.key]: storeFilters[c.key] ?? c.initialValue ?? '',
        }),
        {},
      );
    })()
  );

  readonly formTree: FieldTree<Partial<Record<string, unknown>>> = form(this.form, (f) => {
    const configs = (this.config ?? DEFAULT_PRODUCT_FILTERS) as FilterConfig[];
    const formFields = f as unknown as Record<string, Field<unknown>>;
    configs.forEach((config) => {
      if (config.debounceTime > 0) {
        const field = formFields[config.key];
        if (field) {
          debounce(field, config.debounceTime);
        }
      }
    });
  });

  constructor() {
    let isFirstRun = true;
    effect(() => {
      const filters = this.form();
      if (isFirstRun) {
        isFirstRun = false;
        return;
      }

      this.store.applyFilters(filters);
      this.store.loadProducts();
    });
  }

  getFormField(key: string): Field<unknown> {
    const fields = this.formTree as unknown as Record<string, Field<unknown>>;
    return fields[key];
  }

  resetFilter(key: string): void {
    const fields = this.formTree as unknown as Record<string, Field<unknown>>;
    const field = fields[key]();

    if (field) {
      field.value.set('');
    }

    this.store.removeFilter(key);
  }
}
