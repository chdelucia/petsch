import { Component, inject, computed, linkedSignal, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { Filters, PETLIST_STORE } from '@petsch/api';
import { Observable } from 'rxjs';
import {
  ChInputFilter,
  ChRadioFilter,
  ChActiveFiltersComponent,
} from '@petsch/ui';
import { form, FormField, debounce } from '@angular/forms/signals';

const kindOptions = ['dog', 'cat'] as const;
type KindKey = (typeof kindOptions)[number];

@Component({
  selector: 'lib-feature-filters',
  imports: [
    ChRadioFilter,
    ChInputFilter,
    ChActiveFiltersComponent,
    TranslocoDirective,
    FormField,
  ],
  templateUrl: './feature-filters.html',
})
export class FeatureFilters {
  readonly store = inject(PETLIST_STORE);
  private readonly transloco = inject(TranslocoService);

  private readonly kindOptions = kindOptions;

  private readonly translations = toSignal(
    this.transloco.selectTranslateObject(
      this.kindOptions,
    ) as unknown as Observable<Record<KindKey, string>>,
    { initialValue: {} as Record<KindKey, string> },
  );

  readonly localModel = linkedSignal(() => {
    const { name_like, kind } = this.store.filters();
    return {
      name_like: name_like ?? '',
      kind: kind ?? '',
    };
  });

  readonly filtersForm = form(this.localModel, (schema) => {
    debounce(schema.name_like, 700);
  });

  readonly filterConfigs = computed(() => {
    const t = this.translations() ?? {};

    return {
      kindOptions: this.kindOptions.map((key) => ({
        value: key,
        text: t[key] ?? key,
      })),
    };
  });

  constructor() {
    effect(() => {
      const { name_like, kind } = this.localModel();

      this.store.applyFilters({
        name_like: name_like || undefined,
        kind: kind || undefined,
      });
    });
  }

  resetFilter(value: string): void {
    this.localModel.update((current) => ({
      ...current,
      [value as keyof typeof current]: '',
    }));
  }

  get activeFilters(): Partial<Filters> {
    return this.store.filters();
  }
}
