import { Component } from '@angular/core';
import productType from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  productsList: productType[] | undefined;
  totalPages: number = 5;
  currentPage: number = 1;

  constructor(private productService: ProductService) {}

  loadProducts() {
    this.productService.productList().subscribe((res) => {
      this.productsList = res;
    });
  }

  onFilterProducts(data: productType[] | []) {
    console.log('parent: ', data);
  }
  onChangePage(data: number) {
    // console.log('PARENT page: ', data);
  }

  // load products --> paginate (send data as Input(), each action in pagination send back @Output)
  // filtred products --> receives products list from --> filter @Output
}
