import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errorMessage: string = "";
  email: string = "";
  password: string = "";
  constructor(private authService: Auth, private router: Router, private cdr: ChangeDetectorRef) {
  }
  
  onSubmit() {
    this.errorMessage = '';

    this.authService.login({ "email": this.email, "password": this.password })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('email', this.email);
          if (localStorage.getItem('role') !== 'Admin') {
            const now = new Date();
            const lastDate = new Date(response.lastDate);
            console.log('Last password change date:', lastDate);
            const TimeLimit =  5 * 24 * 60 * 60 * 1000;
            if (lastDate.getTime() + TimeLimit < now.getTime()) {
              localStorage.setItem('ValidPassword', 'false');
              this.router.navigate(['/forcePassword']);
            } else {
              localStorage.setItem('ValidPassword', 'true');
              this.router.navigate(['/']);
            }
          }
          else{
            this.router.navigate(['/']);
          }
        },
        error: error => {
          console.log(error);
          if (error.status === 403) {
            this.errorMessage = 'Wrong UserName or Password';
          } else {
            this.errorMessage = 'Login failed. Please try again.';
          }
          this.cdr.detectChanges();
        }
      });
  }
}
