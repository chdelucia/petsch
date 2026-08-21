import { ChButton } from "../button/button";
import { TranslocoDirective } from "@jsverse/transloco";
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
  model,
} from '@angular/core';

export interface DropdownOption {
  key?: string;
  order?: string;
  value?: string;
  text: string;
}

export type SortOption = DropdownOption;

@Component({
  selector: 'lib-ch-ui-dropdown-filter',
  imports: [ChButton, TranslocoDirective, CommonModule],
  templateUrl: './dropdown-filter.component.html',
  styleUrl: './dropdown-filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-testid]': 'testId()',
  },
})
export class ChDropdownFilter {
  testId = input<string>('');
  title = input<string>('');
  options = input.required<DropdownOption[]>();

  value = model<string>('');

  private readonly internalSortBy = signal<{ key: string; order: string } | null>(
    null,
  );

  sortby = computed(() => {
    const options = this.options();
    const internal = this.internalSortBy();

    if (!internal) {
      return options[0] ?? { text: '' };
    }

    return (
      options.find(
        (o) => o.key === internal.key && o.order === internal.order,
      ) ?? options[0] ?? { text: '' }
    );
  });

  selectedText = computed(() => {
    const val = this.value();
    if (val) {
      const match = this.options().find((o) => (o.value ?? o.key) === val);
      if (match) return match.text;
    }
    return this.sortby().text;
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

  emitValue(option: DropdownOption): void {
    this.toggle();
    const val = option.value ?? option.key ?? '';
    this.value.set(val);

    if (option.key && option.order) {
      this.internalSortBy.set({ key: option.key, order: option.order });
      this.sortbyChange.emit({ key: option.key, order: option.order });
    }
  }

  toggle(): void {
    this.isOpen.update((v) => !v);
  }
}
