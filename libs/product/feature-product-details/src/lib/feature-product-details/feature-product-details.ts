import { Component, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Button } from '@petsch/ui';
import { Pet, CurrentTransitionService } from '@petsch/api';

@Component({
  selector: 'lib-feature-product-details',
  imports: [CommonModule, Button, TranslocoDirective, NgOptimizedImage],
  templateUrl: './feature-product-details.html',
  styleUrl: './feature-product-details.css',
})
export class FeatureProductDetails {
  protected readonly transitionService = inject(CurrentTransitionService);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly translocoService = inject(TranslocoService);

  id = input.required<string>();
  product = input.required<Pet>();

  showPotdDrawer = signal(false);

  loading = () => false;
  error = () => null;

  goBack() {
    this.router.navigate(['/products']);
  }

  constructor() {
    effect(() => {
      this.updateSeo();
    });

    this.translocoService.langChanges$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.updateSeo();
    });
  }

  private updateSeo(): void {
    let product: Pet | undefined;
    try {
      product = this.product();
    } catch (e) {
      // Input not ready yet
      return;
    }

    if (product) {
      this.titleService.setTitle(
        this.translocoService.translate('detailsTitle', { name: product.name }),
      );
      this.metaService.updateTag({
        name: 'description',
        content: product.description || '',
      });
    }
  }
}
