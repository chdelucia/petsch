import { Component, input, output } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ch-ui-cart-item',
  imports: [TranslocoDirective],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class ChCartItem {
  imageSrc = input.required<string>();
  name = input.required<string>();
  day = input<string>();
  remove = output<void>();
}
