import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounce, form, FormField, FormRoot } from '@angular/forms/signals';
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
    ActiveFiltersComponent,
    FormRoot,
    FormField,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  readonly store = inject(ProductsStore);

  filterModel = signal<Filters>({
    page: 1,
    name: '',
    status: '',
    gender: '',
    species: '',
  });

  form = form(this.filterModel, (p) => {
    debounce(p.name, 300);
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
    effect(() => {
      const value = this.filterModel();
      this.store.loadProducts(value as Partial<Filters>);
    });
  }

  resetFilter(key: string): void {
    this.filterModel.update((filters) => ({
      ...filters,
      [key]: key === 'page' ? 1 : '',
    }));
  }

  countActiveFilters(value: Partial<Filters>): boolean {
    const { name, status, gender, species } = value;
    return !!(name || status || gender || species);
  }
}
