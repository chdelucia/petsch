import { Component, output, input } from '@angular/core';
import { ChCartFooter } from '../cart-footer/cart-footer';
import { ChCartList } from '../cart-list/cart-list';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ch-ui-cart-drawer',
  imports: [ChCartFooter, ChCartList, TranslocoDirective],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css',
})
export class ChCartDrawer {
  open = input<boolean>(true);

  titleLabel = input.required<string>();

  showFooter = input<boolean>(true);

  closeLabel = input<string>();
  testId = input<string>();

  openChange = output<boolean>();

  closeDrawer(): void {
    this.openChange.emit(false);
  }
}
