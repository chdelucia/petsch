import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ch-ui-pagination',
  imports: [NgClass, TranslocoDirective],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class ChPagination {
  page = input.required<number>();

  totalPages = input.required<number>();

  pageChange = output<number>();

  emitPage(page: number): void {
    this.pageChange.emit(page);
  }
}
