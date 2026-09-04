
import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { CartService } from '../../core/service/cart';
import { CartItem } from '../../core/models/cart.model';
import { AuthService } from '../../core/service/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart',
  standalone: false,
  styleUrls: ['./cart-component.css'],
  templateUrl: './cart-component.html',
})

export class CartComponent implements OnInit {

  //cartItems$!: Observable<CartItem[]>;
  totalAmount = 0;
cartItems$!: Observable<CartItem[]>;

constructor(private cartService: CartService, private authService: AuthService, private router:Router) {}


totalItems = 0;
subtotal = 0;

ngOnInit(): void {

  this.cartItems$ = this.cartService.items$;

  this.cartItems$.subscribe(items => {

    this.totalItems = items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    this.subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

  });

}


cartCount(){

}
  removeItem(id: string) {
    this.cartService.removeFromCart(id);
  }

  updateQty(id: string, qty: number) {
    this.cartService.updateQuantity(id, qty);
  }

  clearCart(){
   //this.cartItems.next([]);
  }


  //order summary moved here 
  @Input() cartItems: CartItem[] = []; 

  getTotalItems(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  getSubtotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    );
  }

  getDeliveryCharge(): number {
    return this.getSubtotal() > 50000 ? 0 : 100;
  }

  getGrandTotal(): number {
    return this.getSubtotal() + this.getDeliveryCharge();
  }
  
checkOut():void{
  //here is Loggedin validation should come
  const user = this.authService.getUser();
  console.log(user);
if (!user) {
this.router.navigate(['/login']);
return;
}else{
  this.router.navigate(['/checkout']);
}


}






}