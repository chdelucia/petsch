import { Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '@petsch/api';

@Component({
  selector: 'lib-product-list-view',

  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss',
})
export class ListViewComponent {
  characters = input.required<Product[]>();
}
