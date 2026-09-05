import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, switchMap } from 'rxjs';
import { CartItem } from '../../core/models/cart.model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  readonly items$ = this.cartItems.asObservable();

  private cartUrl = 'http://localhost:3000/cartItems';

  constructor(private http: HttpClient) {
    // this.loadCartItems();
  }

  // sunderraju cart service code
  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this.cartUrl);
  }

  clearCart_1() {
    return this.getCartItems().pipe(
      switchMap((items) => {
        const requests = items.map((item) => this.http.delete(`${this.cartUrl}/${item.id}`));

        return forkJoin(requests);
      }),
    );
  }

  //   addToCart(item: CartItem): void {

  //   this.http.get<CartItem[]>(
  //     `${this.apiUrl}?id=${item.id}`
  //   ).subscribe(cartItems => {

  //     if (cartItems.length > 0) {

  //       const existingItem = cartItems[0];

  //       this.http.patch(
  //         `${this.apiUrl}/${existingItem.id}`,
  //         {
  //           quantity: existingItem.quantity + item.quantity
  //         }
  //       ).subscribe(() => {
  //         this.loadCartItems();
  //       });

  //     } else {

  //       this.http.post<CartItem>(
  //         this.apiUrl,
  //         item
  //       ).subscribe(() => {
  //         this.loadCartItems();
  //       });

  //     }

  //   });

  // }

  addToCart(product: Product): void {
    // console.log(product);
    const items = this.cartItems.value;
    const existing = items.find((f) => f.product.id === product.id);

    this.cartItems.next(
      existing
        ? items.map((f) => (f.product.id === product.id ? { ...f, quantity: Math.min(f.quantity + 1, product.quantity) } : f))
        : [...items, { product, quantity: 1 }],
    );
  }
  removeFromCart(id: string): void {
    const updatedItems = this.cartItems.value.filter((item) => item.product.id !== id);

    this.cartItems.next(updatedItems);
  }

  // updateQuantity(id: string, quantity: number): void {
  //   const items = [...this.cartItems.value];
  //   const item = items.find(i => i.product.id === id);
  //   if (item) {
  //     item.quantity = quantity;
  //   }
  //   this.cartItems.next(items);
  // }

  updateQuantity(id: string, quantity: number): void {
    if (quantity < 1) return this.removeFromCart(id);

    this.cartItems.next(
      this.cartItems.value.map((item) =>
        item.product.id==id ? { ...item, quantity: Math.min(quantity, item.product.quantity) } : item,
      ),
    );
  }

  //   updateQuantityNotReq(id: number, quantity: number): void {
  //   this.http.patch(
  //     `${this.apiUrl}/${id}`,{ quantity }
  //   ).subscribe(() => {
  //    // this.loadCartItems();
  //   });
  // }
  //  loadCartItems(): void {
  //   this.http.get<CartItem[]>(this.apiUrl)
  //     .subscribe(items => {
  //       this.cartItems.next(items); // important
  //     });
  // }
  clearCart(): void {
    this.cartItems.next([]);
  }

  get total(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  get count(): number {
    return this.cartItems.value.reduce((total, item) => total + item.quantity, 0);
  }

  get snapShot(): CartItem[] {
    return this.cartItems.value;
  }
}
