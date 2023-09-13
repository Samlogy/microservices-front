import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  // @Output() changePage: EventEmitter<number> = new EventEmitter();

  onChangePage(page: number) {
    this.currentPage = page;
    // this.changePage.emit(page);
  }
  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      // this.changePage.emit(this.currentPage--);
    }
    console.log('CHILD page: ', this.currentPage);
  }
  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      // this.changePage.emit(this.currentPage++);
    }
    console.log('CHILD page: ', this.currentPage);
  }
}
