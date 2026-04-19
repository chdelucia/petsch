import { ChButton } from "../button/button";
import { Component, output, input, HostListener } from '@angular/core';
import { ChCartFooter } from '../cart-footer/cart-footer';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ch-ui-cart-drawer',
  imports: [ChCartFooter, TranslocoDirective, ChButton],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css',
})
export class ChCartDrawer {
  testId = input<string>('cart-drawer');
  open = input<boolean>(false);
  position = input<'left' | 'right'>('right');

  titleLabel = input.required<string>();

  showFooter = input<boolean>(true);

  closeLabel = input<string>();

  openChange = output<boolean>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) {
      this.closeDrawer();
    }
  }

  closeDrawer(): void {
    this.openChange.emit(false);
  }
}
