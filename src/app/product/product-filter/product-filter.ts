import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

export interface FilterCriteria{
  searchTerm: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
}

@Component({
  selector: 'app-product-filter',
  standalone: false,
  styleUrl: './product-filter.css',
  templateUrl: './product-filter.html',
})
export class ProductFilter {
  @Input() categories: string[]=[];
  searchTerm = '';
  selectedCategory = 'All';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  @Output() filterChange = new EventEmitter<FilterCriteria>();
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  onFilterChange(): void{
    this.filterChange.emit({
      searchTerm: this.searchTerm,
      category: this.selectedCategory,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }
clearFilters(): void{
  this.searchTerm = '';
  this.selectedCategory = 'All';
  this.minPrice = null;
  this.maxPrice = null;
  this.onFilterChange();
  setTimeout(() => {
    this.searchInput.nativeElement.focus();
  })
}
}
