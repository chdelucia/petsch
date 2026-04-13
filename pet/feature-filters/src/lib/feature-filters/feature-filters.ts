import { Component, inject, computed } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { Filters, PETLIST_STORE } from '@petsch/api';
import { debounceTime, Observable } from 'rxjs';
import {
  ChInputFilter,
  ChRadioFilter,
  ChActiveFiltersComponent,
  ChFilterSkeleton,
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
    ReactiveFormsModule,
    ChActiveFiltersComponent,
    TranslocoDirective,
    ChFilterSkeleton,
  ],
  templateUrl: './feature-filters.html',
})
export class FeatureFilters {
  readonly store = inject(PETLIST_STORE);
  private readonly transloco = inject(TranslocoService);

  form = new FormGroup({});

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

  constructor() {
    this.filterConfigs().forEach((config) => {
      this.form.addControl(config.key as string, new FormControl(''));

      (this.form.get(config.key as string) as FormControl).valueChanges
        .pipe(debounceTime(config.debounceTime), takeUntilDestroyed())
        .subscribe((value: string) => {
          if (config.key === 'name') {
            this.store.setFilterName(value || '');
          }
          if (config.triggersLoad) {
            this.store.applyFilters({ [config.key]: value || '' });
            this.store.loadProducts();
          }
        });
    });
  }

  resetFilter(value: string): void {
    this.form.get(value)?.setValue('');
    const filterKey = value as keyof Filters;
    this.store.removeFilter(filterKey);
  }

  get activeFilters(): Partial<Filters> {
    return this.form.value as Partial<Filters>;
  }
}
