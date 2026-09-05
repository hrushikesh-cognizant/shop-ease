import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../core/service/cart';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: false,
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {

  @Input() product!: Product;
  @Output() added = new EventEmitter<Product>();
  constructor(private cartService: CartService) {}

  add():void{
    this.cartService.addToCart(this.product);
    this.added.emit(this.product);
  }
}
