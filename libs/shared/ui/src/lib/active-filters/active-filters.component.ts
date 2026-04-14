import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Filters } from '@petsch/api';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ch-ui-active-filters',
  imports: [CommonModule, TranslocoDirective],
  templateUrl: './active-filters.component.html',
  styleUrl: './active-filters.component.css',
})
export class ChActiveFiltersComponent {
  testId = input<string>('');
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
    const { name_like, kind } = value;
    const atLeastOneFilled = name_like || kind;
    return !!atLeastOneFilled;
  }
}
