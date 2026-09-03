import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetail } from './product-detail/product-detail';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductDetail],
  imports: [CommonModule, RouterModule],
})
export class ProductModule {}
