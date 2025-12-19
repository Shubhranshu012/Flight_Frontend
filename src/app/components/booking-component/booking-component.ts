import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

interface Passenger {
  name: string;
  gender: string;
  age: number;
  seatNumber: string;
  mealOption: string;
}

@Component({
  selector: 'app-booking-component',
  standalone:true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './booking-component.html',
  styleUrl: './booking-component.css',
})

export class BookingComponent {
  passengersCount:number=0;
  passengers: Passenger[] = [];
  flightId:string="";
  booking: { email: string; passengers: Passenger[] } = {
    email: "",
    passengers: []
  };
   
  get passengersArray() {
    return new Array(this.passengersCount);
  }
  constructor(private route: ActivatedRoute,private router: Router,private bookingService:Auth) {}
  ngOnInit() {
    this.flightId = this.route.snapshot.paramMap.get('id') || '';
    const role = localStorage.getItem("role");
    if (!role || role !== "USER") {
      this.router.navigate(['login']);
    }
    console.log(this.flightId);
  }
  updatePassenger(event:any){
    console.log(event);
    if(event!=null){
      this.passengersCount=event;
    }
    while (this.passengers.length < this.passengersCount) {
      this.passengers.push({ name: '', gender: 'MALE', age: 0, seatNumber: '', mealOption: 'VEG' });
    }
    while (this.passengers.length > this.passengersCount) {
      this.passengers.pop();
    }
  }

  bookingButton(){
    console.log(this.passengers);
    this.booking.passengers=this.passengers;
    console.log(this.booking);
    this.bookingService.booking(this.booking, this.flightId).subscribe({
      next: (res) => {
        console.log('Success', res);
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
