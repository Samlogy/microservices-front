import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FilterComponent } from './core/components/filter/filter.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { PaginationComponent } from './core/components/pagination/pagination.component';

import { ProductCardComponent } from './core/components/product-card/product-card.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { OrdersComponent } from './features/orders/orders.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { ProductsComponent } from './features/products/products.component';

const PAGES = [
  CheckoutComponent,
  CartComponent,
  OrdersComponent,
  ProductsComponent,
  ProductDetailsComponent,
  NotFoundComponent,
];
const COMPONENTS = [
  NavbarComponent,
  ProductCardComponent,
  PaginationComponent,
  FilterComponent,
];

@NgModule({
  declarations: [AppComponent, ...PAGES, ...COMPONENTS],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
