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
import { Button } from '../button/button';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ui-input-filter',
  imports: [CommonModule, Button, TranslocoDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFilter),
      multi: true,
    },
  ],
  templateUrl: './input-filter.component.html',
  styleUrl: './input-filter.component.css',
})
export class InputFilter implements ControlValueAccessor, OnInit {
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
    const name = (event.target as HTMLInputElement).value;
    this.value.set(name);
    this.searchText$.next(name);
  }

  togleFilter() {
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
    const alreadyExists = this.lastSearch().find((item) => item === value);
    if (!alreadyExists && value) {
      this.lastSearch.update((searches) => [value, ...searches]);
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
