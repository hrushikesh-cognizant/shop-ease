import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/service/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  styleUrl: './product-detail.css',
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit{
  product$: Observable<Product | null>;
  error = false;
  
  constructor(
    private route: ActivatedRoute,
    private products:ProductService

  ){
    this.product$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.products.getProductById(params.get('id') ?? '').pipe(
          catchError(() => {
            this.error = true;
            return of(null);
          })
        )
      )
    );
  }

  ngOnInit(): void {
    
  }

  //TODO: addToCart methods from CartService
  addToCart(product:Product):void{
    console.log(product);
  }
}
