import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ui-product-list-header',
  imports: [CommonModule, TranslocoDirective],
  templateUrl: './product-list-header.component.html',
  styleUrl: './product-list-header.component.scss',
})
export class ListHeader {
  text = input.required<string>();
  showFilters = input.required<boolean>();

  toggleFilters = output<void>();
}
