import { Component, inject } from '@angular/core';
import { ChCartDrawer, ChCartItem } from '@petsch/ui';
import { TranslocoDirective } from '@jsverse/transloco';
import { ITEM_OF_DAY_STORE } from '@petsch/api';

@Component({
  selector: 'lib-feature-item-of-day',
  imports: [ChCartDrawer, ChCartItem, TranslocoDirective],
  templateUrl: './feature-pet-of-day.html',
  styleUrl: './feature-pet-of-day.css',
})
export class FeatureItemOfDay {
  protected readonly iotdStore = inject(ITEM_OF_DAY_STORE);
  protected readonly today = new Date().toISOString().split('T')[0];
}
