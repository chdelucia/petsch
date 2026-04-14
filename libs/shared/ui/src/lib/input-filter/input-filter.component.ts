import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChButton } from '../button/button';
import { TranslocoDirective } from '@jsverse/transloco';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'lib-ch-ui-input-filter',
  imports: [CommonModule, ChButton, TranslocoDirective],
  templateUrl: './input-filter.component.html',
  styleUrl: './input-filter.component.css',
})
export class ChInputFilter implements FormValueControl<string> {
  testId = input<string>('');
  title = input.required<string>();

  isfilterOpen = signal(true);
  isLastSearchOpen = signal(false);

  value = model('');
  lastSearch = signal<Array<string>>([]);

  private readonly elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeLastSearch();
    }
  }

  getValue(event: Event): void {
    const name = (event.target as HTMLInputElement).value;
    this.value.set(name);
    this.addSearch(name);
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
      this.closeLastSearch();
    }
  }
}
