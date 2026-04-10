import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@petsch/api';
import { Button } from '../button/button';

@Component({
  selector: 'lib-ui-product-card',
  standalone: true,
  imports: [RouterLink, Button],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  item = input.required<Product>();
  viewTransitionName = input<string>('');
}
