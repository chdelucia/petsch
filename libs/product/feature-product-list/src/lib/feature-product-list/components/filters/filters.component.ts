import { Component, effect, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActiveFiltersComponent } from './active-filters/active-filters.component';
import { Filters } from '@petsch/api';
import { InputFilterComponent, RadioFilterComponent } from '@petsch/ui';

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
