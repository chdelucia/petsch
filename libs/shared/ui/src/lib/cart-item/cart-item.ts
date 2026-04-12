import { Component, input, output } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ui-cart-item',
  imports: [TranslocoDirective],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  imageSrc = input.required<string>();
  imageAlt = input<string>();
  name = input.required<string>();
  price = input<number>(0);
  color = input<string>();
  quantity = input<number>(1);
  day = input<string>();

  remove = output<void>();
}
