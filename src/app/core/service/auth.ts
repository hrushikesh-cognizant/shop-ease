import { Service } from '@angular/core';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';

//@Service()
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:3000/users';

  // private currentUserSubject = new BehaviorSubject<any>(null);
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  readonly user$ = this.currentUserSubject.asObservable();

  // constructor(private http: HttpClient) {
  //   const user = localStorage.getItem('currentUser');

  //   if (user) {
  //     this.currentUserSubject.next(JSON.parse(user));
  //   }
  // }
  // login(email: string, password: string): Observable<any[]> {

  //   return this.http.get<any[]>(
  //     `${this.apiUrl}?email=${email}&password=${password}`
  //   ).pipe(
  //     tap(users => {
  //       if (users.length > 0) {
  //         localStorage.setItem(
  //           'currentUser',
  //           JSON.stringify(users[0])
  //         );

  //         this.currentUserSubject.next(users[0]);
  //       }
  //     })
  //   );
  // }
  constructor(private http: HttpClient) {}

  // 
  setSession(user: User):void{
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(
      `${this.apiUrl}?email=${email}&password=${password}`
    ).pipe(
      switchMap(users =>{
        const user = users[0];
        return user ? (this.setSession(user), of(user)) : throwError(() => new Error('Invalid email or password'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // register(user: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, user);
  // }

  register(name: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl, { name, email, password });
  }

  get isLoggedIn(): boolean {
    // return !!localStorage.getItem('currentUser');
    return !!this.currentUser;
  }

  // getCurrentUser(): Observable<any> {
  //   return this.currentUserSubject.asObservable();
  // }

  get currentUser() {
    return this.currentUserSubject.value;
  }

  // private loggedIn = true;

  // isLoggedIn(): boolean {
  //   return this.loggedIn;
  // }

  // login(): void {
  //   this.loggedIn = true;
  // }

  // logout(): void {
  //   this.loggedIn = false;
  // }

  get isAdmin(): boolean{
    return this.currentUser?.role === 'admin';
  }
}