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
  message:string="";
  showPopup:boolean=false;
  getAllBooking():void{
    const Email=localStorage.getItem("email");
    console.log(Email);
    this.authServices.getAll(Email).subscribe({
      next: (responce) => {
        this.bookings=responce;
        for(let i=0;i<this.bookings.length;i++){
          this.bookings[i].booking.show_pop_up=false;
        }
        console.log(this.bookings);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error', error);
        if(error.status==404){
          this.message="No Booking Found";
        }
        this.cdr.detectChanges();
      }
    })
  }
  bookings:any=[];
  constructor(private authServices:Auth,private cdr: ChangeDetectorRef){}
  ngOnInit(){
    this.getAllBooking();
  }
  blur(){
    this.showPopup=true;
    this.cdr.detectChanges();
  }

  noBlur(){
    this.showPopup=false;
    this.cdr.detectChanges();
  }
  CancelBooking(pnr:any){
    console.log(pnr);
    this.authServices.cancel(pnr).subscribe({
      next: (responce) => {
        console.log('Success', responce);
        this.getAllBooking();
        this.showPopup=false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error', error);
        this.message=error.message;
        this.cdr.detectChanges();
      }
    });
  }

}
