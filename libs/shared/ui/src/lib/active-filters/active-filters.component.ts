import { ChButton } from "../button/button";
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ch-ui-active-filters',
  imports: [CommonModule, TranslocoDirective, ChButton],
  templateUrl: './active-filters.component.html',
  styleUrl: './active-filters.component.css',
  /**
   * Performance Optimization: OnPush is used to optimize the rendering of the
   * active filters list, which can change frequently during user interaction.
   */
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChActiveFiltersComponent {
  testId = input<string>('');
  values = input<Partial<any>>();
  resetFilter = output<string>();

  items = computed(() => {
    const value = this.values();
    if (!value) return [];
    return Object.entries(value)
      .filter(
        ([key, val]) =>
          !key.startsWith('_') &&
          key !== 'page' &&
          !key.endsWith('_gte') &&
          !key.endsWith('_lte') &&
          !!val,
      )
      .map(([key, val]) => ({
        key,
        label: key === 'name_like' ? 'name' : key,
        value: val,
      }));
  });

  activeFilters = computed(() => this.items().length > 0);

  deleteFilter(value: string): void {
    this.resetFilter.emit(value);
  }
}
