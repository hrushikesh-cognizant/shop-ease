import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetail } from './product/product-detail/product-detail';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CheckoutComponent } from './checkout/checkout/checkout';
import { OrderSummaryComponent } from './checkout/order-summary/order-summary';

const routes: Routes = [
  { path: 'products/:id', component: ProductDetail },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'checkout/summary',
    component: OrderSummaryComponent
  },
  {
    path: '',
    redirectTo: 'checkout',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
