import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;

  arrPages: number[] = [];
  subArrPages: number[] = [];
  PAGES_SIZE: number = 5;

  ngOnInit(): void {
    this.onInit();
  }

  onInit() {
    this.onGenerateIntervals();
  }

  onChangePage(page: number) {
    if (this.currentPage == 1 || this.currentPage == this.totalPages) return;
    this.currentPage = page;
  }
  onPreviousPage() {
    if (this.currentPage == 1) return;
    this.currentPage--;
  }
  onNextPage() {
    if (this.currentPage == this.totalPages) return;
    this.currentPage++;
  }

  onGenerateIntervals() {
    this.arrPages = this.fillRange(this.currentPage, this.totalPages);

    let lastItem = this.PAGES_SIZE + this.currentPage - 1;
    if (lastItem > this.totalPages) lastItem = this.totalPages;

    console.log('lastItem: ', lastItem);

    this.subArrPages = this.fillRange(this.currentPage, lastItem);

    console.log('total pages: ', this.arrPages);
    console.log('sub total pages: ', this.subArrPages);
  }

  fillRange(start: number, end: number) {
    return Array(end - start + 1)
      .fill(1)
      .map((item, index) => start + index);
  }
}
