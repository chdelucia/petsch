import { Component, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsStore } from './product-details.store';
import { Button } from '@petsch/ui';

@Component({
  selector: 'lib-feature-product-details',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './feature-product-details.html',
  styleUrl: './feature-product-details.css',
  providers: [ProductDetailsStore],
})
export class FeatureProductDetails {
  private readonly store = inject(ProductDetailsStore);

  id = input.required<string>();

  product = this.store.product;
  loading = this.store.loading;
  error = this.store.error;

  constructor() {
    effect(() => {
      this.store.loadProduct(this.id());
    });
  }
}
