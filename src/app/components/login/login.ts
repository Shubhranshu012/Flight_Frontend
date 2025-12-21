import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterModule,CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errorMessage: string="";
  email:string="";
  password:string="";
  constructor(private authService: Auth,private router: Router,private cdr: ChangeDetectorRef) {
  }

  onSubmit() {
  this.errorMessage = '';

  this.authService.login({"email":this.email,"password":this.password})
    .subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('email',this.email)
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
