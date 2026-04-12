import { booleanAttribute, Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-ui-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  variant = input<'primary' | 'link'>('primary');
  fullWidth = input<boolean, unknown>(false, { transform: booleanAttribute });
  disabled = input<boolean>(false);

  clicked = output<void>();

  handleClick() {
    if (this.disabled()) return;
    this.clicked.emit();
  }
}
