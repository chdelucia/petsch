import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-product-list-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-header.component.html',
  styleUrl: './product-list-header.component.scss',
})
export class ProductListHeaderComponent {
  title = input.required<string>();
  gridView = input.required<boolean>();
  showFilters = input.required<boolean>();

  toggleView = output<void>();
  toggleFilters = output<void>();
}
