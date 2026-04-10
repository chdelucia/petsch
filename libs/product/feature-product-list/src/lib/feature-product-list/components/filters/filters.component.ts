import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Filters } from '@petsch/api';
import { InputFilterComponent, RadioFilterComponent } from '@petsch/ui';
import { ProductsStore } from '../../product-list.store';
import { ActiveFiltersComponent } from './active-filters/active-filters.component';

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
    status: new FormControl(''),
    gender: new FormControl(''),
    species: new FormControl(''),
  });

  statusOptions = [
    { value: 'alive', text: 'Alive' },
    { value: 'dead', text: 'Dead' },
    { value: 'unknown', text: 'Unknown' },
  ];

  genderOptions = [
    { value: 'female', text: 'FEMALE' },
    { value: 'male', text: 'MALE' },
    { value: 'genderless', text: 'GENDERLESS' },
    { value: 'unknown', text: 'UNKNOWN' },
  ];

  speciesOptions = [
    { value: 'human', text: 'Human' },
    { value: 'humanoid', text: 'Humanoid' },
    { value: 'alien', text: 'Alien' },
    { value: 'disease', text: 'Disease' },
    { value: 'cronenberg', text: 'Cronenberg' },
    { value: 'poopybutthole', text: 'Poopybutthole' },
    { value: 'mythological', text: 'Mythological' },
    { value: 'robot', text: 'Robot' },
    { value: 'animal', text: 'Animal' },
    { value: 'unknown', text: 'UNKNOWN' },
  ];

  constructor() {
    this.form.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed())
      .subscribe((value) => {
        this.store.loadProducts(value as Partial<Filters>);
      });
  }

  resetFilter(value: string): void {
    this.form.get(value)?.setValue('');
  }

  countActiveFilters(value: Partial<Filters>): boolean {
    const { name, status, gender, species } = value;
    return !!(name || status || gender || species);
  }
}
