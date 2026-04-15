import { Component, inject, computed, signal } from '@angular/core';
import {
  takeUntilDestroyed,
  toSignal,
  toObservable,
} from '@angular/core/rxjs-interop';
import { form as angularForm, FormField } from '@angular/forms/signals';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { Filters, PETLIST_STORE } from '@petsch/api';
import { debounceTime, merge, Observable, of } from 'rxjs';
import {
  ChInputFilter,
  ChRadioFilter,
  ChHealthFilter,
  ChActiveFiltersComponent,
} from '@petsch/ui';

interface FilterConfig {
  key: keyof Filters;
  type: 'input' | 'radio' | 'health';
  options?: { value: string; text: string }[];
  debounceTime: number;
}

const kindOptions = ['dog', 'cat'] as const;
type KindKey = (typeof kindOptions)[number];

@Component({
  selector: 'lib-feature-filters',
  imports: [
    ChRadioFilter,
    ChInputFilter,
    ChHealthFilter,
    FormField,
    ChActiveFiltersComponent,
    TranslocoDirective,
  ],
  templateUrl: './feature-filters.html',
})
export class FeatureFilters {
  readonly store = inject(PETLIST_STORE);
  private readonly transloco = inject(TranslocoService);

  readonly form = signal<Partial<Filters>>({
    name_like: '',
    kind: '',
    weight_gte: undefined,
    weight_lte: undefined,
    length_gte: undefined,
    length_lte: undefined,
    health: '',
  });

  readonly formTree = angularForm(this.form);

  private readonly kindOptions = kindOptions;

  private readonly translations = toSignal(
    this.transloco.selectTranslateObject([
      ...this.kindOptions,
      'unhealthy',
      'healthy',
      'veryHealthy',
    ]) as unknown as Observable<Record<string, string>>,
    { initialValue: {} as Record<string, string> },
  );

  readonly filterConfigs = computed<FilterConfig[]>(() => {
    const t = this.translations() ?? {};

    return [
      {
        key: 'name_like',
        type: 'input',
        debounceTime: 200,
      },
      {
        key: 'kind',
        type: 'radio',
        options: this.kindOptions.map((key) => ({
          value: key,
          text: t[key] ?? key,
        })),
        debounceTime: 500,
      },
      {
        key: 'health',
        type: 'health',
        options: [
          { value: 'unhealthy', text: t['unhealthy'] || 'Unhealthy' },
          { value: 'healthy', text: t['healthy'] || 'Healthy' },
          { value: 'very healthy', text: t['veryHealthy'] || 'Very Healthy' },
        ],
        debounceTime: 500,
      },
    ];
  });

  constructor() {
    const filterChanges$ = this.filterConfigs().map((config) => {
      const field = (this.formTree as Record<string, any>)[config.key];
      if (typeof field !== 'function') {
        return of(null);
      }
      return toObservable(field().value).pipe(debounceTime(config.debounceTime));
    });

    merge(...filterChanges$)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        const currentForm = this.form();
        const health = currentForm.health;

        if (health) {
          this.applyHealthFilterRanges(health as any);
        } else {
          this.clearHealthFilterRanges();
        }

        this.store.applyFilters(this.form());
        this.store.loadProducts();
      });
  }

  private applyHealthFilterRanges(status: 'unhealthy' | 'healthy' | 'very healthy') {
    let weight_gte, weight_lte, length_gte, length_lte;

    if (status === 'unhealthy') {
      weight_gte = 5000;
      weight_lte = 10000;
      length_gte = 10;
      length_lte = 20;
    } else if (status === 'very healthy') {
      weight_gte = 1000;
      weight_lte = 2000;
      length_gte = 30;
      length_lte = 60;
    } else {
      weight_gte = 2000;
      weight_lte = 5000;
      length_gte = 30;
      length_lte = 60;
    }

    this.form.update((f) => ({
      ...f,
      weight_gte,
      weight_lte,
      length_gte,
      length_lte,
    }));
  }

  private clearHealthFilterRanges() {
    this.form.update((f) => ({
      ...f,
      weight_gte: undefined,
      weight_lte: undefined,
      length_gte: undefined,
      length_lte: undefined,
    }));
  }

  resetFilter(key: string): void {
    const field = (this.formTree as Record<string, any>)[key];
    if (field) {
      field().value.set('');
    }
    this.store.removeFilter(key as keyof Filters);
  }
}
