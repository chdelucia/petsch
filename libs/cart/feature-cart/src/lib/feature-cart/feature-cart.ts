import { Component, input, output } from '@angular/core';
import { CartDrawer } from '@petsch/ui';

@Component({
  selector: 'lib-feature-cart',
  imports: [CartDrawer],
  templateUrl: './feature-cart.html',
  styleUrl: './feature-cart.css',
})
export class FeatureCart {
  open = input<boolean>(true);
  openChange = output<boolean>();
}
