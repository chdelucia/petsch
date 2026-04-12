import { Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
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
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  id = input.required<string>();
  product = input.required<Pet>();

  constructor() {
    effect(() => {
      const pet = this.product();
      if (pet) {
        this.title.setTitle(`Petshop - ${pet.name}`);
        this.meta.updateTag({
          name: 'description',
          content: pet.description,
        });
        this.meta.updateTag({
          property: 'og:title',
          content: `Petshop - ${pet.name}`,
        });
        this.meta.updateTag({
          property: 'og:description',
          content: pet.description,
        });
        this.meta.updateTag({
          property: 'og:image',
          content: pet.photo_url,
        });
      }
    });
  }

  showPotdDrawer = signal(false);

  loading = () => false;
  error = () => null;

  goBack() {
    this.router.navigate(['/products']);
  }
}
