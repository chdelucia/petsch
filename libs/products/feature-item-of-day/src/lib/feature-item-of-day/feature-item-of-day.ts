import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ChCartDrawer, ChCartItem } from '@petsch/ui';
import { TranslocoDirective } from '@jsverse/transloco';
import { ITEM_OF_DAY_STORE } from '@petsch/api';
import { getLocalIsoDate } from '@petsch/shared-utils';

@Component({
  selector: 'lib-feature-item-of-day',
  imports: [ChCartDrawer, ChCartItem, TranslocoDirective],
  templateUrl: './feature-item-of-day.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './feature-item-of-day.css',
})
export class FeatureItemOfDay {
  protected readonly iotdStore = inject(ITEM_OF_DAY_STORE);
  protected readonly today = getLocalIsoDate();
}
