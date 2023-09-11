import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import productType from 'src/app/core/models/product.model';
import cartType from 'src/app/core/models/cart.model';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productData: productType = {
    name: 'Iphone 14 pro',
    price: 100,
    image: '',
    description: 'string',
    id: 1,
    quantity: 10,
  };
  productQuantity: number = 1;
  removeCart = true;
  cartData: cartType[] | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('id');
    if (!productId) return;
    // this.loadProductDetails(Number(productId));
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  loadProductDetails(productId: number) {
    // this.productService.getProductById(productId).subscribe((result) => {
    //   this.productData = result;
    //   let cartData = localStorage.getItem('localCart');
    //   if (productId && cartData) {
    //     let items = JSON.parse(cartData);
    //     items = items.filter(
    //       (item: productType) => productId === item.id
    //     );
    //     if (items.length) {
    //       this.removeCart = true;
    //     } else {
    //       this.removeCart = false;
    //     }
    //   }
    //   let user = localStorage.getItem('user');
    //   if (user) {
    //     let userId = user && JSON.parse(user).id;
    //     this.cartService.getCartList(userId);
    //     this.cartService.cartData.subscribe((result) => {
    //       let item = result.filter(
    //         (item: productType) =>
    //           productId?.toString() === item.productId?.toString()
    //       );
    //       if (item.length) {
    //         this.cartData = item[0];
    //         this.removeCart = true;
    //       }
    //     });
    //   }
    // });
  }
  addToCart() {
    // if (!this.productData) return;
    // this.productData.quantity = this.productQuantity;
    // if (!localStorage.getItem('user')) {
    //   this.cartService.localAddToCart(this.productData);
    //   this.removeCart = true;
    //   return;
    // }
    // let user = localStorage.getItem('user');
    // let userId = user && JSON.parse(user).id;
    // let cartData: cartType = {
    //   ...this.productData,
    //   productId: this.productData.id,
    //   userId,
    // };
    // delete cartData.id;
    // this.cartService.addToCart(cartData).subscribe((result) => {
    //   if (result) {
    //     this.cartService.getCartList(userId);
    //     this.removeCart = true;
    //   }
    // });
  }
  removeToCart(productId: number) {
    // if (!localStorage.getItem('user')) {
    //   this.cartService.removeItemFromCart(productId);
    //   this.removeCart = false;
    //   return;
    // }
    // console.warn('cartData', this.cartData);
    // if (this.cartData) {
    //   this.cartService.removeToCart(this.cartData.id).subscribe((result) => {
    //     let user = localStorage.getItem('user');
    //     let userId = user && JSON.parse(user).id;
    //     this.cartService.getCartList(userId);
    //   });
    // }
    // this.removeCart = false;
  }
}
