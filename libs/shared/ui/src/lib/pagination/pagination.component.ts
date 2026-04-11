import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-ui-pagination',
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass',
})
export class Pagination {
  page = input.required<number>();

  totalPages = input.required<number>();

  pageChange = output<number>();

  emitPage(page: number): void {
    this.pageChange.emit(page);
  }
}
