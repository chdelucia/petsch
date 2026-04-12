import {
  Component,
  ElementRef,
  HostListener,
  inject,
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
  sortby = signal({ key: 'id', order: 'asc', text: 'Most Popular' });

  options = input([
    { key: 'id', order: 'asc', text: 'Most Popular' },
    { key: 'name', order: 'asc', text: 'Name: Asc' },
    { key: 'name', order: 'desc', text: 'Name: Desc' },
    { key: 'weight', order: 'asc', text: 'Weight: Asc' },
    { key: 'weight', order: 'desc', text: 'Weight: Desc' },
    { key: 'height', order: 'asc', text: 'Height: Asc' },
    { key: 'height', order: 'desc', text: 'Height: Desc' },
    { key: 'length', order: 'asc', text: 'Length: Asc' },
    { key: 'length', order: 'desc', text: 'Length: Desc' },
  ]);
  testId = input<string>();

  sortbyChange = output<{ key: string; order: string }>();

  isOpen = signal(false);

  private readonly el = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.el.nativeElement.contains(event.target);

    if (!clickedInside && this.isOpen()) {
      this.isOpen.set(false);
    }
  }

  emitValue(option: { key: string; order: string; text: string }): void {
    this.toggle();
    this.sortby.set(option);
    this.sortbyChange.emit(option);
  }

  toggle(): void {
    this.isOpen.update((v) => !v);
  }
}
