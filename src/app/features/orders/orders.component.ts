import { Component, OnInit } from '@angular/core';
import { orderType } from '../../core/models/order.model';
import { ProductService } from '../../core/services/product/product.service';
import { OrderService } from 'src/app/core/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ordersList: orderType = {
    id: 1,
    status: 'pending',
    totalPrice: 100.0,
    orderDate: '10-09-2023',
    userId: 1,
    orders: [
      {
        id: 1,
        quantity: 3,
        price: 10,
        name: 'Item 1',
        productId: 1,
        orderId: 1,
      },
      {
        id: 2,
        quantity: 3,
        price: 10,
        name: 'Item 2',
        productId: 2,
        orderId: 1,
      },
      {
        id: 3,
        quantity: 3,
        price: 10,
        name: 'Item 3',
        productId: 3,
        orderId: 1,
      },
      {
        id: 4,
        quantity: 3,
        price: 10,
        name: 'Item 4',
        productId: 4,
        orderId: 2,
      },
    ],
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrderList();
  }
  cancelOrder(orderId: number | undefined) {
    if (!orderId) return;
    this.orderService.cancelOrder(orderId).subscribe((result) => {
      if (result) this.getOrderList();
    });
  }
  getOrderList() {
    this.orderService.orderList().subscribe((result) => {
      this.ordersList = result;
    });
  }
  makeOrder() {
    // call api to make order
    // displau popup error / success
  }
  calculateTotal() {}
}
