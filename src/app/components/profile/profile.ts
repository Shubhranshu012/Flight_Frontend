import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  email: string = '';
  oldPassword: string = "";
  newPassword: string = "";
  open: boolean = false;

  role: string = "";
  message:string="";

  constructor(private authService:Auth,private cdr: ChangeDetectorRef,private router: Router){}
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
    this.authService.change({ "email": this.email, "oldPassword": this.oldPassword,"newPassord":this.newPassword })
      .subscribe({
        next: (response) => {
          this.closeBox();
          console.log("Ok");
        },
        error: err => {
          console.log(err);
          if (err.status === 403) {
            this.message = 'Wrong Password';
          } else {
            this.message = 'PassWord Change failed. Please try again.';
          }
          this.cdr.detectChanges();
        }
      });
  }
}
