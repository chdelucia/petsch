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
    const values = this.values() ?? {};
    return Object.entries(values)
      .filter(([key, value]) => !key.startsWith('_') && !!value)
      .map(([key, value]) => ({ key, value }));
  });

  deleteFilter(value: string): void {
    this.resetFilter.emit(value);
  }
}
