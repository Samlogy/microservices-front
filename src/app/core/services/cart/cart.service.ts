import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import cartType from '../../models/cart.model';
import { productType } from '../../data-types';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartData = new EventEmitter<cartType>();
  constructor(private http: HttpClient) {}

  localAddToCart(data: productType) {
    let cartData = {
      id: undefined,
      products: [],
    };
    // let localCart = localStorage.getItem('localCart');
    // if (!localCart) {
    //   localStorage.setItem('localCart', JSON.stringify([data]));
    //   this.cartData.emit(data);
    //   return;
    // }
    // cartData = JSON.parse(localCart);
    // cartData.push(data);
    // localStorage.setItem('localCart', JSON.stringify(cartData));
    // this.cartData.emit(cartData);
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items = JSON.parse(cartData);
      items = items.products.filter((item: any) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCart(cartData: cartType) {
    return this.http.post(BASE_URL + '/cart', cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<cartType>(BASE_URL + '/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete(BASE_URL + '/cart/' + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let user = userStore && JSON.parse(userStore);
    return this.http.get<cartType>(BASE_URL + '/cart?userId=' + user.id);
  }
  deleteCartItems(cartId: number) {
    return this.http
      .delete(BASE_URL + '/cart/' + cartId)
      .subscribe((result) => {
        this.cartData.emit({
          id: cartId,
          products: [],
        });
      });
  }
}
