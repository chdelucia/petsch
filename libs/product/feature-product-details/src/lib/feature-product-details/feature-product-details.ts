import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { Button } from '@petsch/ui';
import { Pet, CurrentTransitionService } from '@petsch/api';

@Component({
  selector: 'lib-feature-product-details',
  imports: [CommonModule, Button, TranslocoDirective],
  templateUrl: './feature-product-details.html',
  styleUrl: './feature-product-details.css',
})
export class FeatureProductDetails {
  protected readonly transitionService = inject(CurrentTransitionService);
  private readonly router = inject(Router);

  id = input.required<string>();
  product = input.required<Pet>();

  showPotdDrawer = signal(false);

  loading = () => false;
  error = () => null;

  goBack() {
    this.router.navigate(['/products']);
  }
}
