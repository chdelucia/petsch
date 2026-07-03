import { ChButton } from "../button/button";
import { Component, output, input, ChangeDetectionStrategy } from '@angular/core';
import { ChCartFooter } from '../cart-footer/cart-footer';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ch-ui-cart-drawer',
  imports: [ChCartFooter, TranslocoDirective, ChButton],
  templateUrl: './cart-drawer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './cart-drawer.css',
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
