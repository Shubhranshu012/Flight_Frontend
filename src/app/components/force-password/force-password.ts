import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Password } from '../../services/password';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-force-password',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './force-password.html',
  styleUrl: './force-password.css',
})
export class ForcePassword implements OnInit{
  oldPassword: string = '';
  newPassword: string = '';
  email: string = '';
  message:string='';
  
  constructor(private route:Router,private passwordValidate:Password,private cdr: ChangeDetectorRef,private authService:Auth){}
  ngOnInit() {
    this.email=localStorage.getItem('email') || '' ;
    
    // if(localStorage.getItem('role') !== 'User'){
    //   this.route.navigate(['/login']);
    // }

  }
  change(){
    console.log(this.email,this.oldPassword,this.newPassword);
    let message=this.passwordValidate.validate(this.newPassword);
    if(message == null){
      this.authService.change({ "email": this.email, "oldPassword": this.oldPassword, "newPassword": this.newPassword })
        .subscribe({
          next: (response) => {
            this.message = "Change Success";
            localStorage.setItem('ValidPassword','true');
            this.cdr.detectChanges();
          },
          error: error => {
            console.log(error);
            this.message = "Wrong Old Password";
            this.cdr.detectChanges();
          }
        });
      this.route.navigate(['/home']);
    }
    else{
      this.message=message;
      this.cdr.detectChanges();
    }
  }
}
