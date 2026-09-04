import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private orderUrl =
    'http://localhost:3000/orders';

  private orderData: any;
  // private orderData: any = {total:90, name:"John", address:"Main Street, NY", city:"New York", pincode:10001, items:[]};

  constructor(
    private http: HttpClient
  ) {}

  setOrderData(order: any): void {
    this.orderData = order;
  }

  getOrderData(): any {
    return this.orderData;
  }

  placeOrder(order: any) {

    this.orderData = order;

    return this.http.post(
      this.orderUrl,
      order
    );

  }

}