import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  OnInit,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChButton } from '../button/button';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ch-ui-input-filter',
  imports: [CommonModule, ChButton, TranslocoDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChInputFilter),
      multi: true,
    },
  ],
  templateUrl: './input-filter.component.html',
  styleUrl: './input-filter.component.css',
})
export class ChInputFilter implements ControlValueAccessor, OnInit {
  testId = input<string>('');
  title = input.required<string>();

  isfilterOpen = signal(true);
  isLastSearchOpen = signal(false);

  value = signal('');
  lastSearch = signal<Array<string>>([]);

  private readonly searchText$ = new Subject<string>();

  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeLastSearch();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  ngOnInit(): void {
    this.searchText$
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        this.addSearch(value);
        this.onChange(value);
        this.closeLastSearch();
      });
  }

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  getValue(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const name = target.value;
      this.value.set(name);
      this.searchText$.next(name);
    }
  }

  toggleFilter() {
    this.isfilterOpen.update((open) => !open);
  }

  openLastsearch(): void {
    if (this.lastSearch().length) {
      this.isLastSearchOpen.set(true);
    }
  }

  closeLastSearch(): void {
    this.isLastSearchOpen.set(false);
  }

  addSearch(value: string): void {
    const trimmedValue = value?.trim().slice(0, 100);
    if (!trimmedValue) return;

    const alreadyExists = this.lastSearch().find((item) => item === trimmedValue);
    if (!alreadyExists) {
      this.lastSearch.update((searches) =>
        [trimmedValue, ...searches].slice(0, 10),
      );
    }
  }

  removeSearch(index: number, e: Event): void {
    e.stopPropagation();
    e.preventDefault();
    this.lastSearch.update((searches) => {
      const newSearches = [...searches];
      newSearches.splice(index, 1);
      return newSearches;
    });
  }

  searchByOldValue(value: string): void {
    if (value !== this.value()) {
      this.value.set(value);
      this.onChange(value);
      this.onTouched();
      this.closeLastSearch();
    }
  }
}
