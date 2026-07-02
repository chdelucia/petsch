import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ch-ui-card-skeleton',
  imports: [CommonModule],
  templateUrl: './product-card-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './product-card-skeleton.component.css',
})
export class ChCardSkeleton {}
