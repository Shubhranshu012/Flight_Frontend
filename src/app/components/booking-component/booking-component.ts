import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
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
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './booking-component.html',
  styleUrl: './booking-component.css',
})

export class BookingComponent {
  passengersCount: number = 0;
  passengers: Passenger[] = [];
  flightId: string = "";
  message: string = "";
  rows: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  seatsLeft: string[] = ['A', 'B', 'C'];
  seatsRight: string[] = ['D', 'E', 'F'];
  selectedSeat: string[] = [];

  selectSeat(seat: string) {
    if (this.selectedSeat.length == this.passengersCount) {
      if (this.selectedSeat.includes(seat)) {
        this.selectedSeat = this.selectedSeat.filter(s => s !== seat);
      }
    }
    else {
      if (this.selectedSeat.includes(seat)) {
        this.selectedSeat = this.selectedSeat.filter(s => s !== seat);
      }
      else {
        this.selectedSeat.push(seat);
      }
    }
    console.log('Selected seats:', this.selectedSeat);
  }
  booking: { email: string; passengers: Passenger[] } = {
    email: "",
    passengers: []
  };

  get passengersArray() {
    return new Array(this.passengersCount);
  }
  constructor(private route: ActivatedRoute, private router: Router, private bookingService: Auth, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.flightId = this.route.snapshot.paramMap.get('id') || '';
    this.booking.email = localStorage.getItem('email') || '';
    const role = localStorage.getItem("role");
    if (!role || role !== "USER") {
      this.router.navigate(['login']);
    }
    console.log(this.flightId);
  }
  updatePassenger(event: any) {
    if (this.passengersCount == 0) {
      this.message = "Minimum 1 passenger";
    }
    console.log(event);
    if (event != null) {
      this.passengersCount = event;
    }
    while (this.passengers.length < this.passengersCount) {
      this.passengers.push({ name: '', gender: 'MALE', age: 0, seatNumber: '', mealOption: 'VEG' });
    }
    while (this.passengers.length > this.passengersCount) {
      this.passengers.pop();
    }
  }

  bookingButton() {
    console.log(this.passengers);
    for (let x = 0; x < this.passengers.length; x++) {
      this.passengers[x].seatNumber = this.selectedSeat[x];
    }
    this.booking.passengers = this.passengers;
    console.log(this.booking);
    // this.bookingService.booking(this.booking, this.flightId).subscribe({
    //   next: (responce) => {
    //     this.router.navigate(['/all']);
    //   },
    //   error: (error) => {
    //     this.message = error.error.bookingRequestDto;
    //     this.cdr.detectChanges();
    //     console.log(error);
    //   }
    // });
  }
}
