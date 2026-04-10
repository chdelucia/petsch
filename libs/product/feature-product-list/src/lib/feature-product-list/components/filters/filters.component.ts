import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Filters } from '@petsch/api';
import { InputFilterComponent, RadioFilterComponent } from '@petsch/ui';
import { ActiveFiltersComponent } from './active-filters/active-filters.component';
import { ProductsStore } from '@petsch/data-access';

@Component({
  selector: 'lib-product-filters',
  imports: [
    CommonModule,
    RadioFilterComponent,
    InputFilterComponent,
    ReactiveFormsModule,
    ActiveFiltersComponent,
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

  genderOptions = [
    { value: 'dog', text: 'DOG' },
    { value: 'cat', text: 'CAT' },
  ];

  constructor() {
    this.form.controls.kind.valueChanges
      .pipe(debounceTime(400), takeUntilDestroyed())
      .subscribe((value) => {
        this.store.loadProducts(value as Partial<Filters>);
      });

    this.form.controls.name.valueChanges
      .pipe(debounceTime(4), takeUntilDestroyed())
      .subscribe((value) => {
        this.store.updateFilters({ name: value || '' });
      });
  }

  resetFilter(value: string): void {
    this.form.get(value)?.setValue('');
  }

  countActiveFilters(value: Partial<Filters>): boolean {
    const { name, kind } = value;
    return !!(name || kind);
  }
}
