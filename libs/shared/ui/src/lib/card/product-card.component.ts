import { Component, input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { PET_API_CONFIG } from '@petsch/api';

@Component({
  selector: 'lib-ch-ui-card',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  host: {
    '[attr.data-testid]': 'testId()',
  },
})
export class ChCard {
  private readonly config = inject(PET_API_CONFIG, { optional: true });

  testId = input<string>('');
  id = input.required<number>();
  name = input.required<string>();
  imageUrl = input.required<string>();
  viewTransitionName = input<string>('');
  priority = input<boolean>(false);

  get detailRoute(): string[] {
    const listRoute = this.config?.listRoute ?? '/pets';
    return [listRoute, this.id().toString()];
  }
}
