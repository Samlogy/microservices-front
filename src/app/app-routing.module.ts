import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './features/cart/cart.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { OrdersComponent } from './features/orders/orders.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { ProductsComponent } from './features/products/products.component';
import { ShippingComponent } from './features/shipping/shipping.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { ProfileComponent } from './features/profile/profile.component';

const routes: Routes = [
  {
    component: ProductsComponent,
    path: '',
  },
  {
    component: ProductDetailsComponent,
    path: 'product/:id',
  },
  {
    component: ShippingComponent,
    path: 'shipping',
    canActivate: [AuthGuard],
  },
  {
    component: OrdersComponent,
    path: 'orders',
    canActivate: [AuthGuard],
  },
  {
    component: CartComponent,
    path: 'cart',
    canActivate: [AuthGuard],
  },
  {
    component: ProfileComponent,
    path: 'profile',
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
