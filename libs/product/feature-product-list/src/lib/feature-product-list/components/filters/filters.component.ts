import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Filters } from '@petsch/api';
import { InputFilterComponent, RadioFilterComponent } from '@petsch/ui';
import { ProductsStore } from '@petsch/data-access';

@Component({
  selector: 'lib-product-filters',
  imports: [
    CommonModule,
    RadioFilterComponent,
    InputFilterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  private readonly store = inject(ProductsStore);

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

  resetFilter(value: string): void {
    this.form.get(value)?.setValue('');
  }

  countActiveFilters(value: Filters): boolean {
    const { name, status, gender, species } = value;
    return !!(name || status || gender || species);
  }
}
