import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/service/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-admin-component',
  standalone: false,
  styleUrl: './admin-component.css',
  templateUrl: './admin-component.html',
})
export class AdminComponent implements OnInit {

  form!: FormGroup;
  saved = false;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, Validators.min(1)],
      image: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [1, Validators.min(0)]
    });
  }

  save(): void {
    this.productService.addProduct({ ...this.form.getRawValue(), rating: 5 } as Omit<Product, 'id'>).subscribe(() => {
      this.saved = true;
      this.form.reset({ quantity: 1, price: 0 });
    });
  }
}
