import { Component, input, output } from '@angular/core';
import { ChButton } from '../button/button';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ch-ui-cart-footer',
  imports: [ChButton, TranslocoDirective],
  templateUrl: './cart-footer.html',
  styleUrl: './cart-footer.css',
})
export class ChCartFooter {
  closeLabel = input<string>();

  closeDrawer = output<void>();
}
