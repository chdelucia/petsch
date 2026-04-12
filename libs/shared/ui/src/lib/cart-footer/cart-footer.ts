import { Component, input, output } from '@angular/core';
import { Button } from '../button/button';
import { TranslocoDirective } from '@jsverse/transloco';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'lib-ui-cart-footer',
  imports: [Button, TranslocoDirective, CurrencyPipe],
  templateUrl: './cart-footer.html',
  styleUrl: './cart-footer.css',
})
export class CartFooter {
  subtotal = input<number>(0);
  checkoutLabel = input<string>();
  closeLabel = input<string>();

  checkoutClick = output<void>();
  closeDrawer = output<void>();
}
