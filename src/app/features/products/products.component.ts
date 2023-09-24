import { Component, OnInit } from '@angular/core';
import {
  productType,
  productsListType,
} from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsList: undefined | productType[] = [
    {
      id: 1,
      name: 'IPhone 14 pro',
      price: 100,
      description: 'descriptopn ....',
      quantity: 10,
      category: 'apple',
      userId: 11,
      image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fproduct%2F&psig=AOvVaw3uPWOoTV7CUf80oozCdntK&ust=1694415797824000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJjhxu-8n4EDFQAAAAAdAAAAABAE',
    },
    {
      id: 2,
      name: 'IPhone 15 pro',
      userId: 11,
      price: 100,
      description: 'descriptopn ....',
      quantity: 10,
      category: 'apple',
      image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fproduct%2F&psig=AOvVaw3uPWOoTV7CUf80oozCdntK&ust=1694415797824000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJjhxu-8n4EDFQAAAAAdAAAAABAE',
    },
  ];

  currentPage: number = 1;
  totalPages: number = 10;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.onLoadProducts();
  }

  onLoadProducts() {
    this.productService.productList().subscribe((res) => {
      this.productsList = res.products;
      this.currentPage = res.currentPage;
      this.totalPages = res.totalPages;
    });
  }
  onFilter(data: productsListType) {
    // console.log('product filtred: ', data);
    this.productsList = data.products;
    this.currentPage = data.currentPage;
    this.totalPages = data.totalPages;
  }
}
