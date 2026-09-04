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

import { CartService } from '../../core/service/cart.service';
import { CheckoutService } from '../../core/service/checkout.service';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
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
    private router: Router
  ) {}

  ngOnInit(): void {

    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      cardNumber: ['', Validators.required]
    });

    this.loadCart();

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

 placeOrder(): void {

  if (this.checkoutForm.invalid) {
    return;
  }

  const order = {

    ...this.checkoutForm.value,

    items: this.cartItems,

    total: Number(
      this.total.toFixed(2)
    )

  };

  this.checkoutService
    .placeOrder(order)
    .subscribe(() => {

      this.cartService
        .clearCart()
        .subscribe(() => {

          this.router.navigate([
            '/checkout/summary'
          ]);

        });

    });

}

}