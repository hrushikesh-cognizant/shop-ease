import { Component, Input } from '@angular/core';
import { CartService } from '../../core/service/cart';
import { Observable } from 'rxjs';
import { CartItem } from '../../core/models/cart.model';

@Component({
  selector: 'app-cart-item-component',
  standalone: false,
 templateUrl: './cart-item-component.html',
 styleUrls: ['./cart-item-component.css'],
})


export class CartItemComponent {

  @Input() item: any;
  
  constructor(private cartService: CartService) {}

  increaseQty() {
    this.cartService.updateQuantity(
      this.item.id,
      this.item.quantity + 1
    );
  }

  decreaseQty() {
    if (this.item.quantity > 1) {
      this.cartService.updateQuantity(
        this.item.id,
        this.item.quantity - 1
      );
    }
  }

  deleteItem() {
    this.cartService.removeFromCart(this.item.id);
  }

totalItems = 0;
subtotal = 0;

cartItems$!: Observable<CartItem[]>;

// this.cartItems$.subscribe(() => {
//   this.totalItems = this.cartService.getTotalItems();
//   this.subtotal = this.cartService.getSubtotal();
// });

ngOnInit(): void {

  this.cartItems$ = this.cartService.items$;

  this.cartItems$.subscribe(items => {
    this.totalItems = items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    this.subtotal = items.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    );
  });
}

  

}
