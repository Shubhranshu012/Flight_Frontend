import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  imports: [CommonModule,FormsModule],
  templateUrl: './booking-component.html',
  styleUrl: './booking-component.css',
})

export class BookingComponent {
  passengersCount:number=0;
  bookingId:string="";
  booking={
    email: "",
    passengers:[]
  } 
  passengers: Passenger[] = [];
  get passengersArray() {
    return new Array(this.passengersCount);
  }
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.bookingId = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.bookingId);
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
  }
}
