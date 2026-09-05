import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetail } from './product/product-detail/product-detail';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CheckoutComponent } from './checkout/checkout/checkout';
import { OrderSummaryComponent } from './checkout/order-summary/order-summary';
import { ProductList } from './product/product-list/product-list';
import { CartComponent } from './cart/cart-component/cart-component';
import { CartItemComponent } from './cart/cart-item-component/cart-item-component';
import { AuthGuard } from './core/guards/auth-guard';
import { AdminComponent } from './admin/admin-component/admin-component';
import { AdminGuard } from './core/guards/admin-guard';

const routes: Routes = [
  { path: 'products/:id', component: ProductDetail },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // { path: 'checkout', component: CheckoutComponent },
  // { path: 'checkout/summary', component: OrderSummaryComponent },

  {
    path: 'checkout',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CheckoutComponent },
      { path: 'summary', component: OrderSummaryComponent }
    ],
  },

  { path: '', component: ProductList },

  { path: 'cart', component: CartComponent },
  // , canActivate: [authGuard]
  // { path: 'cartitem', component: CartItemComponent },


  { path: 'admin', canActivate: [AdminGuard], component: AdminComponent },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
