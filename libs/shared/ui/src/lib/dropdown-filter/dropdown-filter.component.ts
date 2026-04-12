import {
  Component,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'lib-ch-ui-dropdown-filter',
  imports: [],
  templateUrl: './dropdown-filter.component.html',
  styleUrl: './dropdown-filter.component.css',
})
export class ChDropdownFilter {
  sortby = input<string>('id');

  options = input([
    { value: 'id', text: 'Most Popular' },
    { value: 'asc', text: 'Name: Asc' },
    { value: 'desc', text: 'Name: Desc' },
    { value: 'gender', text: 'Gender' },
    { value: 'status', text: 'Status' },
  ]);

  sortbyChange = output<{ key: unknown; order: unknown }>();

  isOpen = signal(false);

  emitValue(option: string): void {
    this.toggle();
    const result = { key: option, order: '' };
    if (option === 'asc' || option === 'desc') {
      result.key = 'name';
      result.order = option;
    }
    this.sortbyChange.emit(result);
  }

  toggle(): void {
    this.isOpen.update((v) => !v);
  }
}
