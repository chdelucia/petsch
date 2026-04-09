import { Component, input, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Product } from '@petsch/api';
import { CurrentTransitionService } from '../../../current-transition.service';
import { Button } from '@petsch/ui';

@Component({
  selector: 'lib-product-card',
  imports: [RouterLink, Button],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  item = input.required<Product>();

  transitionService = inject(CurrentTransitionService);

  viewTransitionName(char: Product) {
    const transition = this.transitionService.currentTransition();
    const isBannerImg =
      transition?.to.firstChild?.firstChild?.params['id'] ===
        char.id.toString() ||
      transition?.from.firstChild?.firstChild?.params['id'] ===
        char.id.toString();
    return isBannerImg ? 'banner-img' : '';
  }
}
