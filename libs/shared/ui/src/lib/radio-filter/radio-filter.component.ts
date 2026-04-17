import { ChButton } from "../button/button";
import { Component, forwardRef, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-ch-ui-radio-filter',
  imports: [CommonModule, ChButton],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChRadioFilter),
      multi: true,
    },
  ],
  templateUrl: './radio-filter.component.html',
  styleUrl: './radio-filter.component.css',
})
export class ChRadioFilter implements ControlValueAccessor {
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

  togleFilter() {
    this.isOpen.update((current) => !current);
  }
}
