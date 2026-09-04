import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart-component/cart-component';
import { CartItemComponent } from './cart-item-component/cart-item-component';

@NgModule({
  declarations: [CartComponent, CartItemComponent],
  imports: [CommonModule],
})
export class CartModule {}
