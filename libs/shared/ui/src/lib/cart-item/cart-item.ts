import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChButton } from '../button/button';

@Component({
  selector: 'lib-ch-ui-cart-item',
  imports: [TranslocoDirective, ChButton],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
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
