import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { FilterComponent } from './core/components/filter/filter.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { PaginationComponent } from './core/components/pagination/pagination.component';

import { ProductCardComponent } from './core/components/product-card/product-card.component';
import { CartComponent } from './features/cart/cart.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { OrdersComponent } from './features/orders/orders.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { ProductsComponent } from './features/products/products.component';
import { ShippingComponent } from './features/shipping/shipping.component';

const PAGES = [
  ShippingComponent,
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
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
