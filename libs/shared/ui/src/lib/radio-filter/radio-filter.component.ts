import { Component, input, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'lib-ch-ui-radio-filter',
  imports: [CommonModule],
  templateUrl: './radio-filter.component.html',
  styleUrl: './radio-filter.component.css',
})
export class ChRadioFilter implements FormValueControl<string> {
  testId = input<string>('');
  title = input.required<string>();
  options = input.required<{ value: string; text: string }[]>();

  isOpen = signal(true);
  value = model('');

  getValue(event: Event): void {
    const name = (event.target as HTMLInputElement).value;
    this.value.set(name);
  }

  togleFilter() {
    this.isOpen.update((current) => !current);
  }
}
