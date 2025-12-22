import { ChangeDetectorRef, Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { Password } from '../../services/password';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [FormsModule, RouterModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  email: string = "";
  password: string = "";
  role: string = "USER";
  errorMessage: string = "";
  constructor(private authService: Auth,private cdr: ChangeDetectorRef, private router: Router, private passwordService: Password) { }

  onSubmit() {
    const message = this.passwordService.validate(this.password);
    if(this.email == null || this.email.trim().length<1){
      this.errorMessage="Email is Required";
      this.cdr.detectChanges();
      return;
    }
    if (message == null) {
      this.authService.register({
        email: this.email,
        password: this.password,
        role: this.role
      })
        .subscribe({
          next: () => this.router.navigate(['/login']),
          error: err => console.error(err)
        });
    } else {
      console.log(message);
      this.errorMessage=message;
      this.cdr.detectChanges();
    }
  }
}
