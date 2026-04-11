import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { Filters, PETLIST_STORE } from '@petsch/api';
import { debounceTime } from 'rxjs';
import { ActiveFiltersComponent } from '../active-filters/active-filters.component';
import { InputFilter, RadioFilter } from '@petsch/ui';

interface FilterConfig {
  key: keyof Filters;
  type: 'input' | 'radio';
  options: { value: string; text: string }[];
  debounceTime: number;
  triggersLoad: boolean;
}

@Component({
  selector: 'lib-feature-filters',
  imports: [
    RadioFilter,
    InputFilter,
    ReactiveFormsModule,
    ActiveFiltersComponent,
    TranslocoDirective,
  ],
  templateUrl: './feature-filters.html',
  styleUrl: './feature-filters.css',
})
export class FeatureFilters {
  readonly store = inject(PETLIST_STORE);

  form = new FormGroup({});

  private readonly transloco = inject(TranslocoService);

  readonly filterConfigs: FilterConfig[] = [
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
      options: [
        { value: 'dog', text: this.transloco.translate('dog') },
        { value: 'cat', text: this.transloco.translate('cat') },
      ],
      debounceTime: 0,
      triggersLoad: true,
    },
  ];

  constructor() {
    this.filterConfigs.forEach((config) => {
      this.form.addControl(config.key as string, new FormControl(''));

      (this.form.get(config.key as string) as FormControl).valueChanges
        .pipe(debounceTime(config.debounceTime), takeUntilDestroyed())
        .subscribe((value: string) => {
          if (config.key === 'name') {
            this.store.setFilterName(value || '');
          } else {
            this.store.updateFilters({ [config.key]: value || '' });
          }
          if (config.triggersLoad) {
            const filters = { ...this.store.filtersApplied() };
            delete filters.name;
            this.store.loadProducts({ ...filters, _page: 1 });
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
