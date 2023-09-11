import { Component } from '@angular/core';
import productType from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  productsList: undefined | productType[] = [
    {
      id: 1,
      name: 'IPhone 14 pro',
      price: 100,
      description: 'descriptopn ....',
      quantity: 10,
      image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fproduct%2F&psig=AOvVaw3uPWOoTV7CUf80oozCdntK&ust=1694415797824000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJjhxu-8n4EDFQAAAAAdAAAAABAE',
    },
    {
      id: 2,
      name: 'IPhone 15 pro',
      price: 100,
      description: 'descriptopn ....',
      quantity: 10,
      image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fproduct%2F&psig=AOvVaw3uPWOoTV7CUf80oozCdntK&ust=1694415797824000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJjhxu-8n4EDFQAAAAAdAAAAABAE',
    },
  ];

  constructor(private productService: ProductService) {}

  // load products --> paginate (send data as Input(), each action in pagination send back @Output)
  // filtred products --> receives products list from --> filter @Output
}
