import {   Component,
  input,
  inject,
  computed,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { PRODUCT_UI_CONFIG } from '@petsch/api';
import { IMAGE_PLACEHOLDER } from '@petsch/shared-utils';

@Component({
  selector: 'lib-ch-ui-card',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  host: {
    '[attr.data-testid]': 'testId()',
  },
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

  private readonly fallbackUrl = signal<string | null>(null);

  currentImageUrl = computed(() => this.fallbackUrl() ?? this.imageUrl());

  handleImageError() {
    this.fallbackUrl.set(IMAGE_PLACEHOLDER);
  }

  detailRoute = computed(() => {
    const listRoute = this.config?.listRoute ?? '/pets';
    return [listRoute, this.id().toString()];
  });
}
