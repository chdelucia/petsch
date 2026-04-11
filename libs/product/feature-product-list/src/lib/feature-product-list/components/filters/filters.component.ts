import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Filters } from '@petsch/api';
import { InputFilterComponent, RadioFilterComponent } from '@petsch/ui';
import { ActiveFiltersComponent } from './active-filters/active-filters.component';
import { ProductsStore } from '@petsch/data-access';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'lib-product-filters',
  imports: [
    CommonModule,
    RadioFilterComponent,
    InputFilterComponent,
    ReactiveFormsModule,
    ActiveFiltersComponent,
    TranslocoDirective,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  readonly store = inject(ProductsStore);

  form = new FormGroup({
    name: new FormControl(''),
    kind: new FormControl(''),
  });

  private readonly transloco = inject(TranslocoService);

  genderOptions = [
    { value: 'dog', text: this.transloco.translate('dog') },
    { value: 'cat', text: this.transloco.translate('cat') },
  ];

  constructor() {
    this.form.controls.kind.valueChanges
      .pipe(debounceTime(400), takeUntilDestroyed())
      .subscribe((value) => {
        if (value) this.store.loadProducts({ kind: value, _page: 1 });
      });

    this.form.controls.name.valueChanges
      .pipe(debounceTime(4), takeUntilDestroyed())
      .subscribe((value) => {
        this.store.updateFilters({ name: value || '' });
      });
  }

  resetFilter(value: string): void {
    this.form.get(value)?.setValue('');
    const filterKey = value as keyof Filters;
    this.store.removeFilter(filterKey);
    this.store.loadProducts({ ...this.store.filtersApplied(), _page: 1 });
  }

  countActiveFilters(value: Partial<Filters>): boolean {
    const { name, kind } = value;
    return !!(name || kind);
  }
}
