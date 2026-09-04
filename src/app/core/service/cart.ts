import { Service } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  forkJoin,
  switchMap
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUrl =
    'http://localhost:3000/cart';

  constructor(
    private http: HttpClient
  ) {}

  getCartItems(): Observable<any[]> {

    return this.http.get<any[]>(
      this.cartUrl
    );

  }

  clearCart() {

    return this.getCartItems().pipe(

      switchMap(items => {

        const requests = items.map(item =>
          this.http.delete(
            `${this.cartUrl}/${item.id}`
          )
        );

        return forkJoin(requests);

      })

    );

  }
}
