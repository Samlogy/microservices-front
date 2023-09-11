import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import cartType from '../../core/models/cart.model';
import { ProductService } from '../../core/services/product/product.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { orderType } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cartType | undefined;
  orderMsg: string = '';
  submitted: boolean = false;

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    address: new FormControl(''),
    contact: new FormControl(''),
  });

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      address: [''],
      contact: [''],
    });

    this.cartService.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.products.forEach((item) => {
        if (item.quantity) {
          price = price + item.price * item.quantity;
        }
      });
      this.totalPrice = price + price / 10 + 100 - price / 10;
      // console.warn(this.totalPrice);
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  checkout(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    console.log(JSON.stringify(this.form.value, null, 2));

    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: orderType = {
        totalPrice: this.totalPrice,
        userId,
        orderDate: '',
        status: '',
        orders: [],
      };

      this.cartData?.products.forEach((data) => {
        setTimeout(() => {
          data.id && this.cartService.deleteCartItems(data.id);
        }, 700);
      });

      this.orderService.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = 'Order has been placed';
          setTimeout(() => {
            this.orderMsg = '';
            this.router.navigate(['/order']);
          }, 4000);
        }
      });
    }
  }
}
