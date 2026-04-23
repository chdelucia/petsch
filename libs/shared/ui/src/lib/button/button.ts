import { booleanAttribute, Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'lib-ch-ui-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class ChButton {
  testId = input<string>('');
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  fullWidth = input<boolean, unknown>(false, { transform: booleanAttribute });
  disabled = input<boolean>(false);
  isActive = input<boolean, unknown>(false, { transform: booleanAttribute });
  ariaLabel = input<string>('');
  ariaExpanded = input<boolean | undefined>(undefined);
  ariaControls = input<string>('');
  ariaHasPopup = input<boolean | string>(false);

  clicked = output<MouseEvent>();

  handleClick(event: MouseEvent) {
    if (this.disabled()) return;
    this.clicked.emit(event);
  }
}
