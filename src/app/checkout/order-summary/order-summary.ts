import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutService }
from '../../core/service/checkout.service';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
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
      this.checkoutService.getOrderData();

  }

}