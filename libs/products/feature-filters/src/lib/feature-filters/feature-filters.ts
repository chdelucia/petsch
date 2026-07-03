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
import { form as angularForm, FormField, debounce } from '@angular/forms/signals';
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
    ((this.config ?? DEFAULT_PRODUCT_FILTERS) as FilterConfig[]).reduce(
      (acc: Record<string, unknown>, c: FilterConfig) => {
        const storeFilters = this.store.filters() as Record<string, unknown>;
        return {
          ...acc,
          [c.key]: storeFilters[c.key] ?? c.initialValue ?? '',
        };
      },
      {},
    ),
  );

  readonly formTree = angularForm(this.form, (form: any) => {
    const configs = (this.config ?? DEFAULT_PRODUCT_FILTERS) as FilterConfig[];
    configs.forEach((config) => {
      if (config.debounceTime > 0) {
        debounce(form[config.key], config.debounceTime);
      }
    });
  });

  constructor() {
    effect(() => {
      const filters = this.form();
      this.store.applyFilters(filters);
    });
  }

  getFormField(key: string): unknown {
    return (this.formTree as Record<string, unknown>)[key];
  }

  resetFilter(key: string): void {
    const field = (this.formTree as Record<string, any>)[key]();

    if (field) {
      field.value.set('');
    }

    this.store.removeFilter(key);
  }
}
