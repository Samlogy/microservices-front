import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderType } from '../../models/order.model';

const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  orderNow(data: orderType) {
    return this.http.post(BASE_URL + '/orders', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<orderType[]>(
      BASE_URL + '/orders?userId=' + userData.id
    );
  }
  cancelOrder(orderId: number | undefined) {
    return this.http.delete(BASE_URL + '/orders/' + orderId);
  }
  cancelAllOrders(orderIds: (number | undefined)[]) {
    return this.http.post(BASE_URL + '/orders', orderIds);
  }

  confirmOrder(orderId: number | undefined) {
    return this.http.get(BASE_URL + '/orders/' + orderId);
  }
  confirmAllOrders(orderIds: (number | undefined)[]) {
    return this.http.post(BASE_URL + '/orders', orderIds);
  }
}
