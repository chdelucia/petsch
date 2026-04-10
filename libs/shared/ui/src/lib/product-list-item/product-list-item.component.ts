import { Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-ui-product-list-item',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './product-list-item.component.html',
  styleUrl: './product-list-item.component.scss',
})
export class ProductListItemComponent {
  id = input.required<string>();
  name = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
  price = input.required<number>();
  imageUrl = input.required<string>();
  creationAt = input.required<Date>();
}
