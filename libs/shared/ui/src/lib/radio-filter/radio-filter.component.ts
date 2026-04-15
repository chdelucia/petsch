import {
  Component,
  forwardRef,
  input,
  model,
  signal,
  effect,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-ch-ui-radio-filter',
  imports: [CommonModule],
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
  value = model('');

  private isInteractive = false;

  constructor() {
    effect(() => {
      const val = this.value();

      if (!this.isInteractive) {
        return;
      }

      untracked(() => {
        this.onChange(val);
        this.isInteractive = false;
      });
    });
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
    this.isOpen.update((current) => !current);
  }
}
