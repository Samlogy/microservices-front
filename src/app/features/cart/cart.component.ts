import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { priceSummaryType } from 'src/app/core/models/order.model';
import { productType } from 'src/app/core/models/product.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import cartType from '../../core/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  INIT_PRICE_SUMMARY = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  INIT_CART = {
    id: 0,
    products: [
      {
        id: 0,
        name: '',
        price: 0,
        image: '',
        description: '',
        quantity: 0,
        category: '',
        userId: 0,
      },
    ],
  };

  cartData: cartType = this.INIT_CART;
  priceSummary: priceSummaryType = this.INIT_PRICE_SUMMARY;
  isCartDoesNotExistsOrEmpty = false;

  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    this.onLoadDetails();
  }

  onLoadDetails() {
    const cart = this.storageService.onGetItem('cart');

    this.isCartDoesNotExistsOrEmpty =
      !cart || cart.products.length == 0 ? true : false;

    if (!cart) return;
    this.cartData = cart;

    let price = 0;
    cart.products.forEach((item: any) => {
      price += item.price * item.quantity;
    });

    if (price === 0) {
      this.priceSummary = this.INIT_PRICE_SUMMARY;
      return;
    }

    const discount = price * 0.1;
    const tax = price * 0.1;
    const delivery = 100;

    this.priceSummary.price = price;
    this.priceSummary.discount = discount;
    this.priceSummary.tax = tax;
    this.priceSummary.delivery = delivery;
    this.priceSummary.total = price + tax + delivery - discount;
  }
  onRemoveItem(itemId: number | undefined) {
    if (!itemId || !this.cartData) return;
    const updateProducts = this.cartData.products.filter(
      (item: productType) => item.id !== itemId
    );
    this.cartData = {
      id: this.cartData.id,
      products: updateProducts,
    };
    this.storageService.onSaveItem('cart', {
      id: this.cartData.id,
      products: updateProducts,
    });
    this.onLoadDetails();
  }
  onEmptyCart() {
    this.storageService.onSaveItem('cart', {
      id: this.cartData.id,
      products: [],
    });
    this.onLoadDetails();
  }

  onShipping() {
    this.router.navigate(['/shipping']);
  }
  onCancel() {
    this.router.navigate(['/products']);
  }
}
