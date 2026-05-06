import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-ch-ui-cart-list',
  imports: [],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChCartList {}
