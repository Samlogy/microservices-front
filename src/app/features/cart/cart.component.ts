import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { cartType, priceSummaryType } from '../../core/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartData: cartType = {
    id: undefined,
    products: [],
  };
  priceSummary: priceSummaryType = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartData = this.storageService.onGetItem('cart');
    console.log('cartData: ', this.cartData);

    let price = 0;
    this.cartData.products.forEach((item: any) => {
      if (item.quantity) {
        price += item.price * item.quantity;
      }
    });
    // console.log('price: ', price);

    const DISCOUNT = price * 0.1;
    const DELIVERY = 100;
    const TAX = price * 0.1;

    this.priceSummary.price = price;
    this.priceSummary.discount = DISCOUNT;
    this.priceSummary.tax = TAX;
    this.priceSummary.delivery = DELIVERY;
    this.priceSummary.total = price > 0 ? price + DISCOUNT + DELIVERY + TAX : 0;

    // console.log('priceSummary: ', this.priceSummary);
  }
  onDeleteItem(itemId: number) {
    if (!itemId || !this.cartData) return;
    const cartItemsUpdated = this.cartData.products.filter(
      (item) => item.id !== itemId
    );
    this.storageService.onSaveItem('cart', {
      id: this.cartData.id,
      products: cartItemsUpdated,
    });
    // console.log('afte delete: ', cartItemsUpdated);
  }
  onDeleteAllItems() {
    if (!this.cartData) return;
    this.storageService.onSaveItem('cart', {
      id: undefined,
      products: [],
    });
    console.log('delete all: ');
    this.loadCart();
  }

  onShipping() {
    this.router.navigate(['/shipping']);
  }
}
