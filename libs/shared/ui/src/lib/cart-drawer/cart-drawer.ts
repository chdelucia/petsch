import { Component, signal, output, input } from '@angular/core';
import { CartFooter } from '../cart-footer/cart-footer';
import { CartList } from '../cart-list/cart-list';

@Component({
  selector: 'lib-ui-cart-drawer',
  imports: [CartFooter, CartList],
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
