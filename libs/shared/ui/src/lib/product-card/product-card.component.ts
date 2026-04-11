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
  id = input.required<number>();
  name = input.required<string>();
  imageUrl = input.required<string>();
  categoryName = input.required<string>();
  viewTransitionName = input<string>('');
  status = input.required<string>();
}
