import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterModule
} from '@angular/router';

import { CartService } from '../../core/service/cart';
import { CheckoutService } from '../../core/service/checkout';
import { AuthService } from '../../core/service/auth';


@Component({
  selector: 'app-checkout',
  // standalone: true,
  standalone: false,
  // imports: [
  //   CommonModule,
  //   ReactiveFormsModule,
  //   RouterModule
  // ],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;

  cartItems: any[] = [];

  total = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(12)]]
    });

    // this.loadCart();

  }

  loadCart(): void {

    this.cartService
      .getCartItems()
      .subscribe(items => {

        this.cartItems = items;

        this.total = items.reduce(
          (sum, item) =>
            sum + (item.quantity * item.price),
          0
        );

      });

  }

  // placeOrder(): void {

  //   if (this.checkoutForm.invalid) {
  //     return;
  //   }

  //   const order = {

  //     ...this.checkoutForm.value,

  //     items: this.cartItems,

  //     total: Number(
  //       this.total.toFixed(2)
  //     )

  //   };

  //   this.checkoutService
  //     .placeOrder(order)
  //     .subscribe(() => {

  //       this.cartService
  //         .clearCart_1()
  //         .subscribe(() => {

  //           this.router.navigate([
  //             '/checkout/summary'
  //           ]);

  //         });

  //     });

  // }

  placeOrder(): void {
    // console.log("Inside Place Order method")

    const order = {
      userEmail: this.authService.currentUser?.email ?? '',
      item: this.cartService.snapShot,
      total: this.cartService.total,
      name: `${this.checkoutForm.value.name}`,
      address: `${this.checkoutForm.value.address}`,
      city: `${this.checkoutForm.value.city}`,
      pincode: this.checkoutForm.value.pincode,
      status: 'placed' as const,
      createdAt: new Date().toISOString()
    };

    this.checkoutService.placeOrder(order).subscribe({
      next:(savedOrder) =>{
        this.checkoutService.orderData = {items:savedOrder.item, total:savedOrder.total, name:savedOrder.name, address:savedOrder.name, city:savedOrder.city, pincode:savedOrder.pincode};
        this.cartService.clearCart();
        this.router.navigate(['/checkout/summary']);
      },
      error:() => {
        alert("We could not place your order. Please try again.")
      }
    });

    
  }

}