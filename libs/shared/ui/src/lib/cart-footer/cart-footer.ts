import { Component, input, output } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'lib-ui-cart-footer',
  imports: [Button],
  templateUrl: './cart-footer.html',
  styleUrl: './cart-footer.css',
})
export class CartFooter {
  subtotal = input.required<number>();

  checkout = output<void>();
  closeDrawer = output<void>();
}
