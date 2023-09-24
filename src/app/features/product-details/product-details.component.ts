import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import cartType from 'src/app/core/models/cart.model';
import { productType } from 'src/app/core/models/product.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ProductService } from '../../core/services/product/product.service';

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
    category: 'Apple',
    userId: 11,
  };
  productQuantityAvailable: number = 3;
  productSelectedQuantity = 1;
  removeCart = true;
  cartData: cartType = {
    id: 1,
    products: [],
  };

  isCartExists = false;
  isItemExists = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('id');
    if (!productId) return;
    // this.onLoadProductDetails(Number(productId));
    this.onLoadCart();

    this.isCartExists = this.onCartExists();
    this.isItemExists = this.onItemExists();
    // console.log(this.isCartExists, this.isItemExists);
  }

  onItemExists() {
    if (!this.isCartExists) return false;

    const cart = this.cartData;
    if (!cart || cart.products.length == 0) return false;

    const itemExists = cart.products.find(
      (item: productType) => item.id === this.productData.id
    );
    if (itemExists) return true;
    return false;
  }
  onCartExists() {
    return this.cartData ? true : false;
  }

  handleQuantity(val: string) {
    if (
      this.productSelectedQuantity <= this.productQuantityAvailable &&
      val === 'plus'
    )
      this.onIncrement();
    else if (this.productSelectedQuantity > 1 && val === 'min')
      this.onDecrement();
  }

  onLoadProductDetails(productId: number) {
    this.productService.getProductById(productId).subscribe((res) => {
      this.productData = res;
      this.productQuantityAvailable = res.quantity;
    });
  }
  onLoadCart() {
    this.cartData = this.storageService.onGetItem('cart');
  }
  onAddToCart() {
    if (!this.productData.id) return;

    const cart = this.storageService.onGetItem('cart');
    this.cartData = cart;

    if (!cart) this.onInitCart();

    const itemExists = cart.products.find(
      (item: productType) => item.id === this.productData.id
    );

    !itemExists ? this.onAddNewItem() : this.onIncrement();
  }
  onRemoveFromCart(productId: number) {
    const cart = this.storageService.onGetItem('cart');
    if (!cart) return;

    const productListUpdated = cart.products.filter(
      (item: productType) => item.id !== productId
    );

    this.storageService.onSaveItem('cart', {
      id: productId,
      products: productListUpdated,
    });
    this.productSelectedQuantity = 1;
    console.log('remove item from cart: ', cart);
  }
  onIncrement() {
    const updatedList = this.cartData.products.map((item: productType) => {
      if (item.id == this.productData.id)
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      return item;
    });
    this.storageService.onSaveItem('cart', {
      id: this.productData.id,
      products: updatedList,
    });
    this.productSelectedQuantity++;

    console.log('increment existing item: ');
  }
  onDecrement() {
    const updatedList = this.cartData.products.map((item: productType) => {
      if (item.id == this.productData.id)
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      return item;
    });
    this.storageService.onSaveItem('cart', {
      id: this.productData.id,
      products: updatedList,
    });
    this.productSelectedQuantity--;

    console.log('decrement existing item: ');
  }
  onAddNewItem() {
    const newProductList = [
      ...this.cartData.products,
      {
        ...this.productData,
        quantity: this.productSelectedQuantity,
      },
    ];
    this.storageService.onSaveItem('cart', {
      id: this.productData.id,
      products: newProductList,
    });

    console.log('cart exists --> add new item: ');
    return;
  }
  onInitCart() {
    this.storageService.onSaveItem('cart', {
      id: this.productData.id,
      products: [
        { ...this.productData, quantity: this.productSelectedQuantity },
      ],
    });

    console.log('cart does not exists --> create cart + add new item ');
    return;
  }

  onBuyNow() {
    this.onAddToCart();
    this.router.navigate(['/cart']);
  }
}
