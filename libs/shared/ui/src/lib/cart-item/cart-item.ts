import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'lib-ui-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: '' }
})
export class CartItem {
  imageSrc = input.required<string>();
  imageAlt = input.required<string>();
  name = input.required<string>();
  price = input.required<number>();
  color = input<string>();
  quantity = input<number>(1);

  remove = output<void>();
}
