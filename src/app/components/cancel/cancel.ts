import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
interface Booking{
  id:string,
  pnr:string,
  email:string,
  bookingTime: string,
  departureTime: string,
  arrivalTime: string,
  flightInventoryId:string,
  status: string,
  from:string,
  to:string;
}
@Component({
  selector: 'app-cancel',
  imports: [FormsModule,CommonModule],
  templateUrl: './cancel.html',
  styleUrl: './cancel.css',
})

export class Cancel {

  bookings:any=[];
  constructor(private authServices:Auth,private cdr: ChangeDetectorRef){}
  ngOnInit(){
    const Email=localStorage.getItem("email");
    console.log(Email);
    this.authServices.getAll(Email).subscribe({
      next: (responce) => {
        this.bookings=responce;
        for(let i=0;i<this.bookings.length;i++){
          console.log(this.bookings[i].booking.flightInventoryId);
          this.bookings[i].booking.to="Delhi";
          this.bookings[i].booking.from="Mumbai";
        }
        console.log(this.bookings);
      },
      error: (responce) => {
        console.error('Error', responce);
      }
    })
  }

  CancelBooking(pnr:any){
    console.log(pnr);
    this.authServices.cancel(pnr).subscribe({
      next: (responce) => {
        console.log('Success', responce);
        this.cdr.detectChanges();
      },
      error: (responce) => {
        console.error('Error', responce);
      }
    });
  }

}
