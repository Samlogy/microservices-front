import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cartType } from 'src/app/core/models/cart.model';
import productType from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { ProductService } from '../../core/services/product/product.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productData: productType = {
    name: 'Iphone 14 Pro',
    price: 1000,
    image:
      'https://imageio.forbes.com/specials-images/imageserve/641397e79f04500b85460b8f/Apple--iPhone-15--iPhone-15-Pro-Max--iPhone-15-Pro--iPhone-15-Pro-design--iPhone-15/0x0.jpg?format=jpg&crop=924,693,x359,y0,safe&width=960',
    description: 'Iphone 14 pro available',
    id: 1,
    quantity: 3,
    category: 'IT',
  };
  productQuantity: number = 3;
  cartData: cartType | undefined;
  canRemovedFromCart = false;
  itemQuantity = 1;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let productId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    if (!productId) return;
    this.loadProductDetails(Number(productId));
    this.itemIsPrensentCart();
  }

  // to checkout if item present in cart
  itemIsPrensentCart() {
    let cartData = this.storageService.onGetItem('cart');
    const isPresent = cartData.products.find(
      (item: productType) => item.id === this.productData.id
    );
    this.canRemovedFromCart = isPresent;
  }
  loadProductDetails(productId: number) {
    this.productService.getProductById(productId).subscribe((res) => {
      this.productData = res;
      this.productQuantity = res.quantity;
    });
  }
  addToCart() {
    if (!this.productData) return;
    let cartData = this.storageService.onGetItem('cart');
    // increment quantity (item already exists)
    let itemExists = false;
    const updatedProducts = cartData.products.map((item: productType) => {
      if (item.id === this.productData.id) {
        itemExists = true;
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    // add new item to the cart
    if (!itemExists) {
      cartData = {
        id: cartData.id,
        products: [...cartData.products, this.productData],
      };
    } else {
      cartData = {
        id: cartData.id,
        products: updatedProducts,
      };
    }

    this.cartData = cartData;
    this.storageService.onSaveItem('cart', cartData);
  }
  removeFromCart(productId: number) {
    if (!this.productData) return;
    let cartData = this.storageService.onGetItem('cart');

    const itemsUpdated = cartData.products.filter(
      (item: productType) => item.id !== productId
    );

    const newCart = {
      id: cartData.id,
      products: itemsUpdated,
    };

    this.cartData = newCart;
    this.storageService.onSaveItem('cart', newCart);
  }
  buyNow() {
    this.addToCart();
    this.router.navigate(['/cart']);
  }

  handleQuantity(val: string) {
    if (this.itemQuantity < this.productData.quantity && val === 'plus') {
      this.itemQuantity += 1;
    } else if (this.itemQuantity > 1 && val === 'min') {
      this.itemQuantity -= 1;
    }
  }
}
