import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-product-list-header',
  imports: [CommonModule],
  templateUrl: './product-list-header.component.html',
  styleUrl: './product-list-header.component.scss',
})
export class ListHeader {
  text = input.required<string>();
  gridView = input.required<boolean>();
  showFilters = input.required<boolean>();

  toggleView = output<void>();
  toggleFilters = output<void>();
}
