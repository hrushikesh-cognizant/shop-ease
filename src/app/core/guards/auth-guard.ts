
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth';

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate{

  constructor(
    private authService:AuthService,
    private router:Router
  ){}

  canActivate():boolean | UrlTree{
    return this.authService.isLoggedIn ? true : this.router.createUrlTree(['/login']);
  }
}
