import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  forwardRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Button } from '../button/button';

@Component({
  selector: 'lib-ui-input-filter',
  imports: [CommonModule, Button],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFilterComponent),
      multi: true,
    },
  ],
  templateUrl: './input-filter.component.html',
  styleUrl: './input-filter.component.scss',
})
export class InputFilterComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input({ required: true }) title!: string;

  isfilterOpen = true;
  isLastSearchOpen = false;

  value = '';
  lastSearch: Array<string> = [];

  private searchText$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  private readonly elementRef = inject(ElementRef);

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
      .pipe(debounceTime(700), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.addSearch(value);
        this.onChange(value);
        this.closeLastSearch();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: string): void {
    this.value = value;
    this.addSearch(value);
    this.onChange(value);
    this.onTouched();
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  getValue(event: Event): void {
    const name = (event.target as HTMLInputElement).value;
    this.searchText$.next(name);
  }

  togleFilter() {
    this.isfilterOpen = !this.isfilterOpen;
  }

  openLastsearch(): void {
    if (this.lastSearch.length) {
      this.isLastSearchOpen = true;
    }
  }

  closeLastSearch(): void {
    this.isLastSearchOpen = false;
  }

  addSearch(value: string): void {
    const alredyExist = this.lastSearch.find((item) => item === value);
    if (!alredyExist && value) {
      this.lastSearch.unshift(value);
    }
  }

  removeSearch(index: number, e: Event): void {
    e.stopPropagation();
    e.preventDefault();
    this.lastSearch.splice(index, 1);
  }

  searchByOldValue(value: string): void {
    if (value !== this.value) {
      this.value = value;
      this.onChange(value);
      this.closeLastSearch();
    }
  }
}
