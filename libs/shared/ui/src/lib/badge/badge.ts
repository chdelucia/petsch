import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-ch-ui-badge',
  imports: [NgClass],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
  /**
   * Performance Optimization: OnPush change detection reduces unnecessary checks.
   * Since this component uses Signals for inputs and state, it remains reactive.
   */
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChBadge {
  status = input.required<'unhealthy' | 'healthy' | 'very healthy'>();

  statusClass = computed(() => {
    return `ch-badge--${this.status().replace(' ', '-')}`;
  });
}
