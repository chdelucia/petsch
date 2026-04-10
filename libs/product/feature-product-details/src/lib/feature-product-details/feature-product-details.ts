import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { Button } from '@petsch/ui';
import { PRODUCT_TOKEN, CurrentTransitionService } from '@petsch/api';

@Component({
  selector: 'lib-feature-product-details',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './feature-product-details.html',
  styleUrl: './feature-product-details.css',
})
export class FeatureProductDetails {
  private readonly productService = inject(PRODUCT_TOKEN);
  protected readonly transitionService = inject(CurrentTransitionService);
  private readonly router = inject(Router);

  id = input.required<string>();

  private readonly productResult$ = toObservable(this.id).pipe(
    switchMap((id) =>
      this.productService.getDetails(id).pipe(
        map((product) => ({ product, loading: false, error: null })),
        catchError((err) =>
          of({
            product: null,
            loading: false,
            error: err.message ?? 'Failed to load product details',
          })
        ),
        startWith({ product: null, loading: true, error: null })
      )
    )
  );

  private readonly productResult = toSignal(this.productResult$, {
    initialValue: { product: null, loading: true, error: null },
  });

  product = () => this.productResult().product;
  loading = () => this.productResult().loading;
  error = () => this.productResult().error;

  goBack() {
    this.router.navigate(['/products']);
  }
}
