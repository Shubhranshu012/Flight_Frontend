import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-cancel',
  imports: [FormsModule,CommonModule],
  templateUrl: './cancel.html',
  styleUrl: './cancel.css',
})
export class Cancel {
  email:string='';
  pnr:string='';

  constructor(private authServices:Auth){}
  submit(){
    this.authServices.cancel(this.email, this.pnr).subscribe({
      next: (res) => {
        console.log('Success', res);
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
