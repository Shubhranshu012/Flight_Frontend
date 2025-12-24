import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Password } from '../../services/password';

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
  
  constructor(private route:Router,private passwordValidate:Password,private cdr: ChangeDetectorRef){}
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

      this.route.navigate(['/home']);
    }
    else{
      this.message=message;
      this.cdr.detectChanges();
    }
  }
}
