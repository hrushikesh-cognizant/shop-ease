import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from './password-match.validator';
import { AuthService } from '../../core/service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,

  styleUrl: './register.component.css',
  templateUrl: './register.component.html',
})
export class RegisterComponent {



  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      //  email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.pattern(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validators: passwordMatchValidator

      });
  }

  onSubmit(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const user = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('User Registered', response);
        alert('Registration Successful');
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration Failed', error);
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }
}



