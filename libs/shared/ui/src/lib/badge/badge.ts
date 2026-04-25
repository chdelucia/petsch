import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-ch-ui-badge',
  imports: [NgClass],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
  /**
   * Performance Optimization: Enabled OnPush change detection to minimize
   * unnecessary checks in this presentational component.
   */
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChBadge {
  status = input.required<'unhealthy' | 'healthy' | 'very healthy'>();

  statusClass = computed(() => {
    return `ch-badge--${this.status().replace(' ', '-')}`;
  });
}
