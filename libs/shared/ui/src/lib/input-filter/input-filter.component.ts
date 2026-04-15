import {
  Component,
  ElementRef,
  HostListener,
  forwardRef,
  inject,
  input,
  model,
  signal,
  effect,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class ChInputFilter implements ControlValueAccessor {
  testId = input<string>('');
  title = input.required<string>();

  isfilterOpen = signal(true);
  isLastSearchOpen = signal(false);

  value = model('');
  lastSearch = signal<Array<string>>([]);

  private isInteractive = false;
  private readonly elementRef = inject(ElementRef);

  constructor() {
    effect((onCleanup) => {
      const val = this.value();

      if (!this.isInteractive) {
        return;
      }

      const timeout = setTimeout(() => {
        untracked(() => {
          this.addSearch(val);
          this.onChange(val);
          this.closeLastSearch();
          this.isInteractive = false;
        });
      }, 700);

      onCleanup(() => clearTimeout(timeout));
    });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeLastSearch();
    }
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.isInteractive = false;
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
    this.isInteractive = true;
    this.value.set(name);
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
      this.isInteractive = false;
      this.value.set(value);
      this.addSearch(value);
      this.onChange(value);
      this.closeLastSearch();
      this.onTouched();
    }
  }
}
