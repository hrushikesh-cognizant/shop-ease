import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private orderUrl =
    'http://localhost:3000/orders';

  private orderData: any;

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