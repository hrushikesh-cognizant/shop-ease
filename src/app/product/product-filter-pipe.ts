import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../core/models/product.model';

@Pipe({
  name: 'productFilter',
  standalone: false,
})
export class ProductFilterPipe implements PipeTransform {
  transform(
    products: Product[], 
    searchTerm: string,
    category: string,
    minPrice: number | null,
    maxPrice: number | null): Product[] {
    if(!products){
 return [];
    }   
const search = (searchTerm || '').trim().toLowerCase();
      return products.filter(product => {
        const matchesSearch = !search || product.name.toLowerCase().includes(search);
        const matchesCategory = !category || category === 'All' || product.category === category;
        const matchesMinPrice = minPrice == null || product.price >= minPrice;
        const matchesMaxPrice = maxPrice == null || product.price <= maxPrice;
        return (
          matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
        );
      });
  }
}
