import { ChButton } from "../button/button";
import { Component, input, output, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { IMAGE_PLACEHOLDER } from '@petsch/shared-utils';

@Component({
  selector: 'lib-ch-ui-cart-item',
  imports: [TranslocoDirective, ChButton],
  templateUrl: './cart-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './cart-item.css',
})
export class ChCartItem {
  testId = input<string>('');
  imageSrc = input.required<string>();
  name = input.required<string>();
  day = input<string>();
  showRemove = input<boolean>(false);
  remove = output<void>();
  description = input.required<string>();

  private readonly fallbackUrl = signal<string | null>(null);

  currentImageSrc = computed(() => this.fallbackUrl() ?? this.imageSrc());

  handleImageError() {
    this.fallbackUrl.set(IMAGE_PLACEHOLDER);
  }
}
