import { Component, OnInit } from '@angular/core';
import { cartType } from 'src/app/core/models/cart.model';
import { OrderService } from 'src/app/core/services/order/order.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { orderType } from '../../core/models/order.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ordersList: orderType[] = [];

  totalPrice: number = 0;
  cartData: cartType | undefined;
  orderMsg: string = '';
  apiLoading = false;

  constructor(
    private orderService: OrderService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getOrderList();
    this.ordersList.forEach((order) => (this.totalPrice += order.totalPrice));
  }

  getOrderList() {
    // load all items in cart (localStorage)
    const cartItems = this.storageService.onGetItem('cart');

    let orderItems: orderType;

    if (cartItems.products.length > 0) {
      let price = 0;
      cartItems.products.forEach((item: any) => {
        price += item.quantity * item.price;
      });

      orderItems = {
        id: 1,
        userId: 1,
        status: 'pre-order',
        totalPrice: price,
        orderDate: new Date().toISOString(),
        products: [...cartItems.products],
      };
      console.log('new order: ', orderItems);
    }

    // load all orders status != finished --> pending- current
    this.orderService.orderList().subscribe((res) => {
      this.ordersList = [orderItems, ...res];
    });
  }
  confirmOrder(order: orderType) {
    if (this.ordersList.length === 0) return;
    this.orderService.orderNow(order).subscribe(
      (res) => {
        this.apiLoading = false;
        this.storageService.onSaveItem('cart', {
          id: undefined,
          products: [],
        });
        Swal.fire({
          title: 'Success',
          text: 'Your Order has been confirmed !',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      (err) => {
        this.apiLoading = false;
        Swal.fire({
          title: 'Erreur!',
          text: err.error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
  confirmAllOrders() {
    const orderToConfirm = this.ordersList.filter(
      (order) => order.status === 'pre-order' || order.status === 'pending'
    );
    // console.log('orderToConfirm: ', orderToConfirm);
    this.orderService.ordersNow(orderToConfirm).subscribe(
      (res) => {
        this.apiLoading = false;
        this.storageService.onSaveItem('cart', {
          id: undefined,
          products: [],
        });
        Swal.fire({
          title: 'Success',
          text: 'Your Orders have been confirmed !',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      (err) => {
        this.apiLoading = false;
        Swal.fire({
          title: 'Erreur!',
          text: err.error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
  cancelOrder(orderId: number | undefined) {
    if (!orderId) return;
    this.orderService.cancelOrder(orderId).subscribe(
      (res) => {
        this.apiLoading = false;
        this.storageService.onSaveItem('cart', {
          id: undefined,
          products: [],
        });
        Swal.fire({
          title: 'Success',
          text: 'Your Order has been cancelled !',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        if (res) this.getOrderList();
      },
      (err) => {
        this.apiLoading = false;
        Swal.fire({
          title: 'Erreur!',
          text: err.error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}
