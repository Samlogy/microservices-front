import { Component, OnInit } from '@angular/core';
import { productType } from 'src/app/core/models/product.model';
import { OrderService } from 'src/app/core/services/order/order.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import Swal from 'sweetalert2';
import { orderType } from '../../core/models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ordersList: orderType[] = [];
  user: any;
  totalPrice = 0;
  apiLoading = false;

  constructor(
    private orderService: OrderService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.onLoadUser();
    this.onLoadOrders();
    this.onComputeTotalPrice();
  }

  onLoadOrders() {
    this.orderService.orderList().subscribe((result) => {
      const cart = this.storageService.onGetItem('cart');
      if (!cart) return;

      let totalPrice = 0;
      cart.products.forEach(
        (item: productType) => (totalPrice = item.quantity * item.price)
      );
      const newOrder = {
        status: 'pending',
        totalPrice,
        orderDate: new Date().toISOString(),
        userId: this.user.id,
        products: cart.products,
      };

      this.ordersList = [newOrder, ...result];
    });
  }
  onConfirmOrder(orderId: number | undefined) {
    this.orderService.confirmOrder(orderId).subscribe(
      (result) => {
        this.apiLoading = false;

        this.onLoadOrders();
        this.storageService.onSaveItem('cart', {
          id: undefined,
          products: [],
        });

        Swal.fire({
          title: 'Succés',
          text: 'Order has been confirmed',
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
  onConfirmAllOrders() {
    const orderIds = this.ordersList.map((order: orderType) => order.id);
    this.orderService.confirmAllOrders(orderIds).subscribe(
      (result) => {
        this.apiLoading = false;

        this.onLoadOrders();
        this.storageService.onSaveItem('cart', {
          id: undefined,
          products: [],
        });

        Swal.fire({
          title: 'Succés',
          text: 'Orders have been confirmed',
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
  onCancelAllOrders() {
    const orderIds = this.ordersList.map((order: orderType) => order.id);
    this.orderService.cancelAllOrders(orderIds).subscribe(
      (result) => {
        this.apiLoading = false;

        this.onLoadOrders();
        this.storageService.onSaveItem('cart', {
          id: undefined,
          products: [],
        });

        Swal.fire({
          title: 'Succés',
          text: 'Orders have been canceled',
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
  onCancelOrder(orderId: number | undefined) {
    this.orderService.cancelOrder(orderId).subscribe(
      (result) => {
        this.apiLoading = false;

        this.onLoadOrders();
        this.storageService.onSaveItem('cart', {
          id: undefined,
          products: [],
        });

        Swal.fire({
          title: 'Succés',
          text: 'Order has been canceled',
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
  onLoadUser() {
    this.user = this.storageService.onGetItem('user');
  }
  onComputeTotalPrice() {
    this.ordersList.forEach(
      (item: orderType) => (this.totalPrice += item.totalPrice)
    );
  }
}
