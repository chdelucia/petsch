import { Component, inject, input, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChButton, ChBadge } from '@petsch/ui';
import { CurrentTransitionService, PRODUCT_API_CONFIG } from '@petsch/api';

@Component({
  selector: 'lib-feature-product-details',
  imports: [
    CommonModule,
    ChButton,
    ChBadge,
    TranslocoDirective,
    NgOptimizedImage,
  ],
  templateUrl: './feature-pet-details.html',
  styleUrl: './feature-pet-details.css',
})
export class FeatureProductDetails {
  private readonly config = inject(PRODUCT_API_CONFIG, { optional: true });
  private readonly router = inject(Router);
  protected readonly transitionService = inject(CurrentTransitionService);

  id = input.required<string>();
  product = input<unknown | null>();

  showIotdDrawer = signal(false);

  loading = () => false;
  error = () => null;

  goBack() {
    const listRoute = this.config?.listRoute ?? '/products';
    this.router.navigate([listRoute]);
  }
}
