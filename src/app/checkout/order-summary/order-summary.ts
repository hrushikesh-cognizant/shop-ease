import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutService } from '../../core/service/checkout';

@Component({
  selector: 'app-order-summary',
  // standalone: true,
  standalone: false,
  templateUrl: './order-summary.html',
  styleUrls: ['./order-summary.css']
})
export class OrderSummaryComponent implements OnInit {

  order: any;

  constructor(
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {

    this.order =
      this.checkoutService.lastOrder;

  }

}