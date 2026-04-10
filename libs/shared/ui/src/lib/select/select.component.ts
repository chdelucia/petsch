import {
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption<T = unknown> {
  value: T;
  label: string;
}

@Component({
  selector: 'lib-ui-select',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent<T = unknown> implements ControlValueAccessor {
  label = input<string>('');
  options = input.required<SelectOption<T>[]>();

  value = signal<T | null>(null);
  disabled = signal(false);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: T) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  writeValue(value: T): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;

    const selectedOption = this.options().find(
      (opt) => String(opt.value) === value,
    );

    if (selectedOption) {
      this.value.set(selectedOption.value);
      this.onChange(selectedOption.value);
    }
    this.onTouched();
  }
}
