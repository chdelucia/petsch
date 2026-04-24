import { ChButton } from '../button/button';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ch-ui-product-list-header',
  imports: [CommonModule, TranslocoDirective, ChButton],
  templateUrl: './product-list-header.component.html',
  styleUrl: './product-list-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChListHeader {
  text = input.required<string>();
  showFilters = input.required<boolean>();

  toggleFilters = output<void>();
}
