import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderType } from '../../models/order.model';
import { StorageService } from '../storage/storage.service';

const BASE_URL = 'http://localhost:3000';

type SuccessResponseType = {
  success: true;
  data: any;
};
type ErrorResponseType = {
  success: false;
  message: string;
};

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  orderNow(data: orderType) {
    const user = this.storageService.onGetItem('user');
    return this.http.post(BASE_URL + '/orders/' + user.id, data);
  }
  ordersNow(data: orderType[]) {
    const user = this.storageService.onGetItem('user');
    return this.http.post(BASE_URL + '/orders/' + user.id, data);
  }
  orderList() {
    const user = this.storageService.onGetItem('user');
    return this.http.get<orderType[]>(BASE_URL + '/orders?userId=' + user.id);
  }
  cancelOrder(orderId: number) {
    return this.http.delete(BASE_URL + '/orders/' + orderId);
  }
}
