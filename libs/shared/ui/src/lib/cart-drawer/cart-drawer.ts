import { Component, output, input, HostListener } from '@angular/core';
import { ChCartFooter } from '../cart-footer/cart-footer';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ch-ui-cart-drawer',
  imports: [ChCartFooter, TranslocoDirective],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css',
})
export class ChCartDrawer {
  open = input<boolean>(false);

  titleLabel = input.required<string>();

  showFooter = input<boolean>(true);

  closeLabel = input<string>();

  openChange = output<boolean>();

  @HostListener('window:keydown.escape', ['$event'])
  onEscape(): void {
    if (this.open()) {
      this.closeDrawer();
    }
  }

  closeDrawer(): void {
    this.openChange.emit(false);
  }
}
