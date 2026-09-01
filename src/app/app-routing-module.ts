import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetail } from './product/product-detail/product-detail';

const routes: Routes = [
  {path:'products/:id', component:ProductDetail}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
