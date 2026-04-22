import {
  Component,
  input,
  inject,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { PRODUCT_UI_CONFIG } from '@petsch/api';

@Component({
  selector: 'lib-ch-ui-card',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  host: {
    '[attr.data-testid]': 'testId()',
  },
  // Optimization: Use OnPush to reduce change detection cycles in lists.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChCard {
  private readonly config = inject(PRODUCT_UI_CONFIG, { optional: true });

  testId = input<string>('');
  id = input.required<number>();
  name = input.required<string>();
  imageUrl = input.required<string>();
  viewTransitionName = input<string>('');
  priority = input<boolean>(false);

  // Optimization: Use computed signal to memoize the detail route array.
  // This avoids re-allocating a new array on every change detection cycle,
  // which prevents unnecessary downstream updates in RouterLink.
  detailRoute = computed(() => {
    const listRoute = this.config?.listRoute ?? '/pets';
    return [listRoute, this.id().toString()];
  });
}
