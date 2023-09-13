import { Component, Input } from '@angular/core';
import productType from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() productData: productType = {
    id: 1,
    name: '',
    description: '',
    price: 0,
    quantity: 10,
    image: '',
    category: '',
  };
}
