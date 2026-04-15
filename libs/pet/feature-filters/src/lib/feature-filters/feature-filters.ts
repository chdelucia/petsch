import {
  Component,
  inject,
  computed,
  signal,
  effect,
  untracked,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { form as angularForm, FormField } from '@angular/forms/signals';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { Filters, PETLIST_STORE } from '@petsch/api';
import { Observable } from 'rxjs';
import {
  ChInputFilter,
  ChRadioFilter,
  ChActiveFiltersComponent,
} from '@petsch/ui';

interface FilterConfig {
  key: keyof Filters;
  type: 'input' | 'radio';
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
    FormField,
    ChActiveFiltersComponent,
    TranslocoDirective,
  ],
  templateUrl: './feature-filters.html',
})
export class FeatureFilters {
  readonly store = inject(PETLIST_STORE);
  private readonly transloco = inject(TranslocoService);

  readonly form = signal<Filters>({
    name_like: '',
    kind: '',
    _page: 1,
    _limit: 10,
    _sort: '',
    _order: 'asc',
    weight: 0,
    length: 0,
    height: 0,
  });

  readonly formTree = angularForm(this.form);

  private readonly kindOptions = kindOptions;
  private isFirstExecution = true;

  private readonly translations = toSignal(
    this.transloco.selectTranslateObject(
      this.kindOptions,
    ) as unknown as Observable<Record<KindKey, string>>,
    { initialValue: {} as Record<KindKey, string> },
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
    ];
  });

  constructor() {
    effect((onCleanup) => {
      const formValue = this.form();

      if (this.isFirstExecution) {
        this.isFirstExecution = false;
        return;
      }

      const timeout = setTimeout(() => {
        untracked(() => {
          this.store.applyFilters(formValue);
          this.store.loadProducts();
        });
      }, 500);

      onCleanup(() => {
        clearTimeout(timeout);
      });
    });
  }

  resetFilter(key: string): void {
    const filters = this.form();
    if (key in filters) {
      this.form.update((f) => ({ ...f, [key]: '' }));
    }
    this.store.removeFilter(key as keyof Filters);
  }
}
