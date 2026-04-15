import { Component, forwardRef, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-ch-ui-health-filter',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChHealthFilter),
      multi: true,
    },
  ],
  templateUrl: './health-filter.component.html',
  styleUrl: './health-filter.component.css',
})
export class ChHealthFilter implements ControlValueAccessor {
  testId = input<string>('');
  title = input.required<string>();
  options = input.required<{ value: string; text: string }[]>();

  isOpen = signal(true);
  value = signal('');

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

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
    this.onChange(name);
  }

  toggleFilter() {
    this.isOpen.update((current) => !current);
  }
}
