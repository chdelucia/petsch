import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-cart-header',
  imports: [],
  templateUrl: './cart-header.html',
  styleUrl: './cart-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartHeader {}
