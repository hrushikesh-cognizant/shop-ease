import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart-component/cart-component';
import { CartItemComponent } from './cart-item-component/cart-item-component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CartComponent, CartItemComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule]
})
export class CartModule {}
