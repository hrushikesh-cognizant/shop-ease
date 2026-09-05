import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  //imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

   constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  // Data model bound to the template via [(ngModel)]
  // loginData = {
  //   email: '',
  //   password: ''
  // };

  // Handles the form submission
  // onLogin(form: NgForm): void {
  //   if (form.valid) {
  //     this.router.navigate(['/cart']);
  //     console.log('Form Submitted Successfully!', form.value);
  //     // Execute your authentication logic here
  //   } else {
  //     console.error('Form is invalid.');
  //   }
  // }


  

  loginData = {
    email: '',
    password: ''
  };

  errorMsg = '';
  authError = false;

  onLogin(value:{email:string, password:string}): void {
    // console.log('OnLongin');

    this.authError=false;

    if (value.email && value.password) {
      this.authService.login(
        value.email,
        value.password
      ).subscribe({
        next: () => {
          this.router.navigate(['/']);
          // console.log("Users>>>>>>>>>>>:"+ users)
          // if (user) {
          //   // console.log("Valid");
          //   // console.log('Login Successful');
          //   this.router.navigate(['/']);
          // } else {
          //   this.authError = true;
          //   this.errorMsg = 'Invalid Email or Password';
          //  alert( this.errorMsg = 'Invalid Email or Password');
          // }

        },
        error: (err) => {
          // console.log('Login error');
          // console.error(err);
          this.authError = true;
          this.errorMsg = err.message || 'An error occurred during login.';
        },
        complete: () => {
          // console.log('Login request completed');
        }
      });

    } else {
      // console.error('Form is invalid');
      this.errorMsg = ' We could not sign you in. Please check your details.';
    }
  }
}

  
