import { Component, inject } from '@angular/core';
import { CartDrawer, CartItem } from '@petsch/ui';
import { TranslocoDirective } from '@jsverse/transloco';
import { PETOFDAY_STORE } from '@petsch/api';

@Component({
  selector: 'lib-feature-pet-of-day',
  imports: [CartDrawer, CartItem, TranslocoDirective],
  templateUrl: './feature-pet-of-day.html'
})
export class FeaturePetOfDay {
  protected readonly potdStore = inject(PETOFDAY_STORE);
}
