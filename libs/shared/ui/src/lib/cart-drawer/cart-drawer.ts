import {
  Component,
  signal,
  output,
  input,
} from '@angular/core';
import { CartFooter } from '../cart-footer/cart-footer';
import { CartList } from '../cart-list/cart-list';

@Component({
  selector: 'lib-ui-cart-drawer',
  imports: [CartFooter, CartList],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css',
})
export class CartDrawer {
  open = signal(true);

  subtotal = input.required<number>();
  checkoutClick = output<void>();

  closeDrawer() {
    this.open.set(false);
  }

  checkout() {
    this.checkoutClick.emit();
  }
}
