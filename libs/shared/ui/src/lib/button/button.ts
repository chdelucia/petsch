import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-ch-ui-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class ChButton {
  variant = input<'primary' | 'link'>('primary');
  fullWidth = input<boolean>(false);
  disabled = input<boolean>(false);

  clicked = output<void>();

  handleClick() {
    if (this.disabled()) return;
    this.clicked.emit();
  }
}
