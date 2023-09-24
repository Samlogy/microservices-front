import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './features/cart/cart.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { OrdersComponent } from './features/orders/orders.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { ProductsComponent } from './features/products/products.component';
import { ShippingComponent } from './features/shipping/shipping.component';

const routes: Routes = [
  {
    component: ProductsComponent,
    path: '',
  },
  {
    component: ProductsComponent,
    path: 'products',
  },
  {
    component: ProductDetailsComponent,
    path: 'product/:id',
  },
  {
    component: ShippingComponent,
    path: 'shipping',
  },
  {
    component: OrdersComponent,
    path: 'orders',
  },
  {
    component: CartComponent,
    path: 'cart',
  },
  {
    component: NotFoundComponent,
    path: '**',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
