import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import productType from '../../models/product.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLogged = false;
  cartTotalItems = 0;

  constructor(private route: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    this.calculateCartTotalItems();
  }

  onLogout() {
    this.route.navigate(['/']);
  }

  calculateCartTotalItems() {
    const cartData = this.storageService.onGetItem('cart');
    cartData.products.forEach(
      (item: productType) => (this.cartTotalItems += 1)
    );
  }
}
