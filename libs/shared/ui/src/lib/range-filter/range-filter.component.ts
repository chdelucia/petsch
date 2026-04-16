import { Component, forwardRef, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ch-ui-range-filter',
  imports: [CommonModule, TranslocoDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChRangeFilter),
      multi: true,
    },
  ],
  templateUrl: './range-filter.component.html',
  styleUrl: './range-filter.component.css',
})
export class ChRangeFilter implements ControlValueAccessor {
  testId = input<string>('');
  title = input.required<string>();
  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);

  isOpen = signal(true);
  value = signal<number | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: number | null) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  writeValue(value: number | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateValue(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    const newValue = val ? Number(val) : null;
    this.value.set(newValue);
    this.onChange(newValue);
  }

  toggleFilter() {
    this.isOpen.update((current) => !current);
  }
}
