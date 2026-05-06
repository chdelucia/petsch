import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ch-ui-card-skeleton',
  imports: [CommonModule],
  templateUrl: './product-card-skeleton.component.html',
  styleUrl: './product-card-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChCardSkeleton {}
