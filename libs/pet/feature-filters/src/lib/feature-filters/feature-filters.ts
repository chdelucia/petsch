import {
  Component,
  inject,
  computed,
  signal,
  effect,
  untracked,
  input,
  output,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toSignal,
  toObservable,
} from '@angular/core/rxjs-interop';
import { form as angularForm, FormField } from '@angular/forms/signals';
import { TranslocoService, TranslocoDirective } from '@jsverse/transloco';
import { Filters, PETLIST_STORE } from '@petsch/api';
import {
  debounceTime,
  distinctUntilChanged,
  merge,
  Observable,
  skip,
} from 'rxjs';
import {
  ChInputFilter,
  ChRadioFilter,
  ChActiveFiltersComponent,
  ChButton,
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
    ChButton,
  ],
  templateUrl: './feature-filters.html',
})
export class FeatureFilters {
  readonly store = inject(PETLIST_STORE);
  private readonly transloco = inject(TranslocoService);

  testId = input<string>('filters');
  autoApply = input(true);
  apply = output<void>();

  readonly form = signal<Partial<Filters>>({
    name_like: '',
    kind: '',
  });

  readonly formTree = angularForm(this.form);

  private readonly lastSyncedFilters = signal<Partial<Filters>>({});

  private readonly kindOptions = kindOptions;

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
    // Synchronize local form with store filters (Unidirectional: Store -> Form)
    effect(() => {
      const storeFilters = this.store.filters();
      const lastSynced = this.lastSyncedFilters();

      untracked(() => {
        // Only update if the store filters have changed relative to the last synced state
        // This prevents our local user changes from being immediately overwritten.
        if (JSON.stringify(storeFilters) !== JSON.stringify(lastSynced)) {
          const next = {
            name_like: storeFilters.name_like ?? '',
            kind: storeFilters.kind ?? '',
          };
          this.form.set(next);
          this.lastSyncedFilters.set(storeFilters);
        }
      });
    });

    // Handle user input changes (Unidirectional: Form -> Store)
    const filterConfigs = this.filterConfigs();
    const filterChanges$ = filterConfigs.map((config) => {
      const field = (this.formTree as any)[config.key]();
      return toObservable(field.value).pipe(
        skip(1),
        distinctUntilChanged(),
        debounceTime(config.debounceTime),
      );
    });

    merge(...filterChanges$)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        if (this.autoApply()) {
          this.pushFiltersToStore();
        }
      });
  }

  manualApply(): void {
    this.pushFiltersToStore(true);
    this.apply.emit();
  }

  private pushFiltersToStore(force = false): void {
    const currentValues = {
      name_like: (this.formTree as any).name_like().value(),
      kind: (this.formTree as any).kind().value(),
    };
    const storeFilters = untracked(() => this.store.filters());

    // Only push if there are actual changes compared to the store to prevent loops
    const managedKeys: (keyof Filters)[] = ['name_like', 'kind'];
    const hasChanges = managedKeys.some((key) => {
      const fVal = (currentValues as any)[key] ?? '';
      const sVal = (storeFilters as any)[key] ?? '';
      return fVal !== sVal;
    });

    if (hasChanges || force) {
      this.store.applyFilters(currentValues);
      this.lastSyncedFilters.set(this.store.filters());
      this.store.loadProducts();
    }
  }

  resetFilter(key: string): void {
    const field = (this.formTree as any)[key];

    if (field) {
      field().value.set('');
    }

    this.store.removeFilter(key as keyof Filters);
    this.lastSyncedFilters.set(this.store.filters());
    this.store.loadProducts();
  }
}
