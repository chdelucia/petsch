import { ChButton } from "../button/button";
import { TranslocoDirective } from "@jsverse/transloco";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

export interface SortOption {
  key: string;
  order: string;
  text: string;
}

@Component({
  selector: 'lib-ch-ui-dropdown-filter',
  imports: [ChButton, TranslocoDirective],
  templateUrl: './dropdown-filter.component.html',
  styleUrl: './dropdown-filter.component.css',
  host: {
    '[attr.data-testid]': 'testId()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChDropdownFilter {
  testId = input<string>('');
  options = input.required<SortOption[]>();

  private readonly internalSortBy = signal<{ key: string; order: string } | null>(
    null,
  );

  sortby = computed(() => {
    const options = this.options();
    const internal = this.internalSortBy();

    if (!internal) {
      return options[0];
    }

    return (
      options.find(
        (o) => o.key === internal.key && o.order === internal.order,
      ) ?? options[0]
    );
  });

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

  emitValue(option: SortOption): void {
    this.toggle();
    this.internalSortBy.set({ key: option.key, order: option.order });
    this.sortbyChange.emit({ key: option.key, order: option.order });
  }

  toggle(): void {
    this.isOpen.update((v) => !v);
  }
}
