import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string="";
  constructor(private form: FormBuilder,private authService: Auth,private router: Router,private cdr: ChangeDetectorRef) {
    this.loginForm = this.form.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.errorMessage = '';

  this.authService.login(this.loginForm.value)
    .subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/']);
      },
      error: err => {
        console.log(err);
        if (err.status === 403) {
          this.errorMessage = 'Wrong UserName or Password';
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
        this.cdr.detectChanges();
      }
    });
  }
}
