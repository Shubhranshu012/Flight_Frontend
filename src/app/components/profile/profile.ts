import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { Password } from '../../services/password';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  email: string = '';
  oldPassword: string = "";
  newPassword: string = "";
  open: boolean = false;

  role: string = "";
  message: string = "";
  successMessage: string = "";

  constructor(private authService: Auth, private cdr: ChangeDetectorRef, private router: Router, private passwordService: Password) { }
  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    this.role = localStorage.getItem('role') || '';
  }
  openBox() {
    this.open = true;
  }
  closeBox() {
    this.open = false;
  }
  change() {
    console.log("cancel Booking")
    this.message = '';
    if (this.oldPassword == null || this.oldPassword == "") {
      this.message = "Enter Old Password";
      this.cdr.detectChanges();
      return;
    }
    const newMessage = this.passwordService.validate(this.newPassword);
    if (newMessage == null) {
      this.authService.change({ "email": this.email, "oldPassword": this.oldPassword, "newPassword": this.newPassword })
        .subscribe({
          next: (response) => {
            this.closeBox();
            this.successMessage = "Change Success";
            this.cdr.detectChanges();
          },
          error: err => {
            console.log(err);
            this.message = "Wrong Old Password";
            this.cdr.detectChanges();
          }
        });
    }
    else {
      this.message = newMessage;
      this.cdr.detectChanges();
    }
  }

}
