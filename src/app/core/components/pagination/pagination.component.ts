import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  totalPages = [1, 2, 3, 4, 5, 6];

  changePage(page: number) {}
  previousPage() {}
  nextPage() {}
}
