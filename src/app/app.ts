import { Component, signal } from '@angular/core';
import { AuthService } from './core/service/auth';


@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('shop-ease');

  constructor(public authService: AuthService) {}
}
