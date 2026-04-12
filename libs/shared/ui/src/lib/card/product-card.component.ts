import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'lib-ch-ui-card',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ChCard {
  id = input.required<number>();
  name = input.required<string>();
  imageUrl = input.required<string>();
  viewTransitionName = input<string>('');
  priority = input<boolean>(false);
}
