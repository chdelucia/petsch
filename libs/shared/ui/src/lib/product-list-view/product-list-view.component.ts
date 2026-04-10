import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListItemComponent } from '../product-list-item/product-list-item.component';
import { UiItem } from '../models/ui-item.model';

@Component({
  selector: 'lib-ui-product-list-view',
  standalone: true,
  imports: [CommonModule, ProductListItemComponent],
  templateUrl: './product-list-view.component.html',
  styleUrl: './product-list-view.component.scss',
})
export class ProductListViewComponent {
  products = input.required<UiItem[]>();
}
