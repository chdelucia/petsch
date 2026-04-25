import { ChButton } from "../button/button";
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ch-ui-cart-item',
  imports: [TranslocoDirective, ChButton],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
  /**
   * Performance Optimization: Enabled OnPush to improve rendering performance
   * in lists of items.
   */
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChCartItem {
  testId = input<string>('');
  imageSrc = input.required<string>();
  name = input.required<string>();
  day = input<string>();
  showRemove = input<boolean>(false);
  remove = output<void>();
  description = input.required<string>();
}
