import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductModule } from './product/product-module';
import { AuthModule } from './auth/auth-module';
import { CheckoutModule } from './checkout/checkout-module';
import { CartModule } from './cart/cart-module';


@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    AuthModule,
    CheckoutModule,
    CartModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
