import { Component, input, output } from '@angular/core';
import { Button } from '../button/button';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ui-cart-footer',
  imports: [Button, TranslocoDirective],
  templateUrl: './cart-footer.html',
  styleUrl: './cart-footer.css',
})
export class CartFooter {
  closeDrawer = output<void>();
}
