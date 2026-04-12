import { Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ui-cart-item',
  imports: [TranslocoDirective, NgOptimizedImage],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  imageSrc = input.required<string>();
  name = input.required<string>();
  day = input<string>();

  remove = output<void>();
}
