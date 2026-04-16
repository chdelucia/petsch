import { Component, forwardRef, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';

export interface RangeValue {
  min: number | null;
  max: number | null;
}

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

  isOpen = signal(true);
  value = signal<RangeValue>({ min: null, max: null });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: RangeValue) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  writeValue(value: RangeValue): void {
    this.value.set(value || { min: null, max: null });
  }

  registerOnChange(fn: (value: RangeValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateMin(event: Event): void {
    const min = (event.target as HTMLInputElement).value;
    const newValue = { ...this.value(), min: min ? Number(min) : null };
    this.value.set(newValue);
    this.onChange(newValue);
  }

  updateMax(event: Event): void {
    const max = (event.target as HTMLInputElement).value;
    const newValue = { ...this.value(), max: max ? Number(max) : null };
    this.value.set(newValue);
    this.onChange(newValue);
  }

  toggleFilter() {
    this.isOpen.update((current) => !current);
  }
}
