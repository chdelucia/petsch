import { Component, output, input } from '@angular/core';
import { CartFooter } from '../cart-footer/cart-footer';
import { CartList } from '../cart-list/cart-list';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ui-cart-drawer',
  imports: [CartFooter, CartList, TranslocoDirective],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css',
})
export class CartDrawer {
  open = input<boolean>(true);
  openChange = output<boolean>();

  subtotal = input.required<number>();
  checkoutClick = output<void>();

  closeDrawer() {
    this.openChange.emit(false);
  }

  checkout() {
    this.checkoutClick.emit();
  }
}
