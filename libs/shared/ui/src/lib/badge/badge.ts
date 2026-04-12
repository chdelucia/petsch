import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-ch-ui-badge',
  imports: [NgClass],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class ChBadge {
  status = input.required<'unhealthy' | 'healthy' | 'very healthy'>();

  statusClass = computed(() => {
    return `ch-badge--${this.status().replace(' ', '-')}`;
  });
}
