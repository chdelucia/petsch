import {
  Component,
  input,
  inject,
  ChangeDetectionStrategy,
  computed,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { PRODUCT_UI_CONFIG } from '@petsch/api';

@Component({
  selector: 'lib-ch-ui-card',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-testid]': 'testId()',
  },
})
export class ChCard {
  private readonly config = inject(PRODUCT_UI_CONFIG, { optional: true });

  testId = input<string>('');
  id = input.required<number>();
  name = input.required<string>();
  imageUrl = input.required<string>();
  viewTransitionName = input<string>('');
  priority = input<boolean>(false);

  /**
   * Memoized route to the product details page.
   * Prevents re-calculation on every change detection cycle.
   */
  detailRoute = computed(() => {
    const listRoute = this.config?.listRoute ?? '/pets';
    return [listRoute, this.id().toString()];
  });
}
