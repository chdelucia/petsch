import { Component, output, input } from '@angular/core';
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

  titleLabel = input.required<string>();

  showFooter = input<boolean>(true);

  openChange = output<boolean>();

  closeDrawer(): void {
    this.openChange.emit(false);
  }
}
