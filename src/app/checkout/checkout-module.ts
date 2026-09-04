import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSummaryComponent } from './order-summary/order-summary';
import { CheckoutComponent } from './checkout/checkout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OrderSummaryComponent, CheckoutComponent],
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
})
export class CheckoutModule {}
