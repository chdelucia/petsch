import { ChButton } from "../button/button";
import { Component, input, signal, ChangeDetectionStrategy, model } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ch-ui-radio-filter',
  imports: [CommonModule, ChButton],
  templateUrl: './radio-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './radio-filter.component.css',
})
export class ChRadioFilter {
  testId = input<string>('');
  title = input.required<string>();
  options = input.required<{ value: string; text: string }[]>();

  isOpen = signal(true);
  value = model('');

  getValue(event: Event): void {
    const name = (event.target as HTMLInputElement).value;
    this.value.set(name);
  }

  toggleFilter() {
    this.isOpen.update((current) => !current);
  }
}
