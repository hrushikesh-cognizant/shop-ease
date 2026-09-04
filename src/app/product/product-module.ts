import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetail } from './product-detail/product-detail';
import { RouterModule } from '@angular/router';
import { ProductFilter } from './product-filter/product-filter';
import { ProductFilterPipe } from './product-filter-pipe';
import { ProductList } from './product-list/product-list';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductDetail, ProductFilter, ProductFilterPipe, ProductList],
  imports: [CommonModule, RouterModule, FormsModule],
  // exports: [ProductList]
})
export class ProductModule {}
