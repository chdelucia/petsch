import { Component, inject, input, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ChButton, ChBadge } from '@petsch/ui';
import { Pet, CurrentTransitionService } from '@petsch/api';
import { APP_ROUTES, SeoService } from '@petsch/shared-utils';
import { merge, switchMap, map } from 'rxjs';

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
  private readonly seoService = inject(SeoService);
  private readonly translocoService = inject(TranslocoService);

  id = input.required<string>();
  product = input<Pet | null>();

  constructor() {
    merge(
      this.translocoService.selectTranslation(),
      toObservable(this.product),
    )
      .pipe(
        takeUntilDestroyed(),
        map(() => this.product()),
      )
      .subscribe((pet) => {
        if (pet) {
          this.seoService.updateTitle(
            this.translocoService.translate('detailsTitle', { name: pet.name }),
          );
          this.seoService.updateDescription(pet.description);
          this.seoService.updateImage(pet.photo_url);
        }
      });
  }

  showPotdDrawer = signal(false);

  loading = () => false;
  error = () => null;

  goBack() {
    this.router.navigate([APP_ROUTES.PETS]);
  }
}
