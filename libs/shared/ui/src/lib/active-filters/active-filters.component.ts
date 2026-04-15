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

  items = computed(() => {
    const value = this.values();
    if (!value) return [];
    return Object.entries(value)
      .filter(([key, val]) => !key.startsWith('_') && key !== 'page' && !!val)
      .map(([key, value]) => ({ key, value }));
  });

  activeFilters = computed(() => this.items().length > 0);

  deleteFilter(value: string): void {
    this.resetFilter.emit(value);
  }
}
