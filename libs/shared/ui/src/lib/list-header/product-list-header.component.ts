import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ui-product-list-header',
  imports: [CommonModule, TranslocoDirective],
  templateUrl: './product-list-header.component.html',
  styleUrl: './product-list-header.component.css',
})
export class ListHeader {
  text = input.required<string>();
  gridView = input.required<boolean>();
  showFilters = input.required<boolean>();

  toggleView = output<void>();
  toggleFilters = output<void>();
}
