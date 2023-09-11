import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { priceSummaryType } from '../../core/data-types';
import cartType from '../../core/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartData: cartType = {
    id: 1,
    products: [
      {
        id: 1,
        name: 'prod 1',
        price: 10,
        image: '',
        description: 'desc',
        quantity: 3,
      },
    ],
  };
  priceSummary: priceSummaryType = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  removeToCart(cartId: number | undefined) {
    if (!cartId || !this.cartData) return;
    this.cartService.removeToCart(cartId).subscribe((result) => {
      this.loadDetails();
    });
  }

  loadDetails() {
    this.cartService.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.products.forEach((item: any) => {
        if (item.quantity) {
          price += item.price * item.quantity;
        }
      });
      console.log('price: ', price);
      this.priceSummary.price = price;
      this.priceSummary.discount = price * 0.1;
      this.priceSummary.tax = price * 0.1;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + price * 0.1 + 100 - price * 0.1;
      if (this.cartData.products?.length == 0) this.router.navigate(['/']);
    });
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
