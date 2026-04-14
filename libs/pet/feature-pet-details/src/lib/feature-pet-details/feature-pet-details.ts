import { Component, inject, input, signal, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChButton, ChBadge } from '@petsch/ui';
import { Pet, CurrentTransitionService } from '@petsch/api';
import { APP_ROUTES } from '@petsch/shared-utils';

@Component({
  selector: 'lib-feature-pet-details',
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
export class FeaturePetDetails {
  protected readonly transitionService = inject(CurrentTransitionService);
  private readonly router = inject(Router);

  id = input.required<string>();
  product = input<Pet | null>();

  showPotdDrawer = signal(false);

  loading = signal(false);
  error = computed(() => {
    const item = this.product();
    if (!item && !this.loading()) {
      return 'Product not found';
    }
    return null;
  });

  goBack() {
    this.router.navigate([APP_ROUTES.PETS]);
  }
}
