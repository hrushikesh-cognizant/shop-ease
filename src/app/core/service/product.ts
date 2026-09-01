import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'

@Injectable(
    {providedIn: 'root'}
)
export class ProductService {
    private readonly endpoint = 'http://localhost:3000/products';

    constructor(private http:HttpClient){}

    getProducts(): Observable<Product[]>{
        return this.http.get<Product[]>(this.endpoint);
    }

    getProductById(id:string): Observable<Product>{
        return this.http.get<Product>(`${this.endpoint}/${id}`);
    }

}
