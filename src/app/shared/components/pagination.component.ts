import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <button (click)="goToPreviousPage()">&lt;</button>
    {{ currentPage }}
    <button (click)="goToNextPage()">&gt;</button>
  `,
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() lastPage: number = 1;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  goToPreviousPage() {
    if (this.currentPage === 1) return;
    this.onPageChange.emit(this.currentPage - 1);
  }

  goToNextPage() {
    if (this.currentPage === this.lastPage) return;
    this.onPageChange.emit(this.currentPage + 1);
  }
}
