import { Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '@petsch/api';

@Component({
  selector: 'lib-ui-product-list-view',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './product-list-view.component.html',
  styleUrl: './product-list-view.component.scss',
})
export class ProductListViewComponent {
  products = input.required<Product[]>();
}
