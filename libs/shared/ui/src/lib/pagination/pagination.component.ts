import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationLinks } from '@petsch/api';

@Component({
  selector: 'lib-ui-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass',
})
export class PaginationComponent {
  page = input.required<number>();
  totalPages = input.required<number>();
  links = input<PaginationLinks>({});

  pageChange = output<number>();
  urlChange = output<string>();

  emitPage(page: number): void {
    this.pageChange.emit(page);
  }

  emitUrl(url: string | undefined): void {
    if (url) {
      this.urlChange.emit(url);
    }
  }
}
