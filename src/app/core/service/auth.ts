import { Service } from '@angular/core';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

//@Service()
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/users';

  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('currentUser');

    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}?email=${email}&password=${password}`
    ).pipe(
      tap(users => {
        if (users.length > 0) {
          localStorage.setItem(
            'currentUser',
            JSON.stringify(users[0])
          );

          this.currentUserSubject.next(users[0]);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
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
}