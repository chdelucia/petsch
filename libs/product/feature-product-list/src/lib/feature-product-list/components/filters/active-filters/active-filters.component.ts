import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Filters } from '@petsch/api';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-product-active-filters',
  imports: [CommonModule, TranslocoDirective],
  templateUrl: './active-filters.component.html',
  styleUrl: './active-filters.component.css',
})
export class ActiveFiltersComponent {
  values = input<Partial<Filters>>();
  resetFilter = output<string>();

  activeFilters = computed(() => {
    const value = this.values();
    return value ? this.countActiveFilters(value) : false;
  });

  deleteFilter(value: string): void {
    this.resetFilter.emit(value);
  }

  countActiveFilters(value: Partial<Filters>): boolean {
    const { name, kind } = value;
    const atLeastOneFilled = name || kind;
    return !!atLeastOneFilled;
  }
}
