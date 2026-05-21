import { Component, inject, input, signal, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChButton, ChBadge } from '@petsch/ui';
import { CurrentTransitionService, PRODUCT_UI_CONFIG } from '@petsch/api';
import { IMAGE_PLACEHOLDER } from '@petsch/shared-utils';

@Component({
  selector: 'lib-feature-product-details',
  imports: [
    CommonModule,
    ChButton,
    ChBadge,
    TranslocoDirective,
    NgOptimizedImage,
  ],
  templateUrl: './feature-product-details.html',
  styleUrl: './feature-product-details.css',
})
export class FeatureProductDetails {
  protected readonly transitionService = inject(CurrentTransitionService);
  private readonly router = inject(Router);
  private readonly config = inject(PRODUCT_UI_CONFIG, { optional: true });

  id = input.required<string>();
  product = input<unknown | null>();

  showIotdDrawer = signal(false);

  loading = () => false;
  error = () => null;

  private readonly fallbackUrl = signal<string | null>(null);

  currentImageUrl = computed(() => {
    const fallback = this.fallbackUrl();
    if (fallback) {
      return fallback;
    }
    const product = this.product() as { photo_url?: string } | null;
    return product?.photo_url ?? IMAGE_PLACEHOLDER;
  });

  handleImageError() {
    this.fallbackUrl.set(IMAGE_PLACEHOLDER);
  }

  goBack() {
    const listRoute = this.config?.listRoute ?? '/products';
    this.router.navigate([listRoute]);
  }
}
