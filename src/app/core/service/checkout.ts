import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/cart.model';
import { Observable } from 'rxjs';
import { Order } from '../models/order.models';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private orderUrl =
    'http://localhost:3000/orders';

  // private orderData: any;
  // private orderData: any = {total:90, name:"John", address:"Main Street, NY", city:"New York", pincode:10001, items:[]};

  orderData : {items:CartItem[]; total:number, name:string, address:string, city:string, pincode:number} | null = null;

  constructor(
    private http: HttpClient
  ) {}

  // setOrderData(order: any): void {
  //   this.orderData = order;
  // }

  // getOrderData(): any {
  //   return this.orderData;
  // }

  // placeOrder(order: any) {

  //   this.orderData = order;

  //   return this.http.post(
  //     this.orderUrl,
  //     order
  //   );

  // }

  placeOrder(order: Omit<Order, 'id'>): Observable<Order>{
    // console.log(order);
    return this.http.post<Order>(this.orderUrl, order);
  }

}