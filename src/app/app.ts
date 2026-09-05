import { Component, signal } from '@angular/core';
import { AuthService } from './core/service/auth';
import { CartService } from './core/service/cart';


@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('shop-ease');

  constructor(
    public authService: AuthService, 
    public cartService: CartService) {}
}
