import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ch-ui-filter-skeleton',
  imports: [CommonModule],
  templateUrl: './filter-skeleton.component.html',
  styleUrl: './filter-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChFilterSkeleton {}
