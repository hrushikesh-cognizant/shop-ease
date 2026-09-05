import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../core/models/product.model';
import { FilterCriteria } from '../product-filter/product-filter';
import { ProductService } from '../../core/service/product';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: false,
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {

  products: Product[] = [];
  categories: string[] = [];
  searchTerm = '';
  selectedCategory = 'All';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  loading = false;
  error = false;
  errorMessage = '';
  lastAdded?: Product;

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // console.log('ProductList initialized');
    this.loadProducts();

  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';
    // this.http.get<Product[]>('http://localhost:3000/products').subscribe({
    //   next: (products) => {
    //     console.log('Products from API:', products);
    //     this.products = products;
    //     this.categories = [
    //       ...new Set(
    //         products.map(
    //           product => product.category
    //         )
    //       )
    //     ];
    //     this.loading = false;
    //   },
    //   error: (error) => {
    //     console.error(
    //       'Error loading products:', error
    //     );
    //     this.errorMessage = 'Unable to load products.';
    //     this.loading = false;
    //   }
    // });

    this.productService.getProducts().pipe(
      catchError(() => {
        this.error = true;
        return of([]);
      })
    ).subscribe({
      next: (products) => {
        // console.log('Products from API:', products);
        this.products = products;
        // console.log('Before setting loading false:', this.loading);
        this.loading = false;
        // console.log('After setting loading false:', this.loading);
        this.cdr.detectChanges();
        this.categories = [
          ...new Set(
            products.map(
              product => product.category
            )
          )
        ];
        
      },
      error: (error) => {
        console.error(
          'Error loading products:', error
        );
        this.errorMessage = 'Unable to load products.';
        this.loading = false;
      }
    });
  }

  onFilterChange(
    criteria: FilterCriteria
  ): void {
    this.searchTerm = criteria.searchTerm;
    this.selectedCategory = criteria.category;
    this.minPrice = criteria.minPrice;
    this.maxPrice = criteria.maxPrice;
  }
}
