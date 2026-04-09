import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Filters } from '@petsch/api';

@Component({
  selector: 'lib-product-active-filters',
  imports: [CommonModule],
  templateUrl: './active-filters.component.html',
  styleUrl: './active-filters.component.scss',
})
export class ActiveFiltersComponent {
  values = input<Filters>();
  resetFilter = output<string>();

  activeFilters = computed(() => this.countActiveFilters(this.values()!));

  deleteFilter(value: string): void {
    this.resetFilter.emit(value);
  }

  countActiveFilters(value: Filters): boolean {
    const { name, status, gender, species } = value;
    const atLeastOneFilled = name || status || gender || species;
    return !!atLeastOneFilled;
  }
}
