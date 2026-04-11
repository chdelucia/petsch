import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-ui-pagination',
  imports: [CommonModule, TranslocoDirective],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass',
})
export class PaginationComponent {
  page = input.required<number>();

  totalPages = input.required<number>();

  pageChange = output<number>();

  emitPage(page: number): void {
    this.pageChange.emit(page);
  }
}
