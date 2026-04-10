import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../button/button';

@Component({
  selector: 'lib-ui-product-card',
  standalone: true,
  imports: [RouterLink, Button],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  id = input.required<string>();
  title = input.required<string>();
  name = input.required<string>();
  price = input.required<number>();
  imageUrl = input.required<string>();
  categoryName = input.required<string>();
  viewTransitionName = input<string>('');
}
