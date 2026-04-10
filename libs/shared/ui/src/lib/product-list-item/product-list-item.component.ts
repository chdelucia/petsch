import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-ui-product-list-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list-item.component.html',
  styleUrl: './product-list-item.component.scss',
})
export class ProductListItemComponent {
  id = input.required<number>();
  name = input.required<string>();
  description = input.required<string>();
  imageUrl = input.required<string>();
}
