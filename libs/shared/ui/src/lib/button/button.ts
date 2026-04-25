import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgClass } from '@angular/common';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'lib-ch-ui-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
  /**
   * Performance Optimization: OnPush change detection strategy is used here
   * because the component relies exclusively on Signal inputs. This reduces
   * the number of change detection cycles, especially when this component
   * is used in large lists.
   */
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChButton {
  testId = input<string>('');
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  fullWidth = input<boolean, unknown>(false, { transform: booleanAttribute });
  disabled = input<boolean>(false);
  isActive = input<boolean, unknown>(false, { transform: booleanAttribute });
  ariaLabel = input<string>('');

  clicked = output<MouseEvent>();

  handleClick(event: MouseEvent) {
    if (this.disabled()) return;
    this.clicked.emit(event);
  }
}
