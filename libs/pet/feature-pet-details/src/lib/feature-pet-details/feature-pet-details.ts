import { Component, inject, input, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChButton, ChBadge } from '@petsch/ui';
import { CurrentTransitionService, PET_UI_CONFIG } from '@petsch/api';

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
  private readonly config = inject(PET_UI_CONFIG, { optional: true });

  id = input.required<string>();
  product = input<unknown | null>();

  showPotdDrawer = signal(false);

  loading = () => false;
  error = () => null;

  goBack() {
    const listRoute = this.config?.listRoute ?? '/pets';
    this.router.navigate([listRoute]);
  }
}
