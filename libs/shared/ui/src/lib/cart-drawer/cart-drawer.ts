import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChButton } from '../button/button';
import { ChCartFooter } from '../cart-footer/cart-footer';

@Component({
  selector: 'lib-ch-ui-cart-drawer',
  imports: [ChCartFooter, TranslocoDirective, ChButton],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChCartDrawer {
  testId = input<string>('cart-drawer');
  open = input<boolean>(false);
  position = input<'left' | 'right'>('right');

  titleLabel = input.required<string>();

  showFooter = input<boolean>(true);

  closeLabel = input<string>();

  openChange = output<boolean>();

  closeDrawer(): void {
    this.openChange.emit(false);
  }
}
