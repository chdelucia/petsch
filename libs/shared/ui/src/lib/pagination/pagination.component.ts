import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChButton } from '../button/button';

@Component({
  selector: 'lib-ch-ui-pagination',
  imports: [NgClass, TranslocoDirective, ChButton],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  /**
   * Performance Optimization: OnPush change detection reduces unnecessary checks.
   * Since this component uses Signals for inputs and state, it remains reactive.
   */
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChPagination {
  testId = input<string>('');
  page = input.required<number>();

  totalPages = input.required<number>();

  pageChange = output<number>();

  emitPage(page: number): void {
    this.pageChange.emit(page);
  }
}
